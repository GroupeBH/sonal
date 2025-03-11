import React from 'react';
import { Timer, Trophy } from 'lucide-react';

interface VirtualGame {
  id: string;
  type: string;
  name: string;
  nextEvent: string;
  options: Array<{
    id: string;
    name: string;
    odds: number;
  }>;
}

const games: VirtualGame[] = [
  {
    id: '1',
    type: 'Football',
    name: 'Virtual Premier League',
    nextEvent: '2 minutes',
    options: [
      { id: '1', name: 'Red Dragons', odds: 2.10 },
      { id: '2', name: 'Blue Knights', odds: 3.40 },
      { id: 'X', name: 'Match Nul', odds: 3.20 }
    ]
  },
  {
    id: '2',
    type: 'Course',
    name: 'Virtual Racing Cup',
    nextEvent: '5 minutes',
    options: [
      { id: '1', name: 'Thunder Bolt', odds: 4.50 },
      { id: '2', name: 'Silver Arrow', odds: 3.20 },
      { id: '3', name: 'Golden Star', odds: 2.80 }
    ]
  }
];

export const VirtualGames = () => {
  const placeBet = (game: VirtualGame, option: { id: string; name: string; odds: number }) => {
    const bet = {
      id: `virtual-${game.id}-${option.id}-${Date.now()}`,
      type: 'Virtual',
      selection: option.name,
      odds: option.odds,
      details: {
        event: game.name,
        time: game.nextEvent
      }
    };
    
    // Here we would dispatch this bet to a global state manager
    console.log('Virtual bet placed:', bet);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Jeux Virtuels</h2>
      
      <div className="space-y-6">
        {games.map((game) => (
          <div key={game.id} className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-indigo-600 font-semibold">{game.type}</span>
                <h3 className="text-xl font-bold text-gray-800">{game.name}</h3>
              </div>
              <div className="flex items-center text-gray-500">
                <Timer className="w-4 h-4 mr-1" />
                <span>Prochain événement: {game.nextEvent}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {game.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => placeBet(game, option)}
                  className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-800 font-medium">{option.name}</span>
                    <Trophy className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{option.odds}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};