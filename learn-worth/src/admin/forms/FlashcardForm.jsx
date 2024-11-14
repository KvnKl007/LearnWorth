import { useState, useEffect } from 'react';

const FlashcardForm = ({ onSaveFlashcard, initialData = null }) => {
    // State to manage form fields
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [category, setCategory] = useState('');
    const [topic, setTopic] = useState('');

    // Populate the form fields with initial data when editing
    useEffect(() => {
        if (initialData) {
            setQuestion(initialData.question || '');
            setAnswer(initialData.answer || '');
            setCategory(initialData.category || '');
            setTopic(initialData.topic || '');
        } else {
            setQuestion('');
            setAnswer('');
            setCategory('');
            setTopic('');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newFlashcard = { question, answer, category, topic };
        onSaveFlashcard(newFlashcard);

        // Clear the form fields after saving
        setQuestion('');
        setAnswer('');
        setCategory('');
        setTopic('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                className="border p-2 w-full"
                required
            />
            <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Topic"
                className="border p-2 w-full"
                required
            />
            <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Question"
                className="border p-2 w-full"
                required
            />
            <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Answer"
                className="border p-2 w-full"
                required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                {initialData ? 'Update Flashcard' : 'Save Flashcard'}
            </button>
        </form>
    );
};

export default FlashcardForm;
