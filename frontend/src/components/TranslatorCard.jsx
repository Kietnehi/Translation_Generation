import React from 'react'

export default function TranslatorCard({ sourceText, setSourceText, onTranslate, isLoading, translations, error, selectedLangCount }) {
  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text)
  }

  return (
    <div className="panel">
      <h3>Translator</h3>
      <textarea value={sourceText} onChange={e => setSourceText(e.target.value)} className="source-area" />
      <div className="controls">
        <button onClick={() => setSourceText('')} className="btn-muted">Clear</button>
        <button onClick={onTranslate} className="btn-primary" disabled={isLoading || !sourceText || selectedLangCount === 0}>
          {isLoading ? 'Translating…' : `Translate to ${selectedLangCount} language(s)`}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="results">
        {Object.entries(translations).map(([lang, txt]) => (
          <div key={lang} className="result">
            <div className="result-header">
              <strong>{lang}</strong>
              <button onClick={() => copyToClipboard(txt)} className="copy-btn">Copy</button>
            </div>
            <div className="result-body">{txt}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
