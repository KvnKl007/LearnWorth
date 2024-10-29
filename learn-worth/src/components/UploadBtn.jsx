import React from 'react';
import { FaUpload } from 'react-icons/fa'; // Font Awesome for the upload icon

const FileUploadButton = ({ onFileChange }) => {
    const handleFileInputChange = (e) => {
        onFileChange(e.target.files[0]);
    };

    return (
        <div>
            {/* Hidden file input */}
            <input
                type="file"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
            />

            {/* Custom button to trigger file upload */}
            <label
                htmlFor="file-upload"
                className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
            >
                <FaUpload className="mr-2" /> {/* Upload icon */}
                Upload file
            </label>
        </div>
    );
};

export default FileUploadButton;
