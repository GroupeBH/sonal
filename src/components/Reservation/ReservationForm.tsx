import React, { useState, useEffect } from 'react';
import { FaTicketAlt } from 'react-icons/fa';
import { showSuccessNotification } from '../../utils/notifications';

interface ReservationFormProps {
  onClose: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onClose }) => {
  const [reservationCode, setReservationCode] = useState<string>('');

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let code = chars.charAt(Math.floor(Math.random() * chars.length));
    for (let i = 0; i < 7; i++) {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    setReservationCode(code);
    showSuccessNotification(`Code de réservation: ${code}`);
  }, []);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-4">
        <FaTicketAlt className="w-5 h-5 text-primary-600 mr-2" />
        <span className="text-lg font-medium text-gray-900">Code de Réservation</span>
      </div>
      
      <div className="bg-primary-50 p-6 rounded-lg mb-4">
        <span className="text-2xl font-bold text-primary-900 tracking-wider">
          {reservationCode}
        </span>
      </div>

      <button
        onClick={onClose}
        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
      >
        Fermer
      </button>
    </div>
  );
};

export default ReservationForm;