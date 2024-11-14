import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StudyMaterialCard from '../components/CourseCard/StudyMaterial';
import AboutUs from '../components/About';
import Footer from '../components/Footer';
import { database } from '../firebaseConfig'; // Import Firebase config
import { ref, onValue } from 'firebase/database'; // Import necessary Firebase functions
import features from '../../public/assets/Data/FeaturesData';

const Home = () => {
    const [featuredCourses, setFeaturedCourses] = useState([]);

    // Fetch courses from Firebase database
    useEffect(() => {
        const coursesRef = ref(database, 'courses');
        
        onValue(coursesRef, (snapshot) => {
            const data = snapshot.val();
            const coursesList = data ? Object.entries(data).map(([id, course]) => ({ id, ...course })) : [];

            // Randomly select three courses
            const randomCourses = coursesList.sort(() => 0.5 - Math.random()).slice(0, 3);
            setFeaturedCourses(randomCourses);
        });
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center py-20 px-4 md:p-10 bg-white">
                <Hero />
                {/* Welcome Section */}
                <section className="text-center bg-blue-600 text-white p-8 rounded-lg w-full max-w-3xl mb-8 shadow-md">
                    <h1 className="text-4xl font-bold mb-4">Welcome to LearnWorth</h1>
                    <p className="mb-6">Discover a wealth of study materials and take your learning to the next level!</p>
                    <Link to="/courses">
                        <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
                            Get Started
                        </button>
                    </Link>
                </section>

                <AboutUs />

                {/* Featured Study Materials */}
                <section className="w-full max-w-4xl mt-16">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Featured Study Materials</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {featuredCourses.length > 0 ? (
                            featuredCourses.map((course) => (
                                <StudyMaterialCard
                                    key={course.id}
                                    thumbnail={course.thumbnail}
                                    title={course.title}
                                    description={course.description}
                                    link={`/courses/${course.id}`}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Loading featured courses...</p>
                        )}
                    </div>
                </section>
                
                {/* Features Showcase */}
                <section className="w-full bg-gray-50 py-12 mt-20">
                    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden p-6 transition transform hover:scale-105 hover:shadow-xl">
                                <img src={feature.icon} alt={feature.title} className="h-16 w-16 mx-auto mb-4" />
                                <h4 className="text-xl font-semibold text-blue-600 mb-2 text-center">{feature.title}</h4>
                                <p className="text-gray-600 text-center">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Home;
