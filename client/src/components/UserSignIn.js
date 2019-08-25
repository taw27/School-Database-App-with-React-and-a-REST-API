import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import UseContextValue from "../Context";
import Form from "./Form";

const UserSignIn = ({ location, history }) => {
  const [state, setState] = useState({
    emailAddress: "",
    password: "",
    errors: []
  });
  const { actions } = UseContextValue();

  const change = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const submit = async () => {
    const { from } = location.state || { from: { pathName: "/" } };

    try {
      const { emailAddress, password } = state;
      const user = actions.signIn(emailAddress, password);

      if (user === null) {
        const errors = ["emaill adresss or password incorrect"];
        setState({ ...state, errors });
      } else {
        history.push(from);
      }
    } catch (err) {
      history.push("/error");
    }
  };

  const cancel = () => {
    history.push("/");
  };

  return (
    <Form
      title="Sign In"
      submitButtonText="Sign In"
      formElements={() => (
        <Fragment>
          <div>
            <input
              id="emailAddress"
              name="emailAddress"
              type="text"
              placeholder="Email Address"
              value={state.emailAddress}
              onChange={change}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={state.password}
              onChange={change}
            />
          </div>
        </Fragment>
      )}
      cancel={cancel}
      submit={submit}
      errors={state.errors}
      alternateOption={() => (
        <p>
          Don&apos;t have a user account? <Link to="/signup">Click here</Link>{" "}
          to sign up!
        </p>
      )}
    />
  );
};

export default UserSignIn;
