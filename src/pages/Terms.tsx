import React from 'react';
import { FaBalanceScale, FaUserCheck, FaShieldAlt, FaExclamationTriangle, FaMoneyBillWave, FaGavel } from 'react-icons/fa';

const Terms = () => {
  const sections = [
    {
      icon: <FaUserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />,
      title: "Conditions d'Utilisation",
      content: `En utilisant les services de SONAL S.A., vous acceptez de :
        - Avoir l'âge légal requis (18 ans minimum)
        - Fournir des informations exactes et à jour
        - Respecter les règles de chaque jeu
        - Ne pas utiliser de systèmes automatisés`
    },
    {
      icon: <FaMoneyBillWave className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />,
      title: "Conditions Financières",
      content: `Règles relatives aux transactions :
        - Dépôts et retraits en Francs Congolais uniquement
        - Montants minimums et maximums applicables
        - Vérification d'identité obligatoire pour les retraits
        - Délais de traitement standards`
    },
    {
      icon: <FaShieldAlt className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />,
      title: "Responsabilités",
      content: `SONAL S.A. s'engage à :
        - Assurer l'intégrité des jeux
        - Protéger les données personnelles
        - Maintenir la sécurité du site
        - Promouvoir le jeu responsable`
    },
    {
      icon: <FaExclamationTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />,
      title: "Restrictions",
      content: `Sont strictement interdits :
        - La création de comptes multiples
        - L'utilisation frauduleuse du service
        - Le partage de compte
        - Les comportements antisportifs`
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-primary-900 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80"
            alt="Terms"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
              Conditions d'Utilisation
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              Les règles et conditions régissant l'utilisation des services de SONAL S.A.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full mb-4">
              <FaBalanceScale className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              En accédant et en utilisant les services de SONAL S.A., vous acceptez d'être lié par 
              les présentes conditions d'utilisation. Veuillez les lire attentivement avant d'utiliser nos services.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {sections.map((section, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    {section.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legal Notice */}
          <div className="bg-primary-50 rounded-lg p-4 sm:p-6 md:p-8 text-center">
            <h2 className="text-lg sm:text-xl font-bold text-primary-900 mb-3">
              Mentions Légales
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              SONAL S.A. est une société d'État régie par les lois de la République Démocratique du Congo.
              Tous les droits sont réservés.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <FaGavel className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Contacter notre Service Juridique
            </a>
          </div>

          {/* Last Update */}
          <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              Dernière mise à jour : Mars 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;