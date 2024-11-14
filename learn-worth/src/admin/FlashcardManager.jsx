import { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, set, remove, onValue, push } from 'firebase/database';
import AdminLayout from '../admin/AdminLayout';
import FlashcardForm from './forms/FlashcardForm';

const FlashcardManager = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [flashcardId, setFlashcardId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentFlashcard, setCurrentFlashcard] = useState(null);

    // Fetch flashcards from the database
    useEffect(() => {
        const flashcardsRef = ref(database, 'flashcards');
        const unsubscribe = onValue(flashcardsRef, (snapshot) => {
            const data = snapshot.val();
            const flashcardsList = data
                ? Object.entries(data).map(([id, flashcard]) => ({ id, ...flashcard }))
                : [];
            setFlashcards(flashcardsList);
        });
        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    // Save or update flashcard in the database
    const onSaveFlashcard = async (newFlashcard) => {
        try {
            // Check if a flashcard with the same category and topic already exists
            const existingFlashcard = flashcards.find(
                (flashcard) => 
                    flashcard.category === newFlashcard.category && 
                    flashcard.topic === newFlashcard.topic
            );

            if (existingFlashcard) {
                // Update existing flashcard by appending new question and answer
                const updatedFlashcard = {
                    ...existingFlashcard,
                    questions: [...(existingFlashcard.questions || []), newFlashcard.question],
                    answers: [...(existingFlashcard.answers || []), newFlashcard.answer],
                };

                const flashcardRef = ref(database, `flashcards/${existingFlashcard.id}`);
                await set(flashcardRef, updatedFlashcard);

            } else {
                // Create a new flashcard entry
                const newFlashcardData = {
                    category: newFlashcard.category,
                    topic: newFlashcard.topic,
                    questions: [newFlashcard.question],
                    answers: [newFlashcard.answer],
                };

                const newFlashcardRef = ref(database, `flashcards/${push(ref(database, 'flashcards')).key}`);
                await set(newFlashcardRef, newFlashcardData);
            }

            // Reset form and state after saving
            setFlashcardId(null);
            setCurrentFlashcard(null);
            setIsFormVisible(false);
        } catch (error) {
            console.error("Error saving flashcard:", error);
        }
    };

    // Populate form fields with flashcard data for editing
    const handleEditFlashcard = (flashcard) => {
        setFlashcardId(flashcard.id);
        setCurrentFlashcard(flashcard); // Pass data to form for pre-filling
        setIsFormVisible(true);
    };

    // Delete a flashcard from the database
    const handleDeleteFlashcard = async (id) => {
        // Show confirmation popup
        const confirmed = window.confirm("Are you sure you want to delete this flashcard?");
        if (confirmed) {
            // If confirmed, proceed with deletion
            const flashcardRef = ref(database, `flashcards/${id}`);
            remove(flashcardRef)
                .then(() => {
                    // console.log("Flashcard deleted successfully.");
                    alert("Flashcard deleted successfully");
                })
                .catch((error) => {
                    // console.error("Error deleting flashcard:", error);
                    alert("Error deleting flashcard: " + error.message);
                });
        }
    };

    return (
        <AdminLayout title="Flashcard Manager">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Flashcards</h2>
                <button
                    onClick={() => {
                        setIsFormVisible(!isFormVisible);
                        setFlashcardId(null); // Reset flashcardId when creating a new one
                        setCurrentFlashcard(null); // Clear form data
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {flashcardId ? 'Update Flashcard' : 'Create Flashcard'}
                </button>
            </div>

            {isFormVisible && (
                <FlashcardForm
                    onSaveFlashcard={onSaveFlashcard}
                    initialData={currentFlashcard} // Pass current flashcard data for editing
                />
            )}

            <ul>
                {flashcards.map((flashcard) => (
                    <li key={flashcard.id} className="flex justify-between items-center p-2 border-b">
                        <div>
                            <h3 className="font-semibold">{flashcard.category}</h3>
                            <p className="text-sm">{flashcard.topic}</p>
                            <p className="text-gray-700">Number of Questions: {flashcard.questions?.length || 0}</p>
                        </div>
                        <div className="flex items-center">
                            <button onClick={() => handleEditFlashcard(flashcard)} className="text-blue-500 mr-2">Edit</button>
                            <button onClick={() => handleDeleteFlashcard(flashcard.id)} className="text-red-500 mr-2">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </AdminLayout>
    );
};

export default FlashcardManager;
