'use client';

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

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
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
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                  Moment à partager
                </label>
                <input
                  type="text"
                  name="momentPartage"
                  value={formData.momentPartage}
                  onChange={handleInputChange}
                  placeholder="Un repas"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">
                  Localisation
                </label>
                <input
                  type="text"
                  name="localisation"
                  value={formData.localisation}
                  onChange={handleInputChange}
                  placeholder="Votre ville"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>
            <button className="w-full md:w-auto bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium">
              Rechercher →
            </button>
          </div>
        </div>
      </section>

      {/* Profiles Section */}
      <section className="py-20 bg-gray-50">
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
            {[
              { id: 1, name: "Marie", age: 78, image: "/api/placeholder/300/400" },
              { id: 2, name: "Pierre", age: 82, image: "/api/placeholder/300/400" },
              { id: 3, name: "Jeanne", age: 75, image: "/api/placeholder/300/400" },
              { id: 4, name: "Henri", age: 80, image: "/api/placeholder/300/400" },
              { id: 5, name: "Colette", age: 77, image: "/api/placeholder/300/400" },
              { id: 6, name: "André", age: 84, image: "/api/placeholder/300/400" },
              { id: 7, name: "Simone", age: 79, image: "/api/placeholder/300/400" },
              { id: 8, name: "Marcel", age: 81, image: "/api/placeholder/300/400" }
            ].map((person) => (
              <div key={person.id} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-gray-300 rounded-lg overflow-hidden mb-3 group-hover:shadow-lg transition-shadow">
                  <div className="w-full h-full bg-gradient-to-b from-gray-400 to-gray-600 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">{person.name}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900">{person.name}, {person.age} ans</h3>
              </div>
            ))}
          </div>
          
          <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            Voir tous les profils
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">
            COMMENT ÇA MARCHE
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Offrir un peu de votre temps, c&apos;est offrir beaucoup. Découvrez comment planifier une visite en 
            toute simplicité.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                1. Choisissez une rencontre
              </h3>
              <p className="text-gray-600">
                Parcourez les profils de nos aînés et trouvez la personne avec qui vous aimeriez partager un moment chaleureux.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                2. Remplissez le formulaire
              </h3>
              <p className="text-gray-600">
                Indiquez vos disponibilités et vos envies. Cela nous aide à organiser une rencontre adaptée et en toute confiance.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                3. Partagez un moment
              </h3>
              <p className="text-gray-600">
                Rendez visite à la personne âgée dans un cadre bienveillant. Une discussion, une balade ou simplement tenir la main. Chaque moment compte.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                4. Créez du lien
              </h3>
              <p className="text-gray-600">
                Si le cœur y est, vous pouvez revenir. L&apos;amitié naît souvent des petits gestes du quotidien. Chaque visite la nourrit un peu plus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            PRÊT À FAIRE LA DIFFÉRENCE ?
          </h2>
          <p className="text-xl mb-8 leading-relaxed">
            Offrir un peu de votre temps, partager un moment, créer du lien. Chaque présence compte. En 
            tendant la main à une personne âgée, vous lui offrez bien plus qu&apos;une visite : une bouffée de 
            chaleur humaine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Programmer une visite
            </button>
            <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg hover:bg-yellow-300 transition-colors font-medium">
              Faire un don
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors font-medium">
              Devenir bénévole
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">ADAENCE</h3>
              <p className="text-gray-400 mb-6">
                Notre mission est de recréer du lien avec les personnes âgées isolées, en leur offrant des moments d&apos;écoute et de présence.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Youtube className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">INFORMATIONS UTILES</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Liste des activités</a></li>
                <li><a href="#" className="hover:text-white">Nous contacter</a></li>
                <li><a href="#" className="hover:text-white">Mentions légales</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">CONTACT</h3>
              <div className="text-gray-400 space-y-2">
                <p>110 Rue du Faubourg Saint-Martin</p>
                <p>75010 Paris, France</p>
                <p>Email: contact@adaence.fr</p>
                <p>Tél: +33 1 42 67 89</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 Adaence. Tous droits réservés.</p>
            <p className="mt-2">Ce site a été développé dans le cadre d&apos;un projet pour ADA Tech School.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdaenceLandingPage;
