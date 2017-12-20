import React from 'react';

export const renderField = ({
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

export const renderErrors = (errors) => (
  <div className="alert alert-danger" role="alert">
    {errors && errors.map((error, index) => <span key={index}>{error.message}</span>)}
  </div>
);

