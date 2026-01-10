import React, { useState } from 'react';

const SystemPromptSelector = ({
  prompts,
  systemPrompt,
  onSystemPromptChange,
  useTextGeneration,
  onUseTextGenerationChange
}) => {
  const [selectedPromptId, setSelectedPromptId] = useState('formal');
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);

  const handlePromptSelect = (promptId) => {
    setSelectedPromptId(promptId);
    const selectedPrompt = prompts.find(p => p.id === promptId);
    
    if (promptId === 'custom') {
      setShowCustomPrompt(true);
      onSystemPromptChange('');
    } else {
      setShowCustomPrompt(false);
      onSystemPromptChange(selectedPrompt?.template || '');
    }
  };

  return (
    <div className="system-prompt-selector">
      <h3>⚙️ Translation Settings</h3>
      
      <div className="setting-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={useTextGeneration}
            onChange={(e) => onUseTextGenerationChange(e.target.checked)}
          />
          <span>Use Text Generation with System Prompt</span>
        </label>
        <p className="setting-description">
          Enable AI-powered translation with customizable system prompts for more flexible and context-aware responses.
        </p>
      </div>

      {useTextGeneration && (
        <div className="prompt-options">
          <label htmlFor="prompt-select">System Prompt Template:</label>
          <select
            id="prompt-select"
            value={selectedPromptId}
            onChange={(e) => handlePromptSelect(e.target.value)}
            className="prompt-select"
          >
            {prompts.map(prompt => (
              <option key={prompt.id} value={prompt.id}>
                {prompt.name}
              </option>
            ))}
          </select>

          {!showCustomPrompt && selectedPromptId !== 'custom' && (
            <div className="prompt-preview">
              <strong>Prompt:</strong>
              <p>{prompts.find(p => p.id === selectedPromptId)?.template}</p>
            </div>
          )}

          {showCustomPrompt && (
            <div className="custom-prompt-input">
              <label htmlFor="custom-prompt">Custom System Prompt:</label>
              <textarea
                id="custom-prompt"
                className="custom-prompt-textarea"
                placeholder="Enter your custom system prompt here..."
                value={systemPrompt}
                onChange={(e) => onSystemPromptChange(e.target.value)}
                rows={4}
              />
              <p className="prompt-hint">
                💡 Customize how the AI should translate your text
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SystemPromptSelector;
