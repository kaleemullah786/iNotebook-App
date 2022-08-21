import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/note/NoteState';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';

export default class App extends Component {
  render() {
    return (
      <>
        <NoteState>
          <Router>
            <Navbar />
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/signup" element={<SignUp />} />
              </Routes>
            </div>
          </Router>
        </NoteState>
      </>
    )
  }
}

