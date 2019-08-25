import React, { createContext, useContext, useState } from "react";
import Data from "./Data";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(
    Cookies.getJSON("authenticatedUser") || null
  );
  const data = new Data();

  const signIn = async (email, password) => {
    const user = await data.getUser(email, password);
    if (user !== null) {
      setAuthenticatedUser({ ...user, password });
      const cookieOptions = {
        expires: 1 // 1 day
      };
      // TODO: change to token based authentication later
      Cookies.set("authenticatedUser", JSON.stringify(user), { cookieOptions });
    }

    return user;
  };

  const signOut = () => {
    Cookies.remove("authenticatedUser");
    setAuthenticatedUser(null);
  };

  const value = {
    authenticatedUser,
    data,
    actions: {
      signIn,
      signOut
    }
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useContextValue = () => useContext(Context);

export default useContextValue;

Provider.propTypes = {
  children: PropTypes.element.isRequired
};
