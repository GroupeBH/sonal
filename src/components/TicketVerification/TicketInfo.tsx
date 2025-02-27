import React from 'react';
import { FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';

const TicketInfo = () => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="flex items-center text-lg font-semibold text-blue-900 mb-2">
          <FaInfoCircle className="w-5 h-5 mr-2" />
          Comment vérifier votre ticket ?
        </h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <span className="mr-2">1.</span>
            <span>Entrez le numéro de votre ticket (visible en haut du reçu)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">2.</span>
            <span>Sélectionnez la date du tirage concerné</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">3.</span>
            <span>Cliquez sur "Vérifier le ticket" pour voir si vous avez gagné</span>
          </li>
        </ul>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="flex items-center text-lg font-semibold text-yellow-900 mb-2">
          <FaQuestionCircle className="w-5 h-5 mr-2" />
          Important
        </h3>
        <ul className="space-y-2 text-yellow-800">
          <li>Conservez votre ticket original en lieu sûr</li>
          <li>Le ticket original est nécessaire pour réclamer vos gains</li>
          <li>Cette vérification en ligne est fournie à titre indicatif</li>
        </ul>
      </div>
    </div>
  );
};

export default TicketInfo;