import React from 'react';
import { FaGavel, FaBuilding, FaFileContract, FaUserTie, FaPhoneAlt } from 'react-icons/fa';

const Legal = () => {
  const companyInfo = [
    {
      icon: <FaBuilding className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />,
      title: "Informations Légales",
      content: `SONAL S.A. (Société Nationale de Loterie)
        - Société d'État de droit congolais
        - Capital social : 100.000.000 FC
        - RCCM : CD/KIN/RCCM/14-B-3634
        - ID. NAT. : 01-K6500-N84207M
        - Numéro d'Impôt : A0704822D`
    },
    {
      icon: <FaUserTie className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />,
      title: "Direction Générale",
      content: `Siège social :
        - 12, Avenue des Forces Armées
        - Commune de la Gombe
        - Kinshasa, RDC
        
        Direction assurée par le Conseil d'Administration
        sous la tutelle du Ministère du Portefeuille`
    },
    {
      icon: <FaFileContract className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />,
      title: "Licences et Autorisations",
      content: `Autorisations d'exploitation :
        - Licence nationale de loterie N° 001/MIN/FIN/2024
        - Agrément pour les paris sportifs N° 002/MIN/FIN/2024
        - Autorisation pour les jeux en ligne N° 003/MIN/FIN/2024
        
        Conformité aux réglementations nationales et internationales`
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-primary-900 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
            alt="Legal"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
              Mentions Légales
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              Informations légales et réglementaires de SONAL S.A.
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
              <FaGavel className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              SONAL S.A. est une société d'État de droit congolais, créée en 1984. Elle opère sous la tutelle 
              du Ministère du Portefeuille et est régie par les lois et règlements de la République 
              Démocratique du Congo.
            </p>
          </div>

          {/* Company Information Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {companyInfo.map((section, index) => (
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
          <div className="bg-primary-50 rounded-lg p-4 sm:p-6 md:p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-lg sm:text-xl font-bold text-primary-900 mb-3">
                Contact Service Juridique
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Pour toute question d'ordre juridique ou demande officielle, 
                veuillez contacter notre service juridique :
              </p>
              <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+243123456789"
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  <FaPhoneAlt className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  +243 123 456 789
                </a>
                <a
                  href="mailto:juridique@sonal.cd"
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-primary-600 text-sm sm:text-base font-medium rounded-md text-primary-600 hover:bg-primary-50"
                >
                  juridique@sonal.cd
                </a>
              </div>
            </div>
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

export default Legal;