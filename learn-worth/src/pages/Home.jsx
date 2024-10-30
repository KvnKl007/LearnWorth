import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StudyMaterialCard from '../components/CourseCard/StudyMaterial';
import courseData from '../assets/Data/CourseData';

const Home = () => {
    // Display only the first 3 courses as featured courses
    const featuredCourses = courseData.slice(0, 3);
    return (
        <>
            <Navbar />
            {/* hero section */}
            <div className="flex flex-col items-center py-20 px-4 md:p-10 bg-white">
                <Hero />
                {/* float at the bottom of hero section */}
                <section className="text-center bg-blue-600 text-white p-8 rounded-lg w-full max-w-3xl mb-8 shadow-md">
                    <h1 className="text-4xl font-bold mb-4">Welcome to LearnWorth</h1>
                    <p className="mb-6">Discover a wealth of study materials and take your learning to the next level!</p>
                    <Link to="/register">
                        <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
                            Get Started
                        </button>
                    </Link>
                </section>

                {/* Featured Study Materials */}
                <section className="w-full max-w-4xl">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Featured Study Materials</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Sample Card */}
                        {featuredCourses.map((course, index) => (
                            <StudyMaterialCard
                                key={index}
                                thumbnail={course.thumbnail}
                                title={course.title}
                                description={course.description}
                                link={course.link} />
                        ))}

                        {/* Repeat for more cards */}
                    </div>
                </section>
            </div>
        </>

    );
};

export default Home;
