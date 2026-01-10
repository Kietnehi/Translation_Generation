import React, { useState, useEffect } from 'react';
import TranslationForm from './components/TranslationForm';
import TranslationResult from './components/TranslationResult';
import SystemPromptSelector from './components/SystemPromptSelector';

function App() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('en');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [useTextGeneration, setUseTextGeneration] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    // Fetch available system prompts
    fetch('/api/prompts')
      .then(res => res.json())
      .then(data => setPrompts(data.prompts))
      .catch(err => console.error('Failed to load prompts:', err));
  }, []);

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setLoading(true);
    setError(null);
    setTranslatedText('');

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLang,
          targetLang,
          systemPrompt,
          useTextGeneration
        }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (err) {
      setError(err.message || 'An error occurred during translation');
    } finally {
      setLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    if (sourceLang !== 'auto') {
      setSourceLang(targetLang);
      setTargetLang(sourceLang);
      setSourceText(translatedText);
      setTranslatedText(sourceText);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🌐 Translation Generation</h1>
        <p className="subtitle">Powered by Tencent Model with Flexible System Prompts</p>
      </header>

      <main className="main-content">
        <div className="settings-panel">
          <SystemPromptSelector
            prompts={prompts}
            systemPrompt={systemPrompt}
            onSystemPromptChange={setSystemPrompt}
            useTextGeneration={useTextGeneration}
            onUseTextGenerationChange={setUseTextGeneration}
          />
        </div>

        <div className="translation-container">
          <TranslationForm
            sourceText={sourceText}
            translatedText={translatedText}
            sourceLang={sourceLang}
            targetLang={targetLang}
            loading={loading}
            onSourceTextChange={setSourceText}
            onSourceLangChange={setSourceLang}
            onTargetLangChange={setTargetLang}
            onTranslate={handleTranslate}
            onSwapLanguages={handleSwapLanguages}
          />

          {error && (
            <div className="error-message">
              <span>⚠️ {error}</span>
            </div>
          )}

          {translatedText && !loading && (
            <TranslationResult
              translatedText={translatedText}
              targetLang={targetLang}
            />
          )}
        </div>
      </main>

      <footer className="footer">
        <p>Translation with text generation using system prompts for flexible responses</p>
      </footer>
    </div>
  );
}

export default App;
