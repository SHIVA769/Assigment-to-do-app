import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="app-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: 'var(--primary-color)', fontSize: '1.5rem' }}>Loading application...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="container" style={{ padding: '2rem 20px', flex: 1 }}>
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
