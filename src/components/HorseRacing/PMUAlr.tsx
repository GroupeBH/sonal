import React from 'react';
import HorseRacingBetting from './HorseRacingBetting';
import { FaHorse } from 'react-icons/fa';

const PMUAlr = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <FaHorse className="w-6 h-6 text-green-600 mr-3" />
        <h2 className="text-xl font-bold text-gray-900">Paris HIPPIQUES PMU Alr</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Pariez sur les courses internationales avec des cotes fixes et maximisez vos gains.
      </p>
      <HorseRacingBetting />
    </div>
  );
};

export default PMUAlr;