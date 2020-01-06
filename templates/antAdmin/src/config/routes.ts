import React from 'react';

import UserLayout from '@/layouts/UserLayout';
import BasicLayout from '@/layouts/BasicLayout';

const UserLogin = React.lazy(() => import('@/pages/UserLogin'));
const FindPass = React.lazy(() => import('@/pages/UserLogin/FindPass'));
const Register = React.lazy(() => import('@/pages/UserLogin/Register'));
const Account = React.lazy(() => import('@/pages/Account/Account'));

const routerConfig = [
    { 
        path: '/user',
        component: UserLayout,
        children: [
            {
                path: '/findpass',
                component: FindPass,
                unAuth: true
            },
            {
                path: '/login',
                component: UserLogin,
                unAuth: true
            },
            {
                path: '/register',
                component: Register,
                unAuth: true
            }
        ]
    }, {
        path: '/',
        component: BasicLayout,
        children: [{
            path: '/account',
            component: Account
        }]
    }]


  export default routerConfig;