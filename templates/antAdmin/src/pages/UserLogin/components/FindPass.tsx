import React, { useState } from 'react';
import { Form, Icon, Input, Button, Row, Col, message} from 'antd';
import IconPhone from './iconPhone'
import IconPass from './iconPass'
import IconMsm from './iconMsm'
import Validate from './LSM'
import CountBtn from './CountBtn'
import api from '@/services/service'
import {SmsType} from '../../../utils/enum';
import {phoneRule ,checkStrong} from '../../../utils/validate'
import { DirectBtnType } from '../../../utils/enum';
import DirectBtn from './DirectBtn'

import Styles from './index.module.scss';

let isAble = true;

function Register(props: any) {
    const [showcode , setShowcode] = useState(''); 
    const [confirmDirty ,setConfirmDirty] = useState(false);
    const [showsmsInput , setShowsmsInput] = useState(false);
    function handleSubmit(e: any){
        e.preventDefault();
        props.form.validateFields(async (err: any, values: any) => {
          if (!err) {
            const res = await api.resetByCode({
                code: values.code,
                password: values.password,
                phone: values.phone
            })
            if(res.apiResponse.status) {
                message.success("重置密码成功");
                props.changeLogin()
            }
          }
        });
    }
    const handleConfirmBlur =  (e: any) => {
        const value = props.form.getFieldValue("confirm");
        setConfirmDirty(confirmDirty || !value)
    }
    function SetToken(res:string) {
       if(res) {
           setShowcode(res);
           if(!showsmsInput) {setShowsmsInput(true)}
       }
    }

    function sendsms (fcb: any ,countDown: boolean){
        props.form.validateFields(['userName','phone'],async (err: any, values: any) => {
            if(countDown && !err && isAble) {
                if(!showcode) {
                    message.error("请先进行人机识别")
                    return ;
                }
                isAble = false;
                const res = await api.sendSms({
                    phone : values.phone,
                    type: SmsType.RESET_PASSWORD,
                    code: showcode
                });
                isAble = true;
                if( (res as any).message) {
                    setShowcode("");
                    if((window as any).LUOCAPTCHA) {(window as any).LUOCAPTCHA.reset()}
                } else{
                    fcb()
                }
            }
        })
    }

    const compareToFirstPassword = (rule: any, value: any, callback: any) => {
        const form = props.form;    
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的新密码不一致');
        } else {
          callback();
        }
      }
    
    const validateToNextPassword = (rule: any, value: any, callback: any) => {
        const form = props.form;
        if(value && checkStrong(value) < 2) {
            callback('密码需包含大小写字母、数字、特殊字符中的两种')
        }  
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    

    const { getFieldDecorator } = props.form;
    return <div>
              <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('phone', {
                        rules: [
                            { required: true, message: '请填写手机号!' },
                            { pattern: phoneRule, message: '请填写正确的手机号格式', trigger: 'blur'}
                        ],
                    })(
                        <Input autoComplete="false" size="large" prefix={<Icon component={IconPhone} />} placeholder="手机" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Validate success={SetToken} />
                </Form.Item>
                {
                    showsmsInput && (
                        <>
                            <Form.Item>
                                <Row gutter={8}>
                                    <Col span={16}>
                                        {getFieldDecorator('code', {
                                            rules: [{ required: true, message: '请填写验证码!' }],
                                        })(
                                            <Input autoComplete="false" size="large" prefix={<Icon component={IconMsm} />} placeholder="验证码" />
                                        )}
                                    </Col>
                                    <Col span={8}>
                                        <CountBtn onClick={sendsms} />
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [
                                        { required: true, message: '请填写密码!' }, 
                                        { min: 8, message: '密码至少8位字符' },
                                        {
                                          validator: validateToNextPassword
                                        }],
                                    validateFirst: true
                                })(
                                    <Input autoComplete="off" size="large" prefix={<Icon component={IconPass} />} type="password" placeholder="设置密码" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('confirm', {
                                    rules: [
                                        { required: true, message: '请填写密码!' },
                                        { min: 8, message: '密码至少8位字符' },
                                        {
                                          validator: compareToFirstPassword,
                                        }],
                                    validateFirst: true
                                })(
                                    <Input autoComplete="false" size="large" onBlur={(e: any) => handleConfirmBlur.bind(e)} prefix={<Icon component={IconPass} />} type="password" placeholder="确定密码" />
                                )}
                            </Form.Item>
                        </>
                    )
                }
                <Form.Item>
                <Button size="large" disabled={!showcode} type="primary" block={true} htmlType="submit" className="login-form-button">
                    确定
                </Button>
                </Form.Item>
            </Form>
            <div className={Styles.pt10}>
                <DirectBtn type={DirectBtnType.RESET} />
            </div>
    </div>
}

export default Form.create()(Register);