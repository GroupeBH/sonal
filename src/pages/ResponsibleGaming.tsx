import React from 'react';
import { FaShieldAlt, FaUserClock, FaPhoneAlt, FaHandHoldingHeart, FaChartLine, FaLock } from 'react-icons/fa';

const ResponsibleGaming = () => {
  const guidelines = [
    {
      icon: <FaUserClock className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />,
      title: "Fixez-vous des limites",
      description: "Définissez un budget et un temps de jeu maximum et respectez-les strictement."
    },
    {
      icon: <FaChartLine className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />,
      title: "Surveillez votre activité",
      description: "Gardez un œil sur vos habitudes de jeu et vos dépenses."
    },
    {
      icon: <FaLock className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />,
      title: "Prenez des pauses",
      description: "Faites régulièrement des pauses pour garder le contrôle."
    }
  ];

  const resources = [
    {
      title: "Ligne d'assistance",
      description: "Disponible 24/7 pour vous aider",
      phone: "+243 123 456 789"
    },
    {
      title: "Auto-exclusion",
      description: "Prenez une pause volontaire du jeu",
      link: "/self-exclusion"
    },
    {
      title: "Évaluation des risques",
      description: "Testez vos habitudes de jeu",
      link: "/risk-assessment"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-primary-900 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1582507225413-dac2b5dffd8d?auto=format&fit=crop&q=80"
            alt="Jeu Responsable"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
              Jeu Responsable
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              SONAL S.A. s'engage à promouvoir une expérience de jeu positive et responsable
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Guidelines Section */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
              Nos Principes de Jeu Responsable
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {guidelines.map((guideline, index) => (
                <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    {guideline.icon}
                    <h3 className="mt-3 text-base sm:text-lg font-semibold text-gray-900">
                      {guideline.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-gray-600">
                      {guideline.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div className="bg-primary-50 rounded-lg p-4 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-900 mb-6 text-center">
              Ressources d'Aide
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {resources.map((resource, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-base sm:text-lg font-semibold text-primary-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3">
                    {resource.description}
                  </p>
                  {resource.phone ? (
                    <a
                      href={`tel:${resource.phone}`}
                      className="inline-flex items-center text-sm sm:text-base text-primary-600 hover:text-primary-700"
                    >
                      <FaPhoneAlt className="w-4 h-4 mr-2" />
                      {resource.phone}
                    </a>
                  ) : (
                    <a
                      href={resource.link}
                      className="inline-flex items-center text-sm sm:text-base text-primary-600 hover:text-primary-700"
                    >
                      En savoir plus
                      <FaHandHoldingHeart className="ml-2 w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Commitment Section */}
          <div className="mt-8 sm:mt-12 md:mt-16 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full mb-4">
              <FaShieldAlt className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Notre Engagement
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              SONAL S.A. s'engage à fournir un environnement de jeu sûr et responsable. 
              Nous mettons en place des outils et des ressources pour aider nos joueurs 
              à maintenir le contrôle de leurs activités de jeu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsibleGaming;