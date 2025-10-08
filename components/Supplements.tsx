
import React from 'react';

const supplements = [
  "Potassium",
  "B-12",
  "MNM",
  "BP Mix (Beetroot, Hawthorn, Cayenne)",
  "Beet Supplements",
  "ON Fitness Protein Shake",
];

export const Supplements: React.FC = () => {
  return (
    <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-6 my-6">
      <h2 className="text-2xl font-bold text-blue-300 mb-4">Your Supplement Stack</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {supplements.map((supplement, index) => (
          <li key={index} className="bg-gray-700 rounded px-3 py-2 text-sm text-gray-200 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {supplement}
          </li>
        ))}
      </ul>
    </div>
  );
};
