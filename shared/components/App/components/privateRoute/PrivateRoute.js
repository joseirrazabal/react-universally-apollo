// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { Redirect, withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import navigationModel from '../../models/navigation.json';

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

class PrivateRoute extends Component {
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired, // con withRouter

    component: PropTypes.any.isRequired,
    path: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
  };

  state = {
    navModel: navigationModel,
  };

  _isLoggedIn = () => {
    const { currentUser } = this.props;
    return currentUser && currentUser.id !== null
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return (<div>Loading</div>)
    }

    if (this._isLoggedIn()) {
      return this.renderLoggedIn();
    } else {
      return this.renderLoggedOut();
    }
  }

  renderLoggedIn() {
    const { navModel } = this.state;
    const { component: Component, ...rest } = this.props;
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <div className="container-fluid">
              <Component {...this.props} />
            </div>
          </main>
          {false && <Aside />}
        </div>
        <Footer />
      </div>
    )
  }

  renderLoggedOut() {
    const { location } = this.props;
    return (
      <Redirect to={{ pathname: '/login', state: { from: location } }} />
    )
  }
}

const loggedUser = gql`
  query loggedInUser {
    loggedInUser {
        id,
        username
    }
  }
`;

export default graphql(loggedUser, {
  // name: 'user',
  options: {
    fetchPolicy: 'network-only',
    ssr: false,
  },
  props: ({
    data: { loading, loggedInUser },
  }) => ({
    loading,
    currentUser: loggedInUser,
  }),
})(withRouter(withApollo(PrivateRoute)));
