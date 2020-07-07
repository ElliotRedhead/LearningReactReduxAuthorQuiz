import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

const Hero = () => (
  <div className="row">
    <div className="jumbotron col-10 offset-1">
      <h1>Author Quiz</h1>
      <p>Select the book written by the author shown.</p>
    </div>
  </div>
);

const Book = ({title, onClick}) => (
  <div className="answer" onClick={() => {onClick(title);}}>
    <h4>{title}</h4>
  </div>
);

const Turn = ({author, books, highlight, onAnswerSelected}) => {
  function highlightToBgColor(highlight) {
    const mapping = {
      "none": "",
      "correct": "green",
      "incorrect": "red"
    };
    return mapping[highlight];
  }
  return (
    <div className="row turn" style={{backgroundColor:highlightToBgColor(highlight)}}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorImage" alt="Author"/>
      </div>
      <div className="col-6">
        {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected}/>)}
      </div>
    </div>
  );
};

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

const Continue = ({ show, onContinue }) => (
  <div className="row continue">
    { show
      ? <div className="col-11">
        <button className="btn btn-primary btn-lg float-right">Continue</button>
      </div>
      : null
    }
  </div>
);

const Footer = () => (
  <div id="footer" className="row">
    <div className="col-12">
      <p className="text-muted credit">All images are from <a href="https://commons.wikimedia.org/wiki/Main_Page">Wikimedia Commons</a> and are in the public domain.</p>
    </div>
  </div>
);

/**
 * Defines the data to be passed from the store to the component.
 * @param {object} state The content of the store.
 * @returns {object} Parts of the store required for the author quiz component.
 */
const mapStateToProps = (state) => (
  {
    turnData: state.turnData,
    highlight: state.highlight
  }
);

/**
 * Map events from author quiz component to actions to be published to Redux store.
 * @param {object} dispatch The author quiz component events.
 * @returns {object} Actions.
 */
const mapDispatchToProps = (dispatch) => (
  {
    onAnswerSelected: (answer) => {
      dispatch({ type: "ANSWER_SELECTED", answer });
    },
    onContinue: () => {
      dispatch({ type: "CONTINUE" });
    }

  }
);

/**
 * turnData & highlight props are now provided by mapStateToProps.
 * onAnswerSelected & onContinue are now provided by mapDispatchToProps.
 */
const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)(
  function ({turnData, highlight, onAnswerSelected, onContinue}) {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
        <Continue show={highlight === "correct"} onContinue={onContinue}/>
        <p><Link to="/add">Add an author</Link></p>
        <Footer />
      </div>
    );
  });


export default AuthorQuiz;