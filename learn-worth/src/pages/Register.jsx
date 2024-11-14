// src/components/Register.jsx
import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user profile with username
            await updateProfile(user, {
                displayName: username,
            });

            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex h-screen w-full">
            {/* Left Side - Form */}
            <div className="flex-1 flex flex-col md:w-1/4 items-center justify-center bg-gray-100 p-8">
                <div className="max-w-xl w-full  bg-white p-10 rounded-lg shadow-lg relative">
                    {/* Logo */}
                    <h1 className="text-4xl font-bold text-blue-600 mb-2">LearnWorth</h1>
                    <p className="text-lg font-medium text-gray-700 mb-6">Hi There 👋 !!</p>

                    {/* Register Form */}
                    <form onSubmit={handleRegister} className="space-y-4">
                        {error && <p className="text-red-500">{error}</p>}
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            REGISTER
                        </button>
                        <p className='items-center mt-5'>Already have account? <span><Link to='/login' className='text-blue-500'>Login</Link></span></p>
                    </form>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden md:flex md:w-3/4 flex-1 items-center justify-center bg-blue-600">
                <img
                    src="/assets/images/students.jpg"
                    alt="Showcase of LearnWorth"
                    className="w-full h-full object-cover"
                />
            </div>

        </div>
    );
};

export default Register;
