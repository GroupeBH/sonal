import React, { useState } from 'react';
import HorseList from './HorseList';
import BettingSlip from './BettingSlip';
import PaymentModal from '../Payment/PaymentModal';
import { showSuccessNotification } from '../../utils/notifications';

interface Horse {
  number: number;
  name: string;
  jockey: string;
  odds: string;
  lastResults: string[];
}

const HorseRacingBetting: React.FC = () => {
  const [selectedHorses, setSelectedHorses] = useState<Horse[]>([]);
  const [betAmount, setBetAmount] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSelectHorse = (horse: Horse) => {
    setSelectedHorses([...selectedHorses, horse]);
  };

  const handleRemoveHorse = (horse: Horse) => {
    setSelectedHorses(selectedHorses.filter(h => h.number !== horse.number));
  };

  const handlePlaceBet = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    showSuccessNotification('Pari placé avec succès! Bonne chance!');
    setSelectedHorses([]);
    setBetAmount('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <HorseList
          onSelectHorse={handleSelectHorse}
          selectedHorses={selectedHorses}
          maxSelections={3}
        />
      </div>
      <div>
        <BettingSlip
          selectedHorses={selectedHorses}
          onRemoveHorse={handleRemoveHorse}
          betAmount={betAmount}
          onBetAmountChange={setBetAmount}
          onPlaceBet={handlePlaceBet}
        />
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={betAmount}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default HorseRacingBetting;