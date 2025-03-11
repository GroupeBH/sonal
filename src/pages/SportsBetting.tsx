import React, { useState } from 'react';
import { Match } from '../types';
import { Calendar, Clock, Search, Trophy, Star } from 'lucide-react';

interface Sport {
  id: string;
  name: string;
  icon: React.ElementType;
}

const sports: Sport[] = [
  { id: 'football', name: 'Football', icon: Trophy },
  { id: 'basketball', name: 'Basketball', icon: Trophy },
  { id: 'tennis', name: 'Tennis', icon: Trophy },
  { id: 'rugby', name: 'Rugby', icon: Trophy },
  { id: 'hockey', name: 'Hockey', icon: Trophy },
  { id: 'cricket', name: 'Cricket', icon: Trophy },
  { id: 'athletics', name: 'Athlétisme', icon: Trophy }
];

const matches: Match[] = [
  {
    id: '1',
    sport: 'Football',
    teamA: 'PSG',
    teamB: 'Manchester City',
    date: '2024-03-20T20:00:00',
    competition: 'UEFA Champions League',
    odds: {
      teamA: 2.45,
      draw: 3.20,
      teamB: 2.90
    },
    markets: [
      { id: '1', name: '1X2', odds: { '1': 2.45, 'X': 3.20, '2': 2.90 } },
      { id: '2', name: 'Les deux équipes marquent', odds: { 'Oui': 1.85, 'Non': 1.95 } },
      { id: '3', name: 'Plus/Moins 2.5 buts', odds: { 'Plus': 1.75, 'Moins': 2.05 } }
    ]
  },
  {
    id: '2',
    sport: 'Basketball',
    teamA: 'Lakers',
    teamB: 'Celtics',
    date: '2024-03-21T19:30:00',
    competition: 'NBA',
    odds: {
      teamA: 1.85,
      teamB: 1.95
    },
    markets: [
      { id: '1', name: 'Vainqueur du match', odds: { '1': 1.85, '2': 1.95 } },
      { id: '2', name: 'Plus/Moins 220.5 points', odds: { 'Plus': 1.90, 'Moins': 1.90 } }
    ]
  }
];

export const SportsBetting = () => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopularEvents, setShowPopularEvents] = useState(true);

  const addToBetSlip = (matchId: string, selection: string, odds: number, match: Match) => {
    const bet = {
      id: `sport-${matchId}-${Date.now()}`,
      type: 'Sport',
      selection,
      odds,
      details: {
        event: `${match.teamA} vs ${match.teamB}`,
        time: new Date(match.date).toLocaleString(),
      }
    };
    
    console.log('Added to bet slip:', bet);
  };

  const filteredMatches = matches.filter(match => {
    const matchesSearch = 
      match.teamA.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.teamB.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.sport.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSport = selectedSport ? match.sport.toLowerCase() === selectedSport.toLowerCase() : true;
    
    return matchesSearch && matchesSport;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Paris Sportifs</h2>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un match..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        <button
          onClick={() => setSelectedSport(null)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            !selectedSport ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          Tous les sports
        </button>
        {sports.map((sport) => (
          <button
            key={sport.id}
            onClick={() => setSelectedSport(sport.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              selectedSport === sport.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            <sport.icon className="w-4 h-4" />
            {sport.name}
          </button>
        ))}
      </div>

      {showPopularEvents && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Star className="w-5 h-5" />
              Événements Populaires
            </h3>
            <button
              onClick={() => setShowPopularEvents(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              Masquer
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {matches.slice(0, 2).map((match) => (
              <div key={match.id} className="bg-white/10 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80">{match.competition}</span>
                  <div className="flex items-center gap-2 text-white/80">
                    <Calendar className="w-4 h-4" />
                    {new Date(match.date).toLocaleDateString()}
                  </div>
                </div>
                <h4 className="font-semibold mb-2">{match.teamA} vs {match.teamB}</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToBetSlip(match.id, match.teamA, match.odds.teamA, match)}
                    className="flex-1 bg-white/20 hover:bg-white/30 transition-colors rounded px-3 py-2 text-center"
                  >
                    {match.odds.teamA}
                  </button>
                  {match.odds.draw && (
                    <button
                      onClick={() => addToBetSlip(match.id, 'Match Nul', match.odds.draw, match)}
                      className="flex-1 bg-white/20 hover:bg-white/30 transition-colors rounded px-3 py-2 text-center"
                    >
                      {match.odds.draw}
                    </button>
                  )}
                  <button
                    onClick={() => addToBetSlip(match.id, match.teamB, match.odds.teamB, match )}
                    className="flex-1 bg-white/20 hover:bg-white/30 transition-colors rounded px-3 py-2 text-center"
                  >
                    {match.odds.teamB}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {filteredMatches.map((match) => (
          <div key={match.id} className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-indigo-600 font-semibold">{match.sport}</span>
                <h3 className="text-xl font-bold text-gray-800">{match.competition}</h3>
              </div>
              <div className="flex items-center text-gray-500 space-x-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(match.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(match.date).toLocaleTimeString()}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {match.markets.map((market) => (
                <div key={market.id} className="border-t pt-4 first:border-t-0 first:pt-0">
                  <h4 className="font-medium text-gray-700 mb-3">{market.name}</h4>
                  <div className="flex gap-3">
                    {Object.entries(market.odds).map(([key, odds]) => (
                      <button
                        key={key}
                        onClick={() => addToBetSlip(match.id, `${market.name} - ${key}`, odds, match)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg p-3 text-center"
                      >
                        <div className="text-sm text-gray-600 mb-1">{key}</div>
                        <div className="font-bold text-gray-900">{odds}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};