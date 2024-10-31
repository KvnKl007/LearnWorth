// src/pages/FlashcardTopicsPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import flashcardData from '../assets/Data/FlashCardData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FlashcardTopicsPage = () => {
    return (
        <>
            <Navbar />
            <section className="w-full max-w-5xl mx-auto p-6 space-y-8 mt-20 mb-44">
                <h2 className="text-4xl font-extrabold text-blue-600 text-center mb-10">Explore Flashcard Topics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.keys(flashcardData).map((category) => (
                        <div key={category} className="p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <h3 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
                                {/* Emoji or Icon (Example: 💼, 📊, 💻) */}
                                <span className="mr-2">📘</span>
                                {category}
                            </h3>
                            <ul className="space-y-3">
                                {Object.keys(flashcardData[category]).map((topic) => (
                                    <li key={topic}>
                                        <Link
                                            to={`/flashcards/${category}/${topic}`}
                                            className="text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline"
                                        >
                                            {topic}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>

    );
};

export default FlashcardTopicsPage;
