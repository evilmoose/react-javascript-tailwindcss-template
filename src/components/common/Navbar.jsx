/**
 * Navigation bar component.
 */

import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const { currentUser, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const Button = ({ children, variant = 'primary' }) => {
        const variants = {
          primary: 'bg-accent-blue text-white',
          secondary: 'bg-neutral-200 text-primary',
          danger: 'bg-accent-red text-white'
        };
        
        return (
          <button className={`px-md py-sm rounded-md ${variants[variant]}`}>
            {children}
          </button>
        );
    };

    return (
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="text-2xl font-bold text-primary">
                    ArtOfWorkflows
                  </Link>
                </div>
              </div>

              {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              {!currentUser ? (
                <>
                  <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:text-primary">
                    Home
                  </Link>
                </>
              ) : (
                <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:text-primary">
                  Dashboard
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/blog/new"
                  className="px-3 py-2 rounded-md text-sm font-medium text-primary"
                >
                  New Post
                </Link>
              )}
              {currentUser ? (
                <>
                  <Link 
                    to="/pdf-upload" 
                    className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary-dark transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    PDF Upload
                  </Link>

                  {/* User dropdown */}
                  <div className="ml-3 relative" ref={dropdownRef}>
                    <div>
                      <button
                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                        className="flex items-center text-sm font-medium text-neutral-700 hover:text-primary focus:outline-none"
                      >
                        <span className="mr-2">{currentUser.email}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-200 ${isUserDropdownOpen ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    {isUserDropdownOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 rounded-md text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="px-4 py-2 rounded-md text-sm font-medium bg-primary hover:bg-neutral-800 transition-colors"
                    style={{ backgroundColor: 'black', color: 'white !important' }}
                  >
                    <span style={{ color: 'white' }}>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            {currentUser}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-primary hover:bg-neutral-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {!currentUser ? (
              <>
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary hover:bg-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                
              </>
            ) : (
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary hover:bg-neutral-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {currentUser ? (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="px-3 py-2 text-sm font-medium text-neutral-500">
                  User Menu
                </div>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary hover:bg-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary hover:bg-neutral-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary hover:bg-neutral-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary hover:bg-neutral-800 transition-colors"
                  style={{ backgroundColor: 'black', color: 'white !important' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span style={{ color: 'white' }}>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;