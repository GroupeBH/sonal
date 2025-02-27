import React, { useState } from 'react';
import { FaPhone, FaMoneyBill, FaCheck } from 'react-icons/fa';
import { validatePhoneNumber } from '../../utils/validators';
import { MOBILE_OPERATORS } from '../../utils/constants';
import PaymentStatus from './PaymentStatus';

interface MobilePaymentFormProps {
  amount: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const MobilePaymentForm: React.FC<MobilePaymentFormProps> = ({
  amount,
  onSuccess,
  onCancel,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(phoneNumber)) {
      setErrorMessage('Numéro de téléphone invalide');
      return;
    }

    setIsProcessing(true);
    setStatus('processing');

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
      setIsProcessing(false);
      onSuccess();
    } catch (error) {
      setStatus('error');
      setErrorMessage('Échec du paiement. Veuillez réessayer.');
      setIsProcessing(false);
    }
  };

  if (status === 'success') {
    return <PaymentStatus status="success" message="Paiement effectué avec succès!" />;
  }

  if (status === 'error') {
    return <PaymentStatus status="error" message={errorMessage} onRetry={() => setStatus('idle')} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="operator" className="block text-sm font-medium text-gray-700 mb-2">
          Opérateur Mobile
        </label>
        <select
          id="operator"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        >
          <option value="">Sélectionnez un opérateur</option>
          {MOBILE_OPERATORS.map((op) => (
            <option key={op.id} value={op.id}>
              {op.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
          Numéro de téléphone
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaPhone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Ex: 0812345678"
            required
          />
        </div>
        {errorMessage && (
          <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Montant à payer:</span>
          <span className="text-lg font-bold text-primary-600">{amount} FC</span>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          disabled={isProcessing}
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isProcessing}
          className="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {isProcessing ? (
            <>
              <FaCheck className="animate-spin h-5 w-5 mr-2" />
              Traitement...
            </>
          ) : (
            <>
              <FaMoneyBill className="h-5 w-5 mr-2" />
              Payer maintenant
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default MobilePaymentForm;