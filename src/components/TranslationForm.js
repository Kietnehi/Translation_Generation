import React from 'react';

const TranslationForm = ({
  sourceText,
  translatedText,
  sourceLang,
  targetLang,
  loading,
  onSourceTextChange,
  onSourceLangChange,
  onTargetLangChange,
  onTranslate,
  onSwapLanguages
}) => {
  const languages = [
    { code: 'auto', name: 'Auto Detect' },
    { code: 'zh', name: 'Chinese' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'th', name: 'Thai' },
    { code: 'vi', name: 'Vietnamese' }
  ];

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      onTranslate();
    }
  };

  return (
    <div className="translation-form">
      <div className="language-selector">
        <div className="lang-select-group">
          <label htmlFor="source-lang">From:</label>
          <select
            id="source-lang"
            value={sourceLang}
            onChange={(e) => onSourceLangChange(e.target.value)}
            className="lang-select"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="swap-button"
          onClick={onSwapLanguages}
          disabled={sourceLang === 'auto'}
          title="Swap languages"
        >
          ⇄
        </button>

        <div className="lang-select-group">
          <label htmlFor="target-lang">To:</label>
          <select
            id="target-lang"
            value={targetLang}
            onChange={(e) => onTargetLangChange(e.target.value)}
            className="lang-select"
          >
            {languages.filter(lang => lang.code !== 'auto').map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-input-container">
        <textarea
          className="text-input"
          placeholder="Enter text to translate..."
          value={sourceText}
          onChange={(e) => onSourceTextChange(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={8}
        />
        <div className="char-count">
          {sourceText.length} characters
        </div>
      </div>

      <button
        className="translate-button"
        onClick={onTranslate}
        disabled={loading || !sourceText.trim()}
      >
        {loading ? (
          <>
            <span className="spinner">⟳</span>
            Translating...
          </>
        ) : (
          <>
            Translate
          </>
        )}
      </button>

      <div className="keyboard-hint">
        💡 Press Ctrl+Enter to translate
      </div>
    </div>
  );
};

export default TranslationForm;
