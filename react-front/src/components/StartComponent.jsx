import React from 'react';
import '../index.css';

export default function StartComponent({ onStart }) {
  const [name, setName] = React.useState('');
  const [nativeLanguage, setNativeLanguage] = React.useState('');
  const [learningLanguage, setLearningLanguage] = React.useState('');

  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Chinese',
    'Japanese',
    'Russian',
    'Portuguese',
    'Norwegian',
    'Swedish',
    'Danish',
    'Finnish',
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-md p-10 rounded-lg">
      <div className="flex flex-col space-y-8"> {/* Alineación vertical y aumento en el espaciado */}
        <input type="text" placeholder="Your name" onChange={e => setName(e.target.value)} />
        <select onChange={e => setNativeLanguage(e.target.value)}>
          <option value="">Choose your native language</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
        <select onChange={e => setLearningLanguage(e.target.value)}>
          <option value="">Choose the language you want to practice</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
        <button className="bg-blue-500 text-white p-2 rounded" onClick={() => onStart({ name, nativeLanguage, learningLanguage })}>
          Start practicing
        </button>
      </div>

    </div>
  );
}

