
import React, { useState } from 'react';
import { useCountDown } from '@/utils/hooks/customHooks';
import { Modal, Input, message } from 'antd';
import accountService from '@/services/accoutService';
import styles from './EditPhone.module.scss';
import { SmsType } from '@/utils/enum';

let isAble = true;

interface Istep1Props {
    jumpStep: () => void
}

let timer: any;

// 验证原手机号
const Stpe1: React.FC<Istep1Props> = (props: Istep1Props) => {

    const { jumpStep } = props;
    const [ phone, setPhone ] = useState('');
    const [ code, setCode ] = useState('');

    // 自定义倒计时hook
    const { second, start } = useCountDown(60);

    // 电话号码改变事件
    const phoneChange = (e: any) => {
        const value = e.target.value;
        setPhone(value);
    }

    // 验证码改变事件
    const codeChange = (e: any) => {
        const value = e.target.value;
        setCode(value);
    }

    // 发送验证码
    const send = async () => {

        // 60秒内只能发送一次
        if (validate() && second === 60 && isAble) {
            isAble = false;
            const result = await accountService.sendCode({ phone, type: SmsType.CHANGE_PHONE });
            if (result.apiResponse.status) {
                start();
            }
            isAble = true;
        }
    }

    // 校验手机号
    const validate = () => {
        if(!(/^1[3456789]\d{9}$/.test(phone))){ 
            message.error('手机号不合法')
            return false; 
        } 
        return true;
    }

    // 下一步
    const nextStep = async () => {
        const res = await accountService.confirmCode({
            phone,
            type: SmsType.CHANGE_PHONE,
            code
        });

        if (res.apiResponse.status) {
            jumpStep();
        }
    }

    return (
        <div>
            <h1 className = { styles.moduleHeader }>验证原手机号</h1>
            <Input 
                placeholder = "原手机"
                onChange = { phoneChange }/>
            <div className = { styles.validateWrap }>
                <span className = { styles.validateInput }>
                    <Input
                        placeholder = "验证码"
                        onChange = { codeChange }/>
                </span>
                <span
                    onClick = { send }  
                    className = { styles.validateBtn }>{ second === 60 ? '获取验证码' : `${ second }s` }</span>
            </div>
            <div 
                onClick = { nextStep }
                className = { styles.confirmBtn }>下一步</div>
        </div>
    )
}

interface Istep2Props {
    resetPhone: (phone: string) => void
    confirmSuccss: () => void
}

// 绑定新手机号
const Stpe2: React.FC<Istep2Props> = (props: Istep2Props) => {

    const { confirmSuccss, resetPhone } = props;
    const [ phone, setPhone ] = useState('');
    const [ code, setCode ] = useState('');

    // 自定义倒计时hook
    const { second, start } = useCountDown(60);

    // 电话号码改变事件
    const phoneChange = (e: any) => {
        const value = e.target.value;
        setPhone(value);
    }

    // 验证码改变事件
    const codeChange = (e: any) => {
        const value = e.target.value;
        setCode(value);
    }

    // 发送验证码
    const send = async () => {

        // 60秒内只能发送一次
        if (validate() && second === 60 && isAble) {
            start();
            isAble = false;
            await accountService.sendCode({ phone, type: SmsType.CHANGE_PHONE });
            isAble = true;
        }
    }

    // 校验手机号
    const validate = () => {
        if(!(/^1[3456789]\d{9}$/.test(phone))){ 
            message.error('手机号不合法')
            return false; 
        } 
        return true;
    }

    // 确定
    const confirm = async () => {
        const res = await accountService.bindPhone({
            phone,
            code
        });
        if (res.apiResponse.status) {
            resetPhone(phone);
            message.success('操作成功');
            confirmSuccss();
        }
    }

    return (
        <div>
            <h1 className = { styles.moduleHeader }>绑定新手机号</h1>
            <Input 
                placeholder = "新手机"
                onChange = { phoneChange }/>
            <div className = { styles.validateWrap }>
                <span className = { styles.validateInput }>
                    <Input
                        placeholder = "验证码"
                        onChange = { codeChange }/>
                </span>
                <span
                    onClick = { send }  
                    className = { styles.validateBtn }>{ second === 60 ? '获取验证码' : `${ second }s` }</span>
            </div>
            <div 
                onClick = { confirm }
                className = { styles.confirmBtn }>确定</div>
        </div>
    )
}

interface Iprops {
    visible: boolean
    resetPhone: (phone: string) => void
    onClose: () => void
}

const EditPhone: React.FC<Iprops> = (props: Iprops) => {

    const { visible, onClose, resetPhone } = props;
    const [ step, setStep ] = useState(1);

    const jumpStep = () => {
        setStep(2);
    }

    return (
        <Modal
            className = { styles.modalWrap }
            width = "400px"
            visible = { visible }
            footer = { null }
            onCancel = { onClose }
            destroyOnClose = { true }>
            {
                step === 1
                ? <Stpe1 
                    jumpStep = { jumpStep }/>
                : <Stpe2 
                    resetPhone = { resetPhone }
                    confirmSuccss = { onClose }/>
            }
        </Modal>
    )
}

export default EditPhone;