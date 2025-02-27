import React, { useState } from 'react';
import { FaCoins, FaLightbulb, FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import PaymentModal from './Payment/PaymentModal';
import ReservationModal from './Reservation/ReservationModal';
import CombinationsHelper from './CombinationsHelper';
import { showSuccessNotification, showErrorNotification } from '../utils/notifications';
import { validateBetAmount } from '../utils/validators';

const QuickBet: React.FC = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [betAmount, setBetAmount] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showCombinationsHelper, setShowCombinationsHelper] = useState(false);
  const maxNumbers = 5;

  const handleNumberSelect = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else if (selectedNumbers.length < maxNumbers) {
      setSelectedNumbers([...selectedNumbers, number].sort((a, b) => a - b));
    }
  };

  const handlePlayNow = () => {
    if (!validateBetAmount(betAmount)) {
      showErrorNotification('Le montant minimum de pari est de 300 FC');
      return;
    }
    setShowPaymentModal(true);
  };

  const handleReservation = () => {
    if (!validateBetAmount(betAmount)) {
      showErrorNotification('Le montant minimum de pari est de 300 FC');
      return;
    }
    setShowReservationModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    showSuccessNotification('Pari placé avec succès! Bonne chance!');
    setSelectedNumbers([]);
    setBetAmount('');
  };

  const handleReservationSuccess = () => {
    setShowReservationModal(false);
    showSuccessNotification('Réservation effectuée avec succès!');
    setSelectedNumbers([]);
    setBetAmount('');
  };

  // Calculate potential winnings based on bet amount
  const calculatePotentialWinnings = () => {
    if (!validateBetAmount(betAmount)) return 0;
    
    // Base multiplier for 5 numbers
    const baseMultiplier = 10000;
    
    // Additional multipliers based on number patterns
    let patternMultiplier = 1;
    
    // Check for consecutive numbers
    const hasConsecutive = selectedNumbers.some((num, i) => 
      i > 0 && num === selectedNumbers[i - 1] + 1
    );
    if (!hasConsecutive) patternMultiplier *= 1.2;
    
    // Check for even/odd distribution
    const evenCount = selectedNumbers.filter(num => num % 2 === 0).length;
    if (evenCount >= 2 && evenCount <= 3) patternMultiplier *= 1.1;
    
    return parseFloat(betAmount) * baseMultiplier * patternMultiplier;
  };

  const potentialWinnings = calculatePotentialWinnings();
  const isValidBet = selectedNumbers.length === maxNumbers && validateBetAmount(betAmount);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-primary-900">
          Paris Rapide ({selectedNumbers.length}/{maxNumbers})
        </h3>
        <button
          type="button"
          onClick={() => setShowCombinationsHelper(true)}
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
        >
          <FaLightbulb className="w-4 h-4 mr-1" />
          Aide aux combinaisons
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {Array.from({ length: 49 }, (_, i) => i + 1).map(number => (
          <button
            key={number}
            onClick={() => handleNumberSelect(number)}
            className={`
              w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-semibold
              transition-colors
              ${selectedNumbers.includes(number)
                ? 'bg-secondary-600 text-white hover:bg-secondary-700'
                : 'bg-primary-100 text-primary-700 hover:bg-primary-200'}
              ${selectedNumbers.length >= maxNumbers && !selectedNumbers.includes(number)
                ? 'opacity-50 cursor-not-allowed'
                : ''}
            `}
            disabled={selectedNumbers.length >= maxNumbers && !selectedNumbers.includes(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <label htmlFor="quickBetAmount" className="block text-sm font-medium text-primary-700 mb-2">
          Montant du pari (Minimum: 300 FC)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaCoins className="h-5 w-5 text-primary-400" />
          </div>
          <input
            type="number"
            id="quickBetAmount"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="pl-10 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Entrez votre mise"
            min="300"
          />
        </div>
      </div>

      {selectedNumbers.length > 0 && (
        <div className="mb-6 p-4 bg-accent-50 rounded-md">
          <h4 className="text-sm font-medium text-accent-900 mb-2">Numéros sélectionnés:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedNumbers.map(number => (
              <span
                key={number}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent-100 text-accent-800 text-sm font-semibold"
              >
                {number}
              </span>
            ))}
          </div>
        </div>
      )}

      {betAmount && parseFloat(betAmount) > 0 && (
        <div className="mb-6 p-4 bg-green-50 rounded-md">
          <h4 className="text-sm font-medium text-green-900 mb-2">Gains potentiels:</h4>
          <p className="text-lg font-bold text-green-700">
            {potentialWinnings.toLocaleString()} FC
          </p>
          <p className="text-xs text-green-600 mt-1">
            *Les gains peuvent varier selon les conditions du tirage
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handlePlayNow}
          disabled={!isValidBet}
          className={`
            flex items-center justify-center px-4 py-3 border border-transparent
            rounded-md shadow-sm text-sm font-medium text-white
            ${isValidBet
              ? 'bg-secondary-600 hover:bg-secondary-700'
              : 'bg-primary-400 cursor-not-allowed'}
          `}
        >
          Jouer maintenant
          <FaArrowRight className="ml-2 w-4 h-4" />
        </button>

        <button
          onClick={handleReservation}
          disabled={!isValidBet}
          className={`
            flex items-center justify-center px-4 py-3 border border-transparent
            rounded-md shadow-sm text-sm font-medium text-white
            ${isValidBet
              ? 'bg-primary-600 hover:bg-primary-700'
              : 'bg-primary-400 cursor-not-allowed'}
          `}
        >
          <FaCalendarAlt className="mr-2 w-4 h-4" />
          Réserver Ticket
        </button>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={betAmount}
        onSuccess={handlePaymentSuccess}
      />

      <ReservationModal
        isOpen={showReservationModal}
        onClose={() => setShowReservationModal(false)}
        gameName="Paris Rapide"
        selectedNumbers={selectedNumbers}
        betAmount={betAmount}
        onSuccess={handleReservationSuccess}
      />

      <CombinationsHelper
        isOpen={showCombinationsHelper}
        onClose={() => setShowCombinationsHelper(false)}
        maxNumbers={maxNumbers}
      />
    </div>
  );
};

export default QuickBet;