import React from 'react';
import cookie from 'cookie'

const Auth = ({ children, authorities = [], hidden , ...otherParams}) => {
    const { authority } = cookie.parse(document.cookie);
    const hasAuth = authorities.indexOf(authority) !== -1
    console.log('otherParams', otherParams)
    if(hasAuth) {
        return children;
    } else {
        if(hidden) {
            return null;
        }
        return (
            <div>
                <p>抱歉，当前用户为 {authority || 'Guest'}, 没有权限访问该页面</p>
            </div>
        )
    }
}

const withAuth = (params) => (WrapperedComponent) => {
    return (props) => {
        return (
            <Auth {...params}>
                <WrapperedComponent {...props} />
            </Auth>
        )
    }
}

export { withAuth }

export default Auth;