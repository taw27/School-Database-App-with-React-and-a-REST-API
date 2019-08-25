import React, { useEffect, useState, Fragment } from "react";
import CourseItem from "./CourseItem";
import useContextValue from "../Context";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { data } = useContextValue();

  useEffect(() => {
    data
      .getCourses()
      .then(courses => {
        setCourses(courses);
      })
      .catch(() => setCourses([]));
  }, [data]);

  return (
    <Fragment>
      {courses.map(course => (
        <CourseItem id={course.id} key={course.id} title={course.title} />
      ))}
    </Fragment>
  );
};

export default Courses;
