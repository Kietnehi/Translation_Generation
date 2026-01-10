const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Tencent Cloud signature generation
function generateSignature(secretKey, signStr) {
  const hmac = crypto.createHmac('sha256', secretKey);
  return hmac.update(signStr).digest('hex');
}

// Generate authorization header for Tencent Cloud API
function generateAuth(secretId, secretKey, host, action, timestamp) {
  const algorithm = 'TC3-HMAC-SHA256';
  const service = 'tmt';
  const date = new Date(timestamp * 1000).toISOString().substr(0, 10);
  
  // Step 1: Create canonical request
  const httpRequestMethod = 'POST';
  const canonicalUri = '/';
  const canonicalQueryString = '';
  const canonicalHeaders = `content-type:application/json\nhost:${host}\n`;
  const signedHeaders = 'content-type;host';
  const hashedRequestPayload = crypto.createHash('sha256').update('').digest('hex');
  
  const canonicalRequest = `${httpRequestMethod}\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${hashedRequestPayload}`;
  
  // Step 2: Create string to sign
  const credentialScope = `${date}/${service}/tc3_request`;
  const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex');
  const stringToSign = `${algorithm}\n${timestamp}\n${credentialScope}\n${hashedCanonicalRequest}`;
  
  // Step 3: Calculate signature
  const kDate = crypto.createHmac('sha256', `TC3${secretKey}`).update(date).digest();
  const kService = crypto.createHmac('sha256', kDate).update(service).digest();
  const kSigning = crypto.createHmac('sha256', kService).update('tc3_request').digest();
  const signature = crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex');
  
  // Step 4: Create authorization header
  const authorization = `${algorithm} Credential=${secretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  
  return authorization;
}

// Translation API endpoint with system prompt support
app.post('/api/translate', async (req, res) => {
  try {
    const { text, sourceLang, targetLang, systemPrompt, useTextGeneration } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // If text generation is enabled, use a flexible prompt-based approach
    if (useTextGeneration && systemPrompt) {
      // Simulate text generation with system prompt for flexible responses
      const generatedTranslation = await generateTranslationWithPrompt(
        text,
        sourceLang || 'auto',
        targetLang || 'en',
        systemPrompt
      );
      
      return res.json({
        sourceText: text,
        translatedText: generatedTranslation,
        sourceLang: sourceLang || 'auto',
        targetLang: targetLang || 'en',
        method: 'text_generation_with_prompt'
      });
    }

    // Standard translation using Tencent TMT API
    const secretId = process.env.TENCENT_SECRET_ID;
    const secretKey = process.env.TENCENT_SECRET_KEY;
    
    if (!secretId || !secretKey) {
      // Fallback to mock translation if credentials not configured
      return res.json({
        sourceText: text,
        translatedText: `[Translated: ${text}]`,
        sourceLang: sourceLang || 'auto',
        targetLang: targetLang || 'en',
        method: 'mock',
        note: 'Configure TENCENT_SECRET_ID and TENCENT_SECRET_KEY for actual translation'
      });
    }

    const host = 'tmt.tencentcloudapi.com';
    const timestamp = Math.floor(Date.now() / 1000);
    const action = 'TextTranslate';
    
    const authorization = generateAuth(secretId, secretKey, host, action, timestamp);
    
    const requestData = {
      SourceText: text,
      Source: sourceLang || 'auto',
      Target: targetLang || 'en',
      ProjectId: 0
    };

    const headers = {
      'Content-Type': 'application/json',
      'Host': host,
      'X-TC-Action': action,
      'X-TC-Version': '2018-03-21',
      'X-TC-Timestamp': timestamp.toString(),
      'X-TC-Region': process.env.TENCENT_REGION || 'ap-guangzhou',
      'Authorization': authorization
    };

    const response = await axios.post(
      `https://${host}`,
      requestData,
      { headers }
    );

    if (response.data.Response.Error) {
      throw new Error(response.data.Response.Error.Message);
    }

    res.json({
      sourceText: text,
      translatedText: response.data.Response.TargetText,
      sourceLang: response.data.Response.Source,
      targetLang: response.data.Response.Target,
      method: 'tencent_tmt'
    });

  } catch (error) {
    console.error('Translation error:', error.message);
    res.status(500).json({
      error: 'Translation failed',
      details: error.message
    });
  }
});

// Text generation with system prompt for flexible translations
async function generateTranslationWithPrompt(text, sourceLang, targetLang, systemPrompt) {
  // This function simulates text generation with system prompts
  // In production, this would call Tencent's Hunyuan API or similar LLM service
  
  const defaultPrompt = systemPrompt || 
    `You are a professional translator. Translate the following text from ${sourceLang} to ${targetLang}. ` +
    `Maintain the tone, style, and context of the original text.`;
  
  // For now, we'll use a mock implementation
  // In production, integrate with Tencent Hunyuan or other LLM APIs
  const mockTranslation = `[Generated with prompt: "${defaultPrompt}"] Translation of: ${text}`;
  
  return mockTranslation;
}

// System prompt templates endpoint
app.get('/api/prompts', (req, res) => {
  res.json({
    prompts: [
      {
        id: 'formal',
        name: 'Formal Translation',
        template: 'Translate the following text in a formal, professional tone. Maintain accuracy and cultural appropriateness.'
      },
      {
        id: 'casual',
        name: 'Casual Translation',
        template: 'Translate the following text in a casual, conversational tone. Make it sound natural and friendly.'
      },
      {
        id: 'technical',
        name: 'Technical Translation',
        template: 'Translate the following technical text with precision. Preserve technical terms and industry-specific language.'
      },
      {
        id: 'creative',
        name: 'Creative Translation',
        template: 'Translate the following text creatively. Focus on conveying the meaning and emotion rather than literal translation.'
      },
      {
        id: 'custom',
        name: 'Custom Prompt',
        template: ''
      }
    ]
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend will be available at http://localhost:8080`);
});
