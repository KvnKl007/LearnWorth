import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center p-4 md:p-10 bg-white">

                {/* Hero Section */}
                <section className="text-center bg-blue-600 text-white p-8 rounded-lg w-full max-w-3xl mb-8 shadow-md">
                    <h1 className="text-4xl font-bold mb-4">Welcome to LearnWorth</h1>
                    <p className="mb-6">Discover a wealth of study materials and take your learning to the next level!</p>
                    <Link to="/register">
                        <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
                            Get Started
                        </button>
                    </Link>
                </section>

                {/* Search Bar */}
                <section className="w-full max-w-lg mb-8">
                    <input
                        type="text"
                        placeholder="Search for study materials..."
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </section>

                {/* Featured Study Materials */}
                <section className="w-full max-w-4xl">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Featured Study Materials</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Sample Card */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h3 className="font-semibold text-lg text-blue-600">Mathematics 101</h3>
                            <p className="text-gray-600">Explore fundamental math concepts and practice problems.</p>
                            <Link to="/materials/1" className="text-blue-500 hover:underline mt-2 inline-block">
                                Learn More
                            </Link>
                        </div>
                        {/* Repeat for more cards */}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
