import React from 'react';
import aboutImage from '../../public/assets/images/about.jpg'; // Replace with the path to your about us image
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <section className="w-full bg-gray-50 py-16 mt-10">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-32">
                {/* Image Section */}
                <div className="md:w-1/2">
                    <img
                        src={aboutImage}
                        alt="About LearnWorth"
                        className="rounded-lg shadow-lg w-full object-cover h-80 md:h-full"
                    />
                </div>

                {/* Text Section */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-blue-600 mb-4">
                        About LearnWorth
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        Welcome to <span className="font-semibold text-blue-600">LearnWorth</span> — an online educational platform dedicated to improving financial literacy across Rwanda. Our mission is to provide free, accessible resources that empower students to make informed financial decisions and build a foundation for financial success.
                    </p>
                    <Link to='/about-us' >
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-500 transition">
                            Learn More
                        </button>
                    </Link>

                </div>
            </div>
        </section>
    );
};

export default AboutUs;
