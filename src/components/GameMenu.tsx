import React, { useState } from 'react';
import { FaHorse, FaDice, FaChevronDown } from 'react-icons/fa';
import PMUAlr from './HorseRacing/PMUAlr';
import PMUPlr from './HorseRacing/PMUPlr';
import PMUMasseCommune from './HorseRacing/PMUMasseCommune';
import BET243 from './Betting/BET243';

const GameMenu = () => {
  const [showPMUAlrContent, setShowPMUAlrContent] = useState(false);
  const [showPMUPlrContent, setShowPMUPlrContent] = useState(false);
  const [showPMUMasseCommuneContent, setShowPMUMasseCommuneContent] = useState(false);
  const [showBET243Content, setShowBET243Content] = useState(false);

  const closeAllContent = () => {
    setShowPMUAlrContent(false);
    setShowPMUPlrContent(false);
    setShowPMUMasseCommuneContent(false);
    setShowBET243Content(false);
  };

  return (
    <>
      <div className="bg-slate-300 py-3 sm:py-6">
        <div className="max-w-7xl mx-auto px-2 sm:px-6">
          <div className="flex overflow-x-auto space-x-2 sm:space-x-8 pb-2 scrollbar-hide">
            <button
              onClick={() => {
                closeAllContent();
                setShowBET243Content(!showBET243Content);
              }}
              className="flex-shrink-0 inline-flex items-center px-3 sm:px-8 py-2 sm:py-4 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors text-xs sm:text-lg font-medium"
            >
              <FaDice className="w-4 h-4 sm:w-7 sm:h-7" />
              <span className="ml-1.5 sm:ml-4 whitespace-nowrap">BET243 ADDITION</span>
              <FaChevronDown className={`ml-1.5 sm:ml-4 w-3 h-3 sm:w-5 sm:h-5 transform transition-transform ${showBET243Content ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => {
                closeAllContent();
                setShowPMUAlrContent(!showPMUAlrContent);
              }}
              className="flex-shrink-0 inline-flex items-center px-3 sm:px-8 py-2 sm:py-4 rounded-full text-white bg-green-600 hover:bg-green-700 transition-colors text-xs sm:text-lg font-medium"
            >
              <FaHorse className="w-4 h-4 sm:w-7 sm:h-7" />
              <span className="ml-1.5 sm:ml-4 whitespace-nowrap">PARIS HIPPIQUES PMU ALR</span>
              <FaChevronDown className={`ml-1.5 sm:ml-4 w-3 h-3 sm:w-5 sm:h-5 transform transition-transform ${showPMUAlrContent ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => {
                closeAllContent();
                setShowPMUPlrContent(!showPMUPlrContent);
              }}
              className="flex-shrink-0 inline-flex items-center px-3 sm:px-8 py-2 sm:py-4 rounded-full text-white bg-yellow-600 hover:bg-yellow-700 transition-colors text-xs sm:text-lg font-medium"
            >
              <FaHorse className="w-4 h-4 sm:w-7 sm:h-7" />
              <span className="ml-1.5 sm:ml-4 whitespace-nowrap">PARIS HIPPIQUES PMU PLR</span>
              <FaChevronDown className={`ml-1.5 sm:ml-4 w-3 h-3 sm:w-5 sm:h-5 transform transition-transform ${showPMUPlrContent ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => {
                closeAllContent();
                setShowPMUMasseCommuneContent(!showPMUMasseCommuneContent);
              }}
              className="flex-shrink-0 inline-flex items-center px-3 sm:px-8 py-2 sm:py-4 rounded-full text-white bg-red-600 hover:bg-red-700 transition-colors text-xs sm:text-lg font-medium"
            >
              <FaHorse className="w-4 h-4 sm:w-7 sm:h-7" />
              <span className="ml-1.5 sm:ml-4 whitespace-nowrap">PARIS HIPPIQUES MASSE COMMUNE</span>
              <FaChevronDown className={`ml-1.5 sm:ml-4 w-3 h-3 sm:w-5 sm:h-5 transform transition-transform ${showPMUMasseCommuneContent ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {showBET243Content && (
        <div className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <BET243 />
          </div>
        </div>
      )}

      {showPMUAlrContent && (
        <div className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <PMUAlr />
          </div>
        </div>
      )}

      {showPMUPlrContent && (
        <div className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <PMUPlr />
          </div>
        </div>
      )}

      {showPMUMasseCommuneContent && (
        <div className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <PMUMasseCommune />
          </div>
        </div>
      )}
    </>
  );
};

export default GameMenu;