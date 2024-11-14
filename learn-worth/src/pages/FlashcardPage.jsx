import { useState, useEffect } from 'react';
import { database } from '../firebaseConfig'; // Import Firebase config
import { ref, onValue } from 'firebase/database'; // Import necessary Firebase functions
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom'; // Import Link for navigation

const FlashcardTopicsPage = () => {
    const [flashcards, setFlashcards] = useState([]);

    // Fetch flashcards from the database
    useEffect(() => {
        const flashcardsRef = ref(database, 'flashcards'); // Adjust the path to your flashcards in the database
        onValue(flashcardsRef, (snapshot) => {
            const data = snapshot.val();
            const flashcardsList = data ? Object.entries(data).map(([id, flashcard]) => ({ id, ...flashcard })) : [];
            setFlashcards(flashcardsList); // Update state with fetched flashcards
        });
    }, []);

    // Group flashcards by category
    const groupedFlashcards = flashcards.reduce((acc, flashcard) => {
        const { category, topic } = flashcard;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(topic);
        return acc;
    }, {});

    return (
        <>
            <Navbar />
            <section className="w-full max-w-5xl mx-auto p-6 space-y-8 mt-20 mb-44">
                <h2 className="text-4xl font-extrabold text-blue-600 text-center mb-10">Explore Flashcard Topics</h2>
                <div className="space-y-6">
                    {Object.entries(groupedFlashcards).map(([category, topics]) => (
                        <div key={category} className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold text-blue-600 mb-4"><span className="mr-2">📘</span>{category}</h3>
                            <ul className="space-y-2">
                                {topics.map((topic, index) => (
                                    <li key={index}>
                                        <Link to={`/flashcards/${category}/${topic}`} className="text-blue-500 hover:underline">
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
