// @flow weak

// import { connect }            from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as viewsActions      from '../../../../reducers/modules/views';
// import { Protected }          from '../../views';

// /* -----------------------------------------
//   Redux
//  ------------------------------------------*/
// const mapStateToProps = (state) => {
//   return {
//     currentView:  state.views.currentView
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       enterProtected: viewsActions.enterProtected,
//       leaveProtected: viewsActions.leaveProtected
//     },
//     dispatch
//   );
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(Protected);

  import React from 'react';
  import { withRouter } from 'react-router';
  import { graphql } from 'react-apollo';
  import gql from 'graphql-tag';
  import { connect } from 'react-redux';

  import { SignInForm } from '../../views';
  // import { signIn } from '../actions';

  class SignInFormContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = { errors: [] };
    }

    handleSubmit(values) {
      console.log("submit", values.toJS());
      // this.props.mutate({ variables: values })
      //   .then((response) => {
      //     if (response.data.signIn.errors.length <= 0) {
      //       this.props.signInDispatcher(response.data.signIn.token);
      //       this.props.router.replace('/');
      //     } else {
      //       this.setState({
      //         errors: response.data.signIn.errors
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    }

    render() {
      return (
        <SignInForm
          onSubmit={this.handleSubmit.bind(this)}
          errors={this.state.errors}
        />
      );
    }
  };

  const signInMutation = gql`
    mutation signIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        token,
        errors {
          key
          value
        }
      }
    }
  `;

  const SignInWithData = graphql(signInMutation)(withRouter(SignInFormContainer));

  const mapDispatchToProps = (dispatch) => ({
    signInDispatcher(token) {
      dispatch(signIn(token));
    }
  });

  const SignInWithDataAndState = connect(
    null,
    mapDispatchToProps
  )(SignInWithData);

  export default SignInWithDataAndState;
