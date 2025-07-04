'use client';

import React, { useState } from 'react';
import { Search, MapPin, Calendar, User, Heart, Coffee, Book, Music, Camera, Gamepad2, Palette, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const AdaenceVisitPage = () => {
  const [selectedMoment, setSelectedMoment] = useState('tous');
  const [location, setLocation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // TEST PROFILES - pas les vraies DATA des APIs
  const profiles = [
    {
      id: 1,
      name: "Marcel",
      age: 78,
      type: "Sortie culturelle",
      profession: "Ancien instituteur",
      location: "Paris 15ème",
      description: "Passionné d'histoire et de littérature, j'aimerais visiter des musées et discuter de mes lectures.",
      image: "/api/placeholder/300/200",
      interests: ["culture", "lecture", "histoire"]
    },
    {
      id: 2,
      name: "Simone",
      age: 82,
      type: "Balade en nature",
      profession: "Ancienne fleuriste",
      location: "Boulogne-Billancourt",
      description: "J'adore les jardins et la nature. Une promenade au parc ou au jardin botanique me ferait très plaisir.",
      image: "/api/placeholder/300/200",
      interests: ["nature", "jardinage", "promenade"]
    },
    {
      id: 3,
      name: "Henri",
      age: 75,
      type: "Café discussion",
      profession: "Ancien journaliste",
      location: "Paris 11ème",
      description: "Ancien journaliste, j'aime échanger sur l'actualité et partager mes expériences autour d'un café.",
      image: "/api/placeholder/300/200",
      interests: ["discussion", "actualité", "café"]
    },
    {
      id: 4,
      name: "Marie-Claude",
      age: 80,
      type: "Activité créative",
      profession: "Ancienne couturière",
      location: "Neuilly-sur-Seine",
      description: "Passionnée de travaux manuels, j'aimerais partager ma passion pour la couture et les arts créatifs.",
      image: "/api/placeholder/300/200",
      interests: ["couture", "créativité", "artisanat"]
    },
    {
      id: 5,
      name: "Robert",
      age: 77,
      type: "Jeux de société",
      profession: "Ancien comptable",
      location: "Paris 7ème",
      description: "Amateur de jeux de société, particulièrement les échecs et la belote. Venez partager une partie !",
      image: "/api/placeholder/300/200",
      interests: ["jeux", "échecs", "cartes"]
    },
    {
      id: 6,
      name: "Jacqueline",
      age: 84,
      type: "Musique",
      profession: "Ancienne pianiste",
      location: "Paris 16ème",
      description: "Ancienne pianiste, j'aime écouter de la musique classique et partager mes souvenirs musicaux.",
      image: "/api/placeholder/300/200",
      interests: ["musique", "piano", "classique"]
    },
    {
      id: 7,
      name: "Georges",
      age: 73,
      type: "Cuisine",
      profession: "Ancien chef",
      location: "Paris 5ème",
      description: "Ancien chef cuisinier, j'aimerais partager mes recettes et cuisiner ensemble de bons petits plats.",
      image: "/api/placeholder/300/200",
      interests: ["cuisine", "recettes", "gastronomie"]
    },
    {
      id: 8,
      name: "Denise",
      age: 79,
      type: "Lecture",
      profession: "Ancienne bibliothécaire",
      location: "Vincennes",
      description: "Grande lectrice, j'aimerais partager ma passion pour les livres et découvrir de nouveaux auteurs.",
      image: "/api/placeholder/300/200",
      interests: ["lecture", "littérature", "poésie"]
    }
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(profiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProfiles = profiles.slice(startIndex, startIndex + itemsPerPage);

  const ProfileCard = ({ profile }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <User className="w-16 h-16 text-gray-400" />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <span className="text-sm text-gray-600">{profile.type}</span>
          <h3 className="text-lg font-semibold text-orange-600">{profile.name}</h3>
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <p>{profile.profession} • {profile.age} ans</p>
          <p className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{profile.location}</p>
        </div>
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">{profile.description}</p>
        <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
          Programmer un moment
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moment à partager
              </label>
              <select 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={selectedMoment}
                onChange={(e) => setSelectedMoment(e.target.value)}
              >
                <option value="tous">Tous les moments possibles</option>
                <option value="culturel">Sortie culturelle</option>
                <option value="nature">Balade en nature</option>
                <option value="cafe">Café discussion</option>
                <option value="creatif">Activité créative</option>
                <option value="jeux">Jeux de société</option>
                <option value="musique">Musique</option>
                <option value="cuisine">Cuisine</option>
                <option value="lecture">Lecture</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localisation
              </label>
              <input 
                type="text" 
                placeholder="Votre ville"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </button>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-medium">{profiles.length} moments trouvés</span>
            <button className="text-orange-500 hover:text-orange-600 ml-4">
              Réinitialiser les filtres
            </button>
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === index + 1
                  ? 'bg-purple-600 text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <span className="text-sm text-gray-600 ml-2">Suivant »</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-400">ADAENCE</h3>
              <p className="text-gray-300 text-sm">
                Notre mission est de recréer du lien avec les personnes âgées isolées, 
                en leur offrant des moments de partage, d&apos;écoute et de présence.
              </p>
              <div className="flex space-x-4 mt-4">
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs">ig</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs">in</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs">tw</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-400">INFORMATIONS UTILES</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Liste des activités</a></li>
                <li><a href="#" className="hover:text-white">Nous contacter</a></li>
                <li><a href="#" className="hover:text-white">Mentions légales</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-400">CONTACT</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p>116 Rue du Faubourg Saint-Martin</p>
                <p>75010 Paris, France</p>
                <p>Email: contact@adaence.fr</p>
                <p>Tél: +33 1 23 45 67 89</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Adaence. Tous droits réservés.</p>
            <p className="mt-2">Ce site a été développé dans le cadre d&apos;un projet pour ADA Tech School.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdaenceVisitPage;