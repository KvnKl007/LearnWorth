// pages/QuizManager.jsx
import { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, set, remove, onValue } from 'firebase/database';
import AdminLayout from '../admin/AdminLayout';
import QuizForm from './forms/QuizForm';

const QuizManager = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [quizId, setQuizId] = useState(null);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Fetch quizzes from the database
    useEffect(() => {
        const quizzesRef = ref(database, 'quizzes');
        onValue(quizzesRef, (snapshot) => {
            const data = snapshot.val();
            const quizzesList = data ? Object.entries(data).map(([id, quiz]) => ({ id, ...quiz })) : [];
            setQuizzes(quizzesList);
        });
    }, []);

    // Save or update quiz in the database
    const onSaveQuiz = async (quiz) => {
        try {
            console.log("Saving quiz:", quiz);
            const quizRef = ref(database, `quizzes/${quizId || Date.now()}`);
            await set(quizRef, quiz);
            console.log("Quiz saved successfully.");
            setQuizId(null);
            setIsFormVisible(false);
        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    };

    // Populate form fields with quiz data for editing
    const handleEditQuiz = (quiz) => {
        setQuizId(quiz.id);
        setCurrentQuiz(quiz)
        setIsFormVisible(true);
    };

    // Delete a quiz from the database
    const handleDeleteQuiz = async (id) => {
        // Show confirmation popup
        const confirmed = window.confirm("Are you sure you want to delete this flashcard?");
        if (confirmed) {
            // If confirmed, proceed with deletion
            const quizRef = ref(database, `quizzes/${id}`);
            remove(quizRef)
                .then(() => {
                    // console.log("Flashcard deleted successfully.");
                    alert("Quiz deleted successfully")
                })
                .catch((error) => {
                    // console.error("Error deleting flashcard:", error);
                    alert("Error deleting quiz: " + error.message);
                });
        }
    };

    return (
        <AdminLayout title="Quiz Manager">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Quizzes</h2>
                <button
                    onClick={() => setIsFormVisible(!isFormVisible)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {quizId ? 'Update Quiz' : 'Create Quiz'}
                </button>
            </div>

            {isFormVisible && (
                <QuizForm onSaveQuiz={onSaveQuiz} 
                initialData={currentQuiz}/>
            )}

            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz.id} className="flex justify-between items-center p-2 border-b">
                        <div>
                            <h3 className="font-semibold">{quiz.title}</h3>
                            <p className="text-sm text-gray-600">{quiz.category}</p>
                            <p className="text-sm">{quiz.description}</p>
                        </div>
                        <div className="flex items-center">
                            <button onClick={() => handleEditQuiz(quiz)} className="text-blue-500 mr-2">Edit</button>
                            <button onClick={() => handleDeleteQuiz(quiz.id)} className="text-red-500 mr-2">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </AdminLayout>
    );
};

export default QuizManager;
