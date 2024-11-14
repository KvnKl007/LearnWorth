import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
// import quizQuestionsData from "../assets/Data/QuizData"; // This will be replaced
import Navbar from "../components/Navbar";
import QuizResult from "../components/QuizResult";
import { useAuth } from "../context/AuthContext";
import { database } from '../firebaseConfig'; // Import Firebase config
import { ref, onValue } from 'firebase/database'; // Import necessary Firebase functions

const Quiz = () => {
    const { currentUser } = useAuth();
    const { quizId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // Fetch quiz questions from the database
    useEffect(() => {
        const questionsRef = ref(database, `quizzes/${quizId}/questions`); // Adjust the path to your questions in the database
        onValue(questionsRef, (snapshot) => {
            const data = snapshot.val();
            const questionsList = data ? Object.entries(data).map(([id, question]) => ({ id, ...question })) : [];
            setQuestions(questionsList); // Update state with fetched questions
        });
    }, [quizId]);

    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const calculateScore = () => {
        let newScore = 0;
        questions.forEach((question) => {
            if (userAnswers[question.id] === question.answer) newScore++;
        });
        setScore(newScore);
        setShowResults(true);
    };

    const resetQuiz = () => {
        setUserAnswers({});
        setScore(0);
        setShowResults(false);
    };

    const handleNextQuiz = () => {
        navigate('/quizzes'); // Replace with the actual path to the next quiz
    };

    return (
        <>
            <Navbar />
            <section className="w-full max-w-2xl mx-auto p-6 space-y-8 mt-20">
                <h2 className="text-3xl font-bold text-blue-600">Quiz</h2>

                {!showResults ? (
                    <>
                        {questions.map((question) => (
                            <div key={question.id} className="p-4 bg-white rounded shadow-md mb-4">
                                <h3 className="text-lg font-semibold">{question.question}</h3>
                                <div className="mt-2">
                                    {question.options.map((option, idx) => (
                                        <label key={idx} className="block mt-2">
                                            <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                                value={option}
                                                checked={userAnswers[question.id] === option}
                                                onChange={() => handleAnswerChange(question.id, option)}
                                                className="mr-2"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={calculateScore}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
                        >
                            Submit Quiz
                        </button>
                    </>
                ) : (
                    <QuizResult
                        score={score}
                        totalQuestions={questions.length}
                        onRetry={resetQuiz}
                        onBack={handleNextQuiz}
                    />
                )}
            </section>
        </>
    );
};

export default Quiz;
