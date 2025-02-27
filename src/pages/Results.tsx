import React, { useState } from 'react';
import { FaCalendarAlt, FaSearch, FaDownload, FaArrowRight } from 'react-icons/fa';

const Results = () => {
  const [selectedGame, setSelectedGame] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('');

  const games = [
    { id: 'all', name: 'Tous les jeux' },
    { id: 'national', name: 'Loto National' },
    { id: 'express', name: 'Loto Express' },
    { id: 'keno', name: 'Keno' }
  ];

  const results = [
    {
      id: 1,
      game: 'Loto National',
      date: '27 Mars 2024',
      numbers: [7, 13, 23, 32, 45, 48],
      jackpot: '250M FC',
      winners: 3
    },
    {
      id: 2,
      game: 'Loto Express',
      date: '27 Mars 2024',
      numbers: [4, 8, 15, 16, 23, 42],
      jackpot: '5M FC',
      winners: 12
    },
    {
      id: 3,
      game: 'Keno',
      date: '27 Mars 2024',
      numbers: [2, 5, 9, 17, 25, 31],
      jackpot: '10M FC',
      winners: 8
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-blue-900 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518133683791-0b9de5a055f0?auto=format&fit=crop&q=80"
            alt="SONAL Results"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4">Résultats des Tirages</h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              Consultez les derniers résultats de tous nos jeux et vérifiez vos gains
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-5 md:py-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
            <div className="flex gap-2 sm:gap-4 flex-wrap">
              {games.map(game => (
                <button
                  key={game.id}
                  onClick={() => setSelectedGame(game.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                    selectedGame === game.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {game.name}
                </button>
              ))}
            </div>
            <div className="flex gap-3 sm:gap-4">
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="pl-9 pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Tous les mois</option>
                  <option value="03-2024">Mars 2024</option>
                  <option value="02-2024">Février 2024</option>
                  <option value="01-2024">Janvier 2024</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {results.map(result => (
              <div key={result.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{result.game}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 flex items-center mt-1 sm:mt-2">
                        <FaCalendarAlt className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                        {result.date}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm bg-green-100 text-green-800">
                        {result.winners} gagnant{result.winners > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {result.numbers.map((number, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold text-xs sm:text-sm md:text-lg"
                      >
                        {number}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                    <div className="bg-yellow-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
                      <span className="text-xs sm:text-sm text-yellow-800 font-semibold">
                        Jackpot: {result.jackpot}
                      </span>
                    </div>
                    <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm text-gray-700 bg-white hover:bg-gray-50">
                        <FaDownload className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                        PDF
                      </button>
                      <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent rounded-md text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700">
                        Vérifier mes numéros
                        <FaArrowRight className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Archive Notice */}
          <div className="mt-8 sm:mt-10 md:mt-12 bg-gray-50 rounded-lg p-4 sm:p-6 md:p-8 text-center">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4">
              Besoin d'accéder aux anciens résultats ?
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-5 md:mb-6">
              Consultez nos archives complètes des tirages précédents
            </p>
            <button className="inline-flex items-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border border-transparent rounded-md text-xs sm:text-sm md:text-base text-white bg-blue-600 hover:bg-blue-700">
              Accéder aux archives
              <FaSearch className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;