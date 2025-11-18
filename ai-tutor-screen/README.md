# 🎓 AI Tutor Screen Share

An innovative web application that enables users to share their screen and receive real-time AI-powered tutoring and guidance - like having a personal tutor watching and helping you learn!

![AI Tutor Screen Share](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🖥️ **Real-time Screen Sharing** - Share your screen using WebRTC technology
- 🤖 **AI-Powered Assistance** - Get contextual guidance from AI tutor
- 💬 **Interactive Chat Interface** - Communicate with your AI tutor in real-time
- 🎯 **Quick Actions** - Pre-built prompts for common questions
- 📊 **Session Monitoring** - Track your learning session status
- 🎨 **Modern UI/UX** - Beautiful gradient design with glassmorphism effects
- 📱 **Responsive Design** - Works on desktop and tablet devices
- 🌙 **Dark Mode Support** - Automatic dark/light theme switching

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Screen sharing permissions enabled

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd ai-tutor-screen
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🎯 How to Use

1. **Start the Application**
   - Open the app in your browser
   - You'll see the welcome message from your AI tutor

2. **Share Your Screen**
   - Click the green "Start Sharing" button in the Control Panel
   - Select the screen/window you want to share
   - Grant permission when prompted by your browser

3. **Interact with AI Tutor**
   - Type questions in the chat interface
   - Use quick action buttons for common queries:
     - 💡 Explain this
     - 🎯 Next step
     - 🔍 Analyze
     - ❓ Help

4. **Get AI Analysis**
   - Click "Analyze Now" to get instant feedback on your current screen
   - The AI will provide contextual suggestions and guidance

5. **Stop Sharing**
   - Click the red "Stop Sharing" button when you're done

## 🔧 Configuration

### Integrating Real AI (OpenAI, Anthropic, etc.)

The current implementation uses simulated AI responses. To integrate real AI:

1. **Install AI SDK:**
   ```bash
   npm install openai
   # or
   npm install @anthropic-ai/sdk
   ```

2. **Create API Route** (`app/api/chat/route.ts`):
   ```typescript
   import OpenAI from 'openai';
   
   const openai = new OpenAI({
     apiKey: process.env.OPENAI_API_KEY,
   });
   
   export async function POST(req: Request) {
     const { message, imageData } = await req.json();
     
     const response = await openai.chat.completions.create({
       model: "gpt-4-vision-preview",
       messages: [
         {
           role: "user",
           content: [
             { type: "text", text: message },
             { type: "image_url", image_url: { url: imageData } }
           ],
         },
       ],
     });
     
     return Response.json({ 
       message: response.choices[0].message.content 
     });
   }
   ```

3. **Update Environment Variables** (`.env.local`):
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Modify Frontend** (`app/page.tsx`):
   ```typescript
   const sendMessage = async (message: string) => {
     // Capture current screen frame
     const imageData = captureScreenFrame();
     
     const response = await fetch('/api/chat', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ message, imageData }),
     });
     
     const data = await response.json();
     // Update messages with AI response
   };
   ```

### Screen Capture Configuration

Adjust screen capture quality in `app/page.tsx`:

```typescript
const mediaStream = await navigator.mediaDevices.getDisplayMedia({
  video: {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    frameRate: { ideal: 30 }
  },
  audio: false,
});
```

## 🏗️ Project Structure

```
ai-tutor-screen/
├── app/
│   ├── page.tsx              # Main application page
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles
├── components/
│   ├── ScreenShare.tsx       # Screen sharing component
│   ├── ChatInterface.tsx     # Chat UI component
│   └── ControlPanel.tsx      # Control panel with buttons
├── public/                   # Static assets
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🎨 Customization

### Changing Colors

Edit the gradient colors in components:

```typescript
// Header gradient
className="bg-gradient-to-r from-indigo-500 to-purple-600"

// Background gradient
className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
```

### Adding New Quick Actions

In `components/ChatInterface.tsx`:

```typescript
const quickActions = [
  { icon: "💡", text: "Explain this", action: "Can you explain what I'm looking at?" },
  { icon: "🎯", text: "Next step", action: "What should I do next?" },
  // Add your custom actions here
  { icon: "🔥", text: "Custom", action: "Your custom prompt" },
];
```

## 🔒 Privacy & Security

- **Local Processing**: Screen data is processed locally in your browser
- **No Storage**: Screen captures are not stored permanently
- **Secure Connection**: Use HTTPS in production
- **API Keys**: Never expose API keys in client-side code
- **Permissions**: Users must explicitly grant screen sharing permission

## 🌐 Browser Compatibility

| Browser | Screen Share | Chat | AI Analysis |
|---------|-------------|------|-------------|
| Chrome  | ✅          | ✅   | ✅          |
| Firefox | ✅          | ✅   | ✅          |
| Safari  | ✅          | ✅   | ✅          |
| Edge    | ✅          | ✅   | ✅          |

## 📝 Use Cases

- **Programming Tutorials**: Learn coding with AI guidance
- **Software Training**: Get help using new applications
- **Homework Help**: Receive step-by-step assistance
- **Skill Development**: Learn new computer skills
- **Troubleshooting**: Get help fixing technical issues
- **Design Feedback**: Receive real-time design critiques

## 🚧 Roadmap

- [ ] Session recording and playback
- [ ] Voice interaction with AI tutor
- [ ] Multi-language support
- [ ] Screen annotation tools
- [ ] Collaborative learning sessions
- [ ] Progress tracking and analytics
- [ ] Mobile app support
- [ ] Integration with learning platforms

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- WebRTC for screen sharing

## 📧 Support

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for learners everywhere**
