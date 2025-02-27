import React from 'react';
import HorseRacingBetting from './HorseRacingBetting';
import { FaHorse, FaTrophy } from 'react-icons/fa';

const PMUPlr = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <FaHorse className="w-6 h-6 text-yellow-600 mr-3" />
        <h2 className="text-xl font-bold text-gray-900">Paris HIPPIQUES PMU Plr</h2>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg mb-6">
        <div className="flex items-start">
          <FaTrophy className="w-5 h-5 text-yellow-600 mt-1 mr-3" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-1">Premium Racing</h3>
            <p className="text-yellow-800 text-sm">
              Accédez aux courses premium avec des multiplicateurs plus élevés et des jackpots exceptionnels.
            </p>
          </div>
        </div>
      </div>
      <HorseRacingBetting />
    </div>
  );
};

export default PMUPlr;