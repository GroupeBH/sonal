import React, { useState, useEffect } from 'react';
import { Match, Bet } from '../types';
import { Calendar, Clock, Search, Trophy, Star, User, Lock, Zap, AlertCircle } from 'lucide-react';

interface Sport {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface MatchResult {
  scoreA: number;
  scoreB: number;
  outcome: string;
}

const sports: Sport[] = [
  { id: 'football', name: 'Football', icon: Trophy },
  { id: 'basketball', name: 'Basketball', icon: Trophy },
  { id: 'tennis', name: 'Tennis', icon: Trophy },
  { id: 'rugby', name: 'Rugby', icon: Trophy },
  { id: 'hockey', name: 'Hockey', icon: Trophy },
  { id: 'cricket', name: 'Cricket', icon: Trophy },
  { id: 'esports', name: 'eSports', icon: Zap }
];

const matches: Match[] = [
  // Football
  {
    id: '1',
    sport: 'Football',
    teamA: 'PSG',
    teamB: 'Manchester City',
    date: '2024-03-20T20:00:00',
    competition: 'UEFA Champions League',
    result: { scoreA: 2, scoreB: 1, outcome: '1' },
    odds: {
      teamA: 2.45,
      draw: 3.20,
      teamB: 2.90
    },
    markets: [
      { id: '1', name: '1X2', odds: { '1': 2.45, 'X': 3.20, '2': 2.90 } },
      { id: '2', name: 'Les deux équipes marquent', odds: { 'Oui': 1.85, 'Non': 1.95 } },
      { id: '3', name: 'Score exact', odds: { '1-0': 8.5, '2-1': 7.0, 'Autre': 1.5 } }
    ]
  },
  // Basketball
  {
    id: '2',
    sport: 'Basketball',
    teamA: 'Lakers',
    teamB: 'Celtics',
    date: '2024-03-21T19:30:00',
    competition: 'NBA',
    result: { scoreA: 112, scoreB: 108, outcome: '1' },
    odds: {
      teamA: 1.85,
      teamB: 1.95
    },
    markets: [
      { id: '1', name: 'Vainqueur du match', odds: { '1': 1.85, '2': 1.95 } },
      { id: '2', name: 'Plus/Moins 220.5 points', odds: { 'Plus': 1.90, 'Moins': 1.90 } }
    ]
  },
  // Tennis
  {
    id: '3',
    sport: 'Tennis',
    playerA: 'Nadal',
    playerB: 'Djokovic',
    date: '2024-03-22T15:00:00',
    competition: 'Wimbledon',
    result: { scoreA: 3, scoreB: 2, outcome: '1' },
    odds: {
      playerA: 2.10,
      playerB: 1.80
    },
    markets: [
      { id: '1', name: 'Vainqueur', odds: { '1': 2.10, '2': 1.80 } },
      { id: '2', name: 'Nombre de sets', odds: { '3 sets': 2.50, '4 sets': 3.00, '5 sets': 4.50 } }
    ]
  },
  // eSports
  {
    id: '4',
    sport: 'esports',
    teamA: 'Fnatic',
    teamB: 'G2 Esports',
    date: '2024-03-23T18:00:00',
    competition: 'League of Legends - LEC',
    result: { scoreA: 2, scoreB: 0, outcome: '1' },
    odds: {
      teamA: 1.65,
      teamB: 2.20
    },
    markets: [
      { id: '1', name: 'Vainqueur', odds: { '1': 1.65, '2': 2.20 } },
      { id: '2', name: 'Première carte', odds: { '1': 1.90, '2': 1.90 } }
    ]
  }
];

export const SportsBetting = () => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopularEvents, setShowPopularEvents] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userBets, setUserBets] = useState<Bet[]>([]);
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null);

  const generateBetId = () => 
    `BET-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

  const handleAuth = (email: string, password: string) => {
    // Simulation d'authentification
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const addToBetSlip = (match: Match, marketId: string, selection: string, odds: number) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    const newBet: Bet = {
      id: generateBetId(),
      matchId: match.id,
      sport: match.sport,
      marketId,
      selection,
      odds,
      status: 'pending',
      date: new Date().toISOString(),
      event: `${match.teamA || match.playerA} vs ${match.teamB || match.playerB}`,
      result: null
    };

    setUserBets([...userBets, newBet]);
  };

  const checkBetResult = (bet: Bet) => {
    const match = matches.find(m => m.id === bet.matchId);
    if (!match?.result) return 'En attente';

    const market = match.markets.find(m => m.id === bet.marketId);
    let won = false;

    switch (market?.name) {
      case '1X2':
        won = match.result.outcome === bet.selection;
        break;
      case 'Les deux équipes marquent':
        won = (match.result.scoreA > 0 && match.result.scoreB > 0) === (bet.selection === 'Oui');
        break;
      case 'Score exact':
        const score = `${match.result.scoreA}-${match.result.scoreB}`;
        won = bet.selection === score || (bet.selection === 'Autre' && !market.odds[score]);
        break;
      default:
        won = false;
    }

    return won ? 'Gagné' : 'Perdu';
  };

  return (
    <div className="space-y-8 relative">
      {/* Modal de connexion */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Connexion requise
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAuth(
                formData.get('email') as string,
                formData.get('password') as string
              );
            }}>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-2 border rounded"
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                className="w-full mb-6 p-2 border rounded"
                required
              />
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mes paris */}
      {isLoggedIn && (
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Mes paris ({userBets.length})
          </h3>
          <div className="space-y-3">
            {userBets.map(bet => {
              const match = matches.find(m => m.id === bet.matchId);
              return (
                <div 
                  key={bet.id} 
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedBet(bet)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{bet.event}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(bet.date).toLocaleDateString()} - {bet.sport}
                      </p>
                      <div className="mt-1 flex gap-2 items-center">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                          {bet.selection} @{bet.odds}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          bet.status === 'Gagné' ? 'bg-green-100 text-green-600' :
                          bet.status === 'Perdu' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {checkBetResult(bet)}
                        </span>
                      </div>
                    </div>
                    {match?.result && (
                      <div className="text-sm text-gray-600">
                        Résultat : {match.result.scoreA}-{match.result.scoreB}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* En-tête */}
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

      {/* Filtres sport */}
      <div className="flex gap-4 overflow-x-auto pb-4">
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

      {/* Événements populaires */}
      {showPopularEvents && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Star className="w-5 h-5" />
              Événements Tendance
            </h3>
            <button
              onClick={() => setShowPopularEvents(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              Masquer
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.slice(0, 3).map((match) => (
              <div key={match.id} className="bg-white/10 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80">{match.competition}</span>
                  <div className="flex items-center gap-2 text-white/80">
                    <Calendar className="w-4 h-4" />
                    {new Date(match.date).toLocaleDateString()}
                  </div>
                </div>
                <h4 className="font-semibold mb-2">
                  {match.teamA || match.playerA} vs {match.teamB || match.playerB}
                </h4>
                <div className="flex gap-2">
                  {Object.entries(match.markets[0].odds).map(([key, odds]) => (
                    <button
                      key={key}
                      onClick={() => addToBetSlip(match, match.markets[0].id, key, odds)}
                      className="flex-1 bg-white/20 hover:bg-white/30 transition-colors rounded px-3 py-2 text-center"
                    >
                      <div className="text-xs">{key}</div>
                      <div className="font-bold">{odds}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Liste des matches */}
      <div className="space-y-4">
        {matches.map((match) => (
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
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {Object.entries(market.odds).map(([key, odds]) => (
                      <button
                        key={key}
                        onClick={() => addToBetSlip(match, market.id, key, odds)}
                        className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg p-3 text-center"
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