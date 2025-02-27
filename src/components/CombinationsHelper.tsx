import React from 'react';
import { FaTimes, FaStar, FaChartLine, FaRandom, FaHistory } from 'react-icons/fa';

interface CombinationsHelperProps {
  isOpen: boolean;
  onClose: () => void;
  maxNumbers: number;
}

const CombinationsHelper: React.FC<CombinationsHelperProps> = ({
  isOpen,
  onClose,
  maxNumbers,
}) => {
  if (!isOpen) return null;

  const popularCombinations = [
    { numbers: [7, 11, 13, 23, 27], frequency: '15%' },
    { numbers: [4, 8, 15, 16, 23], frequency: '12%' },
    { numbers: [1, 2, 3, 4, 5], frequency: '10%' },
  ];

  const winningPatterns = [
    {
      title: 'Nombres consécutifs',
      description: 'Évitez de choisir trop de nombres consécutifs',
      example: '1-2-3-4-5 est moins probable que des nombres dispersés',
    },
    {
      title: 'Distribution pair/impair',
      description: 'Équilibrez vos nombres pairs et impairs',
      example: 'Visez un ratio proche de 3:2 ou 2:3',
    },
    {
      title: 'Somme des numéros',
      description: 'La somme des numéros gagnants se situe souvent dans une plage spécifique',
      example: 'Pour 5 numéros, visez une somme entre 75 et 125',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <span className="sr-only">Fermer</span>
              <FaTimes className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Guide des Combinaisons
              </h3>

              {/* Popular Combinations */}
              <div className="mb-6">
                <h4 className="flex items-center text-sm font-medium text-gray-900 mb-3">
                  <FaStar className="w-4 h-4 text-yellow-500 mr-2" />
                  Combinaisons Populaires
                </h4>
                <div className="space-y-2">
                  {popularCombinations.map((combo, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                      <div className="flex gap-1">
                        {combo.numbers.map(number => (
                          <span key={number} className="w-6 h-6 flex items-center justify-center bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                            {number}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        Fréquence: {combo.frequency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Winning Patterns */}
              <div className="mb-6">
                <h4 className="flex items-center text-sm font-medium text-gray-900 mb-3">
                  <FaChartLine className="w-4 h-4 text-green-500 mr-2" />
                  Schémas Gagnants
                </h4>
                <div className="space-y-3">
                  {winningPatterns.map((pattern, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <h5 className="text-sm font-medium text-gray-900 mb-1">{pattern.title}</h5>
                      <p className="text-xs text-gray-600 mb-1">{pattern.description}</p>
                      <p className="text-xs text-gray-500 italic">{pattern.example}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-primary-50 p-4 rounded-md">
                <h4 className="flex items-center text-sm font-medium text-primary-900 mb-3">
                  <FaRandom className="w-4 h-4 text-primary-500 mr-2" />
                  Conseils Rapides
                </h4>
                <ul className="space-y-2 text-xs text-primary-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Évitez les dates d'anniversaire uniquement (limitées à 31)
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Incluez quelques nombres supérieurs à 31 pour augmenter vos chances de gain unique
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Variez vos combinaisons à chaque tirage
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinationsHelper;