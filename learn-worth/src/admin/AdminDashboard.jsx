import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [courses, setCourses] = useState([]);
    const [flashcards, setFlashcards] = useState([]);
    const { isAdmin, loading } = useAuth();

    // console.log("isAdmin value in AdminDashboard:", isAdmin); // Log the value of isAdmin

    useEffect(() => {
        const quizzesRef = ref(database, 'quizzes');
        const coursesRef = ref(database, 'courses');
        const flashcardsRef = ref(database, 'flashcards');

        onValue(quizzesRef, (snapshot) => {
            const data = snapshot.val();
            setQuizzes(data ? Object.entries(data).map(([id, quiz]) => ({ id, ...quiz })) : []);
        });

        onValue(coursesRef, (snapshot) => {
            const data = snapshot.val();
            setCourses(data ? Object.entries(data).map(([id, course]) => ({ id, ...course })) : []);
        });

        onValue(flashcardsRef, (snapshot) => {
            const data = snapshot.val();
            setFlashcards(data ? Object.entries(data).map(([id, flashcard]) => ({ id, ...flashcard })) : []);
        });
    }, []);

    // If loading, show nothing or a spinner
    if (loading) {
        return <div>Loading...</div>;
    }


    if (!isAdmin) {
        // console.log("User is not an admin:", isAdmin);
        return (
            <div className='flex w-full h-screen items-center justify-center'>
                <p className="text-xl">You do not have access to this page.</p>
            </div>
        ); 
    }
    return (
            <div className="flex h-full">
                <aside className="w-64 bg-gray-800 text-white min-h-[100vh] p-4">
                    <div className="text-blue-600 text-2xl font-bold">
                        <Link to="/">LearnWorth</Link>
                    </div>
                    <nav className="py-10">
                        <ul>
                            <li className="mb-2">
                                <Link to="/admin/" className="block p-2 hover:bg-gray-700 rounded">Home</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/admin/admin-quiz" className="block p-2 hover:bg-gray-700 rounded">Quizzes</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/admin/admin-courses" className="block p-2 hover:bg-gray-700 rounded">Courses</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/admin/admin-flashcards" className="block p-2 hover:bg-gray-700 rounded">Flashcards</Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <div className="flex-1">
                    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
                        <h1 className="text-xl font-bold">Admin Dashboard</h1>
                        <button className="focus:outline-none">
                            <span className="material-icons">notifications</span>
                        </button>
                    </header>
                    
                    <div className="container mx-auto p-6">
                        <h1 className="text-3xl font-bold mb-6">Manage Content</h1>
    
                        {/* Overview Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold">Courses</h2>
                                <p className="text-2xl">{courses.length}</p>
                            </div>
                            <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold">Quizzes</h2>
                                <p className="text-2xl">{quizzes.length}</p>
                            </div>
                            <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold">Flashcards</h2>
                                <p className="text-2xl">{flashcards.length}</p>
                            </div>
                        </div>
    
                        {/* Recently Added Content */}
                        <h2 className="text-2xl font-bold mb-4">Recently Added Content</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {courses.slice(0, 5).map((course) => (
                                <div key={course.id} className="p-4 border rounded-lg shadow-sm">
                                    <h3 className="text-lg font-semibold">{course.title}</h3>
                                    <p className="text-sm text-gray-500">Course</p>
                                </div>
                            ))}
                            {quizzes.slice(0, 5).map((quiz) => (
                                <div key={quiz.id} className="p-4 border rounded-lg shadow-sm">
                                    <h3 className="text-lg font-semibold">{quiz.title}</h3>
                                    <p className="text-sm text-gray-500">Quiz</p>
                                </div>
                            ))}
                            {flashcards.slice(0, 5).map((flashcard) => (
                                <div key={flashcard.id} className="p-4 border rounded-lg shadow-sm">
                                    <h3 className="text-lg font-semibold">{flashcard.topic}</h3>
                                    <p className="text-sm text-gray-500">Flashcard</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    );
    

    };

export default AdminDashboard;
