import React from 'react'

export default function LanguageSelector({ languages = [], selected = [], onToggle }) {
  return (
    <div className="panel">
      <h3>Target Languages</h3>
      <div className="lang-grid">
        {languages.map(lang => (
          <button
            key={lang}
            onClick={() => onToggle(lang)}
            className={selected.includes(lang) ? 'lang-btn selected' : 'lang-btn'}
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  )
}
