import React, { useState } from 'react';
import { FaDollarSign, FaTrophy, FaArrowRight } from 'react-icons/fa';
import BettingForm from '../components/BettingForm';

const Games = () => {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const games = [
    {
      id: 1,
      name: "BET243 Addition",
      description: "Un nouveau concept de paris innovant avec des gains multiplicateurs",
      image: "https://images.unsplash.com/photo-1534297635662-a262cdcb8bee?auto=format&fit=crop&q=80",
      features: [
        "Tirages fréquents",
        "Gains multiplicateurs",
        "Combinaisons flexibles",
      ],
      minBet: "200 FC",
      jackpot: "100M FC",
      maxNumbers: 5,
      category: "Jeux instantanés"
    },
    {
      id: 2,
      name: "Paris HIPPIQUES PMU Alr",
      description: "Pariez sur les courses internationales avec le PMU. Profitez des cotes fixes pour maximiser vos gains.",
      image: "https://images.unsplash.com/photo-1582507225413-dac2b5dffd8d?auto=format&fit=crop&q=80",
      features: [
        "Courses internationales",
        "Cotes fixes",
        "Gains garantis",
      ],
      minBet: "1000 FC",
      jackpot: "500M FC",
      maxNumbers: 5,
      category: "Paris hippiques"
    },
    {
      id: 3,
      name: "Paris HIPPIQUES PMU Plr",
      description: "Le pari hippique par excellence avec le PMU. Des courses prestigieuses et des gains multiplicateurs.",
      image: "https://images.unsplash.com/photo-1584937091925-f1f6cc4bdb6e?auto=format&fit=crop&q=80",
      features: [
        "Courses premium",
        "Multiplicateurs élevés",
        "Événements spéciaux",
      ],
      minBet: "1000 FC",
      jackpot: "1B FC",
      maxNumbers: 7,
      category: "Paris hippiques"
    },
    {
      id: 4,
      name: "Paris HIPPIQUES masse commune",
      description: "Pariez sur les courses de chevaux en direct avec des cotes dynamiques. Participez aux paris mutuels pour des gains exceptionnels.",
      image: "https://images.unsplash.com/photo-1558604680-932c5b8a4738?auto=format&fit=crop&q=80",
      features: [
        "Courses en direct",
        "Cotes dynamiques",
        "Paris mutuels",
      ],
      minBet: "500 FC",
      jackpot: "250M FC",
      maxNumbers: 6,
      category: "Paris hippiques"
    },
    {
      id: 5,
      name: "Paris Sportifs",
      description: "Pariez sur vos équipes favorites dans les plus grandes compétitions sportives mondiales.",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80",
      features: [
        "Sports internationaux",
        "Cotes compétitives",
        "Paris en direct",
      ],
      minBet: "500 FC",
      jackpot: "100M FC",
      maxNumbers: 5,
      category: "Paris sportifs"
    },
    {
      id: 6,
      name: "Jeux Virtuels",
      description: "Des jeux de simulation virtuelle avec des tirages fréquents et des résultats instantanés.",
      image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80",
      features: [
        "Tirages toutes les 5 minutes",
        "Résultats instantanés",
        "Animations 3D",
      ],
      minBet: "100 FC",
      jackpot: "50M FC",
      maxNumbers: 4,
      category: "Virtuels"
    }
  ];

  const categories = Array.from(new Set(games.map(game => game.category)));

  const handlePlayClick = (gameId: number) => {
    setSelectedGame(selectedGame === gameId ? null : gameId);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-primary-900 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1592647420148-bfcc177e2117?auto=format&fit=crop&q=80"
            alt="SONAL S.A. Products"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
              Nos Produits
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              La SONAL S.A. commercialise une gamme très élargie des produits appelés "jeux".
              Nous avons : les paris hippiques, les paris sportifs, les jeux instantanés et les virtuels.
            </p>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <div key={category} className="mb-12 last:mb-0">
              <h2 className="text-xl sm:text-2xl font-bold text-primary-900 mb-6">{category}</h2>
              <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-12">
                {games
                  .filter(game => game.category === category)
                  .map((game, index) => (
                    <div key={game.id} className={`flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-4 sm:gap-6 md:gap-8 bg-white rounded-lg shadow-xl overflow-hidden`}>
                      <div className="md:w-1/2">
                        <img
                          src={game.image}
                          alt={game.name}
                          className="w-full h-48 sm:h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-1/2 p-4 sm:p-6 md:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-primary-900 mb-2 sm:mb-3">{game.name}</h2>
                        <p className="text-sm sm:text-base text-primary-600 mb-4 sm:mb-6">{game.description}</p>
                        
                        <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                          {game.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm sm:text-base text-primary-700">
                              <FaArrowRight className="w-4 h-4 text-secondary-500 mr-2" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                          <div className="bg-primary-50 p-3 sm:p-4 rounded-lg">
                            <div className="flex items-center text-primary-600 mb-1 sm:mb-2">
                              <FaDollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                              <span className="text-sm sm:text-base font-semibold">Mise minimum</span>
                            </div>
                            <p className="text-lg sm:text-xl font-bold text-primary-900">{game.minBet}</p>
                          </div>
                          <div className="bg-accent-50 p-3 sm:p-4 rounded-lg">
                            <div className="flex items-center text-accent-600 mb-1 sm:mb-2">
                              <FaTrophy className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                              <span className="text-sm sm:text-base font-semibold">Jackpot</span>
                            </div>
                            <p className="text-lg sm:text-xl font-bold text-accent-900">{game.jackpot}</p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handlePlayClick(game.id)}
                          className="w-full bg-secondary-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-semibold hover:bg-secondary-700 transition-colors flex items-center justify-center"
                        >
                          {selectedGame === game.id ? 'Fermer' : 'Jouer maintenant'}
                          <FaArrowRight className="ml-1.5 sm:ml-2 w-4 h-4" />
                        </button>

                        {selectedGame === game.id && (
                          <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gray-50 rounded-lg">
                            <BettingForm
                              gameName={game.name}
                              minBet={game.minBet}
                              maxNumbers={game.maxNumbers}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsible Gaming Notice */}
      <div className="bg-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 md:mr-8">
                <h3 className="text-lg sm:text-xl font-bold text-primary-900 mb-2">Jouez Responsable</h3>
                <p className="text-sm sm:text-base text-primary-600">
                  SONAL S.A. s'engage à promouvoir le jeu responsable. Fixez-vous des limites et ne jouez que ce que vous pouvez vous permettre de perdre.
                </p>
              </div>
              <a
                href="/responsible-gaming"
                className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-accent-600 hover:bg-accent-700"
              >
                En savoir plus
                <FaArrowRight className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;