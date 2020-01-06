import React,{useState} from 'react';
import { Tabs } from 'antd';
import Styles from "./Login.module.scss"
import Container from './Container'
import PassLogin from './components/PassLogin'
import MsmLogin from './components/MsmLogin'


function UserLogin(props) {
  const TabPane = Tabs.TabPane; 
  const [hauto,setHauto] = useState(false);

  function setHeight() {
    setHauto(true);
  }
  return (
      <Container style={{height: hauto?  'auto' :'502px'}}>
        <div className={`${Styles.LoginForm}`}>
          <Tabs style={{paddingBottom: 0}} tabBarStyle={{color:"rgba(191,191,191,1)"}} defaultActiveKey="1">
                    <TabPane tab="密码登录" key="1">
                        <PassLogin />
                    </TabPane>
                    <TabPane tab="短信登录" key="2">
                        <MsmLogin setHeight={setHeight} />
                    </TabPane>
            </Tabs>
        </div>
      </Container>
  );
}

export default UserLogin;
