import React, { useState, useEffect } from 'react';
import { Modal, Input, message } from 'antd';
import styles from './EditName.module.scss';
import { IuserInfo } from '../Account';
import service from '@/services/accoutService';

interface Iprops {
    visible: boolean
    userInfo: IuserInfo
    resetName: (name: string) => void
    onClose: () => void
}

const EditName: React.FC<Iprops> = (props: Iprops) => {

    const { visible, onClose, userInfo, resetName } = props;
    const [ userName, setUserName ] = useState();

    useEffect(() => {
        setUserName(userInfo.name);
    }, [ userInfo ]);

    const confirm = async () => {
        if (!validate()) {
            return;
        }
        const res = await service.editName({
            name: userName
        }, {forceParamsOnUrl:true});
        
        if (res.apiResponse.status) {
            message.success('操作成功');
            resetName(userName);
            onClose();
        }
    }

    const inputChange = (e: any) => {
        const value = e.target.value;
        setUserName(value);
    }

    // 校验
    const validate = () => {
        if (!userName) {
            message.error('姓名不能为空');
            return false;
        } else if (userName.length > 20 || userName.length < 2) {
            message.error('姓名不能小于2个字符，或大于20个字符');
            return false;
        }
        return true;
    }

    return (
        <Modal
            className = { styles.modalWrap }
            width = "400px"
            visible = { visible }
            footer = { null }
            onCancel = { onClose }
            destroyOnClose = { true }>
            <h1 className = { styles.moduleHeader }>修改姓名</h1>
            <Input 
                defaultValue = { userName } 
                onChange = { inputChange }/>
            <div 
                onClick = { confirm }
                className = { styles.confirmBtn }>确定</div>
        </Modal>
    )
}

export default EditName;