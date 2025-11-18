"use client";

import { useState } from 'react';

interface UniqueAIFeaturesProps {
  isSharing: boolean;
  onFeatureActivate: (feature: string) => void;
}

export default function UniqueAIFeatures({ isSharing, onFeatureActivate }: UniqueAIFeaturesProps) {
  const [activeFeatures, setActiveFeatures] = useState<string[]>([]);

  const features = [
    {
      id: 'focus-tracker',
      name: 'Focus Tracker',
      description: 'Tracks user attention and suggests breaks when focus wanes',
      icon: '👁️',
      unique: 'Uses eye-tracking simulation to detect engagement levels'
    },
    {
      id: 'code-completion',
      name: 'Smart Code Completion',
      description: 'Provides contextual code suggestions during programming sessions',
      icon: '💻',
      unique: 'Learns from user patterns and suggests personalized completions'
    },
    {
      id: 'learning-path',
      name: 'Adaptive Learning Path',
      description: 'Creates personalized learning journeys based on user progress',
      icon: '🧠',
      unique: 'Dynamically adjusts difficulty and topics based on real-time assessment'
    },
    {
      id: 'gesture-control',
      name: 'Gesture Recognition',
      description: 'Control the interface with hand gestures',
      icon: '🤏',
      unique: 'Recognizes educational gestures like pointing, writing in air'
    },
    {
      id: 'emotion-analysis',
      name: 'Emotion Analysis',
      description: 'Detects user emotions to provide empathetic responses',
      icon: '😊',
      unique: 'Uses facial expression analysis for better tutoring'
    },
    {
      id: 'collaborative-mode',
      name: 'Collaborative Learning',
      description: 'Connect with other learners for group study sessions',
      icon: '👥',
      unique: 'AI-moderated peer learning with intelligent matching'
    }
  ];

  const toggleFeature = (featureId: string) => {
    setActiveFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
    onFeatureActivate(featureId);
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Unique AI Features</h3>

      <div className="space-y-3">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`p-3 rounded-lg border transition-colors cursor-pointer ${
              activeFeatures.includes(feature.id)
                ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300 dark:border-indigo-600'
                : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            onClick={() => toggleFeature(feature.id)}
          >
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{feature.icon}</span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {feature.name}
                  {activeFeatures.includes(feature.id) && (
                    <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {feature.description}
                </p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 font-medium">
                  Unique: {feature.unique}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeFeatures.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Active Features:</strong> {activeFeatures.length} feature(s) enabled.
            These unique AI capabilities will enhance your learning experience!
          </p>
        </div>
      )}
    </div>
  );
}