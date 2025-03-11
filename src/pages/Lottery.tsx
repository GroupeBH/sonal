import React, { useState } from 'react';
import { Calendar, Timer, Search, RefreshCw } from 'lucide-react';

interface LotteryGame {
  id: string;
  name: string;
  description: string;
  drawTime: string;
  jackpot: string;
  price: number;
  lastResults?: number[];
}

const games: LotteryGame[] = [
  {
    id: '1',
    name: 'Super Loto',
    description: 'Tirage hebdomadaire avec jackpot garanti',
    drawTime: '2024-03-23T20:00:00',
    jackpot: '5 000 000 €',
    price: 2.20,
    lastResults: [7, 13, 23, 32, 41, 45]
  },
  {
    id: '2',
    name: 'Euro Millions',
    description: 'Le plus grand jackpot européen',
    drawTime: '2024-03-22T20:45:00',
    jackpot: '17 000 000 €',
    price: 2.50,
    lastResults: [5, 11, 25, 37, 43, 44]
  }
];

export const Lottery = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [ticketNumber, setTicketNumber] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedGame, setSelectedGame] = useState<LotteryGame | null>(null);
  
  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else if (selectedNumbers.length < 6) {
      setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b));
    }
  };

  const playTicket = (game: LotteryGame) => {
    const bet = {
      id: `lottery-${game.id}-${Date.now()}`,
      type: 'Lottery',
      selection: game.name,
      odds: game.price * 2,
      details: {
        numbers: selectedNumbers,
        event: game.name,
        time: new Date(game.drawTime).toLocaleString()
      }
    };
    
    console.log('Lottery ticket played:', bet);
    setSelectedNumbers([]);
    setSelectedGame(null);
  };

  const checkTicket = () => {
    console.log('Checking ticket:', ticketNumber);
    setShowResults(true);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Loterie en Ligne</h2>
      
      {/* Ticket Checker */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Vérifier un ticket</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={ticketNumber}
            onChange={(e) => setTicketNumber(e.target.value)}
            placeholder="Numéro du ticket"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            onClick={checkTicket}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Vérifier
          </button>
        </div>
        
        {showResults && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Résultats du dernier tirage:</p>
            <div className="flex gap-2 mt-2">
              {games[0].lastResults?.map((num) => (
                <div key={num} className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Latest Results */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Derniers Résultats</h3>
          <button className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Actualiser
          </button>
        </div>
        <div className="space-y-4">
          {games.map((game) => (
            <div key={game.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-800">{game.name}</h4>
                <span className="text-sm text-gray-600">
                  {new Date(game.drawTime).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-2">
                {game.lastResults?.map((num) => (
                  <div key={num} className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {num}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Available Games */}
      <div className="grid gap-6 md:grid-cols-2">
        {games.map((game) => (
          <div key={game.id} className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{game.name}</h3>
            <p className="text-gray-600 mb-4">{game.description}</p>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(game.drawTime).toLocaleDateString()}
              </div>
              <div className="flex items-center text-gray-500">
                <Timer className="w-4 h-4 mr-1" />
                {new Date(game.drawTime).toLocaleTimeString()}
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-indigo-600">Jackpot</p>
              <p className="text-2xl font-bold text-indigo-700">{game.jackpot}</p>
            </div>
            
            {selectedGame?.id === game.id && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">
                  Sélectionnez 6 numéros ({selectedNumbers.length}/6)
                </p>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 49 }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => toggleNumber(num)}
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                        ${selectedNumbers.includes(num)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                      `}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Prix: {game.price.toFixed(2)} €</span>
              {selectedGame?.id === game.id ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => playTicket(game)}
                    disabled={selectedNumbers.length !== 6}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Valider
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedGame(game)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Jouer
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};