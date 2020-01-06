/* eslint no-restricted-globals:0 */
export enum Env {
    Dev = 'dev',
    Daily = 'daily',
    Prod = 'prod',
}

export const current = /auraxy\.com$/i.test(location.hostname) ? Env.Prod : (
    /* eslint no-restricted-globals:0 */
    /^(localhost|127\.\d+\.\d+\.\d+|0\.0\.0\.0|192\.\d+\.\d+\.\d+)$/.test((window as any).location.hostname) ?
        Env.Dev :
        Env.Daily
);

export const baseUrl = {
    [Env.Daily] : "https://adproxy.yipiaoyun.cn",
    // [Env.Dev] : "http://192.168.0.17:8081",
    [Env.Dev] : "https://adproxy.yipiaoyun.cn", 
    [Env.Prod] : "https://adproxy.yipiaoyun.com"
}