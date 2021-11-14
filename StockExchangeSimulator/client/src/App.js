import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './home'
import LogInForm from './components/LogInPage';
import SignUpPage from './components/SignUpPage';

class App extends Component {
  render(){
    return (
      <div className="App">
          <Router>
            <Routes>
              <Route exact path="/" element={<LogInForm/>}/>
              <Route exact path="/home" element={<Home/>}/>
              <Route exact path="/login" element={<LogInForm/>}/>
              <Route exact path="/signup" element={<SignUpPage/>}/>
          </Routes>
          </Router>
      </div>
    );
  }
}

export default App;
