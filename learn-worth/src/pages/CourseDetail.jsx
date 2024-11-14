import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

const CourseDetailsPage = () => {
    const { currentUser } = useAuth();
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    // Function to convert YouTube URL to embed URL
    const getEmbedUrl = (url) => {
        if (!url) return '';
        
        // Handle different YouTube URL formats
        let videoId = '';
        
        // Handle youtube.com/watch?v= format
        if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('watch?v=')[1].split('&')[0];
        }
        // Handle youtu.be/ format
        else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        }
        // Handle youtube.com/embed/ format
        else if (url.includes('youtube.com/embed/')) {
            videoId = url.split('youtube.com/embed/')[1].split('?')[0];
        }

        // Return the embed URL if we found a video ID
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    useEffect(() => {
        const courseRef = ref(database, `courses/${courseId}`);
        onValue(courseRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setCourse({ id: courseId, ...data });
            } else {
                setCourse(null);
            }
        });
    }, [courseId]);

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (!course) {
        return <p className="text-center text-gray-600 mt-10">Course not found.</p>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6 space-y-10 mt-20">
                {/* Hero Section */}
                <section className="relative h-72 bg-blue-600 text-white flex items-center justify-center rounded-lg shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-80"></div>
                    <h1 className="relative text-2xl md:text-4xl font-bold z-10">{course.title}</h1>
                </section>

                {/* Video Section */}
                {course.videoUrl && (
                    <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={getEmbedUrl(course.videoUrl)}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={course.title}
                            ></iframe>
                        </div>
                    </section>
                )}

                {/* Course Overview */}
                <section className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4">
                    <h2 className="text-3xl font-semibold text-gray-800">About This Course</h2>
                    <p className="text-gray-700">{course.description}</p>

                    <div className="flex justify-between items-center mt-6">
                        <span className="text-sm text-gray-600">
                            <strong>Duration:</strong> {course.duration || "Not specified"}
                        </span>
                        <span className="text-sm text-gray-600">
                            <strong>Difficulty:</strong> {course.difficulty || "Not specified"}
                        </span>
                    </div>
                </section>

                {/* Materials Navigator */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Course Materials</h2>
                    {course.materials ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {course.materials.map((material, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-lg p-6 transform transition duration-200 hover:scale-105 hover:shadow-xl">
                                    <h3 className="text-xl font-semibold text-blue-600 mb-2">{material.title}</h3>
                                    <p className="text-gray-600 mb-4">{material.summary}</p>
                                    <Link to='/more' className="text-blue-500 font-medium hover:underline">
                                        Go to Material
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No materials available for this course.</p>
                    )}
                </section>
            </div>
        </>
    );
};

export default CourseDetailsPage;