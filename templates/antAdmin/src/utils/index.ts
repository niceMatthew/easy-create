import {BasicCompanyStatus} from '../utils/enum'
export function Post(URL:string, PARAMTERS:{[k:string]:any}){
    // 创建form表单
    const tempForm = document.createElement("form");
    tempForm.action = URL;
    // 如需打开新窗口，form的target属性要设置为'_blank'
    tempForm.target = "_self";
    tempForm.method = "post";
    tempForm.style.display = "none";
    // 添加参数
    for (const item in PARAMTERS) {
        const opt = document.createElement("textarea");
        opt.name = item;
        opt.value = PARAMTERS[item];
        tempForm.appendChild(opt);
    }
    document.body.appendChild(tempForm);
    // 提交数据
    tempForm.submit();
}
// 将毫分转成元
export function revertMilliCentToYuan(val:number) {
    return (val/100/1000).toFixed(2);
}

export function  RevertYuanToMilliCent(val:number) {
    return val*100*1000;
}
export function changeIncomeToNum (val: number) {
    let realVal: number = 0;
    switch (val) {
        case 0:  realVal = 0; break;
        case 25000: realVal = 9; break;
        case 35000: realVal = 18; break;
        case 55000: realVal = 27; break;
        case 70000:  realVal = 36; break;
        case 95000: realVal = 45; break;
        case 120000: realVal = 54; break;
        case 180000: realVal = 63; break;
        case 240000: realVal = 72; break;
        case 360000: realVal = 81; break;
        case 1000000:  realVal = 90; break;
        case 10000000:  realVal = 100; break;
    }
    return realVal;
}
 export function changeNumToIncome(val: number) {
    let realNum = 0;
    switch (val){
      case 0:  realNum = 0; break;
      case 9:  realNum = 2.5 * 10000; break;
      case 18:  realNum = 3.5 * 10000; break;
      case 27:  realNum = 5.5 * 10000; break;
      case 36:  realNum = 7 * 10000; break;
      case 45:  realNum = 9.5 * 10000; break;
      case 54:  realNum = 12 * 10000; break;
      case 63:  realNum = 18 * 10000; break;
      case 72:  realNum = 24 * 10000; break;
      case 81:  realNum = 36 * 10000; break;
      case 90:  realNum = 100 * 10000; break;
      case 100:  realNum = 1000 * 10000; break;
    }
    return realNum
}

export function revertTo24Hour(val:number[]):string[] {
    const newValue = []
    for(const item of val) {
        newValue.push(item <= 9  ? "0"+item+":00" : item+":00" )
    }
    return newValue;
}
// 对象全等判断
export function objectEquals(x: any, y: any): any {
    if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
    if (x.constructor !== y.constructor) { return false; }
    if (x instanceof Function) { return x === y; }
    if (x instanceof RegExp) { return x === y; }
    if (x === y || x.valueOf() === y.valueOf()) { return true; }
    if (Array.isArray(x) && x.length !== y.length) { return false; }
    if (x instanceof Date) { return false; }
    if (!(x instanceof Object)) { return false; }
    if (!(y instanceof Object)) { return false; }
    const p = Object.keys(x);
    return Object.keys(y).every( (i) => p.indexOf(i) !== -1 ) &&
        p.every( (i) => objectEquals(x[i], y[i]) );
}

// 获取字符串的字符长度
export function getCharacterLength(value: string){
    let len:number = 0;    
    for (let i=0; i<value.length; i++) {    
        if (value.charCodeAt(i)>127 || value.charCodeAt(i)===94) {    
            len += 2;    
        } else {    
            len ++;    
        }    
    }    
    return len;    
}
// 无需token校验的白名单判断
export function isWhiteList(str: any) {
    return /register|login|FindPass|auth/i.test(str);
}
/**
 * 把手机号码去除隐私信息
 * @param phone 
 */
export function formatSecretPhone(phone: string) {
    let secretPhone = '';
    if (!phone) {
      secretPhone = phone;
    } else {
      secretPhone = phone.substr(0,3) + '****' + phone.substr(7,4);
    }
    return secretPhone;
  }
// 主体状态的转化
export function formatBasicCompanyStatus(val: BasicCompanyStatus) {
let formatVal: string = '';
switch(val) {
    case BasicCompanyStatus.DRAFT: formatVal = '草稿'; break;
    case BasicCompanyStatus.CHECKING: formatVal = '未生效'; break;
    case BasicCompanyStatus.CHECK_SUCCESS: formatVal = '使用中'; break;
    case BasicCompanyStatus.CHECK_FAILURE: formatVal = '未生效'; break;
    case BasicCompanyStatus.INVALID: formatVal = '已失效'; break;
}
return formatVal;
}
// 年收入滑块提示
export function incomeToast(val: number[]){
    let toastVal: string = '不限';
    if(val[0] ===  val[1]) {
        toastVal = '选择一个区间'
    } else if(val[0] === 0 && val[1] === 100) {
        toastVal = '不限'
    } else if(val[0] === 0 && val[1] !== 100) {
        toastVal = `${changeNumToIncome(val[1])/10000}万元以下`
    } else if(val[0] !== 0 && val[1] === 100) {
        toastVal = `${changeNumToIncome(val[0])/10000}万元以上`
    } else {
        toastVal =`${changeNumToIncome(val[0])/10000}-${changeNumToIncome(val[1])/10000}万元`
    }
    return toastVal
}
// 年龄滑块提示
export function ageToast(value:number[]) {
    let toastVal: string= '不限'
    if(value[0] === 0 && value[1] === 100) {
        toastVal = '不限'
    } else if(value[0] === 12 && value[1] === 60) {
        toastVal = '不限'
    } else if(value[0] === 12 && value[1] !== 60) {
        toastVal = `${value[1]}岁以下`
    } else if(value[0] !== 12 && value[1] === 60) {
        toastVal = `${value[0]}岁以上`
    } else {
        toastVal =`${value[0]}-${value[1]}岁`
    }
    return toastVal;
}
