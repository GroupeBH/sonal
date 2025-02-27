import React from 'react';
import Hero from '../components/Hero';
import GameMenu from '../components/GameMenu';
import { FaTrophy, FaUsers, FaShieldAlt, FaCoins } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaTrophy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500" />,
      title: "Gros Lots Garantis",
      description: "Des jackpots exceptionnels et des chances de gagner multiples"
    },
    {
      icon: <FaUsers className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-500" />,
      title: "Des Millions de Gagnants",
      description: "Rejoignez notre communauté de gagnants à travers la RDC"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-500" />,
      title: "Jeu Responsable",
      description: "Nous promouvons une approche équilibrée et responsable du jeu"
    },
    {
      icon: <FaCoins className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-500" />,
      title: "Paiement Sécurisé",
      description: "Vos transactions sont protégées et sécurisées"
    }
  ];

  return (
    <>
      <Hero />
      <GameMenu />
      
      {/* Latest Results Section */}
      <section className="py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="bg-white rounded-lg shadow p-3 sm:p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Derniers Résultats</h3>
            <div className="space-y-2">
              {[
                { game: "Loto National", numbers: [7, 13, 23, 32, 45], date: "27/03" },
                { game: "Loto Express", numbers: [4, 8, 15, 16, 23], date: "27/03" },
                { game: "Keno", numbers: [2, 5, 9, 17, 25], date: "27/03" },
              ].map((result, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-medium text-gray-900">{result.game}</h4>
                    <span className="text-xs text-gray-600">{result.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {result.numbers.map((number, idx) => (
                      <span key={idx} className="w-5 h-5 flex items-center justify-center bg-blue-500 text-white rounded-full text-xs font-medium">
                        {number}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <a
                href="/results"
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
              >
                Voir tous les résultats
                <FaTrophy className="ml-1.5 w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-1 sm:mt-2 text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;