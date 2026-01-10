const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const tencentcloud = require('tencentcloud-sdk-nodejs-hunyuan');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Tencent Cloud Hunyuan client
const HunyuanClient = tencentcloud.hunyuan.v20230901.Client;

const clientConfig = {
  credential: {
    secretId: process.env.TENCENT_SECRET_ID,
    secretKey: process.env.TENCENT_SECRET_KEY,
  },
  region: process.env.TENCENT_REGION || 'ap-guangzhou',
  profile: {
    httpProfile: {
      endpoint: 'hunyuan.tencentcloudapi.com',
    },
  },
};

let client;
if (process.env.TENCENT_SECRET_ID && process.env.TENCENT_SECRET_KEY) {
  client = new HunyuanClient(clientConfig);
}

// Translation endpoint with system prompt for flexibility
app.post('/api/translate', async (req, res) => {
  try {
    const { text, sourceLang, targetLang, systemPrompt } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!client) {
      return res.status(500).json({ 
        error: 'Tencent Cloud credentials not configured. Please set TENCENT_SECRET_ID and TENCENT_SECRET_KEY environment variables.' 
      });
    }

    // Default system prompt for translation
    const defaultSystemPrompt = `You are a professional translator. Translate the given text accurately while maintaining the tone, style, and context. Provide natural and fluent translations.`;
    
    // Use custom system prompt if provided, otherwise use default
    const finalSystemPrompt = systemPrompt || defaultSystemPrompt;

    // Construct the user message for translation
    const userMessage = `Translate the following text from ${sourceLang || 'auto-detect'} to ${targetLang || 'English'}:\n\n${text}`;

    const params = {
      Model: 'hunyuan-lite',
      Messages: [
        {
          Role: 'system',
          Content: finalSystemPrompt,
        },
        {
          Role: 'user',
          Content: userMessage,
        },
      ],
      Stream: false,
    };

    const response = await client.ChatCompletions(params);
    
    const translatedText = response.Choices?.[0]?.Message?.Content || 'Translation failed';

    res.json({
      success: true,
      originalText: text,
      translatedText: translatedText,
      sourceLang: sourceLang || 'auto-detect',
      targetLang: targetLang || 'English',
      systemPrompt: finalSystemPrompt,
    });

  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({
      error: 'Translation failed',
      message: error.message,
    });
  }
});

// Text generation endpoint with system prompt
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, systemPrompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!client) {
      return res.status(500).json({ 
        error: 'Tencent Cloud credentials not configured. Please set TENCENT_SECRET_ID and TENCENT_SECRET_KEY environment variables.' 
      });
    }

    // Default system prompt for text generation
    const defaultSystemPrompt = `You are a helpful AI assistant. Provide clear, accurate, and helpful responses.`;
    
    // Use custom system prompt if provided, otherwise use default
    const finalSystemPrompt = systemPrompt || defaultSystemPrompt;

    const params = {
      Model: 'hunyuan-lite',
      Messages: [
        {
          Role: 'system',
          Content: finalSystemPrompt,
        },
        {
          Role: 'user',
          Content: prompt,
        },
      ],
      Stream: false,
    };

    const response = await client.ChatCompletions(params);
    
    const generatedText = response.Choices?.[0]?.Message?.Content || 'Generation failed';

    res.json({
      success: true,
      prompt: prompt,
      generatedText: generatedText,
      systemPrompt: finalSystemPrompt,
    });

  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({
      error: 'Text generation failed',
      message: error.message,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Translation Generation API is running',
    tencentConfigured: !!client,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  if (!client) {
    console.warn('⚠️  Tencent Cloud credentials not configured. Set TENCENT_SECRET_ID and TENCENT_SECRET_KEY in .env file.');
  } else {
    console.log('✓ Tencent Cloud Hunyuan client initialized');
  }
});
