import { useState, useEffect } from 'react';
import StudyMaterialCard from '../components/CourseCard/StudyMaterial';
import Navbar from '../components/Navbar';
// import courseData from '../assets/Data/CourseData'; // This will be replaced
import Footer from '../components/Footer';
import { database } from '../firebaseConfig'; // Import Firebase config
import { ref, onValue } from 'firebase/database'; // Import necessary Firebase functions

const categories = ['All', 'Mathematics', 'Science', 'Computer Science'];

const CoursesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [courses, setCourses] = useState([]); // State to hold courses

    // Fetch courses from the database
    useEffect(() => {
        const coursesRef = ref(database, 'courses');
        onValue(coursesRef, (snapshot) => {
            const data = snapshot.val();
            const coursesList = data ? Object.entries(data).map(([id, course]) => ({ id, ...course })) : [];
            setCourses(coursesList); // Update state with fetched courses
        });
    }, []);

    // Filter courses based on search term and selected category
    const filteredCourses = courses.filter(course => {
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <Navbar />
            <section className="w-full max-w-5xl mx-auto p-6 space-y-8 mb-48">
                {/* Search and Categories */}
                <div className="space-y-4 mt-20">
                    <h2 className="text-3xl font-bold text-blue-600 ">Explore Our Courses</h2>

                    {/* Search Input */}
                    <div className="relative max-w-md">
                        <input
                            type="text"
                            placeholder="Search for courses..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                                    } hover:bg-blue-500 hover:text-white transition`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Courses List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course, index) => (
                            <StudyMaterialCard
                                key={index}
                                thumbnail={course.thumbnail}
                                title={course.title}
                                description={course.description}
                                link={`/courses/${course.id}`}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No courses found for the current search and filter.</p>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default CoursesPage;
