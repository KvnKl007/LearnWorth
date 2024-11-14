import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Initialize error state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error messages
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/'); // Redirect after successful login
        } catch (error) {
            setError(error.message); // Set error message if login fails
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left Side - Image */}
            <div className="hidden md:flex flex-1 items-center justify-center bg-blue-600">
                <img
                    src="/assets/images/Signin.jpg"
                    alt="Showcase of LearnWorth"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-8">
                <div className="max-w-xl w-full bg-white p-10 rounded-lg shadow-lg">
                    {/* Logo */}
                    <h1 className="text-4xl font-bold text-blue-600 mb-2">LearnWorth</h1>
                    <p className="text-lg font-medium text-gray-700 mb-6">Welcome Back 😉!</p>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && <p className="text-red-500">{error}</p>}
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
                            LOGIN
                        </button>
                        <p className='items-center mt-5'>Create new account? <span><Link to='/register' className='text-blue-500'>SingUp</Link></span></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
