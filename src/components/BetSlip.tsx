import React, { useState } from 'react';
import { X, ChevronUp, ChevronDown } from 'lucide-react';

export interface Bet {
  id: string;
  type: string;
  selection: string;
  odds: number;
  stake?: number;
  details?: {
    event?: string;
    time?: string;
    numbers?: number[];
    position?: number;
  };
}

export const BetSlip = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [bets, setBets] = useState<Bet[]>([]);

  const totalStake = bets.reduce((sum, bet) => sum + (bet.stake || 0), 0);
  const potentialWinnings = bets.reduce((sum, bet) => sum + (bet.stake || 0) * bet.odds, 0);

  const removeBet = (id: string) => {
    setBets(bets.filter(bet => bet.id !== id));
  };

  const updateStake = (id: string, stake: number) => {
    setBets(bets.map(bet => 
      bet.id === id ? { ...bet, stake } : bet
    ));
  };

  const renderBetDetails = (bet: Bet) => {
    switch (bet.type) {
      case 'Sport':
        return (
          <div className="text-sm text-gray-600">
            {bet.details?.event}
            <br />
            {bet.details?.time}
          </div>
        );
      case 'Horse':
        return (
          <div className="text-sm text-gray-600">
            Position: {bet.details?.position}
            <br />
            {bet.details?.event}
          </div>
        );
      case 'Lottery':
        return (
          <div className="text-sm text-gray-600">
            Numéros: {bet.details?.numbers?.join(', ')}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-96 bg-white shadow-lg rounded-t-xl">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <h3 className="font-bold text-gray-800">Panier de Paris ({bets.length})</h3>
          {bets.length > 0 && (
            <span className="ml-2 text-sm text-gray-600">
              Total: {totalStake.toFixed(2)}€
            </span>
          )}
        </div>
        {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
      </div>

      {isOpen && (
        <div className="p-4 border-t">
          {bets.length === 0 ? (
            <p className="text-gray-500 text-center">Aucun pari sélectionné</p>
          ) : (
            <>
              <div className="space-y-4 mb-4">
                {bets.map((bet) => (
                  <div key={bet.id} className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{bet.type}</span>
                        <button
                          onClick={() => removeBet(bet.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-medium text-gray-800">{bet.selection}</p>
                      {renderBetDetails(bet)}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium text-gray-600">Cote: {bet.odds}</span>
                        <input
                          type="number"
                          value={bet.stake}
                          onChange={(e) => updateStake(bet.id, Number(e.target.value))}
                          className="w-24 px-2 py-1 text-right border rounded"
                          placeholder="Mise"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Mise totale:</span>
                  <span>{totalStake.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between font-medium mb-4">
                  <span>Gains potentiels:</span>
                  <span className="text-green-600">{potentialWinnings.toFixed(2)}€</span>
                </div>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Valider le pari
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};