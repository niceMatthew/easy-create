import {getCharacterLength} from './index'
export function checkStrong(sValue:string):number {
    let modes = 0;
    // 正则表达式验证符合要求的
    if (sValue.length < 1) {return modes}
    if (/\d/.test(sValue)) { modes++ } // 数字
    if (/[a-zA-Z]/.test(sValue)) { modes++ } // 小写
    if (/\W/.test(sValue)) { modes++ } // 特殊字符
   // 逻辑处理
    switch (modes) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 3:
        case 4:
            return sValue.length < 12 ? 3 : 4
        default:
            return 4;
    }
}

export const phoneRule = /^1[3456789]\d{9}$/

export function validateName(rule: any, values: string, callback: any) {
    if(!values){
      callback('请填写姓名')
    } else {
      if(values.trim().length < 2) {
        callback('姓名至少为2个字符')
      } else {
        if(getCharacterLength(values.trim()) >  20) {
          callback('姓名长度不能超过10个汉字或20个英文字符')
        }
      }
    }
    callback()
}
export function validateCompanyName(rule: any, values: string, callback: any) {
    if(!values){
      callback('请填写公司名称')
    } else {
        if(!values.trim()) {
            callback('请填写公司名称')
        }
        if(getCharacterLength(values.trim()) >  100) {
          callback('公司名称长度不能超过50个汉字或100个英文字符')
        }
    }
    callback()
}