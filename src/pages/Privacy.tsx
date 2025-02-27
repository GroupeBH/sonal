import React from 'react';
import { FaShieldAlt, FaUserShield, FaLock, FaCookie, FaEnvelope, FaGlobe } from 'react-icons/fa';

const Privacy = () => {
  const sections = [
    {
      icon: <FaUserShield className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />,
      title: "Collecte des Données",
      content: `Nous collectons uniquement les informations nécessaires pour fournir nos services :
        - Informations d'identification (nom, prénom, date de naissance)
        - Coordonnées (adresse email, numéro de téléphone)
        - Informations de paiement sécurisées
        - Données de jeu et historique des transactions`
    },
    {
      icon: <FaLock className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />,
      title: "Protection des Données",
      content: `SONAL S.A. met en œuvre des mesures de sécurité robustes :
        - Cryptage des données sensibles
        - Protocoles de sécurité avancés
        - Accès restreint aux données personnelles
        - Surveillance continue des systèmes`
    },
    {
      icon: <FaCookie className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />,
      title: "Utilisation des Cookies",
      content: `Nous utilisons des cookies pour :
        - Améliorer votre expérience utilisateur
        - Mémoriser vos préférences
        - Analyser l'utilisation du site
        - Personnaliser le contenu`
    },
    {
      icon: <FaGlobe className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />,
      title: "Partage des Données",
      content: `Vos données peuvent être partagées avec :
        - Les autorités réglementaires (conformité légale)
        - Nos partenaires de paiement sécurisés
        - Les prestataires de services essentiels
        Nous ne vendons jamais vos données personnelles.`
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-primary-900 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80"
            alt="Privacy"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              SONAL S.A. s'engage à protéger votre vie privée et vos données personnelles
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
              <FaShieldAlt className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons 
              vos informations personnelles lorsque vous utilisez nos services. En utilisant SONAL S.A., 
              vous acceptez les pratiques décrites dans cette politique.
            </p>
          </div>

          {/* Privacy Sections */}
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

          {/* Contact Section */}
          <div className="bg-primary-50 rounded-lg p-4 sm:p-6 md:p-8 text-center">
            <h2 className="text-lg sm:text-xl font-bold text-primary-900 mb-3">
              Questions sur la Confidentialité ?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Pour toute question concernant notre politique de confidentialité ou vos données personnelles, 
              n'hésitez pas à nous contacter.
            </p>
            <a
              href="mailto:privacy@sonal.cd"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <FaEnvelope className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Contactez notre DPO
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

export default Privacy;