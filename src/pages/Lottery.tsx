import React, { useState, useEffect } from 'react';
import { Calendar, Timer, Search, RefreshCw, User, Lock } from 'lucide-react';

interface LotteryGame {
  id: string;
  name: string;
  description: string;
  drawTime: string;
  jackpot: string;
  price: number;
  lastResults?: number[];
}

interface Bet {
  id: string;
  gameId: string;
  numbers: number[];
  date: string;
  checked?: boolean;
  won?: boolean;
}

const games: LotteryGame[] = [
  {
    id: '1',
    name: 'Super Loto',
    description: 'Tirage hebdomadaire avec jackpot garanti',
    drawTime: '2024-03-23T20:00:00',
    jackpot: '5 000 000 fc',
    price: 2.20,
    lastResults: [7, 13, 23, 32, 41, 45]
  },
  {
    id: '2',
    name: 'Congo Millions',
    description: 'Le plus grand jackpot européen',
    drawTime: '2024-03-22T20:45:00',
    jackpot: '17 000 000 fc',
    price: 2.50,
    lastResults: [5, 11, 25, 37, 43, 44]
  },
  {
    id: '3',
    name: 'Suka na mvuama',
    description: 'Loterie avec bonus progressif',
    drawTime: '2024-03-24T18:30:00',
    jackpot: '100 000 000 fc',
    price: 3.00,
    lastResults: [2, 15, 28, 34, 47, 49]
  }
];

export const Lottery = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [ticketNumber, setTicketNumber] = useState('');
  const [checkResult, setCheckResult] = useState<{won?: boolean; numbers?: number[]; message?: string} | null>(null);
  const [selectedGame, setSelectedGame] = useState<LotteryGame | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userBets, setUserBets] = useState<Bet[]>([]);
  
  const generateTicketNumber = () => 
    `TKT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else if (selectedNumbers.length < 6) {
      setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b));
    }
  };

  const handleAuth = (email: string, password: string) => {
    // Simulation d'authentification
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const playTicket = (game: LotteryGame) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    const newBet: Bet = {
      id: generateTicketNumber(),
      gameId: game.id,
      numbers: [...selectedNumbers],
      date: new Date().toLocaleString()
    };

    setUserBets([...userBets, newBet]);
    setSelectedNumbers([]);
    setSelectedGame(null);
  };

  const checkTicket = () => {
    const bet = userBets.find(b => b.id === ticketNumber);
    
    if (!bet) {
      setCheckResult({ message: 'Ticket non trouvé' });
      return;
    }

    const game = games.find(g => g.id === bet.gameId);
    const isWin = game?.lastResults?.every(n => bet.numbers.includes(n));

    setCheckResult({
      won: isWin,
      numbers: game?.lastResults,
      message: isWin ? 'Félicitations, vous avez gagné ! 🎉' : 'Désolé, pas de gain cette fois...'
    });
  };

  React.useEffect(()=>{
      if(currentUser){
        setIsLoggedIn(true)
        setShowLoginModal(false)
      }
  }, [currentUser])

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

      <h2 className="text-3xl font-bold text-gray-900 mb-6">Loterie en Ligne</h2>

      {/* Mes paris */}
      {isLoggedIn && (
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Mes paris ({userBets.length})
          </h3>
          <div className="space-y-3">
            {userBets.map(bet => (
              <div key={bet.id} className="p-3 border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold">{games.find(g => g.id === bet.gameId)?.name}</p>
                  <p className="text-sm text-gray-500">{bet.date}</p>
                  <div className="flex gap-1 mt-1">
                    {bet.numbers.map(n => (
                      <span key={n} className="px-2 py-1 bg-gray-100 rounded text-sm">{n}</span>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setTicketNumber(bet.id)}
                  className="text-indigo-600 hover:text-indigo-700 text-sm"
                >
                  Vérifier ce ticket
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vérificateur de ticket */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Vérifier un ticket</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={ticketNumber}
            onChange={(e) => setTicketNumber(e.target.value)}
            placeholder="Numéro du ticket"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={checkTicket}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Vérifier
          </button>
        </div>
        
        {checkResult && (
          <div className={`mt-4 p-4 rounded-lg ${checkResult.won ? 'bg-green-50' : 'bg-gray-50'}`}>
            <p className={`font-semibold ${checkResult.won ? 'text-green-600' : 'text-gray-600'}`}>
              {checkResult.message}
            </p>
            {checkResult.numbers && (
              <>
                <p className="text-sm text-gray-600 mt-2">Numéros gagnants :</p>
                <div className="flex gap-2 mt-2">
                  {checkResult.numbers.map((num) => (
                    <div key={num} className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                      {num}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Liste des jeux */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => playTicket(game)}
                    disabled={selectedNumbers.length !== 6}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    Valider
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedGame(game)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
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