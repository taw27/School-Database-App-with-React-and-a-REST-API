import React from "react";
import useContextValue from "../Context";
import { Link } from "react-router-dom";

const Header = () => {
  const { authenticatedUser } = useContextValue();
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo"> Courses</h1>
        {authenticatedUser ? (
          <nav>
            <span>
              {" "}
              Welcome{" "}
              {`${authenticatedUser.firstName} ${authenticatedUser.lastName}`}
            </span>
            <Link className="signout" to="/signout">
              {" "}
              Sign Out
            </Link>
          </nav>
        ) : (
          <nav>
            <Link className="signin" to="/signin">
              {" "}
              Sign In
            </Link>
            <Link className="signup" to="/signup">
              {" "}
              Sign Up
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Header;
