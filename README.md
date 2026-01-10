# Translation Generation with Tencent Model

A modern web application built with ReactJS that provides translation services with text generation capabilities using Tencent's model. The application features flexible system prompts for more context-aware and customizable translation responses.

## Features

- 🌐 **Multi-language Translation**: Support for 15+ languages including Chinese, English, Spanish, French, German, Japanese, Korean, and more
- 🤖 **AI-Powered Translation**: Text generation with customizable system prompts for flexible responses
- 🎨 **Modern UI**: Beautiful, responsive interface built with React
- ⚙️ **Customizable Prompts**: Choose from predefined prompt templates or create custom ones
- 📋 **Copy to Clipboard**: Easy one-click copy of translation results
- ⌨️ **Keyboard Shortcuts**: Ctrl+Enter to translate quickly
- 🔄 **Language Swap**: Instantly swap source and target languages

## System Prompt Options

- **Formal Translation**: Professional, business-appropriate translations
- **Casual Translation**: Conversational, friendly tone
- **Technical Translation**: Precise technical and industry-specific translations
- **Creative Translation**: Focus on meaning and emotion over literal translation
- **Custom Prompt**: Define your own translation style and requirements

## Tech Stack

- **Frontend**: React 18, Webpack 5, Babel
- **Backend**: Node.js, Express
- **API Integration**: Tencent Cloud Translation API
- **Styling**: Custom CSS with modern gradients and animations

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Kietnehi/Translation_Generation.git
cd Translation_Generation
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Tencent Cloud credentials:
```
TENCENT_SECRET_ID=your_secret_id_here
TENCENT_SECRET_KEY=your_secret_key_here
TENCENT_REGION=ap-guangzhou
PORT=3000
```

## Usage

### Development Mode

Start the backend server and frontend development server separately:

```bash
# Terminal 1: Start the backend server
npm start

# Terminal 2: Start the frontend development server
npm run client
```

The application will be available at:
- Frontend: http://localhost:8080
- Backend API: http://localhost:3000

### Production Build

Build the frontend for production:

```bash
npm run build
npm start
```

The production build will be served from http://localhost:3000

## API Endpoints

### POST /api/translate
Translate text with optional system prompt support.

**Request Body:**
```json
{
  "text": "Hello, world!",
  "sourceLang": "en",
  "targetLang": "zh",
  "systemPrompt": "Translate in a formal tone",
  "useTextGeneration": true
}
```

**Response:**
```json
{
  "sourceText": "Hello, world!",
  "translatedText": "您好，世界！",
  "sourceLang": "en",
  "targetLang": "zh",
  "method": "text_generation_with_prompt"
}
```

### GET /api/prompts
Get available system prompt templates.

### GET /api/health
Health check endpoint.

## Configuration

### Tencent Cloud Setup

1. Sign up for a Tencent Cloud account at https://cloud.tencent.com/
2. Enable the Translation API (TMT)
3. Create API credentials (Secret ID and Secret Key)
4. Add credentials to your `.env` file

### Supported Languages

- Chinese (zh)
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Japanese (ja)
- Korean (ko)
- Portuguese (pt)
- Russian (ru)
- Arabic (ar)
- Hindi (hi)
- Thai (th)
- Vietnamese (vi)

## Project Structure

```
Translation_Generation/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── TranslationForm.js
│   │   ├── TranslationResult.js
│   │   └── SystemPromptSelector.js
│   ├── App.js              # Main React component
│   ├── index.js            # React entry point
│   └── styles.css          # Application styles
├── server.js               # Express backend server
├── webpack.config.js       # Webpack configuration
├── package.json            # Dependencies and scripts
└── .env.example            # Environment variables template
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.