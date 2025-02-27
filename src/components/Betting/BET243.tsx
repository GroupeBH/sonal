import React from 'react';
import QuickBet from '../QuickBet';
import { FaDice, FaChartLine, FaBolt } from 'react-icons/fa';

const BET243 = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <FaDice className="w-6 h-6 text-blue-600 mr-3" />
        <h2 className="text-xl font-bold text-gray-900">BET243 Addition</h2>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-start">
          <FaChartLine className="w-5 h-5 text-blue-600 mt-1 mr-3" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Gains Multiplicateurs</h3>
            <p className="text-blue-800 text-sm">
              Un nouveau concept de paris innovant avec des gains multiplicateurs et des jackpots exceptionnels.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center mb-4">
          <FaBolt className="w-6 h-6 text-purple-600 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">Paris Rapide</h3>
        </div>
        <QuickBet />
      </div>
    </div>
  );
};

export default BET243;