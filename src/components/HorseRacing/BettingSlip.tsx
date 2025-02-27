import React from 'react';
import { FaTrash, FaTrophy, FaCoins } from 'react-icons/fa';

interface Horse {
  number: number;
  name: string;
  jockey: string;
  odds: string;
  lastResults: string[];
}

interface BettingSlipProps {
  selectedHorses: Horse[];
  onRemoveHorse: (horse: Horse) => void;
  betAmount: string;
  onBetAmountChange: (amount: string) => void;
  onPlaceBet: () => void;
}

const BettingSlip: React.FC<BettingSlipProps> = ({
  selectedHorses,
  onRemoveHorse,
  betAmount,
  onBetAmountChange,
  onPlaceBet,
}) => {
  const totalOdds = selectedHorses
    .reduce((acc, horse) => acc * parseFloat(horse.odds), 1)
    .toFixed(2);

  const potentialWinnings = betAmount
    ? (parseFloat(betAmount) * parseFloat(totalOdds)).toFixed(2)
    : '0.00';

  return (
    <div className="bg-white rounded-lg shadow p-3">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Ticket de Paris</h3>

      {selectedHorses.length > 0 ? (
        <>
          <div className="space-y-2 mb-3">
            {selectedHorses.map((horse) => (
              <div
                key={horse.number}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-medium text-gray-900">
                    {horse.number}. {horse.name}
                  </span>
                  <span className="text-xs text-primary-600">
                    ({horse.odds})
                  </span>
                </div>
                <button
                  onClick={() => onRemoveHorse(horse)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div>
              <label htmlFor="betAmount" className="block text-xs font-medium text-gray-700 mb-1">
                Montant du pari
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <FaCoins className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="betAmount"
                  value={betAmount}
                  onChange={(e) => onBetAmountChange(e.target.value)}
                  className="pl-7 block w-full rounded border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-xs"
                  placeholder="Entrez votre mise"
                  min="300"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-2 rounded space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Cote totale:</span>
                <span className="font-medium text-gray-900">{totalOdds}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Gains potentiels:</span>
                <span className="font-medium text-primary-600">{potentialWinnings} FC</span>
              </div>
            </div>

            <button
              onClick={onPlaceBet}
              disabled={!betAmount || parseFloat(betAmount) <= 0}
              className="w-full flex items-center justify-center px-3 py-2 border border-transparent rounded text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FaTrophy className="w-3 h-3 mr-1" />
              Placer le pari
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-500 text-xs">
            Sélectionnez des chevaux pour créer votre pari
          </p>
        </div>
      )}
    </div>
  );
};

export default BettingSlip;