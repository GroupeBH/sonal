import React, { useState } from 'react';
import { FaCoins, FaCheck, FaCalendarAlt, FaUserPlus, FaLightbulb } from 'react-icons/fa';
import PaymentModal from './Payment/PaymentModal';
import ReservationModal from './Reservation/ReservationModal';
import RegisterModal from './Auth/RegisterModal';
import CombinationsHelper from './CombinationsHelper';
import { showSuccessNotification, showErrorNotification } from '../utils/notifications';
import { useAuth } from '../contexts/AuthContext';
import { validateBetAmount } from '../utils/validators';

interface BettingFormProps {
  gameName: string;
  minBet: string;
  maxNumbers: number;
}

const BettingForm: React.FC<BettingFormProps> = ({ gameName, minBet, maxNumbers }) => {
  const { isAuthenticated } = useAuth();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [betAmount, setBetAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCombinationsHelper, setShowCombinationsHelper] = useState(false);
  const [pendingAction, setPendingAction] = useState<'play' | 'reserve' | null>(null);

  const handleNumberSelect = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else if (selectedNumbers.length < maxNumbers) {
      setSelectedNumbers([...selectedNumbers, number].sort((a, b) => a - b));
    }
  };

  const handlePlayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateBetAmount(betAmount)) {
      showErrorNotification('Le montant minimum de pari est de 300 FC');
      return;
    }
    if (!isAuthenticated) {
      setPendingAction('play');
      setShowRegisterModal(true);
      return;
    }
    setShowPaymentModal(true);
  };

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateBetAmount(betAmount)) {
      showErrorNotification('Le montant minimum de pari est de 300 FC');
      return;
    }
    if (!isAuthenticated) {
      setPendingAction('reserve');
      setShowRegisterModal(true);
      return;
    }
    setShowReservationModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setIsSubmitting(true);

    setTimeout(() => {
      setSelectedNumbers([]);
      setBetAmount('');
      setIsSubmitting(false);
      showSuccessNotification('Pari placé avec succès! Bonne chance!');
      
      setTimeout(() => {
        showSuccessNotification('🎉 Félicitations! Votre ticket est gagnant! Vérifiez vos gains dans votre compte.');
      }, 5000);
    }, 1500);
  };

  const handleReservationSuccess = () => {
    setShowReservationModal(false);
    setSelectedNumbers([]);
    setBetAmount('');
  };

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
    if (pendingAction === 'play') {
      setShowPaymentModal(true);
    } else if (pendingAction === 'reserve') {
      setShowReservationModal(true);
    }
    setPendingAction(null);
  };

  const isValidBet = selectedNumbers.length === maxNumbers && validateBetAmount(betAmount);

  return (
    <>
      <form className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-primary-900">
            Sélectionnez vos numéros ({selectedNumbers.length}/{maxNumbers})
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

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 49 }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              type="button"
              onClick={() => handleNumberSelect(number)}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
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

        {selectedNumbers.length === maxNumbers && (
          <div>
            <label htmlFor="betAmount" className="block text-sm font-medium text-primary-700 mb-2">
              Montant du pari (Minimum: 300 FC)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCoins className="h-5 w-5 text-primary-400" />
              </div>
              <input
                type="number"
                id="betAmount"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="pl-10 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Entrez votre mise"
                required
                min="300"
              />
            </div>
          </div>
        )}

        {selectedNumbers.length > 0 && (
          <div className="mt-4 p-4 bg-accent-50 rounded-md">
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

        {selectedNumbers.length === maxNumbers && (
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handlePlayNow}
              disabled={!isValidBet || isSubmitting}
              className={`
                flex-1 flex items-center justify-center px-4 py-3 border border-transparent
                text-base font-medium rounded-md text-white
                ${isSubmitting || !isValidBet
                  ? 'bg-primary-400 cursor-not-allowed'
                  : 'bg-secondary-600 hover:bg-secondary-700'}
              `}
            >
              {isSubmitting ? (
                <>
                  <FaCheck className="animate-spin h-5 w-5 mr-3" />
                  Traitement...
                </>
              ) : (
                'Jouer maintenant'
              )}
            </button>

            <button
              type="button"
              onClick={handleReservation}
              disabled={!isValidBet || isSubmitting}
              className={`
                flex-1 flex items-center justify-center px-4 py-3 border border-transparent
                text-base font-medium rounded-md text-white
                ${isSubmitting || !isValidBet
                  ? 'bg-primary-400 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700'}
              `}
            >
              <FaCalendarAlt className="mr-2 h-5 w-5" />
              Réserver
            </button>
          </div>
        )}
      </form>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={betAmount}
        onSuccess={handlePaymentSuccess}
      />

      <ReservationModal
        isOpen={showReservationModal}
        onClose={() => setShowReservationModal(false)}
        gameName={gameName}
        selectedNumbers={selectedNumbers}
        betAmount={betAmount}
        onSuccess={handleReservationSuccess}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => {
          setShowRegisterModal(false);
          setPendingAction(null);
        }}
        onSuccess={handleRegisterSuccess}
      />

      <CombinationsHelper
        isOpen={showCombinationsHelper}
        onClose={() => setShowCombinationsHelper(false)}
        maxNumbers={maxNumbers}
      />
    </>
  );
};

export default BettingForm;