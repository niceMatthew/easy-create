import { useReducer,useState } from 'react';
import axios, { AxiosResponse, AxiosRequestConfig, Method } from 'axios';
import { message } from 'antd';
import { ActionType, ActionName } from './index.d';


export interface IAPIParam {

}


// Set baseURL when debugging production url in dev mode
axios.defaults.baseURL = 'http://localhost:3000/';

/**
 * Method to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config)
 * @return {object} response data
 */
export async function request(options: any) {
  try {
    const response = await axios(options);
    const { data, error } = handleResponse(response);
    if (error) {
      throw error;
    } else {
      return { response, data };
    }
  } catch (error) {
    showError(error.message);
    throw error;
  }
}

/** 
 * 自定义hook
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config)
 * @return {object}
 *   @param {object} response - response of axios (https://github.com/axios/axios#response-schema)
 *   @param {object} error - HTTP or use defined error
 *   @param {boolean} loading - loading status of the request
 *   @param {function} request - function to make the request manually
 */
export function useRequest<InputParam extends IAPIParam, ResultParam>(method: Method, url: string, options?: AxiosRequestConfig):{
    request: (config: InputParam) => Promise<void>;
    response: ResultParam | null;
    error: any;  
    loading: boolean;
} {
  const initialState = {
    response: null,
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(requestReducer, initialState);


  if (options && !options.headers['Content-Type']) {
    options.headers['Content-Type'] = 'application/json'
  }


  /**
   * 手动调用接口方法
   * @param {object} config - axios config to shallow merged with options before making request
   */
  async function request(param: InputParam) {
    let postData : any = {};

    postData[(method === 'GET'|| Object.keys(param).length <= 2) ? 'params' : 'data'] = param;
    postData.url = url;
    postData.method = method;
    try {
      dispatch({
        type: ActionName.INIT,
      });

      const response = await axios({
        ...options,
        ...postData
      });

      const { error } = handleResponse(response);
      if (error) {
        throw error;
      } else {
        dispatch({
          type: ActionName.SUCCESS,
          response,
        });
      }
    } catch (error) {
      showError(error.message);
      dispatch({
        type: ActionName.ERROR,
        error,
      });
    }
  }

  return {
    ...state,
    request,
  };
}





/**
 * Reducer to handle the status of the request
 * @param {object} state - original status
 * @param {object} action - action of dispatch
 * @return {object} new status
 */
function requestReducer(state: any, action: ActionType) {
  console.log('action', action)
  switch (action.type) {
    case 'init':
      return {
        response: null,
        error: null,
        loading: true,
      };
    case 'success':
      return {
        response: action.response.data.entry,
        error: null,
        loading: false,
      };
    case 'error':
      return {
        response: null,
        error: action.error,
        loading: false,
      };
    default:
      return {
        response: null,
        error: null,
        loading: false,
      };
  }
}

/**
 * Custom response data handler logic
 *
 * @param {object} response - response data returned by request
 * @return {object} data or error according to status code
 */
function handleResponse(response: AxiosResponse) {
  const { data } = response;
  // Please modify the status key according to your business logic
  // normally the key is `status` or `code`
  if (data.status) {
    return { data: data.entry };
  } else {
    const error = new Error(data.message || '后端接口异常');
    return { error };
  }
}

/**
 * 错误信息展示
 *
 * @param {string} errorMessage - error message
 */
function showError(errorMessage: string) {
  message.error(errorMessage);
}
