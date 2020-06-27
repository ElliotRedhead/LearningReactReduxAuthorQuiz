import React, {useState} from "react";
import "./AddAuthorForm.css";

const AddAuthorForm = ({match}) => {
  const [name, setName] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  return(
    <div className="AddAuthorForm">
      <h1>Add Author</h1>
      <form>
        <div className="AddAuthorForm__input">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={event => setName(event.target.value)}></input>
        </div>
        <div className="AddAuthorForm__input">
          <label htmlFor="imageUrl">Image URL</label>
          <input type="text" name="imageUrl" value={imageUrl} onChange={event => setImageUrl(event.target.value)}></input>
        </div>
      </form>
    </div>
  );
};

export default AddAuthorForm;