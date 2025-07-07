'use client';

import React, { useState } from 'react';

export default function AddSeniorForm({ onAdded }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/seniors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age: Number(age) }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Erreur ajout');
      }
      const newSenior = await res.json();
      onAdded && onAdded(newSenior);
      setName('');
      setAge('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nom"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Âge"
        value={age}
        onChange={e => setAge(e.target.value)}
        required
        min={0}
      />
      <button type="submit">Ajouter</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
