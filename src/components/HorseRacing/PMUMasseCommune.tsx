import React from 'react';
import HorseRacingBetting from './HorseRacingBetting';
import { FaHorse, FaUsers } from 'react-icons/fa';

const PMUMasseCommune = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <FaHorse className="w-6 h-6 text-red-600 mr-3" />
        <h2 className="text-xl font-bold text-gray-900">Paris HIPPIQUES masse commune</h2>
      </div>
      <div className="bg-red-50 p-4 rounded-lg mb-6">
        <div className="flex items-start">
          <FaUsers className="w-5 h-5 text-red-600 mt-1 mr-3" />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">Paris Mutuels</h3>
            <p className="text-red-800 text-sm">
              Participez aux paris mutuels sur les courses en direct avec des cotes dynamiques et des gains exceptionnels.
            </p>
          </div>
        </div>
      </div>
      <HorseRacingBetting />
    </div>
  );
};

export default PMUMasseCommune;