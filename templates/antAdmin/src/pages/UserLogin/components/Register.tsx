import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col, message} from 'antd';
import IconPhone from './iconPhone'
import IconPass from './iconPass'
import IconPerson from './iconPerson'
import IconMsm from './iconMsm'
import Validate from './LSM'
import CountBtn from './CountBtn'
import api from '@/services/service'
import {SmsType} from '../../../utils/enum';
import DirectBtn from './DirectBtn';
import {phoneRule ,checkStrong, validateName} from '../../../utils/validate';
import {DirectBtnType} from '../../../utils/enum';

import Styles from './index.module.scss';

function Register(props: any) {
    const [showcode , setShowcode] = useState('');
    const [showsmsInput , setShowsmsInput] = useState(false);
    const history = useHistory();

    function handleSubmit(e: any){
        e.preventDefault();
        props.form.validateFields(async (err: any, values: any) => {
          if (!err) {
            console.log('Received values of form: ', values);
            const res = await api.register({
                code: values.code,
                name: values.name,
                password: values.password,
                phone: values.phone
            })
            
            if (res.apiResponse.status) {
                history.push('/user/login');
            }
          }
        });
    }
    function SetToken(res:string) {
       if(res) {
           setShowcode(res);
           if(!showsmsInput) {setShowsmsInput(true)}
       }
    }

    function sendsms (fcb: any ,countDown: any){
        props.form.validateFields(['userName','phone'],async (err: any, values: any) => {
            if(showcode){
                if(countDown && !err) {
                    const res = await api.sendSms({
                        phone : values.phone,
                        type: SmsType.REGISTER,
                        code: showcode
                    });
                    if((res as any).message) {
                        setShowcode("");
                       if((window as any).LUOCAPTCHA) {(window as any).LUOCAPTCHA.reset()}
                    } else{
                        fcb()
                    }
                }
            } else {
                message.error("请先进行人机识别")
            }
        })
    }
    const validatePass = (rule: any, value: any, callback: any) => {
        if(value && checkStrong(value) < 2) {
            callback('密码需包含大小写字母、数字、特殊字符中的两种')
        } 
        callback();
    }

    const { getFieldDecorator } = props.form;
    console.log('页面不刷新，测试log')
    return <div className={Styles.pt32}>
              <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入你的姓名' }, 
                            { pattern: validateName, message: '姓名长度不能大于20，小于2', trigger: 'blur'}],
                })(
                    <Input size="large" prefix={<Icon component={IconPerson} />} placeholder="姓名" />
                )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请填写手机号!' },
                                { pattern: phoneRule, message: '请填写正确的手机号格式', trigger: 'blur'}],
                    })(
                        <Input size="large" prefix={<Icon component={IconPhone} />} placeholder="手机" />
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
                                            validateFirst: true
                                        })(
                                            <Input size="large" prefix={<Icon component={IconMsm} />} placeholder="验证码" />
                                        )}
                                    </Col>
                                    <Col span={8}>
                                        <CountBtn onClick={sendsms} />
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请填写密码!' },
                                    { min: 8, message: '密码至少8位字符' },
                                    { max: 64, message: '密码至多64位字符'},
                                    {
                                        validator: validatePass
                                    }],
                                    validateFirst: true
                                })(
                                    <Input size="large" prefix={<Icon component={IconPass} />} type="password" placeholder="8-64位密码，字母/数字/符号至少2种" />
                                )}
                            </Form.Item>
                        </>
                    )
                }
                <Form.Item>
                <DirectBtn type={DirectBtnType.REGISTER} />
                <Button size="large" disabled={!showcode} type="primary" block={true} htmlType="submit" className="login-form-button">
                    一键注册
                </Button>
                </Form.Item>
            </Form>
    </div>
}

export default Form.create()(Register);