import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import service from '@/services/accoutService';
import styles from './EditPassword.module.scss';
import { checkStrong } from '@/utils/validate';

interface Iprops {
    visible: boolean
    onClose: () => void
}

const EditPassword: React.FC<Iprops> = (props: Iprops) => {

    const { visible, onClose } = props;
    const [ oldPwd, setOld ] = useState('');
    const [ newPwd, setNew ] = useState('');

    const confirm = async () => {
        if (validate()) {
            const res = await service.editPassword({
                oldPwd,
                newPwd
            });
            if (res.apiResponse.status) {
                message.success('操作成功');
                onClose();
            }
        }
    }

    // 校验新旧密码
    const validate = () => {
        if (oldPwd === '') {
            message.error('旧密码不能为空');
            return false;
        } else if (newPwd === '') {
            message.error('新密码不能为空');
            return false
        } else if (newPwd.length < 8) {
            message.error('新密码不能少于8位');
            return false;
        } else if (checkStrong(newPwd) < 2) {
            message.error('密码需包含大小写字母，数字，特殊字符中的两种');
            return false;
        }
        return true
    }

    // 原密码改变
    const oldChange = (e: any) => {
        const value = e.target.value;
        setOld(value);
    }

    // 新密码改变
    const newChange = (e: any) => {
        const value = e.target.value;
        setNew(value);
    }

    return (
        <Modal
            className = { styles.modalWrap }
            width = "400px"
            visible = { visible }
            footer = { null }
            onCancel = { onClose }
            destroyOnClose = { true }>
            <h1 className = { styles.moduleHeader }>修改密码</h1>
            <Input 
                type = "password"
                placeholder = "原密码"
                onChange = { oldChange }/>
            <Input 
                className = { styles.mt20 }
                type = "password"
                placeholder = "新密码"
                onChange = { newChange }/>
            <div 
                onClick = { confirm }
                className = { styles.confirmBtn }>确定</div>
        </Modal>
    )
}

export default EditPassword;