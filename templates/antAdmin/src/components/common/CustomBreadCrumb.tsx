import React from 'react';
import { Breadcrumb } from 'antd';
import { connect, useSelector } from 'react-redux';
import styles from './CustomBreadCrumb.module.scss';

interface Iprops {
    pageStack: any,
}

const BreadCrumb: React.FC<Iprops> = (props: Iprops) => {

    const { pageStack } = props;

    const state = useSelector((state) => {
        return state;
    });

    console.log(state)

    return (
        <div className = { styles.breadCrumb }>
            <Breadcrumb>
                <Breadcrumb.Item key = { '首页' }>{ '首页' }</Breadcrumb.Item>
                {
                    pageStack.map((item: any, index: number) => {
                        if (index === 0) {
                            return (
                                <Breadcrumb.Item key = { item.title }>
                                    { item.title }
                                </Breadcrumb.Item>
                            )
                        } else {
                            return (
                                <Breadcrumb.Item key = { item.title }>
                                    { `${ item.title }` }
                                </Breadcrumb.Item>
                            )
                        }
                    })
                }
            </Breadcrumb>
            <div className = { styles.pageTitle }>{ pageStack.length > 0 ? pageStack[pageStack.length - 1].title : '' }</div>
        </div>
    )
};

export default connect<Iprops>((state: any) => {
    return {
        pageStack: state.breadCrumb.pageStack
    }
})(BreadCrumb);