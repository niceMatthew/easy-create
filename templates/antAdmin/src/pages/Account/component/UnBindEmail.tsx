import React, { useRef } from 'react';
import { Modal, message } from 'antd';
import styles from './UnBindEmail.module.scss';
import { IuserInfo } from '../Account';

interface Iprops {
    visible: boolean
    onClose: () => void
    userInfo: IuserInfo
}

const UnBindEmail: React.FC<Iprops> = (props: Iprops) => {

    const { visible, onClose, userInfo } = props;
    const copyNode = useRef(document.createElement('label'));

    const copy = () => {
        // 获取node节点
        const node = (copyNode.current as any);
        const hiddenInput = document.createElement('input');

        hiddenInput.value = node.textContent;
        document.body.appendChild(hiddenInput);
        hiddenInput.select();
        document.execCommand('Copy');
        document.body.removeChild(hiddenInput);

        message.success('复制成功');
    }

    return (
        <Modal
            className = { styles.modalWrap }
            width = "400px"
            visible = { visible }
            footer = { null }
            onCancel = { onClose }
            destroyOnClose = { true }>
            <div className = { styles.title }>
                <div className = { styles.logo } />
                <h1>欢迎使用</h1>
            </div>
            <div className = { styles.content }>
                <span className = { styles.tips }>请把手机号告知线下业务员以绑定企业数据</span>
                <span className = { styles.copy }>
                    <label ref = { copyNode }>{ userInfo.phone }</label>
                    <span 
                        onClick = { copy } 
                        className = { styles.copyBtn }>复制</span>
                </span>
            </div>
            <div 
                onClick = { onClose }
                className = { styles.btnConfirm }>知道了</div>
        </Modal>
    )
}

export default UnBindEmail;

