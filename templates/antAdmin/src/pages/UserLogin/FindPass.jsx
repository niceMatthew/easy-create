import React, {useState} from 'react';
import { Tabs ,Icon ,Button } from 'antd';
import Container from './Container'
import PassLogin from './components/FindPass'
import Styles from "./Login.module.scss"

export default function UserContainer(props) {
    const [isFindPass ,setIsFindPass] = useState(true)
    const TabPane = Tabs.TabPane; 
    function changeLogin() {
        setIsFindPass(false)
    }
    return <Container showTitle={!isFindPass}>
        {isFindPass ?
        <div className={Styles.LoginForm}>
            <Tabs tabBarStyle={{color:"rgba(191,191,191,1)"}} defaultActiveKey="1">
                <TabPane tab="找回密码" key="1">
                    <PassLogin changeLogin={changeLogin} />
                </TabPane>
            </Tabs>
        </div>
        :
        <div style={{'display': 'flex' ,'flex-direction': 'column', 'align-items': 'center'}} >
            <Icon type="check-circle" theme="filled" style={{fontSize:"80px",color:"#52C41A"}} />
            <div style={{marginTop:"40px",marginBottom:"60px", fontSize: "20px",fontWeight: "500"}} className={Styles.loginText}>重置密码成功，请使用新密码登录</div>
            <a href="/user/login">
                <Button size="large" type="primary" block={true}>马上登录</Button>
            </a>
        </div>
        }
    </Container>
}