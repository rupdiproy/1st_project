# 🎓 AI Tutor Screen Share Application

A modern, full-stack web application that enables users to share their screen and receive real-time AI-powered tutoring and guidance - like having a personal tutor watching and helping you learn!

## 🌟 Project Overview

This application combines **WebRTC screen sharing** with **AI-powered assistance** to create an interactive learning experience. Users can share their screen while an AI tutor provides contextual guidance, explanations, and step-by-step instructions.

### Key Features

✅ **Real-time Screen Sharing** using WebRTC  
✅ **AI-Powered Chat Interface** for interactive guidance  
✅ **Screen Analysis** with AI vision capabilities  
✅ **Modern UI/UX** with Tailwind CSS and gradient designs  
✅ **Responsive Design** for desktop and tablet  
✅ **Dark Mode Support** with automatic theme switching  
✅ **Quick Action Buttons** for common queries  
✅ **Session Monitoring** with status indicators  

## 📁 Project Structure

```
/vercel/sandbox/
├── ai-tutor-screen/          # Main Next.js application
│   ├── app/                  # Next.js app directory
│   │   ├── page.tsx         # Main application page
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── ScreenShare.tsx  # Screen sharing component
│   │   ├── ChatInterface.tsx # Chat UI component
│   │   └── ControlPanel.tsx # Control panel
│   ├── README.md            # Detailed documentation
│   ├── INTEGRATION_GUIDE.md # AI integration guide
│   └── package.json         # Dependencies
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Screen sharing permissions

### Installation & Running

```bash
# Navigate to the application directory
cd ai-tutor-screen

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🎯 How It Works

1. **User shares their screen** using WebRTC's `getDisplayMedia` API
2. **Screen frames are captured** periodically or on-demand
3. **AI analyzes the screen** using vision-capable models (GPT-4 Vision, Claude, Gemini)
4. **AI provides guidance** through an interactive chat interface
5. **Users interact** via text chat or quick action buttons

## 🔌 AI Integration

The application currently uses **simulated AI responses** for demonstration. To integrate real AI:

### Option 1: OpenAI (GPT-4 Vision)
```bash
npm install openai
```
See `INTEGRATION_GUIDE.md` for detailed setup instructions.

### Option 2: Anthropic (Claude)
```bash
npm install @anthropic-ai/sdk
```

### Option 3: Google (Gemini)
```bash
npm install @google/generative-ai
```

**Full integration instructions** are available in:
- `ai-tutor-screen/INTEGRATION_GUIDE.md`
- `ai-tutor-screen/README.md`

## 🎨 Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Modern utility-first CSS
- **React Hooks** - State management

### APIs & Services
- **WebRTC** - Screen sharing
- **Socket.io** - Real-time communication (ready for integration)
- **AI APIs** - OpenAI, Anthropic, or Google (integration ready)

### Design
- **Gradient backgrounds** with soft color transitions
- **Glassmorphism effects** for modern UI
- **Responsive grid layouts** for all screen sizes
- **Smooth animations** and transitions

## 📱 Use Cases

- **Programming Education** - Learn coding with AI guidance
- **Software Training** - Get help using new applications
- **Homework Assistance** - Receive step-by-step help
- **Skill Development** - Learn new computer skills
- **Technical Support** - Get help troubleshooting issues
- **Design Feedback** - Receive real-time critiques

## 🔒 Privacy & Security

- Screen data is processed locally in the browser
- No permanent storage of screen captures
- Users must explicitly grant screen sharing permission
- API keys should be stored securely in environment variables
- HTTPS recommended for production deployment

## 🌐 Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Screen Share | ✅ | ✅ | ✅ | ✅ |
| Chat | ✅ | ✅ | ✅ | ✅ |
| AI Analysis | ✅ | ✅ | ✅ | ✅ |

## 📊 Application Screenshots

The application features:
- **Header** with branding and live status indicator
- **Screen Share Area** with video display and analysis overlay
- **Chat Interface** with message history and quick actions
- **Control Panel** with start/stop buttons and status cards
- **Responsive Layout** that adapts to different screen sizes

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Environment Variables

Create `.env.local` in the `ai-tutor-screen` directory:

```env
# OpenAI
OPENAI_API_KEY=your_openai_key

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_key

# Google
GOOGLE_API_KEY=your_google_key
```

## 🚧 Future Enhancements

- [ ] Session recording and playback
- [ ] Voice interaction with AI
- [ ] Multi-language support
- [ ] Screen annotation tools
- [ ] Collaborative learning sessions
- [ ] Progress tracking and analytics
- [ ] Mobile app support
- [ ] Integration with LMS platforms

## 📚 Documentation

- **Main README**: `ai-tutor-screen/README.md`
- **Integration Guide**: `ai-tutor-screen/INTEGRATION_GUIDE.md`
- **Component Docs**: See inline comments in component files

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional AI provider integrations
- Enhanced UI/UX features
- Performance optimizations
- Accessibility improvements
- Documentation updates

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Tailwind CSS** - Styling
- **WebRTC** - Screen sharing technology
- **OpenAI/Anthropic/Google** - AI capabilities

## 📧 Support

For questions or issues:
1. Check the documentation in `ai-tutor-screen/README.md`
2. Review the integration guide in `INTEGRATION_GUIDE.md`
3. Open an issue on GitHub

---

**Built with ❤️ for learners everywhere**

*Start learning with AI assistance today!*
