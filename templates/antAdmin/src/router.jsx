
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import React, { Suspense } from 'react';
import path from 'path';
import RouterGuard from './RouterGuard';
import routes from '@/config/routes';
import PageLoading from '@/components/PageLoading';
import { storage } from '@/utils/storage';
import { Provider } from 'react-redux';
import store from './store';

const RouteItem = (props) => {

    const { redirect, path: routePath, component, key } = props;
    if (redirect) {
        return (
            <Redirect
                exact
                key={key}
                from={routePath}
                to={redirect}
            />
        );
    }

    const rChild = props.routeChild;
    if (rChild && !rChild.unAuth) {
        if (!storage.buildToken.exists()) {
            /* eslint no-restricted-globals:0 */
            location.href = "/user/login"
        }
    }

    return (
        <Route
            key={key}
            path={routePath}
            render = { (props) => {
                return (
                    <RouterGuard 
                        { ...props }
                        Component={ component }/>
                )
            } }
        />)

};

const router = () => {
    return (
        <Provider store = { store }>
            <Router>
                <Switch>
                    {routes.map((route, id) => {
                        const { component: RouteComponent, children, ...others } = route;
                        return (
                            <Route
                                key={id}
                                {...others}
                                component={(props) => {
                                    return (
                                        children ? (
                                            <RouteComponent key={id} {...props}>
                                                <Suspense fallback={<PageLoading />}>
                                                    <Switch>
                                                        {children.map((routeChild, idx) => {
                                                            const { redirect, path: childPath, component } = routeChild;
                                                            return RouteItem({
                                                                key: `${id}-${idx}`,
                                                                redirect,
                                                                routeChild,
                                                                path: childPath && path.join(route.path, childPath),
                                                                component,
                                                            });
                                                        })}
                                                    </Switch>
                                                </Suspense>
                                            </RouteComponent>
                                        ) : (
                                                <Suspense fallback={<PageLoading />}>
                                                    {
                                                        RouteItem({
                                                            key: id,
                                                            ...route,
                                                            routeChild: children
                                                        })
                                                    }
                                                </Suspense>
                                            )
                                    );
                                }}
                            />
                        );
                    })}
                </Switch>
            </Router>
        </Provider>
    );
};

export default router;
