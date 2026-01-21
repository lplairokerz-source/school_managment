
import React from 'react'

export default function FormField({ label, value, onChange, type='text', name }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input name={name} value={value} type={type} onChange={e => onChange(e.target.value)} />
    </label>
  )
}
