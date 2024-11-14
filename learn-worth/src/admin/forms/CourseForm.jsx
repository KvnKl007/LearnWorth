import { useState, useEffect } from 'react';
import { storage } from '../../firebaseConfig'; // Firebase storage import
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const CourseForm = ({ onSaveCourse, onFileChange, initialData = null }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [category, setCategory] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    // Load initial data when the form is opened in edit mode
    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setCategory(initialData.category || '');
            setThumbnailUrl(initialData.thumbnail || '');
            setVideoUrl(initialData.videoUrl || '');
        }
    }, [initialData]);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            setThumbnailUrl(''); // Clear URL when a new file is chosen
            if (onFileChange) {
                onFileChange(file);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let updatedThumbnailUrl = thumbnailUrl;

        // Upload new thumbnail if a file is selected
        if (thumbnail) {
            const thumbnailRef = storageRef(storage, `thumbnails/${thumbnail.name}`);
            await uploadBytes(thumbnailRef, thumbnail);
            updatedThumbnailUrl = await getDownloadURL(thumbnailRef);
        }

        const newCourse = { title, description, thumbnail: updatedThumbnailUrl, category, videoUrl };
        await onSaveCourse(newCourse);

        // Reset form fields
        setTitle('');
        setDescription('');
        setThumbnail(null);
        setThumbnailUrl('');
        setCategory('');
        setVideoUrl('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="border p-2 w-full"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="border p-2 w-full"
                required
            />
            <input
                type="file"
                onChange={handleFileInputChange}
            />
            {/* Display existing thumbnail preview or uploaded file name */}
            {thumbnailUrl && !thumbnail && (
                <img src={thumbnailUrl} alt="Thumbnail Preview" className="w-24 h-24" />
            )}
            {thumbnail && <p>Uploaded file: {thumbnail.name}</p>}
            <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                className="border p-2 w-full"
                required
            />
            {/* Video URL input */}
            <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Video URL"
                className="border p-2 w-full"
                required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Course</button>
        </form>
    );
};

export default CourseForm;
