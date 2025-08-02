import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Trophy, Home, User } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">ReferralRewards</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/dashboard')
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/leaderboard"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/leaderboard')
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-100'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Leaderboard</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 