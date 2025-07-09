'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Mail, Phone, MessageCircle, ChevronRight, ChevronLeft, Heart } from 'lucide-react';

const ReservationModal = ({ profile, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [volunteerInfo, setVolunteerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Charge les créneaux depuis API
  useEffect(() => {
    if (!selectedDate) {
      setTimeSlots([]);
      return;
    }
    async function fetchTimeSlots() {
      try {
        const res = await fetch(`/api/slots?profileId=${profile.id}&date=${selectedDate}`);
        if (!res.ok) throw new Error('Erreur chargement créneaux');
        const data = await res.json();
        setTimeSlots(data);
      } catch (err) {
        console.error('Erreur chargement créneaux:', err);
        setTimeSlots([]);
      }
    }
    fetchTimeSlots();
  }, [selectedDate, profile?.id]);

  useEffect(() => {
    setStep(1);
    setSelectedActivity('');
    setSelectedDate('');
    setSelectedTimeSlot(null);
    setVolunteerInfo({ name: '', email: '', phone: '', message: '' });
    setTimeSlots([]);
  }, [profile]);

  if (!profile) return null;

  const activities = profile.activities || [];

  const canSubmit =
    volunteerInfo.name.trim() !== '' &&
    volunteerInfo.email.trim() !== '' &&
    selectedActivity &&
    selectedDate &&
    selectedTimeSlot?.id;

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(prev => prev + 1);
      setIsAnimating(false);
    }, 150);
  };

  const handlePrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(prev => prev - 1);
      setIsAnimating(false);
    }, 150);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    // Construction du payload (données envoyées d'une requête) aligné avec le backend
   const payload = {
    visitorEmail: volunteerInfo.email,
    volunteerName: volunteerInfo.name,
    volunteerPhone: volunteerInfo.phone,
    slotId: selectedTimeSlot.id,
    profileId: profile.id, // seniorId
    message: volunteerInfo.message,
    activity: selectedActivity,
    date: selectedDate
};

// Log du payload pour debugging
  console.log('Payload envoyé:', JSON.stringify(payload, null, 2));

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify((payload)), // envoi du payload sans les champs optionnels
      });

    // Log de la réponse pour debugging
    console.log('Status de la réponse:', res.status);
    console.log('Headers de la réponse:', res.headers);

    if (!res.ok) {
      // Récupérer le message d'erreur du serveur
      const errorData = await res.json().catch(() => ({ message: 'Erreur inconnue' }));
      console.error('Erreur du serveur:', errorData);
      throw new Error(errorData.message || `Erreur HTTP: ${res.status}`);
    }
    
    const responseData = await res.json();
    console.log('Réponse du serveur:', responseData);
      
      // Animation de succès
      setStep(5);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Erreur réservation:', err);
      alert('Erreur lors de la réservation, veuillez réessayer.');
    }

    // Afficher une erreur plus détaillée
    let errorMessage = 'Erreur lors de la réservation, veuillez réessayer.';
    
    if (err.message.includes('HTTP: 500')) {
      errorMessage = 'Erreur serveur. Veuillez contacter le support si le problème persiste.';
    } else if (err.message.includes('HTTP: 400')) {
      errorMessage = 'Données invalides. Vérifiez vos informations et réessayez.';
    } else if (err.message !== 'Erreur inconnue') {
      errorMessage = err.message;
    }
    
    alert(errorMessage);

  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Quelle activité vous inspire ?";
      case 2: return "Quand souhaitez-vous partager ce moment ?";
      case 3: return "À quelle heure vous arrange le mieux ?";
      case 4: return "Quelques informations pour finaliser";
      case 5: return "Réservation confirmée !";
      default: return "";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-white/20 animate-in slide-in-from-bottom-8 duration-500">
        
        {/* Header avec photo de profil */}
        <div className="relative bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 p-6 text-white">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
            aria-label="Fermer la modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20 border-2 border-white flex items-center justify-center">
              {profile.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/assets/${profile.photo}`} // bug d'affichage de modal -> mettre le chemin complet du stockage de la photo
                alt="Photo de profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <Heart className="w-8 h-8 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {profile.user ? `${profile.user.firstName} ${profile.user.lastName}` : 'Cette personne'}
            </h2>
              <p className="text-white/80 text-sm">Prêt.e à partager un moment avec vous</p>
          </div>
      </div>

          {/* Progress bar */}
          <div className="mt-6 bg-white/20 rounded-full h-1 overflow-hidden">
            <div 
              className="bg-white h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              {getStepTitle()}
            </h3>

            {/* Étape 1 : Activité */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-gray-600 text-center mb-8">Choisissez l&apos;activité que vous aimeriez partager ensemble.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activities.length === 0 ? (
                    <p className="col-span-2 text-center text-gray-500">Aucune activité disponible</p>
                  ) : (
                    activities.map((activity, index) => (
                      <button
                        key={activity.id || `${activity.name}-${index}`}
                        type="button"
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                          selectedActivity === (activity.name || activity)
                            ? 'border-orange-400 bg-orange-50 text-orange-700 shadow-lg'
                            : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                        }`}
                        onClick={() => setSelectedActivity(activity.name || activity)}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">👥</div>
                          <div className="font-medium text-gray-800">{activity.name || activity}</div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Étape 2 : Date */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Calendar className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                  <p className="text-gray-600">Sélectionnez la date qui vous convient</p>
                </div>
                
                <div className="max-w-xs mx-auto">
                  <input
                    type="date"
                    className="w-full border-2 text-gray-800 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-orange-400 transition-colors duration-200 text-center text-lg"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Étape 3 : Créneaux horaires */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Clock className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                  <p className="text-gray-600">Choisissez l&apos;heure qui vous arrange</p>
                </div>

                {timeSlots.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aucun créneau disponible pour cette date</p>
                    <p className="text-sm text-gray-400 mt-2">Essayez une autre date</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {timeSlots.map(slot => (
                      <button
                        key={slot.id}
                        type="button"
                        className={`p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                          selectedTimeSlot?.id === slot.id
                            ? 'border-orange-400 bg-orange-50 text-cyan-900'
                            : 'text-gray-400 border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                        }`}
                        onClick={() => setSelectedTimeSlot(slot)}
                      >
                        <div className="text-center">
                          <div className="font-medium">{slot.startTime}</div>
                          <div className="text-sm text-gray-500">à {slot.endTime}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Étape 4 : Formulaire */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <User className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                  <p className="text-gray-600">Dites-nous qui vous êtes</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Votre nom complet"
                      className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:border-orange-400 transition-colors duration-200"
                      value={volunteerInfo.name}
                      onChange={e => setVolunteerInfo(v => ({ ...v, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Votre email"
                      className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:border-orange-400 transition-colors duration-200"
                      value={volunteerInfo.email}
                      onChange={e => setVolunteerInfo(v => ({ ...v, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Votre téléphone (optionnel)"
                      className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:border-orange-400 transition-colors duration-200"
                      value={volunteerInfo.phone}
                      onChange={e => setVolunteerInfo(v => ({ ...v, phone: e.target.value }))}
                    />
                  </div>

                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      placeholder="Un petit message pour briser la glace ? (optionnel)"
                      rows={3}
                      className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:border-orange-400 transition-colors duration-200 resize-none"
                      value={volunteerInfo.message}
                      onChange={e => setVolunteerInfo(v => ({ ...v, message: e.target.value }))}
                    />
                  </div>
                </div>
              </form>
            )}

            {/* Étape 5 : Succès */}
            {step === 5 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">C&apos;est confirmé !</h3>
                <p className="text-gray-600">Votre réservation a été envoyée avec succès</p>
                <p className="text-sm text-gray-500 mt-2">Vous recevrez bientôt un email de confirmation</p>
              </div>
            )}

          </div>
        </div>

        {/* Footer avec navigation */}
        {step < 5 && (
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={step === 1 ? onClose : handlePrev}
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{step === 1 ? 'Annuler' : 'Retour'}</span>
              </button>

              <div className="flex space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === step ? 'bg-orange-400' : i < step ? 'bg-orange-200' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              <button
                type={step === 4 ? 'submit' : 'button'}
                onClick={step === 4 ? handleSubmit : handleNext}
                disabled={
                  (step === 1 && !selectedActivity) ||
                  (step === 2 && !selectedDate) ||
                  (step === 3 && !selectedTimeSlot) ||
                  (step === 4 && !canSubmit)
                }
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-xl font-medium hover:from-orange-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>{step === 4 ? 'Confirmer' : 'Suivant'}</span>
                {step < 4 && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;



