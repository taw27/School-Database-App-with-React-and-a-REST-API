import React, { useEffect, useState } from "react";
import useContextValue from "../Context";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { data } = useContextValue;

  useEffect(() => {
    data
      .getCourses()
      .then(courses => setCourses(courses))
      .catch(() => setCourses(null));
  }, []);

  return {};
};

export default Courses;
