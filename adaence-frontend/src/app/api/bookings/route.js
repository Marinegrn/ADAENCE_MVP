import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function GET() {
  try {
    console.log('📡 Appel GET vers:', `${BACKEND_URL}/api/bookings`);
    
    const res = await fetch(`${BACKEND_URL}/api/bookings`);
    
    console.log('📡 Réponse backend status:', res.status);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ Erreur backend GET:', errorText);
      throw new Error(`Backend error: ${res.status} - ${errorText}`);
    }
    
    const data = await res.json();
    console.log('✅ Données récupérées:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Erreur dans GET /api/bookings:', error);
    
    return NextResponse.json(
      { 
        message: 'Erreur serveur lors de la récupération des réservations.',
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    console.log('📡 Données reçues du front:', JSON.stringify(body, null, 2));
    console.log('📡 Appel POST vers:', `${BACKEND_URL}/api/bookings`);
    
    // Validation des données avant envoi
    const requiredFields = ['visitorEmail', 'volunteerName', 'slotId', 'profileId'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      console.error('❌ Champs manquants:', missingFields);
      return NextResponse.json(
        { 
          message: 'Champs requis manquants',
          missingFields: missingFields
        },
        { status: 400 }
      );
    }
    
    const res = await fetch(`${BACKEND_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    console.log('📡 Réponse backend status:', res.status);
    console.log('📡 Headers backend:', Object.fromEntries(res.headers.entries()));
    
    if (!res.ok) {
      // Récupérer le message d'erreur exact du backend
      let errorData;
      const contentType = res.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        errorData = await res.json();
      } else {
        errorData = { message: await res.text() };
      }
      
      console.error('❌ Erreur backend POST:', errorData);
      console.error('❌ Status:', res.status);
      
      // Transférer l'erreur exacte du backend au frontend
      return NextResponse.json(
        { 
          message: errorData.message || 'Erreur côté backend',
          error: errorData.error || 'Erreur inconnue',
          details: errorData.details || null,
          backendStatus: res.status
        },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    console.log('✅ Réservation créée avec succès:', data);
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('❌ Erreur dans POST /api/bookings:', error);
    
    // Différencier les erreurs de réseau des erreurs de parsing
    if (error.name === 'SyntaxError') {
      return NextResponse.json(
        { 
          message: 'Erreur de format des données',
          error: error.message
        },
        { status: 400 }
      );
    }
    
    if (error.message.includes('fetch')) {
      return NextResponse.json(
        { 
          message: 'Impossible de contacter le backend',
          error: error.message,
          backendUrl: BACKEND_URL
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        message: 'Erreur serveur lors de la création de la réservation.',
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

