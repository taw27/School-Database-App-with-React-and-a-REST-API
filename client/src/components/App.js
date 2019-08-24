import React from "react";
import Header from "./Header";
import Courses from "./Courses";

const App = () => {
  return (
    <div>
      <Header />
      <div className="bounds">
        <Courses />
      </div>
    </div>
  );
};

export default App;
