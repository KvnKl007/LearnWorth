import { useState, useEffect } from 'react';
import { database } from '../firebaseConfig'; // Import Firebase config
import { ref, onValue } from 'firebase/database'; // Import necessary Firebase functions
import { useParams } from 'react-router-dom'; // Import useParams to get the topic from the URL
import Navbar from './Navbar';

const FlashcardViewPage = () => {
    const { topic } = useParams(); // Get the topic from the URL
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    // Fetch flashcards for the specific topic from the database
    useEffect(() => {
        const flashcardsRef = ref(database, 'flashcards'); // Adjust the path to your flashcards in the database
        onValue(flashcardsRef, (snapshot) => {
            const data = snapshot.val();
            const flashcardsList = data ? Object.entries(data).map(([id, flashcard]) => ({ id, ...flashcard })) : [];
            const filteredFlashcards = flashcardsList.filter(flashcard => flashcard.topic === topic);
            setFlashcards(filteredFlashcards); // Update state with fetched flashcards for the specific topic
        });
    }, [topic]);

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
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards[0].questions.length);
        setFlipped(false); // Reset flip state when navigating
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? flashcards[0].questions.length - 1 : prevIndex - 1
        );
        setFlipped(false); // Reset flip state when navigating
    };

    const currentQuestion = flashcards[0].questions[currentIndex];
    const currentAnswer = flashcards[0].answers[currentIndex];

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6 space-y-10 mt-16">
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
                                <p className="flashcard-text">{currentQuestion}</p>
                                <button className="flip-button">Show Answer</button>
                            </div>

                            {/* Back of the Card (Answer) */}
                            <div className="flashcard-face flashcard-back">
                                <p className="flashcard-text">{currentAnswer}</p>
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
