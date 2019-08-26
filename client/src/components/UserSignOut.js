import React from "react";
import { Redirect } from "react-router-dom";
import useContextValue from "../Context";

const UserSignOut = () => {
  const { actions } = useContextValue();
  actions.signOut();
  return <Redirect to="/" />;
};

export default UserSignOut;
