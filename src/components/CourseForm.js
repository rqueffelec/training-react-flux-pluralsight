import React from "react";
import TextInput from "./common/TextInput";
import Select from "./common/Select";
import PropTypes from "prop-types";

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="Title"
        name="title"
        label="Title"
        onChange={props.onChange}
        value={props.course.title}
        error={props.errors.title}
      />

      <Select
        id="author"
        name="authorId"
        label="Author"
        onChange={props.onChange}
        value={props.course.authorId ? props.course.authorId.toString() : ""}
        options={props.authors.map(author => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
        error={props.errors.authorId}
      />

      <TextInput
        id="category"
        name="category"
        label="Category"
        onChange={props.onChange}
        value={props.course.category}
        error={props.errors.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  authors: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CourseForm;
