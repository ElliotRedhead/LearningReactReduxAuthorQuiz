import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import "./index.css";
import AuthorQuiz from "./AuthorQuiz";
import AddAuthorForm from "./AddAuthorForm";
import * as serviceWorker from "./serviceWorker";
import {shuffle, sample} from "underscore";


const authors = [
  {
    name: "Mark Twain",
    imageUrl: "images/authors/marktwain.jpg",
    imageSource: "Wikimedia Commons",
    books: ["The Adventures of Huckleberry Finn"]
  },
  {
    name: "Joseph Conrad",
    imageUrl: "images/authors/josephconrad.png",
    imageSource: "Wikimedia Commons",
    books: ["Heart of Darkness"]
  },
  {
    name: "J.K. Rowling",
    imageUrl: "images/authors/jkrowling.jpg",
    imageSource: "Wikimedia Commons",
    imageAttribution: "Daniel Ogren",
    books: ["Harry Potter and the Sorcerers Stone"]
  },
  {
    name: "Stephen King",
    imageUrl: "images/authors/stephenking.jpg",
    imageSource: "Wikimedia Commons",
    imageAttribution: "Pinguino",
    books: ["The Shining", "IT"]
  },
  {
    name: "Charles Dickens",
    imageUrl: "images/authors/charlesdickens.jpg",
    imageSource: "Wikimedia Commons",
    books: ["David Copperfield", "A Tale of Two Cities"]
  },
  {
    name: "William Shakespeare",
    imageUrl: "images/authors/williamshakespeare.jpg",
    imageSource: "Wikimedia Commons",
    books: ["Hamlet", "Macbeth", "Romeo and Juliet"]
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0,4);
  const answer = sample(fourRandomBooks);
  return {
    books: fourRandomBooks,
    author: authors.find((author) => 
      author.books.some((title) => 
        title === answer))
  };
}

/**
 * Creates a new state from the existing state by application of the action.
 * When the case action is dispatched, how is the state updated?
 * Default defines how to handle the action if not specifically stated.
 * @param {object} state The initial state of the component.
 * @param {object} action The user event.
 * @returns {object} state
 */
function reducer(state = { authors, turnData: getTurnData(authors), highlight:""},action) {
  switch (action.type){
  case "ANSWER_SELECTED":
    const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
    return Object.assign({}, state, {highlight: isCorrect ? "correct" : "incorrect"});
  case "CONTINUE":
    return Object.assign({}, state, {
      highlight: "",
      turnData: getTurnData(state.authors)});
  case "ADD_AUTHOR":
    return Object.assign({}, state, {
      authors: state.authors.concat([action.author])
    });
  default: return state;
  }
}

let store = Redux.createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactRedux.Provider store={store}>
        <>
          <Route exact path="/" component={AuthorQuiz} />
          <Route path="/add" component={AddAuthorForm} />
        </>
      </ReactRedux.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
