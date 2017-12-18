// @flow weak

// import React, {
//   PureComponent
// } from 'react';
// import PropTypes from 'prop-types';
// import cx from 'classnames';
// import { Field, reduxForm } from 'redux-form/immutable';
// import renderInput from '../../components/Input/Input.jsx'

// const renderField = ({
//   input,
//   label,
//   type,
//   meta: { touched, error, warning }
// }) => (
//   <div>
//     <label>{label}</label>
//     <div>
//       <input {...input} type={type} placeholder={label} />
//       {touched &&
//         ((error && <span>{error}</span>) ||
//           (warning && <span>{warning}</span>))}
//     </div>
//   </div>
// )

// class Protected extends PureComponent {
//   static propTypes = {
//     // react-router 4:
//     match: PropTypes.object.isRequired,
//     location: PropTypes.object.isRequired,
//     history: PropTypes.object.isRequired,

//     // views
//     currentView: PropTypes.string.isRequired,
//     enterProtected: PropTypes.func.isRequired,
//     leaveProtected: PropTypes.func.isRequired
//   };

//   state = {
//     viewEntersAnim: true
//   };

//   componentDidMount() {
//     const { enterProtected } = this.props;
//     enterProtected();
//   }

//   componentWillUnmount() {
//     const { leaveProtected } = this.props;
//     leaveProtected();
//   }

//   submit = () => {
//     console.log("bien")
//   }

//   render() {
//     const { handleSubmit, pristine, reset, submitting } = this.props;
//     const { viewEntersAnim } = this.state;

//     return (
//       <div className={cx({ "view-enter": viewEntersAnim })}>
//         <form onSubmit={handleSubmit(this.submit)}>
//           <div>
//               <Field
//               name="username"
//               type="text"
//               component={renderField}
//               label="Username"
//             />
//           </div>
//           <button type="submit" >
//             Submit
//           </button>
//           <button type="button" disabled={pristine || submitting} onClick={reset}>
//             Clear Values
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// export default reduxForm({
//   form: 'example'
// })(Protected);

import React from 'react';
// import { Field, reduxForm } from 'redux-form';
import { Field, reduxForm } from 'redux-form/immutable';

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)
const renderErrors = (errors) => (
  <div className="alert alert-danger" role="alert">
    {errors.map((error, index) => <span key={index}>{error.value}</span>)}
  </div>
);

const SignInForm = (props) => {
  const { handleSubmit } = props;
  const errors = props.errors <= 0 ? null : renderErrors(props.errors);
  return (
    <form onSubmit={handleSubmit}>
      {errors}
      <Field name="age" type="number" component={renderField} label="Age" />
      <button type="submit" className="btn btn-primary">Sign in</button>
    </form>
  );
}

const validate = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length <= 3) {
    errors.password = 'Must be at least 4 characters';
  }

  return errors;
}

// Decorate the form component
export default reduxForm({
  form: 'SignInForm', // a unique name for this form
  validate
})(SignInForm);
