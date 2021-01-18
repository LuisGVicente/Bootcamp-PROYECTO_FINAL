import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from './core/Routes/Routes';
import React from 'react';




const App = () => {
  return (
    <Router>
      <Routes></Routes>
    </Router>
  );
}

export default App;
