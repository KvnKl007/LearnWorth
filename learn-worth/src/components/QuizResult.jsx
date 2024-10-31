import React from 'react';

const QuizResult = ({ score, totalQuestions, onRetry, onBack }) => {
    const passedThreshold = totalQuestions * 0.7; // 70% threshold for passing
    const halfwayThreshold = totalQuestions / 2;

    let resultColor = 'bg-red-500'; // Default to red for failing
    let resultText = "Better luck next time!";

    if (score >= passedThreshold) {
        resultColor = 'bg-green-500';
        resultText = "Congratulations, you passed!";
    } else if (score >= halfwayThreshold) {
        resultColor = 'bg-yellow-500';
        resultText = "Almost there, keep going!";
    }

    const percentage = Math.round((score / totalQuestions) * 100);

    return (
        <div className="flex flex-col items-center mt-8 p-8 rounded-lg shadow-md bg-white w-full max-w-md">
            {/* Circle for Result */}
            <div className={`w-24 h-24 flex items-center justify-center rounded-full ${resultColor} text-white text-2xl font-bold`}>
                {percentage}%
            </div>

            {/* Result Text */}
            <h2 className="mt-4 text-2xl font-semibold text-gray-700">{resultText}</h2>

            {/* Feedback Text */}
            <p className="mt-2 text-gray-500">
                You scored {score} out of {totalQuestions} correct answers.
            </p>

            {/* Button Group */}
            <div className="flex mt-6 space-x-4">
                <button onClick={onRetry} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                    Try Again
                </button>
                <button onClick={onBack} className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-400 transition">
                    Next Quiz
                </button>
            </div>
        </div>
    );
};

export default QuizResult;
