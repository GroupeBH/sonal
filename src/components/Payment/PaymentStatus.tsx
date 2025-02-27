import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaRedo } from 'react-icons/fa';

interface PaymentStatusProps {
  status: 'success' | 'error';
  message: string;
  onRetry?: () => void;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ status, message, onRetry }) => {
  return (
    <div className="text-center py-8">
      {status === 'success' ? (
        <FaCheckCircle className="mx-auto h-12 w-12 text-green-500" />
      ) : (
        <FaTimesCircle className="mx-auto h-12 w-12 text-red-500" />
      )}
      <p className={`mt-4 text-lg font-medium ${
        status === 'success' ? 'text-green-800' : 'text-red-800'
      }`}>
        {message}
      </p>
      {status === 'error' && onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <FaRedo className="mr-2 h-4 w-4" />
          Réessayer
        </button>
      )}
    </div>
  );
};

export default PaymentStatus;