import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // Assuming you have an auth context for user state

const Navbar = () => {
    const { currentUser } = useAuth(); // Get user

    return (
        <nav className="bg-white shadow-lg fixed w-full z-50 top-0">
            <div className="container mx-auto px-4 flex justify-between items-center py-3">
                {/* Logo */}
                <div className="text-blue-600 text-2xl font-bold">
                    <Link to="/">LearnWorth</Link>
                </div>

                {/* Nav Menu */}
                <ul className="hidden md:flex space-x-8 text-gray-600 font-medium">
                    <li><Link to="/about">About us</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/quiz">Quizes</Link></li>
                    <li><Link to="/flash-cards">Flash cards</Link></li>
                </ul>

                {/* Right Side (Buttons or Profile) */}
                <div className="flex items-center space-x-4">
                    {currentUser ? (
                        // Show user profile if signed in
                        <>
                            <Link to="/profile" className="text-gray-600 font-medium flex items-center gap-3">
                                <img src={currentUser.photoURL} alt="profile" className="h-10 w-10 rounded-full object-cover" />
                            </Link>

                        </>
                    ) : (
                        // Show login and signup if not signed in
                        <>
                            <Link to="/login" className="text-gray-600 font-medium">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-500 transition"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
