import React from 'react';
import { Link } from 'react-router-dom';

const StudyMaterialCard = ({ thumbnail, title, description, link }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-200 hover:scale-105 hover:shadow-xl max-w-xs">
            {/* Thumbnail */}
            <img
                src={thumbnail}
                alt="Course Thumbnail"
                className="h-48 w-full object-cover"
            />

            {/* Content */}
            <div className="p-6">
                {/* Course Name */}
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                    {title}
                </h3>

                {/* Short Description */}
                <p className="text-gray-600 mb-4">
                    {description}
                </p>

                {/* View More Link */}
                <Link to={link} className="text-blue-500 font-medium hover:underline">
                    View More
                </Link>
            </div>
        </div>
    );
};

export default StudyMaterialCard;
