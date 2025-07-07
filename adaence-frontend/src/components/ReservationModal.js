'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Format FR "JJ/MM/YYYY"
const formatDateFr = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR');
};

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

  // Charge les créneaux depuis API (avec ID et heures)
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
        setTimeSlots(data); // <- attend [{ id, startTime, endTime }]
      } catch (err) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorEmail: volunteerInfo.email,
          slotId: selectedTimeSlot.id,
          message: volunteerInfo.message,
          activity: selectedActivity,
          date: selectedDate,
          volunteerName: volunteerInfo.name,
          volunteerPhone: volunteerInfo.phone,
          profileId: profile.id,
        }),
      });
      if (!res.ok) throw new Error('Erreur lors de la réservation');
      alert('Réservation confirmée ! Merci.');
      onClose();
    } catch (err) {
      alert('Erreur lors de la réservation, veuillez réessayer.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" aria-label="Fermer la modal">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold mb-6">
          Programmer un moment avec {profile.name}
        </h2>

        {/* Étape 1 : Activité */}
        {step === 1 && (
          <>
            <p className="mb-4">Choisissez l&apos;activité à partager :</p>
            <div className="flex flex-wrap gap-3 mb-6">
              {activities.length === 0 && <p>Aucune activité disponible.</p>}
              {activities.map(activity => (
                <button
                  key={activity}
                  type="button"
                  className={`px-4 py-2 rounded-full border ${
                    selectedActivity === activity
                      ? 'bg-orange-600 text-white border-orange-600'
                      : 'border-gray-300 text-gray-700 hover:bg-orange-100'
                  }`}
                  onClick={() => setSelectedActivity(activity)}
                >
                  {activity}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700" onClick={onClose}>Annuler</button>
              <button className="px-4 py-2 rounded-lg bg-orange-600 text-white disabled:opacity-50" disabled={!selectedActivity} onClick={() => setStep(2)}>Suivant</button>
            </div>
          </>
        )}

        {/* Étape 2 : Date */}
        {step === 2 && (
          <>
            <p className="mb-4">Choisissez la date souhaitée :</p>
            <input
              type="date"
              className="border border-gray-300 rounded-lg px-3 py-2 mb-6 w-full max-w-xs"
              value={selectedDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setSelectedDate(e.target.value)}
            />
            <div className="flex justify-between">
              <button className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700" onClick={() => setStep(1)}>Précédent</button>
              <button className="px-4 py-2 rounded-lg bg-orange-600 text-white disabled:opacity-50" disabled={!selectedDate} onClick={() => setStep(3)}>Suivant</button>
            </div>
          </>
        )}

        {/* Étape 3 : Créneaux horaires */}
        {step === 3 && (
          <>
            <p className="mb-4">Choisissez le créneau horaire :</p>
            {timeSlots.length === 0 ? (
              <p>Aucun créneau disponible.</p>
            ) : (
              <div className="flex flex-wrap gap-3 mb-6">
                {timeSlots.map(slot => (
                  <button
                    key={slot.id}
                    type="button"
                    className={`px-4 py-2 rounded-full border ${
                      selectedTimeSlot?.id === slot.id
                        ? 'bg-orange-600 text-white border-orange-600'
                        : 'border-gray-300 text-gray-700 hover:bg-orange-100'
                    }`}
                    onClick={() => setSelectedTimeSlot(slot)}
                  >
                    {slot.startTime} – {slot.endTime}
                  </button>
                ))}
              </div>
            )}
            <div className="flex justify-between">
              <button className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700" onClick={() => setStep(2)}>Précédent</button>
              <button className="px-4 py-2 rounded-lg bg-orange-600 text-white disabled:opacity-50" disabled={!selectedTimeSlot} onClick={() => setStep(4)}>Suivant</button>
            </div>
          </>
        )}

        {/* Étape 4 : Formulaire volontaire */}
        {step === 4 && (
          <form onSubmit={handleSubmit}>
            <p className="mb-4">Vos informations :</p>
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom complet *</label>
                <input id="name" type="text" required className="w-full border border-gray-300 rounded-lg px-3 py-2" value={volunteerInfo.name} onChange={e => setVolunteerInfo(v => ({ ...v, name: e.target.value }))} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                <input id="email" type="email" required className="w-full border border-gray-300 rounded-lg px-3 py-2" value={volunteerInfo.email} onChange={e => setVolunteerInfo(v => ({ ...v, email: e.target.value }))} />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                <input id="phone" type="tel" className="w-full border border-gray-300 rounded-lg px-3 py-2" value={volunteerInfo.phone} onChange={e => setVolunteerInfo(v => ({ ...v, phone: e.target.value }))} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message (optionnel)</label>
                <textarea id="message" rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2" value={volunteerInfo.message} onChange={e => setVolunteerInfo(v => ({ ...v, message: e.target.value }))} />
              </div>
            </div>

            <div className="flex justify-between">
              <button type="button" className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700" onClick={() => setStep(3)}>Précédent</button>
              <button type="submit" disabled={!canSubmit} className="px-4 py-2 rounded-lg bg-orange-600 text-white disabled:opacity-50">
                Confirmer la réservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;



