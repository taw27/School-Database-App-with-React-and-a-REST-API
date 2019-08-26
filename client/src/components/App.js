import React from "react";
import Header from "./Header";
import Courses from "./Courses";
import UserSignIn from "./UserSignIn.js";
import UserSignUp from "./UserSignUp";
import UserSignOut from "./UserSignOut";
import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <div className="bounds">
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/signin" component={UserSignIn} />
          <Route exact path="/signup" component={UserSignUp} />
          <Route exact path="/signout" component={UserSignOut} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
