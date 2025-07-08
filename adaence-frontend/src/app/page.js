'use client';

import Link from 'next/link';
import Head from 'next/head';
import React, { useState } from 'react';
import { Search, Edit, Share2, Heart, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import Image from 'next/image';

const AdaenceLandingPage = () => {
  const [formData, setFormData] = useState({
    momentPartage: '',
    localisation: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = () => {
    console.log('Recherche lancée avec:', formData);
    // Nav ou requête API
  };

  const handleViewAllProfiles = () => {
    console.log('Voir tous les profils');
    // Nav/Action à définir
  };

  // Profils TEST Front - Maquette de base
  const profils = [
    { id: 1, name: "Marie", age: 78, image: "https://placehold.co/300x400" },
    { id: 2, name: "Pierre", age: 82, image: "https://placehold.co/300x400" },
    { id: 3, name: "Jeanne", age: 75, image: "https://placehold.co/300x400" },
    { id: 4, name: "Henri", age: 80, image: "https://placehold.co/300x400" },
    { id: 5, name: "Colette", age: 77, image: "https://placehold.co/300x400" },
    { id: 6, name: "André", age: 84, image: "https://placehold.co/300x400" },
    { id: 7, name: "Simone", age: 79, image: "https://placehold.co/300x400" },
    { id: 8, name: "Marcel", age: 81, image: "https://placehold.co/300x400" }
  ];

  return (
        <> 
      <Head>
        <title>Adaence – Offrez un moment aux aînés isolés</title>
        <meta name="description" content="Recréez du lien avec les personnes âgées. Organisez une visite solidaire avec Adaence." />
      </Head> 
      
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white" aria-label="Section accueil">
        <div className="absolute inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
        <div 
        className="relative max-w-7xl mx-auto px-4 py-24 text-center"
        style={{ 
          backgroundImage: "url('/assets/homepage.jpg')", 
          backgroundPosition: "50% 65%", // horizontal 50%, vertical 50%
          backgroundSize: "cover",
        }}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            RÉTABLISSONS LES LIENS
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
            Et si vous offriez un peu de votre temps à ceux qui en ont le plus besoin ? Prenez 
            rendez-vous pour partager un moment avec une personne âgée isolée.
          </p>
          
          {/* Search Form */}
          <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto shadow-2xl">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="momentPartage" className="block text-gray-700 text-sm font-medium mb-2 text-left">
                  Moment à partager
                </label>
                <input
                  id="momentPartage"
                  type="text"
                  name="momentPartage"
                  value={formData.momentPartage}
                  onChange={handleInputChange}
                  placeholder="Un repas"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="localisation" className="block text-gray-700 text-sm font-medium mb-2 text-left">
                  Localisation
                </label>
                <input
                  id="localisation"
                  type="text"
                  name="localisation"
                  value={formData.localisation}
                  onChange={handleInputChange}
                  placeholder="Votre ville"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full md:w-auto bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              aria-label="Lancer la recherche"
            >
              Rechercher →
            </button>
          </div>
        </div>
      </section>

      {/* Profiles Section */}
      <section className="py-20 bg-gray-50" aria-label="Personnalités à rencontrer">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            LES PERSONNALITÉS À RENCONTRER
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-4xl mx-auto">
            Feuilletez les visages de celles et ceux qui attendent simplement un peu de votre temps. Chaque 
            sourire cache une histoire, chaque rencontre est une promesse.
          </p>
          
          {/* Profile Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {profils.map((person) => (
              <div key={person.id} className="group cursor-pointer" tabIndex={0} aria-label={`Profil de ${person.name}, ${person.age} ans`}>
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3 group-hover:shadow-lg transition-shadow relative bg-gray-300">
                  <Image 
                    src={person.image} 
                    alt={`Photo de ${person.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                    priority
                  />
                </div>
                <h3 className="font-semibold text-gray-900">{person.name}, {person.age} ans</h3>
              </div>
            ))}
          </div>
          
          <Link href="/visites">
          <button
            onClick={handleViewAllProfiles}
            className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            aria-label="Voir tous les profils"
          >
            Voir tous les profils
          </button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white" aria-label="Comment ça marche">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">
            COMMENT ÇA MARCHE
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Offrir un peu de votre temps, c&apos;est offrir beaucoup. Découvrez comment planifier une visite en 
            toute simplicité.
          </p>
          
          <div className=" text-gray-900 grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { Icon: Search, title: "1. Choisissez une rencontre", text: "Parcourez les profils de nos aînés et trouvez la personne avec qui vous aimeriez partager un moment chaleureux." },
              { Icon: Edit, title: "2. Remplissez le formulaire", text: "Indiquez vos disponibilités et vos envies. Cela nous aide à organiser une rencontre adaptée et en toute confiance." },
              { Icon: Share2, title: "3. Partagez un moment", text: "Rendez visite à la personne âgée dans un cadre bienveillant. Une discussion, une balade ou simplement tenir la main. Chaque moment compte." },
              { Icon: Heart, title: "4. Créez du lien", text: "Si le cœur y est, vous pouvez revenir. L'amitié naît souvent des petits gestes du quotidien. Chaque visite la nourrit un peu plus." }
            ].map(({ Icon, title, text }, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-indigo-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-8 text-gray-400">
            <Facebook aria-hidden="true" className="w-6 h-6 cursor-pointer hover:text-blue-600" />
            <Instagram aria-hidden="true" className="w-6 h-6 cursor-pointer hover:text-pink-600" />
            <Youtube aria-hidden="true" className="w-6 h-6 cursor-pointer hover:text-red-600" />
            <Twitter aria-hidden="true" className="w-6 h-6 cursor-pointer hover:text-sky-500" />
          </div>
        </div>
      </section>

    </div>
    </>
  );
};

export default AdaenceLandingPage;

