import React from 'react';
import { FaHorse, FaInfoCircle, FaTrophy } from 'react-icons/fa';

interface Horse {
  number: number;
  name: string;
  jockey: string;
  odds: string;
  lastResults: string[];
}

const horses: Horse[] = [
  {
    number: 1,
    name: "Spirit Runner",
    jockey: "Jean Dubois",
    odds: "3.5",
    lastResults: ["1", "2", "1", "3"]
  },
  {
    number: 2,
    name: "Thunder Bolt",
    jockey: "Marc Laurent",
    odds: "4.2",
    lastResults: ["2", "1", "4", "1"]
  },
  {
    number: 3,
    name: "Royal Star",
    jockey: "Pierre Martin",
    odds: "6.5",
    lastResults: ["3", "1", "2", "2"]
  },
  {
    number: 4,
    name: "Desert Wind",
    jockey: "Luc Bernard",
    odds: "8.0",
    lastResults: ["1", "3", "5", "2"]
  }
];

interface HorseListProps {
  onSelectHorse: (horse: Horse) => void;
  selectedHorses: Horse[];
  maxSelections: number;
}

const HorseList: React.FC<HorseListProps> = ({
  onSelectHorse,
  selectedHorses,
  maxSelections
}) => {
  const isSelected = (horse: Horse) => selectedHorses.some(h => h.number === horse.number);
  const canSelect = selectedHorses.length < maxSelections;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900">
          Chevaux ({selectedHorses.length}/{maxSelections})
        </h3>
        <div className="flex items-center text-xs text-gray-500">
          <FaInfoCircle className="w-3 h-3 mr-1" />
          Sélectionnez {maxSelections} chevaux
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {horses.map((horse) => (
          <button
            key={horse.number}
            onClick={() => !isSelected(horse) && canSelect && onSelectHorse(horse)}
            className={`
              flex items-center p-2 rounded-lg border transition-colors text-left
              ${isSelected(horse)
                ? 'bg-primary-50 border-primary-500'
                : canSelect
                  ? 'bg-white border-gray-200 hover:border-primary-300'
                  : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
              }
            `}
            disabled={!canSelect && !isSelected(horse)}
          >
            <div className="flex-1 flex items-center min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                <FaHorse className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {horse.number}. {horse.name}
                  </span>
                  {horse.lastResults.includes("1") && (
                    <FaTrophy className="w-3 h-3 text-yellow-500 ml-1" />
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {horse.jockey}
                </p>
              </div>
              <div className="ml-2 text-right">
                <div className="text-xs font-medium text-primary-600">
                  Cote: {horse.odds}
                </div>
                <div className="flex items-center space-x-0.5 mt-1">
                  {horse.lastResults.map((result, index) => (
                    <span
                      key={index}
                      className={`
                        w-4 h-4 rounded-full text-xs flex items-center justify-center
                        ${result === "1" ? 'bg-yellow-100 text-yellow-800' :
                          result === "2" ? 'bg-gray-100 text-gray-800' :
                          result === "3" ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-50 text-gray-600'}
                      `}
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HorseList;