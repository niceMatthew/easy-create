import { IAPIParams, IAPIResult, generateAPI } from '@/utils/service/resource';

import { SmsType, BasicCompanyStatus, BasicCompanyType } from '../utils/enum'
export interface IgetSendSmsParam {
    phone: string,
    type: SmsType,
    code: string
}

export interface IgetLoginParam {
    "name": string,
    "password": string,
    //   "type": "AdAccount"|"Admin"
}

export interface IoutLoginParam {
    "token": string
}

export interface IregisterParam {
    code: string,
    name: string,
    password: string,
    phone: number
}

export interface IresetByCode {
    code: string,
    password: string,
    phone: number
}

export interface IloginByPassword {
    password: string,
    phone: string
}

export interface IloginByCode {
    phone: string,
    code: string
}
export interface IoutStsParam extends IAPIResult {
    ossBucketDomain: string,
    response: {
        assumedRoleUser: {
            "arn": string,
            "assumedRoleId": string
        },
        credentials: {
            "accessKeyId": string,
            "accessKeySecret": string,
            "expiration": string,
            "securityToken": string
        }
    }
}

export interface IgetVideoParam {
    'file-name': string
}




export default {
    // 发送短信验证码
    sendSms: generateAPI<IgetSendSmsParam, IAPIResult>('post', '/parasitifer/common/send_confirm_code'),
    // 注册
    register: generateAPI<IregisterParam, IAPIResult>('post', '/parasitifer/register'),
    // 密码登录
    loginByPassword: generateAPI<IloginByPassword, IAPIResult>('post', '/parasitifer/login_pwd'),
    // 短信验证码登录
    loginByCode: generateAPI<IloginByCode, IAPIResult>('post', '/parasitifer/login_code'),
    // 重置密码
    resetByCode: generateAPI<IresetByCode, IAPIResult>('post', '/parasitifer/reset_by_code'),
    /** 广告主 */
    // 广告主登陆
    advertiserLogin: generateAPI<IgetLoginParam, IoutLoginParam>('post', '/advertiser/login'),
    // 短信登录
    advertiserLoginByCode: generateAPI<IgetLoginParam, IoutLoginParam>('post', '/advertiser/login'),
}

