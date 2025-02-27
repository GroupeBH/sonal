import React from 'react';
import { FaTicketAlt, FaClock, FaCoins } from 'react-icons/fa';

interface Bet {
  id: string;
  game: string;
  numbers: number[];
  amount: string;
  date: string;
  status: 'pending' | 'won' | 'lost';
  reservationCode?: string;
}

const BetList: React.FC = () => {
  // Mock data - In a real app, this would come from an API or context
  const bets: Bet[] = [
    {
      id: '1',
      game: 'BET243 Addition',
      numbers: [7, 13, 23, 32, 45],
      amount: '500',
      date: '2024-03-27 14:30',
      status: 'pending',
      reservationCode: 'A1234567'
    },
    {
      id: '2',
      game: 'Loto Express',
      numbers: [4, 8, 15, 16, 23],
      amount: '1000',
      date: '2024-03-27 12:15',
      status: 'won'
    },
    {
      id: '3',
      game: 'Paris Sportifs',
      numbers: [2, 5, 9, 17, 25],
      amount: '300',
      date: '2024-03-27 10:00',
      status: 'lost'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'won':
        return 'Gagné';
      case 'lost':
        return 'Perdu';
      default:
        return 'En attente';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Suivi des Paris</h2>
      
      <div className="space-y-4">
        {bets.map((bet) => (
          <div key={bet.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{bet.game}</h3>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <FaClock className="w-4 h-4 mr-1" />
                  {bet.date}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bet.status)}`}>
                {getStatusText(bet.status)}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {bet.numbers.map((number, idx) => (
                <span
                  key={idx}
                  className="w-8 h-8 flex items-center justify-center bg-primary-100 text-primary-700 rounded-full font-medium"
                >
                  {number}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <FaCoins className="w-4 h-4 mr-1" />
                <span>{bet.amount} FC</span>
              </div>
              {bet.reservationCode && (
                <div className="flex items-center text-primary-600">
                  <FaTicketAlt className="w-4 h-4 mr-1" />
                  <span>Code: {bet.reservationCode}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetList;