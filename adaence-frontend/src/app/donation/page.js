'use client';
import React, { useState } from 'react';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    amount: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // API ou backend
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl p-10">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">Faire un Don</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {[
            { label: 'Prénom', name: 'firstname', type: 'text' },
            { label: 'Nom', name: 'lastname', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Montant (€)', name: 'amount', type: 'number' }
          ].map((field) => (
            <div key={field.name} className="relative z-0 w-full">
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-gray-900 placeholder-transparent focus:border-purple-600 focus:outline-none focus:ring-0"
                placeholder={field.label}
              />
              <label
                htmlFor={field.name}
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-purple-600"
              >
                {field.label}
              </label>
            </div>
          ))}

          <div className="relative z-0 w-full">
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Votre message"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-gray-900 placeholder-transparent focus:border-purple-600 focus:outline-none focus:ring-0 resize-none"
            />
            <label
              htmlFor="message"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-purple-600"
            >
              Message (optionnel)
            </label>
          </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-md 
                transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg 
                hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
            Valider
            </button>

        </form>
      </div>
    </section>
  );
};

export default DonationForm;
