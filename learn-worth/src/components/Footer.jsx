// src/components/Footer.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <>
            <footer className="bg-gray-900 text-gray-300 py-10 relative">
                <div className="container md:flex justify-evenly flex px-5">

                    {/* About Us Section */}
                    <div>
                        <h2 className="text-white font-bold text-4xl mb-4">LearnWorth</h2>
                        <p className="text-gray-400">
                            Best Online E-learning platform
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="text-white font-bold text-base mb-4">Quick Links</h2>
                        <ul>
                            <li><a href="/" className="hover:text-white">Home</a></li>
                            <li><a href="/courses" className="hover:text-white">Courses</a></li>
                            <li><a href="/quizzes" className="hover:text-white">Quizzes</a></li>
                            <li><a href="/flashcards" className="hover:text-white">Flashcards</a></li>
                            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-white font-bold text-lg mb-4">Contact Us</h2>
                        <p><strong>Email:</strong> support@learnworth.com</p>
                        <p><strong>Phone:</strong> +123 456 7890</p>
                        <p><strong>Address:</strong> 123 Learning St, Knowledge City</p>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h2 className="text-white font-bold text-lg mb-4">Follow Us</h2>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <FontAwesomeIcon icon={faFacebookF} size="2x" />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <FontAwesomeIcon icon={faTwitter} size="2x" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <FontAwesomeIcon icon={faInstagram} size="2x" />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="text-center border-t border-gray-700 mt-10 pt-5 text-gray-500 text-sm">
                    <p>&copy; 2024 LearnWorth. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
