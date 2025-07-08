import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// PROXY
export async function GET() {
  console.log('BACKEND_URL:', BACKEND_URL);
  try {
    const res = await fetch(`${BACKEND_URL}/api/activities`);
    if (!res.ok) throw new Error('Erreur côté backend');
    const data = await res.json();

    console.log('Données backend:', data);  // <=== important pour comparer

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur proxy GET /api/activities :', error);
    return NextResponse.json(
      { message: 'Erreur serveur lors de la récupération des seniors.' },
      { status: 500 }
    );
  }
}
