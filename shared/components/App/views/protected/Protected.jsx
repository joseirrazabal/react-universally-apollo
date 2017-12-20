// @flow weak

import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Field, reduxForm } from 'redux-form/immutable';

import { renderField, renderErrors } from '../../components/Input';
import { ErrorAlert } from '../../components';

class Protected extends PureComponent {
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    // views
    currentView: PropTypes.string.isRequired,
    enterProtected: PropTypes.func.isRequired,
    leaveProtected: PropTypes.func.isRequired
  };

  state = {
    viewEntersAnim: true
  };

  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  componentDidMount() {
    const { enterProtected } = this.props;
    enterProtected();
  }

  componentWillUnmount() {
    const { leaveProtected } = this.props;
    leaveProtected();
  }

  handleSubmit = (values) => {
    console.log(values);
    this.props.mutate({ variables: values })
      .then((response) => {
        if (response.errors && response.errors.length <= 0) {
          // this.props.signInDispatcher(response.data.setMenuItem.id);
          // this.props.router.replace('/');
          console.log("guardado");
        } else {
          this.setState({
            errors: response.data.setMenuItem.errors
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, mutationLoading, error } = this.props;
    const { viewEntersAnim } = this.state;

    const errors = this.state.errors <= 0 ? null : renderErrors(this.state.errors);

    return (
      <div className={cx({ "view-enter": viewEntersAnim })}>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <ErrorAlert
            showAlert={!!error}
            errorTitle={'Error'}
            errorMessage={error ? error.message : ''}
            onClose={this.closeError}
          />
          <div>
            <Field
              name="title"
              type="text"
              component={renderField}
              label="Titulo"
            />
            <Field
              name="route"
              type="text"
              component={renderField}
              label="Ruta"
            />
            <Field
              name="order"
              type="text"
              component={renderField}
              label="Orden"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
          <button type="button" className="btn btn-default" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length <= 3) {
    errors.password = 'Must be at least 4 characters';
  }

  return errors;
};

export default reduxForm({
  form: 'example',
  validate,
})(Protected);
