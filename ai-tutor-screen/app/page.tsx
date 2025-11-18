"use client";

import { useState } from "react";
import ScreenShare from "@/components/ScreenShare";
import ChatInterface from "@/components/ChatInterface";
import ControlPanel from "@/components/ControlPanel";

export default function Home() {
  const [isSharing, setIsSharing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [messages, setMessages] = useState<Array<{ role: string; content: string; timestamp: Date }>>([
    {
      role: "assistant",
      content: "👋 Hello! I'm your AI tutor. Share your screen and I'll help guide you through whatever you're learning. Click 'Start Sharing' to begin!",
      timestamp: new Date(),
    },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startScreenShare = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      setStream(mediaStream);
      setIsSharing(true);

      // Handle when user stops sharing via browser UI
      mediaStream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };

      // Add welcome message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "✅ Great! I can see your screen now. I'll analyze what you're doing and provide guidance. Feel free to ask me anything!",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error starting screen share:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Couldn't start screen sharing. Please make sure you grant permission when prompted.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const stopScreenShare = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsSharing(false);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Screen sharing stopped. Click 'Start Sharing' whenever you need help again!",
        timestamp: new Date(),
      },
    ]);
  };

  const analyzeScreen = async (_imageData: string) => {
    setIsAnalyzing(true);
    try {
      // Simulate AI analysis (in production, this would call your AI API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const insights = [
        "I can see you're working on a coding project. The code structure looks good!",
        "I notice you have a browser open. Would you like help with web development?",
        "I see some text editing happening. Let me know if you need help with formatting or content.",
        "You're navigating through files. I can help you organize or find what you need.",
        "I see a terminal window. Would you like help with command line operations?",
      ];

      const randomInsight = insights[Math.floor(Math.random() * insights.length)];

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `🔍 Analysis: ${randomInsight}`,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error analyzing screen:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sendMessage = async (message: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
        timestamp: new Date(),
      },
    ]);

    // Simulate AI response (in production, this would call your AI API)
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that. Based on what I see on your screen, I'd recommend...",
        "I understand what you're trying to do. Here's a step-by-step approach: First, you'll want to...",
        "Good thinking! To accomplish that, you should focus on...",
        "I can help with that! Let me guide you through the process...",
        "Excellent! Here's what I suggest based on your current screen...",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: randomResponse,
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">AI</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Tutor Screen Share</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your personal learning assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isSharing && (
                <span className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Live</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Screen Share Area - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ScreenShare
              stream={stream}
              isSharing={isSharing}
              onAnalyze={analyzeScreen}
              isAnalyzing={isAnalyzing}
            />
          </div>

          {/* Chat Interface - Takes 1 column */}
          <div className="lg:col-span-1">
            <ChatInterface messages={messages} onSendMessage={sendMessage} isSharing={isSharing} />
          </div>
        </div>

        {/* Control Panel */}
        <div className="mt-6">
          <ControlPanel
            isSharing={isSharing}
            onStartShare={startScreenShare}
            onStopShare={stopScreenShare}
            onAnalyze={() => {
              if (stream) {
                const video = document.querySelector("video");
                if (video) {
                  const canvas = document.createElement("canvas");
                  canvas.width = video.videoWidth;
                  canvas.height = video.videoHeight;
                  const ctx = canvas.getContext("2d");
                  if (ctx) {
                    ctx.drawImage(video, 0, 0);
                    const imageData = canvas.toDataURL("image/png");
                    analyzeScreen(imageData);
                  }
                }
              }
            }}
            isAnalyzing={isAnalyzing}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>AI Tutor Screen Share - Learn with AI assistance in real-time</p>
      </footer>
    </div>
  );
}
