import React from "react";
import PropTypes from "prop-types";

const ValidationErrors = ({ errors }) => (
  <div>
    <h2 className="validation--errors--label">Validation errors</h2>
    <div className="validation-errors">
      <ul>
        {errors.map((error, id) => (
          <li key={id}>{error}</li>
        ))}
      </ul>
    </div>
  </div>
);

ValidationErrors.propTypes = {
  errors: PropTypes.array
};

export default ValidationErrors;
