import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CoursesPage from './pages/Courses';
import AboutUsPage from './pages/Aboutus_page';
import CourseDetailsPage from './pages/CourseDetail';
import PrivateRoute from './context/PrivateRoute';
import QuizPage from './pages/QuizPage';
import Quiz from './components/Quiz';

import FlashcardTopicsPage from './pages/FlashcardPage';
import FlashcardViewPage from './components/Flashcard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/quizzes" element={<QuizPage />} />
        <Route path="/flash-cards" element={<FlashcardTopicsPage />} />
        <Route path="/flashcards/:category/:topic" element={<FlashcardViewPage />} />
        <Route
          path="/quizzes/:quizId"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>} />
        <Route
          path="/courses/:courseId"
          element={
            <PrivateRoute>
              <CourseDetailsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
