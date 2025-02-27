import React from 'react';
import BetList from '../components/BetTracking/BetList';

const BetHistory = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-primary-900 py-12">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518133683791-0b9de5a055f0?auto=format&fit=crop&q=80"
            alt="Historique des paris"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Historique des Paris</h1>
            <p className="mt-2 text-lg text-gray-300">
              Suivez tous vos paris et réservations
            </p>
          </div>
        </div>
      </div>
      
      <BetList />
    </div>
  );
};

export default BetHistory;