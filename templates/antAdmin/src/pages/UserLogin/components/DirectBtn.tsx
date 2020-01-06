import React from 'react';
import { Link } from 'react-router-dom';
import { DirectBtnType } from '../../../utils/enum';
import Styles from './index.module.scss';

export default function (props: any){
    return <div style={{ textAlign: props.type === DirectBtnType.RESET ? 'center':'right'}} className={Styles.DirectBtn}>
        { props.type === DirectBtnType.LOGIN &&
            <>
            <Link to="/user/findpass">忘记密码  </Link>
            |
            <Link to="/user/register">  注册</Link>
            </>
        }
        { props.type === DirectBtnType.REGISTER &&
            <>
            <Link to="/user/findpass">忘记密码  </Link>
            |
            <Link to="/user/login"> 登录</Link>
            </>
        }
        { props.type === DirectBtnType.RESET &&
            <>
            <Link to="/user/login">返回登录</Link>
            </>
        }
    </div>
}