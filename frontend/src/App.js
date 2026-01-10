import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [activeTab, setActiveTab] = useState('translate');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Translation states
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto-detect');
  const [targetLang, setTargetLang] = useState('English');
  const [translationSystemPrompt, setTranslationSystemPrompt] = useState('');

  // Text generation states
  const [generationPrompt, setGenerationPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [generationSystemPrompt, setGenerationSystemPrompt] = useState('');

  const handleTranslate = async () => {
    if (!textToTranslate.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setLoading(true);
    setError('');
    setTranslatedText('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/translate`, {
        text: textToTranslate,
        sourceLang,
        targetLang,
        systemPrompt: translationSystemPrompt || undefined,
      });

      if (response.data.success) {
        setTranslatedText(response.data.translatedText);
      } else {
        setError('Translation failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Translation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!generationPrompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedText('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/generate`, {
        prompt: generationPrompt,
        systemPrompt: generationSystemPrompt || undefined,
      });

      if (response.data.success) {
        setGeneratedText(response.data.generatedText);
      } else {
        setError('Text generation failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Text generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🌐 Translation & Text Generation</h1>
        <p>Powered by Tencent Hunyuan Model with Flexible System Prompts</p>
      </header>

      <div className="tab-container">
        <button
          className={`tab ${activeTab === 'translate' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('translate');
            setError('');
          }}
        >
          Translation
        </button>
        <button
          className={`tab ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('generate');
            setError('');
          }}
        >
          Text Generation
        </button>
      </div>

      <div className="content">
        {activeTab === 'translate' ? (
          <div className="section">
            <h2>Translation</h2>
            
            <div className="form-group">
              <label>System Prompt (Optional - for flexible responses):</label>
              <textarea
                className="system-prompt-input"
                value={translationSystemPrompt}
                onChange={(e) => setTranslationSystemPrompt(e.target.value)}
                placeholder="e.g., Translate in a casual tone, or Translate technically with domain-specific terms..."
                rows="2"
              />
            </div>

            <div className="language-selectors">
              <div className="form-group">
                <label>Source Language:</label>
                <input
                  type="text"
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  placeholder="e.g., English, Chinese, auto-detect"
                />
              </div>
              <div className="arrow">→</div>
              <div className="form-group">
                <label>Target Language:</label>
                <input
                  type="text"
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  placeholder="e.g., English, Spanish, French"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Text to Translate:</label>
              <textarea
                value={textToTranslate}
                onChange={(e) => setTextToTranslate(e.target.value)}
                placeholder="Enter text to translate..."
                rows="6"
              />
            </div>

            <button
              className="action-button"
              onClick={handleTranslate}
              disabled={loading}
            >
              {loading ? 'Translating...' : 'Translate'}
            </button>

            {translatedText && (
              <div className="result">
                <h3>Translation Result:</h3>
                <div className="result-text">{translatedText}</div>
              </div>
            )}
          </div>
        ) : (
          <div className="section">
            <h2>Text Generation</h2>
            
            <div className="form-group">
              <label>System Prompt (Optional - for flexible responses):</label>
              <textarea
                className="system-prompt-input"
                value={generationSystemPrompt}
                onChange={(e) => setGenerationSystemPrompt(e.target.value)}
                placeholder="e.g., You are a creative writer, or You are a technical expert..."
                rows="2"
              />
            </div>

            <div className="form-group">
              <label>Your Prompt:</label>
              <textarea
                value={generationPrompt}
                onChange={(e) => setGenerationPrompt(e.target.value)}
                placeholder="Enter your prompt..."
                rows="6"
              />
            </div>

            <button
              className="action-button"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>

            {generatedText && (
              <div className="result">
                <h3>Generated Text:</h3>
                <div className="result-text">{generatedText}</div>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>Configure your Tencent Cloud credentials in the backend .env file</p>
      </footer>
    </div>
  );
}

export default App;
