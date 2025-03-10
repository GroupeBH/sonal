import React, { useState } from 'react';
import { FaPhone, FaMoneyBill, FaCheck } from 'react-icons/fa';
import { validatePhoneNumber } from '../../utils/validators';
import { MOBILE_OPERATORS } from '../../utils/constants';
import PaymentStatus from './PaymentStatus';
import { showSuccessNotification, showErrorNotification } from '../../utils/notifications';

interface WithdrawalFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const WithdrawalForm: React.FC<WithdrawalFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [amount, setAmount] = useState('');
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

    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage('Montant invalide');
      return;
    }

    setIsProcessing(true);
    setStatus('processing');

    // Simulate withdrawal processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      showSuccessNotification('Retrait effectué avec succès! Le montant sera crédité sur votre compte mobile dans quelques instants.');
      setStatus('success');
      setIsProcessing(false);
      onSuccess();
    } catch (error) {
      console.error(error)
      setStatus('error');
      showErrorNotification('Échec du retrait. Veuillez réessayer.');
      setErrorMessage('Une erreur est survenue lors du retrait.');
      setIsProcessing(false);
    }
  };

  if (status === 'success') {
    return <PaymentStatus status="success" message="Retrait effectué avec succès!" />;
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
            className="pl-10 py-3 border block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Ex: 0812345678"
            required
          />
        </div>
        {errorMessage && (
          <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
          Montant à retirer
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaMoneyBill className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-10 py-3 border block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Entrez le montant"
            min="1000"
            step="100"
            required
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">Montant minimum: 1000 FC</p>
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
            'Retirer maintenant'
          )}
        </button>
      </div>
    </form>
  );
};

export default WithdrawalForm;