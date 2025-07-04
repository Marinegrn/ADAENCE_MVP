'use client';

import React, { useState } from 'react';
import { Search, MapPin, ChevronLeft, ChevronRight, User
} from 'lucide-react';
import Image from 'next/image';

const AdaenceVisitPage = () => {
  const [selectedMoment, setSelectedMoment] = useState('tous');
  const [location, setLocation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const profiles = [
    {
      id: 1,
      name: "Marcel",
      age: 78,
      type: "Sortie culturelle",
      profession: "Ancien instituteur",
      location: "Paris 15ème",
      description: "Passionné d'histoire et de littérature, j'aimerais visiter des musées et discuter de mes lectures.",
      image: "https://placehold.co/300x200",
      interests: ["culture", "lecture", "histoire"]
    },
    {
      id: 2,
      name: "Francine",
      age: 89,
      type: "Balade en nature",
      profession: "Ancienne fleuriste",
      location: "Les Abymes, Guadeloupe",
      description: "J'adore les jardins et la nature. Une promenade au parc ou au jardin botanique me ferait très plaisir.",
      image: "https://placehold.co/300x200",
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
      image: "https://placehold.co/300x200",
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
      image: "https://placehold.co/300x200",
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
      image: "https://placehold.co/300x200",
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
      image: "https://placehold.co/300x200",
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
      image: "https://placehold.co/300x200",
      interests: ["cuisine", "recettes", "gastronomie"]
    },
    {
      id: 8,
      name: "Denise",
      age: 79,
      type: "Lecture",
      profession: "Ancienne bibliothécaire",
      location: "Vincennes",
      description: "Grande lectrice, je veux transmettre ma passion pour les livres et découvrir de nouveaux auteurs.",
      image: "https://placehold.co/300x200",
      interests: ["lecture", "littérature", "poésie"]
    }
  ];

  const itemsPerPage = profiles.length;
  const totalPages = Math.ceil(profiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProfiles = profiles.slice(startIndex, startIndex + itemsPerPage);

  const ProfileCard = ({ profile }) => (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow" aria-label={`Profil de ${profile.name}`}>
      <div className="relative w-full h-48">
        <Image
          src={profile.image}
          alt={`Portrait de ${profile.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <header className="mb-2">
          <span className="text-sm text-gray-600">{profile.type}</span>
          <h3 className="text-lg font-semibold text-orange-600">{profile.name}</h3>
        </header>
        <div className="text-sm text-gray-600 mb-2">
          <p>{profile.profession} • {profile.age} ans</p>
          <p className="flex items-center" aria-label="Localisation">
            <MapPin className="w-4 h-4 mr-1" />{profile.location}
          </p>
        </div>
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">{profile.description}</p>
        <button
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          aria-label={`Programmer un moment avec ${profile.name}`}
        >
          Programmer un moment
        </button>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-gray-50" lang="fr">
      <main className="container mx-auto px-4 py-8">
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8" aria-labelledby="filtrer-rencontres">
          <h2 id="filtrer-rencontres" className="sr-only">Filtres de recherche</h2>
          <form className="grid md:grid-cols-3 gap-4" role="search" aria-label="Filtrer les profils">
            <div>
              <label htmlFor="moment" className="block text-sm font-medium text-gray-700 mb-2">
                Moment à partager
              </label>
              <select
                id="moment"
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
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Localisation
              </label>
              <input
                id="location"
                type="text"
                placeholder="Votre ville"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
                aria-label="Rechercher des moments disponibles"
              >
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-gray-600" aria-live="polite">
            <strong>{profiles.length}</strong> moments trouvés
            <button className="text-orange-500 hover:text-orange-600 ml-4" aria-label="Réinitialiser les filtres">
              Réinitialiser les filtres
            </button>
          </p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" aria-label="Liste des profils disponibles">
          {currentProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default AdaenceVisitPage;
