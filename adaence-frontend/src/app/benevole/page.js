'use client';

import React, { useState } from 'react';
import Head from 'next/head';

const BecomeVolunteerPage = () => {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    age: '',
    location: '',
    motivation: '',
    disponibilite: '',
    experience: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis :', formData);
    // À connecter au back-end
  };

  return (
    <>
      <Head>
        <title>Devenir Bénévole - Adaence</title>
        <meta name="description" content="Inscrivez-vous pour offrir un peu de votre temps aux aînés isolés avec Adaence." />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Devenir Bénévole</h1>

          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 space-y-6">
            {[
              { label: 'Prénom', name: 'prenom', type: 'text' },
              { label: 'Nom', name: 'nom', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Téléphone', name: 'telephone', type: 'tel' },
              { label: 'Age', name: 'age', type: 'number' },
              { label: 'Localisation', name: 'location', type: 'text' },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  required
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}

            {[ 
              { label: 'Motivation', name: 'motivation' },
              { label: 'Disponibilité', name: 'disponibilite' },
              { label: 'Expérience préalable', name: 'experience' }
            ].map(({ label, name }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <textarea
                  id={name}
                  name={name}
                  rows={4}
                  required
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Envoyer ma candidature
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BecomeVolunteerPage;
