# Translation_Generation

A modern web application built with ReactJS for translation and text generation using the Tencent Hunyuan AI model. Features flexible system prompts for customizable AI responses.

## 🌟 Features

- **Translation Service**: Translate text between multiple languages with customizable translation styles
- **Text Generation**: Generate text with AI using custom prompts
- **Flexible System Prompts**: Customize AI behavior with system prompts for more flexible responses
- **Modern UI**: Clean and responsive React-based interface
- **Tencent Hunyuan Integration**: Powered by Tencent Cloud's Hunyuan AI model

## 🏗️ Architecture

- **Frontend**: ReactJS with modern hooks and axios for API calls
- **Backend**: Node.js/Express server with Tencent Cloud SDK integration
- **AI Model**: Tencent Hunyuan (hunyuan-lite) for translation and text generation

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Tencent Cloud account with Hunyuan API access
- Tencent Cloud API credentials (Secret ID and Secret Key)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Kietnehi/Translation_Generation.git
cd Translation_Generation
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Tencent Cloud credentials:

```env
TENCENT_SECRET_ID=your_secret_id_here
TENCENT_SECRET_KEY=your_secret_key_here
TENCENT_REGION=ap-guangzhou
PORT=5000
```

Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

(Optional) Create a `.env` file in the frontend directory:

```bash
cp .env.example .env
```

Start the frontend development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🔑 Getting Tencent Cloud Credentials

1. Sign up for a Tencent Cloud account at https://intl.cloud.tencent.com/
2. Navigate to the API Keys page in the Console
3. Create a new API key pair (Secret ID and Secret Key)
4. Enable the Hunyuan API service in your account
5. Add the credentials to your backend `.env` file

## 💡 Usage

### Translation

1. Select the "Translation" tab
2. (Optional) Enter a custom system prompt to control translation style
   - Example: "Translate in a casual, friendly tone"
   - Example: "Translate technically with domain-specific terms"
3. Enter source and target languages
4. Enter the text you want to translate
5. Click "Translate" to get the result

### Text Generation

1. Select the "Text Generation" tab
2. (Optional) Enter a custom system prompt to control AI behavior
   - Example: "You are a creative writer"
   - Example: "You are a technical expert in software engineering"
3. Enter your prompt
4. Click "Generate" to get the AI-generated response

## 🔧 API Endpoints

### POST `/api/translate`

Translate text from one language to another.

**Request Body:**
```json
{
  "text": "Hello, world!",
  "sourceLang": "English",
  "targetLang": "Spanish",
  "systemPrompt": "Optional custom system prompt"
}
```

**Response:**
```json
{
  "success": true,
  "originalText": "Hello, world!",
  "translatedText": "¡Hola, mundo!",
  "sourceLang": "English",
  "targetLang": "Spanish",
  "systemPrompt": "..."
}
```

### POST `/api/generate`

Generate text using AI.

**Request Body:**
```json
{
  "prompt": "Write a short poem about coding",
  "systemPrompt": "Optional custom system prompt"
}
```

**Response:**
```json
{
  "success": true,
  "prompt": "Write a short poem about coding",
  "generatedText": "Lines of code, a digital art...",
  "systemPrompt": "..."
}
```

### GET `/api/health`

Check API health status.

**Response:**
```json
{
  "status": "ok",
  "message": "Translation Generation API is running",
  "tencentConfigured": true
}
```

## 📁 Project Structure

```
Translation_Generation/
├── backend/
│   ├── server.js          # Express server with Tencent integration
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Example environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styles
│   │   └── index.js       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── .env.example       # Example frontend config
└── README.md              # This file
```

## 🛠️ Development

### Backend Development

```bash
cd backend
npm run dev  # Run with nodemon for auto-reload
```

### Frontend Development

```bash
cd frontend
npm start    # React development server with hot reload
```

## 🎨 Customization

### System Prompts

System prompts allow you to customize how the AI responds:

**Translation Examples:**
- "Translate casually for social media"
- "Translate formally for business documents"
- "Translate with cultural context and idioms"

**Generation Examples:**
- "You are a helpful teacher explaining concepts simply"
- "You are a professional technical writer"
- "You are a creative storyteller"

## 🔒 Security Notes

- Never commit your `.env` file with actual credentials
- Keep your Tencent Cloud API keys secure
- Use environment variables for all sensitive configuration
- Consider implementing rate limiting in production

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.
