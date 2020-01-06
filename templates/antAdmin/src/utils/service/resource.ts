import { message } from 'antd';
import Cookie from 'js-cookie';
import axios from 'axios';
import { storage } from '@/utils/storage'
import { current, baseUrl } from '../env';


// 创建axios实例
const $http = axios.create({
    baseURL: baseUrl[current],
    timeout: 10000, // 请求超时时间
    responseType: "json",
    withCredentials: false, // 是否允许带cookie
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

export interface IAPIResponse {
    status?: boolean;
    message?: string;
    statusCode?: number;
}
export interface IAPIResult {
    entry: any
    apiResponse: IAPIResponse;
}

interface IloadingConfigModel {
    target?: object | string;
    fullscreen?: boolean;
    text?: string;
    background?: string;
    customClass?: string;
}

interface IAPIOptions {
    headers?: { [k: string]: string };
    ignoreHttpError?: boolean;
    ignoreApiError?: boolean;
    showLoading?: boolean;
    loadingConfig?: IloadingConfigModel;
    successToast?: string;
    forceParamsOnUrl?: boolean;                     // 将参数放置在url上
    forceParamsOnData?: boolean;                    // 将参数放置在body中
}

export interface IAPIParams {

}

class APIError extends Error {

}

type APIMethod = "post" | "get" | 'delete' | 'put';

export function generateAPI<InputParam extends IAPIParams, ResultParam>(method: APIMethod, url: string, createOptions?: IAPIOptions): (params: InputParam, callOptions?: IAPIOptions) => Promise<ResultParam> {
    // 合并 callOptions 和 createOptions
    const options: IAPIOptions = {
        headers: createOptions && createOptions.headers ? JSON.parse(JSON.stringify(createOptions.headers)) : {},
        ignoreHttpError: createOptions && createOptions.ignoreHttpError || false,
        ignoreApiError: createOptions && createOptions.ignoreApiError || false,
        showLoading: createOptions && createOptions.showLoading || false,
        loadingConfig: createOptions && createOptions.loadingConfig || undefined,
        forceParamsOnUrl: createOptions && createOptions.forceParamsOnUrl || false
    };
    return (params: InputParam, callOptions?: IAPIOptions) => {
        if (callOptions) {
            if (callOptions.headers) {    
                for (const k in callOptions.headers) {
                    options.headers![k] = callOptions.headers[k];
                }
            }
            if (callOptions.ignoreHttpError) {
                options.ignoreHttpError = true;
            }
            if (callOptions.ignoreApiError) {
                options.ignoreApiError = true;
            }
            if(callOptions.forceParamsOnUrl) {
                options.forceParamsOnUrl = true;
            }
            if (callOptions.forceParamsOnData) {
                options.forceParamsOnData = true;
            }
            if (callOptions.showLoading) {
                options.showLoading = true;
                if (callOptions.loadingConfig) {
                    options.loadingConfig = callOptions.loadingConfig;
                }
            }
            if (callOptions.successToast) {
              message.success( `${callOptions.successToast}`)
            }

        }
        return callAPI(method, url, params, options);
    }
}

export async function callAPI<InputParam extends IAPIParams, ResultParam>(method: APIMethod, url: string, params: InputParam, options?: IAPIOptions): Promise<ResultParam> {
    // 让 url 是一个完整的 url
    if (!options) { options = {}; }
    if (!options.headers) {
        options.headers = {
        };
    }
    if (!options.headers['Content-Type']) {
        options.headers['Content-Type'] = 'application/json'
    }
    
    const token = storage.buildToken.get();
    if(token){
        options.headers.Authorization = (token as any) ;
    }

    let result: any;
    const config: { [k: string]: any } = {
        url,
        method,
        data: [],
        headers: options.headers
    }
    if (options.forceParamsOnData) {
        config.data = params;
    } else if(!options.forceParamsOnUrl) {
        Object.keys(params).length <= 2 ? config.params = params : (config[method === 'get' ? 'params' : 'data'] = params)
    } else {
        config.params = params;
    }
    try {
        result = await $http.request(config);
    } catch (error) {
        if (!error.response) {
            throw new APIError(`请求错误: ` + error.message);
        }
        result = error.response;
    }

    // loadingInstance && loadingInstance.close()
    if (result && [2, 3].indexOf(Math.floor(result.status / 100)) === -1) {
        // 与后端协定新规则，失效跳转
        if (result.status === 403 || result.status === 401) {
            message.destroy();
            message.error(`登录超时，请重新登录。`);
            window.location.href = '/user/login';
            return (void 0 as any);
        }
        // HTTP 状态不对
        if (!options.ignoreHttpError) {
            message.error( `服务器错误: ${result.status}`)
        } else {
            throw new APIError(`服务器错误: ${result.status}`);
        }
    }
    if (result && !result.data) {
        if (!options.ignoreHttpError) {
            message.error( `服务器错误: ${result.status}`)
        } else {
            throw new APIError(`服务器错误: ${result.status}`);
        }
    }
    if(result && !result.data.status) {
        message.error(result.data.message)
    }

    let r: any = {};
    r.entry = result.data && result.data.entry;

    if(!r.apiResponse) {
        r.apiResponse = {
            status: result.data&&result.data.status||'',
            message: result.data&&result.data.message||'',
            statusCode: result.data&&result.data.statusCode||''
        };
    }
    return r as ResultParam;
}
