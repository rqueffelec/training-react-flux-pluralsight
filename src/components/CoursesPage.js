import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import authorStore from "../stores/authorStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";
import { loadAuthors } from "../actions/authorActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    authorStore.addChangeListener(onChange);

    if (courseStore.getCourses().length === 0) loadCourses();
    if (authorStore.getAuthors().length === 0) loadAuthors();

    return () => {
      // cleanup on unmount
      courseStore.removeChangeListener(onChange);
      authorStore.removeChangeListener(onChange);
    };
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
    setAuthors(authorStore.getAuthors());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList
        courses={courses}
        deleteCourse={deleteCourse}
        authors={authors}
      />
    </>
  );
}

export default CoursesPage;
