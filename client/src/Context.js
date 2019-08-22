import { React, createContext, useContext, useState } from "react";
import Data from "./Data";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

export const context = createContext();

export const Provider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(
    Cookies.getJSON("authenticatedUser") || null
  );
  const data = new data();

  const signIn = async (email, passWord) => {
    const user = await data.getUser(email, passWord);
    if (user !== null) {
      setAuthenticatedUser({ ...user, passWord });
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
  return <context.Provider value={value}>{children}</context.Provider>;
};

const useContextValue = () => useContext(context);

export default useContextValue;

Provider.propTypes = {
  children: PropTypes.element.isRequired
};
