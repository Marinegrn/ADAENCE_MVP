'use client';

import React, { useState } from 'react';
import { ChevronDown, Heart, Users, Shield, Star, ArrowRight } from 'lucide-react';

const GuidePage = () => {
  const [activeSection, setActiveSection] = useState('histoire');

  const sections = [
    { id: 'histoire', title: 'Notre Histoire', icon: Star },
    { id: 'valeurs', title: 'Nos Valeurs', icon: Heart },
    { id: 'inclusion', title: 'Inclusion', icon: Users },
    { id: 'respect', title: 'Respect des Aînés', icon: Shield }
  ];

  const values = [
    {
      title: "Solidarité",
      description: "Nous croyons en la force du collectif et de l'entraide entre générations.",
      icon: "🤝"
    },
    {
      title: "Bienveillance",
      description: "Chaque interaction est guidée par la compassion et le respect mutuel.",
      icon: "💝"
    },
    {
      title: "Inclusion",
      description: "Nous accueillons chacun sans distinction, valorisant la diversité.",
      icon: "🌍"
    },
    {
      title: "Transmission",
      description: "Nous facilitons le partage des savoirs et des expériences.",
      icon: "📚"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Guide de Partage
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Découvrez l&apos;histoire, les valeurs et l&apos;esprit qui animent notre communauté dédiée au respect et à l&apos;inclusion, afin que les aînés ne se sentent plus exclus.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Hero Image Section */}
          <div 
          className="relative h-96 flex items-center justify-center overflow-hidden bg-cover bg-center"
          style={{ 
              backgroundImage: "url('/assets/sharing.jpg')", 
              backgroundPosition: "50% 65%", // horizontal 50%, vertical 50%
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 text-center text-white px-4">
              <h2 className="text-4xl font-bold mb-4">Ensemble, nous construisons des ponts</h2>
              <p className="text-xl opacity-90">La solidarité intergénérationnelle au cœur de notre mission !</p>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-300 ${
                      activeSection === section.id
                        ? 'text-purple-600 border-b-2 border-purple-600 bg-white'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{section.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-8 lg:p-12">
            
            {/* Histoire Section */}
            {activeSection === 'histoire' && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Notre histoire</h3>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Adaence est né d&apos;une vision simple mais puissante : créer un espace où les générations se rencontrent, 
                    s&apos;entraident et partagent leurs richesses respectives.
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">Les origines</h4>
                      <p className="text-gray-600">
                        En 2015, face au constat d&apos;un isolement croissant des personnes âgées et d&apos;un manque de connexion intergénérationnelle, 
                        notre équipe a décidé de créer une plateforme révolutionnaire.
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">La mission</h4>
                      <p className="text-gray-600">
                        Faciliter les rencontres authentiques entre les générations, valoriser l&apos;expérience des aînés et 
                        créer un écosystème d&apos;entraide basé sur le respect mutuel.
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-2xl">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🌟</div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-4">Aujourd&apos;hui</h4>
                      <p className="text-gray-600 mb-6">
                        Plus de 10 000 membres actifs, des milliers d&apos;histoires partagées et une communauté qui grandit chaque jour.
                      </p>
                      <div className="flex justify-center space-x-8">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">10K+</div>
                          <div className="text-sm text-gray-500">Membres</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">500+</div>
                          <div className="text-sm text-gray-500">Histoires</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-indigo-600">50+</div>
                          <div className="text-sm text-gray-500">Villes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Valeurs Section */}
            {activeSection === 'valeurs' && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Nos valeurs</h3>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Ces principes fondamentaux guident chacune de nos actions et définissent l&apos;esprit de notre communauté.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {values.map((value, index) => (
                    <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-4xl mb-4">{value.icon}</div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusion Section */}
            {activeSection === 'inclusion' && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Inclusion & Diversité</h3>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Nous croyons que la richesse de notre communauté réside dans sa diversité. Chaque voix compte, chaque histoire a sa valeur.
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl">
                    <div className="text-3xl mb-4">🌈</div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Toutes les identités</h4>
                    <p className="text-gray-600">
                      Nous accueillons chacun sans distinction d&apos;origine, de genre, d&apos;orientation ou de croyance.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl">
                    <div className="text-3xl mb-4">♿</div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Accessibilité</h4>
                    <p className="text-gray-600">
                      Notre plateforme est conçue pour être accessible à tous.tes, quels que soient les besoins spécifiques.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
                    <div className="text-3xl mb-4">🤝</div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Égalité</h4>
                    <p className="text-gray-600">
                      Chaque membre a les mêmes opportunités de partager, d&apos;apprendre et de contribuer.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Respect des Aînés Section */}
            {activeSection === 'respect' && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Respect des Aînés</h3>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Nos aînés sont les gardiens de notre histoire et de notre sagesse. Leur respect est au cœur de notre mission.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl mb-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h4 className="text-2xl font-semibold text-gray-900 mb-4">Notre engagement</h4>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                          <ArrowRight className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={16} />
                          <span>Valoriser l&apos;expérience et les savoirs des personnes âgées</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={16} />
                          <span>Lutter contre l&apos;isolement et favoriser le lien social</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={16} />
                          <span>Créer des espaces de dialogue intergénérationnel</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={16} />
                          <span>Garantir un environnement sûr et respectueux</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-center">
                      <div className="text-8xl mb-4">👵👴</div>
                      <p className="text-gray-600 italic">
                        &quot;Chaque ride raconte une histoire, chaque sourire porte une leçon de vie.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Adaence</h3>
              <p className="text-gray-400">
                Construisons ensemble une société plus inclusive et respectueuse de toutes les générations.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Communauté</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Nous contacter</h4>
              <p className="text-gray-400">
                Une question ? Une suggestion ?<br />
                Nous sommes là pour vous écouter.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Adaence. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GuidePage;