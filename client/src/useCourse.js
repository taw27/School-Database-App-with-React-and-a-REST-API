import { useSate, useEffect } from "react";
import useContextValue from "./Context";
const useCourse = (courseId, history) => {
  const [course, setCourse] = useSate([]);
  const { data } = useContextValue();

  useEffect(() => {
    data
      .getCourse(courseId)
      .then(course => {
        setCourse(course);
      })
      .catch(() => {
        history.push("/error");
      });
  });

  return [course, setCourse];
};

export default useCourse;
