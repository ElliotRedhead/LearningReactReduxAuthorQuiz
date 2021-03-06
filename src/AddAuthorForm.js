import React, {useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import "./AddAuthorForm.css";

class AuthorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageUrl: "",
      books: [],
      bookTemp: ""
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddAuthor(this.state);
  }
  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleAddBook(event) {
    this.setState({
      books: this.state.books.concat([this.state.bookTemp]),
      bookTemp: ""
    });
  }
  render() {
    return <form onSubmit={this.handleSubmit}>
      <div className="AddAuthorForm__input">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange} />
      </div>
      <div className="AddAuthorForm__input">
        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange} />
      </div>
      <div className="AddAuthorForm__input">
        <label htmlFor="bookTemp">Books</label>
        {this.state.books.map((book) => <p key={book}>{book}</p>)}
        <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange} />
        <input type="button" value="+" onClick={this.handleAddBook} />
      </div>
      <input type="submit" value="Add"/>
    </form>;
  }
}

function AddAuthorForm({match, onAddAuthor}) {
  return <div className="AddAuthorForm">
    <h1>Add Author</h1>
    <AuthorForm onAddAuthor={onAddAuthor}/>
  </div>;
}

/**
 * When user submits add author form, ADD_AUTHOR action is specified to dispatch to reducer.
 * @param {function} dispatch Dispatch method.
 * @param {object} props The user history properties.
 * @returns {object} The action type.
 */
const mapDispatchToProps = (dispatch, props) => (
  {
    onAddAuthor: (author) => {
      dispatch({ type: "ADD_AUTHOR", author });
      props.history.push("/");
    }
  }
);

/**
 * The add author form doesn't need to read from Redux store, hence blank mapStateToProps.
 */
export default withRouter(connect(() => {}, mapDispatchToProps)(AddAuthorForm));