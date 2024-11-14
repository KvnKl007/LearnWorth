import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import defaultImage from "../../public/assets/images/default.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const { currentUser } = useAuth(); // Get user
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false); // State for side menu visibility

    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen); // Toggle side menu state
    };

    return (
        <nav className="bg-white shadow-lg flex p-2 fixed w-full z-50 top-0">
            {/* bar menu icon */}
            <FontAwesomeIcon
                icon={faBarsStaggered}
                size='2x'
                className='text-blue-600 items-center md:hidden relative top-4'
                onClick={toggleSideMenu} // Add click handler for side menu
            />
            <div className="container mx-auto px-4 flex justify-between items-center py-3">
                {/* Logo */}
                <div className="text-blue-600 text-2xl font-bold">
                    <Link to="/">LearnWorth</Link>
                </div>

                {/* Nav Menu for md and larger screens */}
                <ul className="hidden md:flex space-x-8 text-gray-600 font-medium">
                    <li><Link to="/courses" className='hover:text-blue-600'>Courses</Link></li>
                    <li><Link to="/quizzes" className='hover:text-blue-600'>Quizzes</Link></li>
                    <li><Link to="/flash-cards" className='hover:text-blue-600'>Flash cards</Link></li>
                    <li><Link to="/about-us" className='hover:text-blue-600'>About us</Link></li>
                </ul>

                {/* Side Menu for sm screens */}
                {isSideMenuOpen && ( // Conditionally render side menu
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40" onClick={toggleSideMenu}>
                        <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-50 p-4">
                            <h2 className='text-blue-600 text-2xl font-bold'>LearnWorth</h2>
                            <ul className="space-y-9 relative top-10">
                                <li><Link to="/courses" className='hover:text-blue-600' onClick={toggleSideMenu}>Courses</Link></li>
                                <li><Link to="/quizzes" className='hover:text-blue-600' onClick={toggleSideMenu}>Quizzes</Link></li>
                                <li><Link to="/flash-cards" className='hover:text-blue-600' onClick={toggleSideMenu}>Flash cards</Link></li>
                                <li><Link to="/about-us" className='hover:text-blue-600' onClick={toggleSideMenu}>About us</Link></li>
                            </ul>
                            <div className='bg-blue-600 h-40 relative top-80 bottom-0'></div>
                        </div>
                    </div>
                )}

                {/* Right Side (Buttons or Profile) */}
                <div className="flex items-center space-x-4">
                    {currentUser ? (
                        // Show user profile if signed in
                        <>
                            <Link to="/profile" className="text-gray-600 font-medium flex items-center gap-3">
                                <img src={currentUser.photoURL || defaultImage} alt="profile" className="h-10 w-10 rounded-full object-cover" />
                            </Link>
                        </>
                    ) : (
                        // Show login and signup if not signed in
                        <>
                            <Link to="/login" className="hover:text-blue-600 font-medium hover:border-2 hover:border-blue-600 px-4 py-2 rounded-md transition translate-x-1">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-500 transition translate-x-1"
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
