'use client';

import React, { useEffect, useState } from 'react';

export default function SeniorsList() {
  const [seniors, setSeniors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/seniors')
      .then(res => {
        if (!res.ok) throw new Error('Erreur réseau');
        return res.json();
      })
      .then(data => setSeniors(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <ul>
      {seniors.map(s => (
        <li key={s.id}>{s.name} — {s.age} ans</li>
      ))}
    </ul>
  );
}
