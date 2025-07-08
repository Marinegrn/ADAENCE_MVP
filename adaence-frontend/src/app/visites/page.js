'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, MapPin } from 'lucide-react';
import ReservationModal from '@/components/ReservationModal';

const AdaenceVisitPage = () => {
  const [selectedMoment, setSelectedMoment] = useState('tous');
  const [location, setLocation] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Récupération des profils depuis API Next.js (proxy)
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch('/api/seniors');
        if (!res.ok) throw new Error('Erreur côté API');
        const data = await res.json();
        console.log('Données reçues du proxy /api/seniors:', data);
        setProfiles(data);
      } catch (err) {
        console.error('Erreur chargement profils :', err);
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Filtres appliqués par ville et/ou activités
const filteredProfiles = profiles.filter((profile) => {
  const matchLocation =
    location.trim() === '' || profile.location.toLowerCase().includes(location.toLowerCase());

  const matchActivity =
    selectedMoment === 'tous' ||
    (profile.activities &&
      profile.activities.some((activity) =>
        activity.name.toLowerCase().includes(selectedMoment)
      ));

  return matchLocation && matchActivity;
});

const getImageUrl = (photo) => {
    if (!photo) return 'http://localhost:5000/public/images/seniors/default.jpg';
  
  // Si le chemin contient déjà 'images/', on l'utilise tel quel
    if (photo.includes('images/')) {
      return `http://localhost:5000/public/${photo}`;
    }
  
  // Sinon, on ajoute le préfixe images/seniors/
      return `http://localhost:5000/public/images/seniors/${photo}`;
};

const ProfileCard = ({ profile, onClick }) => (
  <article
    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    aria-label={`Profil de ${profile.user.firstName} ${profile.user.lastName}`}
    onClick={() => onClick(profile)}
  >
    <div className="relative w-full h-48">
      <Image
        src={getImageUrl(profile.photo)} // important pour la structure conditionnelle de la variable getImageUrl
        alt={`Portrait de ${profile.user.firstName} ${profile.user.lastName}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>

    <div className="p-4">
      <header className="mb-2">
        <span className="text-sm text-gray-600">{profile.type}</span>
        <h3 className="text-lg font-semibold text-orange-600">
          {profile.user.firstName} {profile.user.lastName}
        </h3>
      </header>

      <div className="text-sm text-gray-600 mb-2">
        <p>{profile.profession} • {profile.age} ans</p>
        <p className="flex items-center" aria-label="Localisation">
          <MapPin className="w-4 h-4 mr-1" />
          {profile.location}
        </p>
      </div>

      <p className="text-sm text-gray-700 mb-4 line-clamp-3">{profile.bio}</p>

      {/* Affichage des activités préférées */}
      {profile.activities?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {profile.activities.map((activity) => (
            <span
              key={activity.id}
              className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full"
            >
              {activity.name}
            </span>
          ))}
        </div>
      )}

      <button
        className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
        aria-label={`Programmer un moment avec ${profile.user.firstName} ${profile.user.lastName}`}
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                value={selectedMoment}
                onChange={(e) => setSelectedMoment(e.target.value)}
              >
                <option value="tous">Tous les moments possibles</option>
                <option value="culturel">Sortie culturelle</option>
                <option value="nature">Balade en nature</option>
                <option value="café">Café discussion</option>
                <option value="créatif">Activité créative</option>
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              {/* <button // plus besoin car real-time / Live filtering
                type="submit"
                className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
                aria-label="Rechercher des moments disponibles"
              >
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </button> */}
            </div>
          </form>
          <p className="mt-4 text-sm text-gray-600" aria-live="polite">
            <strong>{filteredProfiles.length}</strong> moment(s) trouvé(s)
            <button
              type="button"
              className="text-orange-500 hover:text-orange-600 ml-4"
              onClick={() => {
                setSelectedMoment('tous');
                setLocation('');
              }}
              aria-label="Réinitialiser les filtres"
            >
              Réinitialiser les filtres
            </button>
          </p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" aria-label="Liste des profils disponibles">
          {loading ? (
            <p>Chargement des profils...</p>
          ) : filteredProfiles.length === 0 ? (
            <p>Aucun profil trouvé pour ces critères.</p>
          ) : (
            filteredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} onClick={setSelectedProfile} />
            ))
          )}
        </section>

        {selectedProfile && (
          <ReservationModal
            profile={selectedProfile}
            onClose={() => setSelectedProfile(null)}
          />
        )}
      </main>
    </div>
  );
};

export default AdaenceVisitPage;


