import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';
import service from '@/services/accoutService';
import styles from './Account.module.scss';
import EditName from './component/EditName';
import EditPhone from './component/EditPhone';
import EditPassword from './component/EditPassword';
import UnBindEmail from './component/UnBindEmail';

export interface IuserInfo {
    name: string
    phone: string
    companyBound: boolean | null
    companyName: string
}

const Account: React.FC = () => {

    const [ nameVisible, setNameVisible ] = useState(false);
    const [ phoneVisible, setPhoneVisible ] = useState(false);
    const [ passwordVisible, setPasswordVisible ] = useState(false);
    const [ bindTipsVisible, setBindTipsVisible ] = useState(false);
    const [ userInfo, setUserInfo ] = useState<IuserInfo>({ name: '', phone: '', companyBound: null, companyName: '' });

    // 获取登陆用户信息
    useEffect(() => {
        getUserInfo();
    }, []);

    // 获取用户信息
    const getUserInfo = async () => {
        const result = await service.getUserInfo({});

        if (result.apiResponse.status) {
            setUserInfo(result.entry);
            if (result.entry.companyBound) {
                setBindTipsVisible(false);
            } else {
                setBindTipsVisible(true);
            }
        }
    }

    // 关闭Modal框
    const closeModal = () => {
        setNameVisible(false);
        setPhoneVisible(false);
        setPasswordVisible(false);
        setBindTipsVisible(false);
    }

    // 重置名称
    const resetName = (name: string) => {
        const obj = {
            ...userInfo,
            name
        }
        setUserInfo(obj);
        sessionStorage.setItem('userInfo', JSON.stringify(obj));
    }

    // 重置手机号
    const resetPhone = (phone: string) => {
        const obj = {
            ...userInfo,
            phone
        }
        setUserInfo(obj);
        sessionStorage.setItem('userInfo', JSON.stringify(obj));
    }

    return (
        <div className = { styles.accountWrap }>
            {
                userInfo.companyBound === null
                ? ''
                : userInfo.companyBound 
                    ? <Alert 
                        message = "恭喜！企业信息已绑定完成"
                        type = "success"
                        showIcon
                        closable></Alert>
                    : <Alert 
                        message = "请把手机号告诉业务员，以绑定企业数据"
                        type = "warning"
                        showIcon
                        closable></Alert>
            }
            <div className = { styles.bodyWrap }>
                <div className = { styles.contentWrap }>
                    {
                        !userInfo.companyBound 
                        ? ''
                        : <>
                            <h2 className = { styles.header }>账户管理</h2>
                            <div className = { styles.companyName }>公司名称: { userInfo.companyName}</div>
                        </>
                    }
                    <div className = { styles.msgItem }>
                        <span>姓名:  { userInfo.name }</span>
                        <span
                            onClick = { () => setNameVisible(true) }  
                            className = { styles.editIcon }></span>
                    </div>
                    <div className = { styles.msgItem }>
                        <span>手机号:  { userInfo.phone }</span>
                        <span 
                            onClick = { () => setPhoneVisible(true) }  
                            className = { styles.editIcon }></span>
                    </div>
                    <div className = { styles.msgItem }>
                        <span>密码:  *****************</span>
                        <span
                            onClick = { () => setPasswordVisible(true) }   
                            className = { styles.editIcon }></span>
                    </div>
                    <EditName 
                        visible = { nameVisible }
                        resetName = { resetName }
                        onClose = { closeModal }
                        userInfo = { userInfo }/>
                    <EditPhone 
                        visible = { phoneVisible }
                        resetPhone = { resetPhone }
                        onClose = { closeModal }/>
                    <EditPassword 
                        visible = { passwordVisible }
                        onClose = { closeModal }/>
                </div>
                <UnBindEmail 
                    visible = { bindTipsVisible }
                    onClose = { closeModal }
                    userInfo = { userInfo }/>
            </div>
        </div>
    )
}

export default Account;