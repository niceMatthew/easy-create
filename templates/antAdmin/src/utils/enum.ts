export enum SmsType {
    REGISTER = 'REGISTER',
    LOGIN = 'LOGIN',
    CHANGE_PHONE = 'CHANGE_PHONE',
    RESET_PASSWORD = 'RESET_PASSWORD'
}

export enum DirectBtnType {
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    RESET = 'RESET'
}
export enum BasicCompanyStatus {
    DRAFT = 'DRAFT',
    CHECKING = 'CHECKING',
    CHECK_SUCCESS = 'CHECK_SUCCESS',
    CHECK_FAILURE = 'CHECK_FAILURE',
    INVALID = 'INVALID'
}
export enum BasicCompanyType {
    PERSONAL = 'PERSONAL',
    COMPANY = 'COMPANY'
}

export default {
    SmsType,
    DirectBtnType,
    BasicCompanyStatus
}