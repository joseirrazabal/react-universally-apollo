// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import auth from '../../../../services/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import navigationModel from '../../models/navigation.json';

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
// import * as userAuthActions   from '../../../../reducers/modules/userAuth';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class PrivateRoute extends Component {
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    component: PropTypes.any.isRequired,
    path: PropTypes.string,
  };

  state = {
    navModel: navigationModel,
  };

  componentDidMount() {
    // this.props.data.refetch({})
    // const {
    //   actions: {
    //     checkIfUserIsAuthenticated
    //   }
    // } = this.props;

    // checkIfUserIsAuthenticated();
  }

  render() {
    const { navModel } = this.state;

    const { component: Component, ...rest } = this.props;
    const { location } = this.props;

    // const isUserAuthenticated = this.isAuthenticated();
    const isUserAuthenticated = this.props.userIsAuthenticated;
    const isTokenExpired = false;
    // const isTokenExpired = this.isExpired();

    if (this.props.user.loading)
      return <div>loading...</div>

    return (
      <Route
        { ...rest }
        render={
          props =>
            (this.props.user.loggedInUser && this.props.user.loggedInUser.id ? (
              <div className="app">
                aaa
            { /*}
              <Header />
              <div className="app-body">
                <Sidebar {...this.props} brand={navModel.brand} navModel={navModel} />
                <main className="main">
                  <Breadcrumb />
                  <div className="container-fluid">
                    <Component {...props} />
                  </div>
                </main>
                <Aside />
              </div>
              <Footer />
          */ }
              </div>
            ) : (
                <div>
                  2222
                <button type="button" onClick={() => {
                    this.props.loggedInUser.refetch({
                      // search: {
                      //   nameOrigin: document.forms["flyForm"]["from"].value,
                      //   nameDestiny: document.forms["flyForm"]["to"].value
                      // }
                    })
                  }}>Buscar...
                </button>
                  { /*
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
            */ }
                </div>
              ))
        }
      />
    );
  }

  isAuthenticated() {
    // const checkUserHasId = user => user && user.id && user.id.length > 0;
    // const user = auth.getUserInfo() ? auth.getUserInfo() : null;
    return true
    // const isAuthenticated = !!(auth.getToken() && checkUserHasId(user));

    // return isAuthenticated;
  }

  isExpired() {
    return false
    // return auth.isExpiredToken(auth.getToken());
  }
}

// export default withRouter(PrivateRoute);

const loggedUser = gql`
query loggedInUser {
  loggedInUser {
      id,
      username
  }
}
`;

const PrivateRouteQuery = graphql(loggedUser, {
  name: 'user',
  options: { fetchPolicy: 'network-only', ssr: false },
})(PrivateRoute)

const mapStateToProps = (state) => {
  return {
    // userAuth:
    userIsAuthenticated: state && state.userAuth && state.userAuth.isAuthenticated || false
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        // ...userAuthActions
      },
      dispatch)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PrivateRouteQuery)
);
