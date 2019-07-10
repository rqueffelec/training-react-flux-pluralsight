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

    // Cory's challenge: Display author name on the CoursesPage
    // Adding the authorName property to each course according to the authorId of the course.
    if (
      courses.length !== 0 &&
      !courses[0].authorName &&
      authors.length !== 0
    ) {
      setCourses(
        courses.map(course => {
          return {
            ...course,
            authorName: authors.find(author => author.id === course.authorId)
              .name
          };
        })
      );
    }

    return () => {
      // cleanup on unmount
      courseStore.removeChangeListener(onChange);
      authorStore.removeChangeListener(onChange);
    };
  }, [courses, authors]);

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
      <CourseList courses={courses} deleteCourse={deleteCourse} />
    </>
  );
}

export default CoursesPage;
