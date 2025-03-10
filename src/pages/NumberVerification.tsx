import React from 'react';
import TicketForm from '../components/TicketVerification/TicketForm';
import TicketInfo from '../components/TicketVerification/TicketInfo';
import { FaTicketAlt, FaArrowRight, FaDice } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const NumberVerification = () => {
  const params = useParams();
  console.log(params);

  const quickGames = [
    {
      name: "BET243 Addition",
      description: "Jeu instantané avec gains multiplicateurs",
      link: "/products#bet243"
    },
    {
      name: "Paris HIPPIQUES PMU",
      description: "Paris sur les courses internationales",
      link: "/products#hippique"
    },
    {
      name: "Paris Sportifs",
      description: "Pariez sur vos équipes favorites",
      link: "/products#sport"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-primary-900 py-12 sm:py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1582507225413-dac2b5dffd8d?auto=format&fit=crop&q=80"
            alt="Vérification de ticket"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
              Vérification de Ticket
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              Vérifiez rapidement si votre ticket est gagnant en entrant son numéro et la date du tirage
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Verification Form */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <FaTicketAlt className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mr-2 sm:mr-3" />
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Vérifier un ticket</h2>
              </div>
              <TicketForm />
            </div>

            {/* Information Section */}
            <div>
              <TicketInfo />
              
              {/* Quick Games Section */}
              <div className="mt-6 sm:mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <FaDice className="w-5 h-5 text-primary-600 mr-2" />
                  Jouer à nouveau
                </h3>
                <div className="space-y-3">
                  {quickGames.map((game, index) => (
                    <a
                      key={index}
                      href={game.link}
                      className="block p-3 sm:p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-base font-medium text-gray-900">{game.name}</h4>
                          <p className="text-sm text-gray-600">{game.description}</p>
                        </div>
                        <FaArrowRight className="w-4 h-4 text-primary-500" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberVerification;