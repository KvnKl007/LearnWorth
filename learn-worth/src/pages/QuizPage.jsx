import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
// import quizData from "../assets/Data/QuizListData"; // This will be replaced
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { database } from '../firebaseConfig'; // Import Firebase config
import { ref, onValue } from 'firebase/database'; // Import necessary Firebase functions

const categories = ["All", "Finance", "Mathematics", "Computer Science"];

const QuizPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [quizzes, setQuizzes] = useState([]); // State to hold quizzes
    const navigate = useNavigate();

    // Fetch quizzes from the database
    useEffect(() => {
        const quizzesRef = ref(database, 'quizzes'); // Adjust the path to your quizzes in the database
        onValue(quizzesRef, (snapshot) => {
            const data = snapshot.val();
            const quizzesList = data ? Object.entries(data).map(([id, quiz]) => ({ id, ...quiz })) : [];
            setQuizzes(quizzesList); // Update state with fetched quizzes
        });
    }, []);

    const handleQuizStart = (quizId) => {
        navigate(`/quizzes/${quizId}`);
    };

    // Filter quizzes based on selected category
    const filteredQuizzes = quizzes.filter(quiz =>
        selectedCategory === "All" ? true : quiz.category === selectedCategory
    );

    return (
        <>
            <Navbar />
            <section className="w-full max-w-5xl mx-auto p-6 space-y-8 mt-20 mb-64">
                <h2 className="text-3xl font-bold text-blue-600">Choose a Quiz</h2>

                {/* Category Filter */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                                } hover:bg-blue-500 hover:text-white transition`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Quiz List */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-6">
                    {filteredQuizzes.length > 0 ? (
                        filteredQuizzes.map((quiz) => (
                            <div key={quiz.id} className="bg-white rounded-lg shadow-lg p-6">
                                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                                    {quiz.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {quiz.description}
                                </p>
                                <button
                                    className="text-blue-500 font-medium hover:underline"
                                    onClick={() => handleQuizStart(quiz.id)}
                                >
                                    Take Quiz
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No quizzes available for the selected category.</p>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default QuizPage;
