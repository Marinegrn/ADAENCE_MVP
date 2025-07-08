'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Search, MapPin } from 'lucide-react';
import ReservationModal from '@/components/ReservationModal';

const AdaenceVisitPage = () => {
  const [selectedMoment, setSelectedMoment] = useState('tous');
  const [location, setLocation] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 4;

// Pré-remplissage des filtres sur la page "Je rends visite"
const searchParams = useSearchParams();

useEffect(() => {
  const momentFromUrl = searchParams.get('moment');
  const locationFromUrl = searchParams.get('location');

  if (momentFromUrl) setSelectedMoment(momentFromUrl.toLowerCase());
  if (locationFromUrl) setLocation(locationFromUrl);
}, [searchParams]); // vient de userSearchParams()


// Réinitialiser la page à 1 quand on change les filtres
useEffect(() => {
    setCurrentPage(1);
}, [selectedMoment, location]);


  // Récupération des profils aînés depuis API Next.js (proxy)
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

// Récupération depuis le proxy pour un affichage/filtrage en dynamique
useEffect(() => {
  const fetchActivities = async () => {
    try {
      const res = await fetch('/api/activities');
      if (!res.ok) throw new Error('Erreur côté proxy activities');
      const data = await res.json();
      console.log('Activités chargées :', data);
      setActivities(data);
    } catch (error) {
      console.error('Erreur chargement activités:', error);
      setActivities([]);
    }
  };

  fetchActivities();
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

// BUG - Le bloc doit être juste après le filtrage
const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);
const paginatedProfiles = filteredProfiles.slice(
  (currentPage - 1) * profilesPerPage,
  currentPage * profilesPerPage
);

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
        {/* Filtres */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form className="grid md:grid-cols-3 gap-4" role="search">
            <div>
              <label htmlFor="moment" className="block text-sm font-medium text-gray-700 mb-2">
                Moment à partager
              </label>
              <select
                id="moment"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-white appearance-none"
                value={selectedMoment}
                onChange={(e) => setSelectedMoment(e.target.value)}
              >
                <option value="tous">Tous les moments possibles</option>
                {activities.map((activity) => (
                  <option key={activity.id} value={activity.name.toLowerCase()}>
                    {activity.name}
                  </option>
                ))}
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-white appearance-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex items-end"></div>
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
            >
              Réinitialiser les filtres
            </button>
          </p>
        </section>

        {/* Profils */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            <p>Chargement des profils...</p>
          ) : paginatedProfiles.length === 0 ? (
            <p>Aucun profil trouvé pour ces critères.</p>
          ) : (
            paginatedProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} onClick={setSelectedProfile} />
            ))
          )}
        </section>

        {/* Pagination */}
        {filteredProfiles.length > profilesPerPage && (
          <div className="flex justify-center items-center gap-4 mb-8">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Précédent
            </button>
            <span className="text-gray-700">
              Page {currentPage} sur {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Suivant
            </button>
          </div>
        )}

        {/* Modal */}
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


