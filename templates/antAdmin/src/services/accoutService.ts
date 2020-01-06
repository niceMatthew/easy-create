import { IAPIParams, IAPIResult, generateAPI } from '@/utils/service/resource';
import { SmsType } from '@/utils/enum';

export interface IeditNameParams {

}

export interface IsendCode {
    phone: string
    type: SmsType
}

export interface IconfirmCode {
    phone: string
    type: SmsType
    code: string
}

export interface IbindPhone {
    phone: string
    code: string
}

export interface IeditPassword {
    newPwd: string
    oldPwd: string
}

export default {
    // 修改名称
    editName: generateAPI<IeditNameParams, IAPIResult>('post', '/parasitifer/edit_name'),

    // 发送验证码
    sendCode: generateAPI<IsendCode, IAPIResult>('post', '/parasitifer/common/send_code'),

    // 确认验证码
    confirmCode: generateAPI<IconfirmCode, IAPIResult>('post', '/parasitifer/common/confirm_code'),

    // 绑定手机
    bindPhone: generateAPI<IbindPhone, IAPIResult>('post', '/parasitifer/bind_phone'),

    // 修改密码
    editPassword: generateAPI<IeditPassword, IAPIResult>('post', '/parasitifer/reset_pwd'),

    // 获取用户信息
    getUserInfo: generateAPI<any, IAPIResult>('get', '/parasitifer/info')
}