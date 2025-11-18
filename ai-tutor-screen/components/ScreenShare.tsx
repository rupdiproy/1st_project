"use client";

import { useEffect, useRef } from "react";

interface ScreenShareProps {
  stream: MediaStream | null;
  isSharing: boolean;
  onAnalyze: (imageData: string) => void;
  isAnalyzing: boolean;
}

export default function ScreenShare({ stream, isSharing, isAnalyzing }: ScreenShareProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Screen Share</span>
        </h2>
      </div>

      {/* Video Container */}
      <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
        {isSharing && stream ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-contain"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl px-6 py-4 flex items-center space-x-3">
                  <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-900 dark:text-white font-medium">Analyzing screen...</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No Screen Shared</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Click the &quot;Start Sharing&quot; button below to share your screen and receive AI-powered guidance
            </p>
          </div>
        )}
      </div>

      {/* Info Bar */}
      {isSharing && (
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-white">Status:</span> Active
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-white">Quality:</span> HD
              </span>
            </div>
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">AI Monitoring</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
