import React from "react";
import PropTypes from "prop-types";

const Form = ({
  title,
  submitButtonText,
  formElements,
  cancel,
  submit,
  errors,
  alternateOption
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    submit();
  };

  const handleCancel = e => {
    e.preventDefault();
    cancel();
  };

  return (
    <div className="grid-33 centered signin">
      <h1>{title}</h1>
      <div>
        <form onSubmit={handleSubmit}>
          {formElements()}
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">
              {submitButtonText}
            </button>
            <button className="button button-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <p>&nbsp;</p>
      {alternateOption()}
    </div>
  );
};

Form.propTypes = {
  title: PropTypes.string,
  submitButtonText: PropTypes.string,
  alternateOption: PropTypes.func,
  formElements: PropTypes.func,
  cancel: PropTypes.func,
  submit: PropTypes.func,
  errors: PropTypes.array
};

export default Form;
