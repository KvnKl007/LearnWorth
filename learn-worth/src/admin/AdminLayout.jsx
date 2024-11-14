// components/AdminLayout.jsx
import { Link } from 'react-router-dom';

const AdminLayout = ({ title, children }) => (
    <div className="flex flex-1 h-full">
        <aside className="w-64 bg-gray-800 text-white min-h-[100vh] flex flex-col p-4">
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
                <h1 className="text-xl font-bold">{title}</h1>
            </header>
            <div className="container mx-auto p-6">{children}</div>
        </div>
    </div>
);

export default AdminLayout;
