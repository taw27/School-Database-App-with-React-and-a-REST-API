import { React, createContext, useContext } from "react";
import PropTypes from "prop-types";

export const context = createContext();

export const Provider = ({ children }) => {
  return <context.Provider>{children}</context.Provider>;
};

const useContextValue = () => useContext(context);

export default useContextValue;

Provider.propTypes = {
  children: PropTypes.element.isRequired
};
