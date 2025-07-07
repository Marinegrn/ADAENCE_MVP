import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get('profileId');
  const date = searchParams.get('date');

  if (!profileId || !date) {
    return NextResponse.json({ message: 'Paramètres manquants' }, { status: 400 });
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/slots?profileId=${profileId}&date=${date}`);
    if (!res.ok) throw new Error('Erreur côté backend');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur proxy GET /api/slots :', error);
    return NextResponse.json(
      { message: 'Erreur serveur lors de la récupération des créneaux.' },
      { status: 500 }
    );
  }
}

