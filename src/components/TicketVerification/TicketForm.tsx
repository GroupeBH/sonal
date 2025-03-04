import React, { useState } from 'react';
import { FaSearch, FaTicketAlt } from 'react-icons/fa';
import { showSuccessNotification, showErrorNotification, showInfoNotification } from '../../utils/notifications';

const TicketForm: React.FC = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [drawDate, setDrawDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Randomly determine if ticket is winning (for demo purposes)
      const isWinning = Math.random() > 0.5;
      
      if (isWinning) {
        showSuccessNotification('🎉 Félicitations! Votre ticket est gagnant! Rendez-vous dans un point de vente pour réclamer vos gains.');
      } else {
        showInfoNotification('Ce ticket n\'est pas gagnant. Tentez à nouveau votre chance!');
      }
    } catch (error) {
      showErrorNotification('Une erreur est survenue lors de la vérification. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="ticketNumber" className="block text-sm font-medium text-gray-700 mb-2">
          Numéro du ticket
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaTicketAlt className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="ticketNumber"
            value={ticketNumber}
            onChange={(e) => setTicketNumber(e.target.value)}
            className="pl-10 py-3 block w-full border rounded-md border-gray-300"
            placeholder="Ex: ABC123456789"
            required
            pattern="[A-Za-z0-9]+"
            minLength={8}
            maxLength={12}
          />
        </div>
      </div>

      <div>
        <label htmlFor="drawDate" className="block text-sm font-medium text-gray-700 mb-2">
          Date du tirage
        </label>
        <input
          type="date"
          id="drawDate"
          value={drawDate}
          onChange={(e) => setDrawDate(e.target.value)}
          className="block w-full rounded-md py-3 py-2 border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!ticketNumber || !drawDate || isSubmitting}
        className={`
          w-full flex items-center justify-center px-4 py-3 border border-transparent
          text-base font-medium rounded-md text-white
          ${isSubmitting || !ticketNumber || !drawDate
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'}
        `}
      >
        {isSubmitting ? (
          <>
            <FaSearch className="animate-spin h-5 w-5 mr-3" />
            Vérification en cours...
          </>
        ) : (
          <>
            <FaSearch className="h-5 w-5 mr-2" />
            Vérifier le ticket
          </>
        )}
      </button>
    </form>
  );
};

export default TicketForm;