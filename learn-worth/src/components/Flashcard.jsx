// src/pages/FlashcardViewPage.jsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import flashcardData from '../assets/Data/FlashCardData';
import Navbar from './Navbar';

const FlashcardViewPage = () => {
    const { category, topic } = useParams();
    const flashcards = flashcardData[category]?.[topic] || [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    // Ensure there's a valid flashcard to display
    if (flashcards.length === 0) {
        return (
            <>
                <Navbar />
                <p className="text-center mt-20 text-gray-600">No flashcards available for this topic.</p>
            </>
        );
    }

    const handleFlip = () => setFlipped(!flipped);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setFlipped(false); // Reset flip state when navigating
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
        );
        setFlipped(false); // Reset flip state when navigating
    };

    const currentFlashcard = flashcards[currentIndex];

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6 space-y-10 mt-14">
                {/* Hero Section */}
                <section className="relative h-72 bg-blue-600 text-white flex items-center justify-center rounded-lg shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-80"></div>
                    <h1 className="relative text-2xl md:text-4xl font-bold z-10">{topic} Flashcards</h1>
                </section>
                <section className="w-full max-w-md mx-auto p-6 mt-20">
                    <div className="relative w-full max-w-md mx-auto">
                        <div
                            className={`flashcard-container ${flipped ? "flipped" : ""}`}
                            onClick={handleFlip}
                        >
                            {/* Front of the Card (Question) */}
                            <div className="flashcard-face flashcard-front">
                                <p className="flashcard-text">{currentFlashcard.question}</p>
                                <button className="flip-button">Show Answer</button>
                            </div>

                            {/* Back of the Card (Answer) */}
                            <div className="flashcard-face flashcard-back">
                                <p className="flashcard-text">{currentFlashcard.answer}</p>
                                <button className="flip-button">Show Question</button>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-4">
                            <button onClick={handlePrevious} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                                Previous
                            </button>
                            <button onClick={handleNext} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                                Next
                            </button>
                        </div>
                    </div>
                </section>
            </div>

        </>
    );
};

export default FlashcardViewPage;
