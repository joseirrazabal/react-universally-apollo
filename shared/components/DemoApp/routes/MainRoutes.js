// @flow weak

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  // app:
  App,
  // non protected views
  ConnectedLogin,
  // ConnectedRegister,
  // protected views
  ConnectedHome,
  ConnectedAbout,
  ConnectedProtected,
} from '../containers';

import PrivateRoute from '../components/privateRoute/PrivateRoute';
import LogoutRoute from '../components/logoutRoute/LogoutRoute';
// import AsyncPostsRoute from '../AsyncPostsRoute';

//import Page404 from '../views/Pages/Page404/';
//import Page500 from '../views/Pages/Page500/';
import { PageNotFound }         from '../views';

export const MainRoutes = () => (
  <Switch>
    {/* logout: just redirects to home (App will take care of removing the token) */}
    <LogoutRoute path="/logout" />

    {/* non protected views */}
    <Route path="/login" component={ConnectedLogin} />
    <Route path="/register" component={ConnectedLogin} />

    {/* protected views */}
    { /* <PrivateRoute exact path="/" component={ConnectedHome} /> */ }
    <PrivateRoute path="/" component={ConnectedHome} />
    <PrivateRoute path="/dashboard" component={ConnectedHome} />
    <PrivateRoute path="/about" component={ConnectedAbout} />
    <PrivateRoute path="/protected" component={ConnectedProtected} />
    { /* <Redirect from="/" to="/dashboard" /> */ }

    {/* page not found */}
    <Route path="*" component={PageNotFound} />
    { /*<Route path="*" component={Page404} /> */}
  </Switch>
);

export default MainRoutes;
