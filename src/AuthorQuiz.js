import React from 'react';
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

const Turn = () => (
  <div></div>
);

const Continue = () => (
  <div></div>
);

const Footer = () => (
  <div id="footer" className="row">
    <div className="col-12">
      <p className="text-muted credit">All images are from <a href="https://commons.wikimedia.org/wiki/Main_Page">Wikimedia Commons</a> and are in the public domain.</p>
    </div>
  </div>
);

const AuthorQuiz = () => (
  <div className="container-fluid">
    <Hero />
    <Turn />
    <Continue />
    <Footer />
  </div>
);

export default AuthorQuiz;