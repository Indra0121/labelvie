import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Dash from './components/home/dash/dash'


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} >
          <Route path="dashboard" element={<Dash/>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
