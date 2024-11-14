import { useState, useEffect } from 'react';

const QuizForm = ({ onSaveQuiz, initialData = null }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([]);

    // Load initial data if available (for editing)
    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setCategory(initialData.category);
            setDescription(initialData.description);
            setQuestions(initialData.questions || []);
        }
    }, [initialData]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', ''], answer: '' }]);
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        if (field === 'options') {
            updatedQuestions[index][field][value.optionIndex] = value.optionValue;
        } else {
            updatedQuestions[index][field] = value;
        }
        setQuestions(updatedQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveQuiz({ title, category, description, questions });
        setTitle('');
        setCategory('');
        setDescription('');
        setQuestions([]);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit Quiz' : 'Create New Quiz'}</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium">Quiz Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium">Category</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <h3 className="text-lg font-semibold mb-2">Questions</h3>
            {questions.map((question, index) => (
                <div key={index} className="mb-4 p-2 border rounded">
                    <label className="block text-sm font-medium">Question {index + 1}</label>
                    <input
                        type="text"
                        value={question.question}
                        onChange={(e) =>
                            handleQuestionChange(index, 'question', e.target.value)
                        }
                        className="w-full p-2 border rounded mb-2"
                        required
                    />
                    {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="mb-2">
                            <label className="block text-sm font-medium">Option {optionIndex + 1}</label>
                            <input
                                type="text"
                                value={option}
                                onChange={(e) =>
                                    handleQuestionChange(index, 'options', {
                                        optionIndex,
                                        optionValue: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    ))}
                    <label className="block text-sm font-medium">Correct Answer</label>
                    <input
                        type="text"
                        value={question.answer}
                        onChange={(e) =>
                            handleQuestionChange(index, 'answer', e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
            ))}
            <div className='flex gap-2'>
                <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                >
                    Add Question
                </button>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                >
                    {initialData ? 'Update Quiz' : 'Save Quiz'}
                </button>
            </div>
        </form>
    );
};

export default QuizForm;
