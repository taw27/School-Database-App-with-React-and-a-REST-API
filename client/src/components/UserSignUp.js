import React, { Fragment, useState } from "react";
import useContextValue from "../Context";
import UserForm from "./UserForm";

const UserSignIn = () => {
  const { data } = useContextValue();
  const { state, setState } = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: ""
  });
  const change = e => {
    const name = e.target.name;
    const value = e.target.value;

    setState(state => ({...state, [name]: value});
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
              change={change}
            />{" "}
          </div>
          <div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={state.lastName}
              change={change}
            />
          </div>
          <div>
            <input
              id="emailAddress"
              name="emailAddress"
              type="text"
              placeholder="Email Address"
              value={state.emailAddress}
              change={change}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={state.password}
              change={change}
            />
          </div>
          <div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={state.confirmPassword}
              change={change}
            />
          </div>
        </Fragment>
      )}
    />
  );
};

export default UserSignIn;
