import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { storage } from '@/utils/storage';
import { Form, Icon, Input, Button} from 'antd';
import DirectBtn from './DirectBtn'
import { DirectBtnType } from '../../../utils/enum';
import IconPhone from './iconPhone'
import IconPass from './iconPass'
import {loginHook} from '@/api/common/base'
import api from '@/services/service'


import { setAuthority } from '../../../utils/authority';
import {phoneRule ,checkStrong} from '../../../utils/validate';

import { useCenter } from "@/api/common";


function PassLogin(props: any) {

    const { LoginApi, response,  request: loginRequest } = useCenter(loginHook.Login);
    const history = useHistory();

    useEffect(() => {
        console.log('response', response)
    }, [response])

    function handleSubmit(e: any){
        e.preventDefault();
        props.form.validateFields(async (err: any, values: any) => {
          if (!err) {
            const res = await api.loginByPassword({
                    phone: values.phone,
                    password: values.password 
            },{forceParamsOnUrl:true});

            // 如果登录失败
            if (!res.apiResponse.status) {
                return;
            }

            if(res.entry.token) {
                setAuthority('user');
                storage.buildToken.set(res.entry.token);
                
                sessionStorage.setItem('userInfo', JSON.stringify(res.entry));
                history.push('/account');
            }
          }
        });
    }
    
    const validatePass = (rule: any, value: any, callback: any) => {
        if(value && checkStrong(value) < 2) {
            callback('密码需包含大小写字母、数字、特殊字符中的两种')
        } 
        callback();
    }
    const { getFieldDecorator } = props.form;


    return <div>
              <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                {getFieldDecorator('phone', {
                    rules: [
                        { required: true, message: '请输入你的手机号' },
                        { pattern: phoneRule, message: '请填写正确的手机号格式', trigger: 'blur'}
                    ],
                    validateFirst: true
                })(
                    <Input autoComplete="false" size="large" prefix={<Icon component={IconPhone} />} placeholder="手机" />
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入你的密码!' },
                            { min: 8, message: '密码至少8位字符' },
                            { max: 64, message: '密码至多64位字符'},
                            {
                              validator: validatePass
                            }],
                    validateFirst: true
                })(
                    <Input autoComplete="false" size="large" prefix={<Icon component={IconPass} />} type="password" placeholder="密码" />
                )}
                </Form.Item>
                <Form.Item>
                <DirectBtn type={DirectBtnType.LOGIN} />
                <Button size={'large'} type="primary" block={true} htmlType="submit" className="login-form-button">
                    登录 
                </Button>
                </Form.Item>
            </Form>
    </div>
}

export default Form.create()(PassLogin);