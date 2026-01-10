import React from 'react'

export default function PromptDesigner({ config, setConfig }) {
  return (
    <div className="panel">
      <h3>System Prompt Designer</h3>
      <label>Role</label>
      <input value={config.role} onChange={e => setConfig(prev => ({ ...prev, role: e.target.value }))} />

      <label>Context</label>
      <textarea value={config.context} onChange={e => setConfig(prev => ({ ...prev, context: e.target.value }))} />

      <label>Constraints</label>
      <textarea value={config.constraints} onChange={e => setConfig(prev => ({ ...prev, constraints: e.target.value }))} />
    </div>
  )
}
