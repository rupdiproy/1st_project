# 🔌 AI Integration Guide

This guide will help you integrate real AI services into your AI Tutor Screen Share application.

## Table of Contents

1. [OpenAI Integration](#openai-integration)
2. [Anthropic Claude Integration](#anthropic-claude-integration)
3. [Google Gemini Integration](#google-gemini-integration)
4. [Screen Analysis Setup](#screen-analysis-setup)
5. [Best Practices](#best-practices)

---

## OpenAI Integration

### Step 1: Install Dependencies

```bash
npm install openai
```

### Step 2: Set Up Environment Variables

Create `.env.local` in the root directory:

```env
OPENAI_API_KEY=sk-your-api-key-here
```

### Step 3: Create API Route

Create `app/api/chat/route.ts`:

```typescript
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, imageData, conversationHistory } = await req.json();

    const messages: any[] = [
      {
        role: "system",
        content: "You are a helpful AI tutor. You can see the user's screen and provide guidance, explanations, and step-by-step instructions. Be encouraging, clear, and educational."
      },
      ...conversationHistory,
    ];

    // If there's screen data, include it
    if (imageData) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: message },
          { 
            type: "image_url", 
            image_url: { 
              url: imageData,
              detail: "high"
            } 
          }
        ],
      });
    } else {
      messages.push({
        role: "user",
        content: message,
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview", // or "gpt-4o" for better vision
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    return NextResponse.json({ 
      message: response.choices[0].message.content,
      success: true
    });
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json({ 
      error: error.message,
      success: false
    }, { status: 500 });
  }
}
```

### Step 4: Update Frontend

Modify `app/page.tsx` to call the API:

```typescript
const sendMessage = async (message: string) => {
  // Add user message
  setMessages((prev) => [
    ...prev,
    { role: "user", content: message, timestamp: new Date() },
  ]);

  try {
    // Capture screen frame if sharing
    let imageData = null;
    if (stream) {
      imageData = await captureScreenFrame();
    }

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message, 
        imageData,
        conversationHistory: messages.slice(-10) // Last 10 messages for context
      }),
    });

    const data = await response.json();

    if (data.success) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message, timestamp: new Date() },
      ]);
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Error sending message:', error);
    setMessages((prev) => [
      ...prev,
      { 
        role: "assistant", 
        content: "Sorry, I encountered an error. Please try again.", 
        timestamp: new Date() 
      },
    ]);
  }
};

// Helper function to capture screen frame
const captureScreenFrame = async (): Promise<string> => {
  return new Promise((resolve) => {
    const video = document.querySelector('video');
    if (!video) {
      resolve('');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    } else {
      resolve('');
    }
  });
};
```

---

## Anthropic Claude Integration

### Step 1: Install Dependencies

```bash
npm install @anthropic-ai/sdk
```

### Step 2: Environment Variables

```env
ANTHROPIC_API_KEY=sk-ant-your-api-key-here
```

### Step 3: Create API Route

Create `app/api/chat/route.ts`:

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, imageData } = await req.json();

    const content: any[] = [];

    // Add image if available
    if (imageData) {
      // Remove data URL prefix
      const base64Image = imageData.split(',')[1];
      content.push({
        type: "image",
        source: {
          type: "base64",
          media_type: "image/jpeg",
          data: base64Image,
        },
      });
    }

    // Add text message
    content.push({
      type: "text",
      text: message,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: "You are a helpful AI tutor. You can see the user's screen and provide guidance, explanations, and step-by-step instructions. Be encouraging, clear, and educational.",
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
    });

    return NextResponse.json({ 
      message: response.content[0].type === 'text' ? response.content[0].text : '',
      success: true
    });
  } catch (error: any) {
    console.error('Anthropic API Error:', error);
    return NextResponse.json({ 
      error: error.message,
      success: false
    }, { status: 500 });
  }
}
```

---

## Google Gemini Integration

### Step 1: Install Dependencies

```bash
npm install @google/generative-ai
```

### Step 2: Environment Variables

```env
GOOGLE_API_KEY=your-google-api-key-here
```

### Step 3: Create API Route

Create `app/api/chat/route.ts`:

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message, imageData } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      systemInstruction: "You are a helpful AI tutor. You can see the user's screen and provide guidance, explanations, and step-by-step instructions. Be encouraging, clear, and educational."
    });

    const parts: any[] = [{ text: message }];

    // Add image if available
    if (imageData) {
      const base64Image = imageData.split(',')[1];
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      });
    }

    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ 
      message: text,
      success: true
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ 
      error: error.message,
      success: false
    }, { status: 500 });
  }
}
```

---

## Screen Analysis Setup

### Automatic Screen Analysis

Add periodic screen analysis in `app/page.tsx`:

```typescript
useEffect(() => {
  if (!isSharing || !stream) return;

  // Analyze screen every 30 seconds
  const interval = setInterval(async () => {
    const imageData = await captureScreenFrame();
    
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageData }),
    });

    const data = await response.json();
    
    if (data.insights) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `🔍 Auto-analysis: ${data.insights}`,
          timestamp: new Date(),
        },
      ]);
    }
  }, 30000); // 30 seconds

  return () => clearInterval(interval);
}, [isSharing, stream]);
```

### Create Analysis API Route

Create `app/api/analyze/route.ts`:

```typescript
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { imageData } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: "Analyze this screen and provide brief, helpful insights about what the user is doing. Focus on: 1) What they're working on, 2) Any potential issues or improvements, 3) Helpful next steps. Keep it concise (2-3 sentences)." 
            },
            { 
              type: "image_url", 
              image_url: { 
                url: imageData,
                detail: "low" // Use low detail for faster/cheaper analysis
              } 
            }
          ],
        },
      ],
      max_tokens: 150,
    });

    return NextResponse.json({ 
      insights: response.choices[0].message.content,
      success: true
    });
  } catch (error: any) {
    console.error('Analysis Error:', error);
    return NextResponse.json({ 
      error: error.message,
      success: false
    }, { status: 500 });
  }
}
```

---

## Best Practices

### 1. Rate Limiting

Implement rate limiting to avoid excessive API calls:

```typescript
// Simple rate limiter
let lastAnalysisTime = 0;
const MIN_ANALYSIS_INTERVAL = 5000; // 5 seconds

const analyzeScreen = async (imageData: string) => {
  const now = Date.now();
  if (now - lastAnalysisTime < MIN_ANALYSIS_INTERVAL) {
    console.log('Rate limited - please wait');
    return;
  }
  lastAnalysisTime = now;
  
  // Proceed with analysis...
};
```

### 2. Image Optimization

Reduce image size before sending to API:

```typescript
const captureScreenFrame = async (quality = 0.6): Promise<string> => {
  const video = document.querySelector('video');
  if (!video) return '';

  const canvas = document.createElement('canvas');
  
  // Reduce resolution for API calls
  const maxWidth = 1280;
  const scale = Math.min(1, maxWidth / video.videoWidth);
  
  canvas.width = video.videoWidth * scale;
  canvas.height = video.videoHeight * scale;
  
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', quality);
  }
  
  return '';
};
```

### 3. Error Handling

Always implement robust error handling:

```typescript
try {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, imageData }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Unknown error');
  }

  // Handle success...
} catch (error) {
  console.error('Error:', error);
  // Show user-friendly error message
}
```

### 4. Cost Optimization

- Use lower resolution images for analysis
- Implement caching for similar queries
- Use cheaper models for simple tasks
- Batch requests when possible
- Set reasonable token limits

### 5. Privacy Considerations

- Never log or store screen captures
- Inform users about data usage
- Implement opt-in for automatic analysis
- Use secure HTTPS connections
- Follow GDPR/privacy regulations

---

## Testing Your Integration

1. **Test without screen sharing:**
   ```
   User: "Hello, can you help me?"
   Expected: AI responds with greeting
   ```

2. **Test with screen sharing:**
   ```
   User: "What do you see on my screen?"
   Expected: AI describes the screen content
   ```

3. **Test analysis feature:**
   ```
   Click "Analyze Now"
   Expected: AI provides insights about current screen
   ```

4. **Test error handling:**
   ```
   Remove API key temporarily
   Expected: Graceful error message to user
   ```

---

## Troubleshooting

### Common Issues

1. **"API key not found"**
   - Ensure `.env.local` exists and contains your API key
   - Restart the development server after adding env variables

2. **"Image too large"**
   - Reduce image quality in `captureScreenFrame`
   - Decrease canvas resolution

3. **"Rate limit exceeded"**
   - Implement rate limiting (see Best Practices)
   - Consider upgrading your API plan

4. **"Model not found"**
   - Check model name spelling
   - Verify your API plan includes the model

---

## Next Steps

- Implement conversation memory
- Add voice interaction
- Create session recordings
- Build analytics dashboard
- Add multi-language support

For more help, refer to the official documentation:
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Anthropic API Docs](https://docs.anthropic.com)
- [Google AI Docs](https://ai.google.dev/docs)
