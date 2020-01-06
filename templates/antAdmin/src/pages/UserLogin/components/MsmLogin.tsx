import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col, message} from 'antd';
import api from '@/services/service'
import { setAuthority } from '../../../utils/authority';
import { storage } from '@/utils/storage';
import {SmsType ,DirectBtnType} from '../../../utils/enum';
import IconPhone from './iconPhone'
import IconMsm from './iconMsm'
import Validate from './LSM'
import CountBtn from './CountBtn'
import DirectBtn from './DirectBtn'
import {phoneRule } from '../../../utils/validate'

// 防止多次重复点击获取验证码
let isAble = true;

function PassLogin(props: any) {
    const [showcode ,setShowcode ] = useState(''); 
    const [showsmsInput , setShowsmsInput] = useState(false);
    const history = useHistory();

    function handleSubmit(e: any){
        e.preventDefault();
        props.form.validateFields(async (err: any, values: any) => {
          if (!err) {
            console.log('Received values of form: ', values);
            const res = await api.loginByCode({
                phone: values.phone,
                code: values.code 
            },{forceParamsOnUrl:true});

            // 验证失败
            if (!res.apiResponse.status) {
                return;
            } 

            if((res as any).entry.token) {
                storage.buildToken.set(res.entry.token);
                 /* eslint no-restricted-globals:0 */
                history.push('/account');
            }
          }
        });
    }
    function SetToken(res:string) {
        if(res) {
            setShowcode(res);
            props.setHeight(false)
            if(!showsmsInput) { setShowsmsInput(true) }
        }
    }

    function sendsms (fcb : any, countDowns: any){
        props.form.validateFields(['phone'],async (err: any, values: any) => {
            if(countDowns && !err && isAble) {
                if(!showcode) {
                    message.error("请先进行人机识别")
                    return ;
                }
                isAble = false;
                const res = await api.sendSms({
                    phone : values.phone,
                    type: SmsType.LOGIN,
                    code: showcode
                });
                isAble = true;

                if((res as any).message) {
                    setShowcode("");
                    if((window as any).LUOCAPTCHA) {(window as any).LUOCAPTCHA.reset()}
                    console.log('reset')
                } else{
                    fcb()
                }
            }         
        })
    }

    function countDown() {
        // console.log(12324)
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
                                            <Input autoComplete="false" size="large" prefix={<Icon component={IconMsm} />} placeholder="验证码" />
                                        )}
                                    </Col>
                                    <Col span={8}>
                                        <CountBtn countDown={countDown} onClick={sendsms} />
                                    </Col>
                                </Row>
                            </Form.Item>
                        </>
                    )
                }
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