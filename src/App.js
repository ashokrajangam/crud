import React from 'react';
import Main from './Components/MAIN/Main'
import Header from './Components/HEADER/Header';
import Footer from './Components/FOOTER/Footer';
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
          <Main />      
      </div>
    </Router>
  );
}

export default App;
