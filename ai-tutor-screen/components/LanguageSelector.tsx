"use client";

import { useState } from 'react';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  interactionMode: 'text' | 'voice';
  onModeChange: (mode: 'text' | 'voice') => void;
  isTranslating: boolean;
  onTranslatingChange: (translating: boolean) => void;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  // Add more languages as needed
];

export default function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
  interactionMode,
  onModeChange,
  isTranslating,
  onTranslatingChange,
}: LanguageSelectorProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = selectedLanguage;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      // Send the voice input as a message
      // This would need to be passed as a prop or use context
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interaction Settings</h3>

      {/* Mode Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Interaction Mode
        </label>
        <div className="flex space-x-2">
          <button
            onClick={() => onModeChange('text')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              interactionMode === 'text'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            📝 Text
          </button>
          <button
            onClick={() => onModeChange('voice')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              interactionMode === 'voice'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            🎤 Voice
          </button>
        </div>
      </div>

      {/* Language Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Language
        </label>
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Voice Controls */}
      {interactionMode === 'voice' && (
        <div className="mb-4">
          <button
            onClick={startVoiceRecognition}
            disabled={isListening}
            className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isListening ? '🎙️ Listening...' : '🎤 Start Voice Input'}
          </button>
          {transcript && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Heard: "{transcript}"
            </p>
          )}
        </div>
      )}

      {/* Real-time Translation Toggle */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="translation"
          className="mr-2"
          // Add state for translation toggle
        />
        <label htmlFor="translation" className="text-sm text-gray-700 dark:text-gray-300">
          Enable Real-time Translation
        </label>
      </div>
    </div>
  );
}