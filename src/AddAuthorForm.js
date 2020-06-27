import React from "react";
import "./AddAuthorForm.css";

const AddAuthorForm = ({match}) => (
  <div className="AddAuthorForm">
    <h1>Add Author</h1>
    <form>
      <div className="AddAuthorForm__input">
        <label htmlFor="name">Name</label>
        <input type="text" name="name"></input>
      </div>
    </form>
  </div>
);

export default AddAuthorForm;