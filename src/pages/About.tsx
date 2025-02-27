import React from 'react';
import { FaHistory, FaBullseye, FaTrophy, FaUsers, FaArrowRight } from 'react-icons/fa';

const About = () => {
  const milestones = [
    { year: '1984', event: 'Création de la SONAL S.A. par le gouvernement de la RDC' },
    { year: '1990', event: 'Lancement du premier Loto National' },
    { year: '2000', event: 'Introduction du Loto Express et modernisation des systèmes' },
    { year: '2024', event: 'Expansion digitale et lancement de nouveaux jeux innovants' },
  ];

  const values = [
    {
      icon: () => <FaBullseye className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-500" />,
      title: 'Mission',
      description: 'Offrir des jeux de loterie transparents et équitables tout en contribuant au développement socio-économique de la RDC.'
    },
    {
      icon: () => <FaTrophy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500" />,
      title: 'Excellence',
      description: 'Nous nous engageons à maintenir les plus hauts standards de qualité et d\'intégrité dans tous nos services.'
    },
    {
      icon: () => <FaUsers className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-500" />,
      title: 'Communauté',
      description: 'Nous investissons dans des projets sociaux et contribuons au bien-être de nos communautés.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-blue-900 py-12 sm:py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
            alt="SONAL S.A. Direction Générale"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4">Notre Histoire</h1>
            <p className="text-sm sm:text-base md:text-xl text-gray-300 max-w-3xl mx-auto">
              Depuis 40 ans, SONAL S.A. est le partenaire de confiance des Congolais 
              pour des jeux de loterie responsables et transparents.
            </p>
          </div>
        </div>
      </div>

      {/* Rest of the component remains unchanged */}
      {/* ... */}
    </div>
  );
};

export default About;