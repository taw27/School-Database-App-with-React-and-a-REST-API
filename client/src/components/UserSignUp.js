import React, { Fragment, useState } from "react";
import useContextValue from "../Context";
import UserForm from "./UserForm";
import { Link } from "react-router-dom";

const UserSignIn = ({ history }) => {
  const { data, actions } = useContextValue();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    errors: []
  });
  const change = e => {
    const name = e.target.name;
    const value = e.target.value;

    setState(state => ({ ...state, [name]: value }));
  };

  const validatePasswordMatch = () => {
    if (state.password === state.confirmPassword) {
      return true;
    } else {
      const errors = ["passwords does not match"];
      setState(state => ({ ...state, errors }));
      return false;
    }
  };

  const submit = async () => {
    try {
      if (validatePasswordMatch()) {
        const { created, errors } = await data.createUser(
          state.firstName,
          state.lastName,
          state.emailAddress,
          state.password
        );
        if (created) {
          const signedInUser = await actions.signIn(
            state.emailAddress,
            state.password
          );
          signedInUser === null ? history.push("/error") : history.push("/");
        } else {
          setState(state => ({ ...state, errors }));
        }
      }
    } catch (err) {
      history.push("/err");
    }
  };

  const cancel = () => {
    history.push("/");
  };

  return (
    <UserForm
      title="Sign Up"
      submitButtonText="Sign Up"
      formElements={() => (
        <Fragment>
          <div>
            {" "}
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={state.firstName}
              onChange={change}
            />{" "}
          </div>
          <div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={state.lastName}
              onChange={change}
            />
          </div>
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
          <div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={state.confirmPassword}
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
          Already have a user account? <Link to="/signin">Click here</Link> to
          sign in!
        </p>
      )}
    />
  );
};

export default UserSignIn;
