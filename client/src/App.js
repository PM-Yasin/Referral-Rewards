import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      {user && <Navbar user={user} onLogout={logout} />}
      <main className="min-h-screen pt-16">
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" /> : <Login onLogin={login} />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/dashboard" /> : <Signup onSignup={login} />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/leaderboard" 
            element={user ? <Leaderboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={user ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App; 