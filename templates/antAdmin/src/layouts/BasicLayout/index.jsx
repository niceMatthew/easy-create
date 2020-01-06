import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Icon, ConfigProvider, Modal } from 'antd';
import CustomBreadCrumb from '../../components/common/CustomBreadCrumb';
import Aside from './components/Aside'
import styles from "./index.module.scss"
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
const { Header, Sider, Content } = Layout;
const { confirm } = Modal;


export default function BasicLayout(props) {
    const [collapse, setCollapse] = useState(false);
    const history = useHistory();

    function toggle() {
        setCollapse((val) => !val)
    }

    const logout = () => {
        confirm({
            title: '确定要退出吗?',
            onOk() {
                history.push('/user/login');
            }
        })
    }

    return (
        <ConfigProvider locale = { zhCN }>
            <Layout style={{ height: '100%' }}>
                <Sider width="256" trigger={null} collapsible collapsed={collapse}>
                    <div className = { styles.navHeader }>
                        <span className = { styles.logo }></span>
                        光是场地资源管理平台
                    </div>
                    <Aside />
                    <span
                        onClick = { logout } 
                        className={styles.logoutContainer}>
                        <Icon className={styles.logout} type="logout" />
                        退出登录
                    </span>
                </Sider>
                <Layout>
                    {/* <Header
                        className = { styles.contentHeader } 
                        style={{ background: '#fff', padding: 0 }}> */}
                        {/* <Icon className={styles.fold} type={collapse ? "menu-unfold" : "menu-fold"} onClick={toggle} /> */}
                        {/* <span
                            onClick = { logout } 
                            className={styles.logoutContainer}>
                            <Icon className={styles.logout} type="logout" />
                            退出登录
                        </span>
                    </Header> */}
                    <CustomBreadCrumb></CustomBreadCrumb>
                    <Content
                        style={{
                            position: 'relative',
                            padding: '24px',
                            overflow: 'auto',
                            minHeight: 280,
                            height: '100%'
                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}
