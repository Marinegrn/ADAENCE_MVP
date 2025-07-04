'use client';

import Link from 'next/link';
import { Search, Edit, Share2, Heart, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">Adaence</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-purple-600 flex items-center">
              <span className="mr-2">🏠</span> Accueil
            </Link>
            <Link href="/visites" className="text-gray-600 hover:text-purple-600 font-medium flex items-center">
              <span className="mr-2">👥</span> Je rends visite
            </Link>
            <Link href="/guide" className="text-gray-600 hover:text-purple-600 flex items-center">
              <span className="mr-2">📖</span> Guide du partage
            </Link>
            <Link href="/benevole" className="text-gray-600 hover:text-purple-600 flex items-center">
              <span className="mr-2">🎯</span> Devenir bénévole
            </Link>
          </nav>

          {/* Bouton don */}
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Faire un don ❤️
          </button>
        </div>
      </div>
    </header>
  );
}

