import React, { Fragment } from "react";
import useContextValue from "../Context";
import { Link } from "react-router-dom";

const Header = () => {
  const { authenticatedUser } = useContextValue();
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo"> Courses</h1>
        {authenticatedUser ? (
          <Fragment>
            <nav>
              <span>
                {" "}
                Welcome{" "}
                {`${authenticatedUser.firstName} ${authenticatedUser.lastName}`}
              </span>
            </nav>
            <Link className="signout" to="/signout">
              {" "}
              Sign Out
            </Link>
          </Fragment>
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
