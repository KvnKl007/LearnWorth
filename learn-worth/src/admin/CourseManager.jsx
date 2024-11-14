import { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, set, remove, onValue } from 'firebase/database';
import AdminLayout from '../admin/AdminLayout';
import CourseForm from './forms/CourseForm';

const CourseManager = () => {
    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);

    // Fetch courses from the database
    useEffect(() => {
        const coursesRef = ref(database, 'courses');
        onValue(coursesRef, (snapshot) => {
            const data = snapshot.val();
            const coursesList = data ? Object.entries(data).map(([id, course]) => ({ id, ...course })) : [];
            setCourses(coursesList);
        });
    }, []);

    // Save or update course in the database
    const onSaveCourse = async (course) => {
        try {
            const courseRef = ref(database, `courses/${courseId || Date.now()}`);
            await set(courseRef, course);
            setCourseId(null);
            setIsFormVisible(false);
        } catch (error) {
            console.error("Error saving course:", error);
        }
    };

    // Populate form fields with course data for editing
    const handleEditCourse = (course) => {
        setCourseId(course.id);
        setCurrentCourse(course); // Pass data to form for pre-filling
        setIsFormVisible(true);
    };

    // Delete a course from the database
    const handleDeleteCourse = async (id) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this course?");
            if (confirmed) {
                const courseRef = ref(database, `courses/${id}`);
                await remove(courseRef);
                // console.log("Course deleted successfully");
                // Optional: Show success message
                alert("Course deleted successfully");
                
                // If the deleted course was being edited, close the form
                if (courseId === id) {
                    setIsFormVisible(false);
                    setCourseId(null);
                    setCurrentCourse(null);
                }
            }
        } catch (error) {
            // console.error("Error deleting course:", error);
            alert("Error deleting course: " + error.message);
        }
    };

    return (
        <AdminLayout title="Course Manager">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Courses</h2>
                <button
                    onClick={() => {
                        setIsFormVisible(!isFormVisible)
                        setCourseId(null); // Reset flashcardId when creating a new one
                        setCurrentCourse(null); // Clear form data
                        }
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {courseId ? 'Update Course' : 'Create Course'}
                </button>
            </div>

            {isFormVisible && (
                <CourseForm onSaveCourse={onSaveCourse}
                initialData={currentCourse} />
            )}

            <ul>
                {courses.map((course) => (
                    <li key={course.id} className="flex justify-between items-center p-2 border-b">
                        <div className="flex items-center">
                            {course.thumbnail && (
                                <img src={course.thumbnail} alt={course.title} className="w-16 h-16 object-cover mr-4" />
                            )}
                            <div>
                                <h3 className="font-semibold">{course.title}</h3>
                                <p className="text-sm text-gray-600">{course.category}</p>
                                <p className="text-sm">{course.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button onClick={() => handleEditCourse(course)} className="text-blue-500 mr-2">Edit</button>
                            <button onClick={() => handleDeleteCourse(course.id)} className="text-red-500 mr-2">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </AdminLayout>
    );
};

export default CourseManager;
