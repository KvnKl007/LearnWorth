import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    updateEmail,
    updatePassword,
    updateProfile,
    deleteUser
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import Navbar from '../components/Navbar';
import defaultImage from "../../public/assets/images/default.png"
import { useNavigate } from 'react-router-dom';
import FileUploadButton from '../components/UploadBtn';

const Profile = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState(currentUser?.displayName || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [imagePercent, setImagePercent] = useState(0);
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicUrl, setProfilePicUrl] = useState(currentUser?.photoURL || defaultImage);

    useEffect(() => {
        if (currentUser?.photoURL) {
            setProfilePicUrl(currentUser.photoURL);
        } else {
            setProfilePicUrl(defaultImage);
        }
    }, [currentUser]);

    // const handleProfilePicChange = (e) => {
    //     if (e.target.files[0]) {
    //         setProfilePic(e.target.files[0]);
    //     }
    // };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Upload profile picture if selected
            if (profilePic) {
                const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
                await uploadBytes(storageRef, profilePic);
                const downloadURL = await getDownloadURL(storageRef);
                await updateProfile(currentUser, { photoURL: downloadURL });
                setProfilePicUrl(downloadURL);
                const uploadTask = uploadBytesResumable(storageRef, profilePic);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setImagePercent(Math.round(progress));
                    },
                    (error) => {
                        console.error("Error uploading image:", error);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        await updateProfile(currentUser, { photoURL: downloadURL });
                        setProfilePicUrl(downloadURL);
                        setImagePercent(0); // Reset progress after upload
                    }
                );
            }

            // Update username if changed
            if (username && username !== currentUser.displayName) {
                await updateProfile(currentUser, { displayName: username });
            }

            // Update email if changed
            if (email && email !== currentUser.email) {
                await updateEmail(currentUser, email);
            }

            // Update password if entered
            if (password) {
                await updatePassword(currentUser, password);
            }

            setSuccess('Profile updated successfully!');
        } catch (error) {
            setError(error.message);
            console.error("Error updating profile:", error.message);
        }
    };
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/'); // Redirect to login page after logout
        } catch (error) {
            setError("Error logging out");
            console.error("Error logging out account:", error)
        }
    };
    const handleDeleteAccount = async () => {
        try {
            await deleteUser(currentUser);
            navigate('/register'); // Redirect to signup page after account deletion
        } catch (error) {
            setError("Error deleting account");
            console.error("Error deleting account:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className='flex-col mb-10'>
                <div className="flex flex-col items-center p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-28">
                    <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    {/* Display progress */}
                    {imagePercent > 0 && (
                        <div>
                            <p>Uploading: {imagePercent}%</p>
                            <div className="progress-bar">
                                <div
                                    className="progress"
                                    style={{ width: `${imagePercent}%`, backgroundColor: 'blue' }}
                                ></div>
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        {profilePicUrl ? (
                            <img
                                src={profilePicUrl}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                                <span>No Image</span>
                            </div>
                        )}
                    </div>

                    <FileUploadButton onFileChange={(file) => setProfilePic(file)} />


                    <form onSubmit={handleUpdate} className="w-full">
                        <div className="mb-4">
                            <label className="block text-gray-700">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                            Update Profile
                        </button>
                        <div className='justify-between flex'>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-white text-red-500 rounded-md border-2 border-red-500 font-medium hover:bg-red-500 hover:text-white transition mt-5"
                            >
                                Logout
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg mt-4 hover:bg-red-400 transition"
                            >
                                Delete Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;
