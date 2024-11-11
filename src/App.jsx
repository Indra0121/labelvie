import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Dash from './components/home/dash/dash';
import Auth from './components/auth/auth';
import ProtectedRoute from './protectRoute';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requireAuth={true}>
                  <Dash />
                </ProtectedRoute>
              } 
            />
          </Route>
          <Route 
            path="/auth" 
            element={
              <ProtectedRoute requireAuth={false}>
                <Auth />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
