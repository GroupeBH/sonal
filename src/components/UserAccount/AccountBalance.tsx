import React, { useState } from 'react';
import { FaWallet, FaMoneyBillWave } from 'react-icons/fa';
import WithdrawalModal from '../Payment/WithdrawalModal';

const AccountBalance: React.FC = () => {
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const balance = 25000; // This would come from your actual user data

  const handleWithdrawalSuccess = () => {
    setShowWithdrawalModal(false);
    // Update balance after successful withdrawal
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FaWallet className="w-8 h-8 text-primary-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Solde disponible</h3>
            <p className="text-2xl font-bold text-primary-600">{balance.toLocaleString()} FC</p>
          </div>
        </div>
        <button
          onClick={() => setShowWithdrawalModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
        >
          <FaMoneyBillWave className="mr-2 h-5 w-5" />
          Retirer
        </button>
      </div>

      <WithdrawalModal
        isOpen={showWithdrawalModal}
        onClose={() => setShowWithdrawalModal(false)}
        onSuccess={handleWithdrawalSuccess}
      />
    </div>
  );
};

export default AccountBalance;