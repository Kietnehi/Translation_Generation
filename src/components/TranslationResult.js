import React, { useState } from 'react';

const TranslationResult = ({ translatedText, targetLang }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="translation-result">
      <div className="result-header">
        <h3>Translation Result</h3>
        <button
          className="copy-button"
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
      <div className="result-text">
        {translatedText}
      </div>
    </div>
  );
};

export default TranslationResult;
