import React, { useEffect } from 'react';
import { useLocation, useRouteMatch } from 'react-router';
import { connect } from 'react-redux';
import { BREADCRUMB_ACTION } from './store/breadCrumb';

const routerMap: any = {
    '/account': '账户管理',
    '/point': '商圈点位',
    '/data': '数据统计'
}

const secondRouteMap: any = {
    '/pointDetail/:poi': '商圈详情'
}

interface Iprops {
    Component: any
    history?: any
    dispatch?: any
}

const RouterGuard: React.FC<Iprops> = (props: Iprops) => {

    const { Component, dispatch } = props;
    const location = useLocation();
    const match = useRouteMatch() as any;

    useEffect(() => {
        const path = match.path;

        if (routerMap[path]) {
            const routeItem = {
                title: routerMap[path]
            }
    
            dispatch({
                type: BREADCRUMB_ACTION.RESET,
                payload: {
                    routeItem
                }
            });
        } else if (secondRouteMap[path]) {
            const routeItem = {
                title: secondRouteMap[path]
            }
    
            dispatch({
                type: BREADCRUMB_ACTION.PUSH,
                payload: {
                    routeItem
                }
            });
        }

    }, [ location, match ]);

    return (
        <>
            <Component { ...props }/>
        </>
    )
}


// 路由跳转守卫
export default connect(() => {
    return {};
})(RouterGuard);