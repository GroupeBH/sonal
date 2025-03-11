import React, { useState } from 'react';
import { Trophy, Clock, Calendar, Search, ChevronDown } from 'lucide-react';

interface Race {
  id: string;
  name: string;
  location: string;
  time: string;
  date: string;
  status: 'upcoming' | 'live' | 'finished';
  horses: Array<{
    number: number;
    name: string;
    odds: number;
    jockey: string;
    trainer: string;
    age: number;
    weight: string;
    lastResults: string[];
  }>;
  markets: Array<{
    id: string;
    name: string;
    description: string;
    odds: number;
  }>;
}

const races: Race[] = [
  {
    id: '1',
    name: 'Prix de l\'Arc de Triomphe',
    location: 'Longchamp',
    time: '14:30',
    date: '2024-03-20',
    status: 'upcoming',
    horses: [
      {
        number: 1,
        name: 'Thunder Spirit',
        odds: 3.5,
        jockey: 'Pierre Dupont',
        trainer: 'Jean Martin',
        age: 4,
        weight: '58kg',
        lastResults: ['1', '2', '1', '3', '1']
      },
      {
        number: 2,
        name: 'Royal Victory',
        odds: 4.2,
        jockey: 'John Smith',
        trainer: 'David Brown',
        age: 5,
        weight: '57.5kg',
        lastResults: ['2', '1', '3', '1', '2']
      },
      {
        number: 3,
        name: 'Swift Wind',
        odds: 6.0,
        jockey: 'Marie Laurent',
        trainer: 'Sophie Bernard',
        age: 4,
        weight: '56kg',
        lastResults: ['3', '4', '1', '2', '1']
      }
    ],
    markets: [
      { id: 'win', name: 'Gagnant', description: 'Cheval gagnant', odds: 1 },
      { id: 'place', name: 'Placé', description: 'Dans les 3 premiers', odds: 0.5 },
      { id: 'show', name: 'Show', description: 'Dans les 3 premiers', odds: 0.3 },
      { id: 'exacta', name: 'Exacta', description: '1er et 2ème dans l\'ordre', odds: 8 },
      { id: 'quinella', name: 'Quinella', description: '1er et 2ème dans n\'importe quel ordre', odds: 4 }
    ]
  },
  {
    id: '2',
    name: 'Grand Prix de Paris',
    location: 'ParisLongchamp',
    time: '16:45',
    date: '2024-03-20',
    status: 'upcoming',
    horses: [
      {
        number: 1,
        name: 'Golden Flash',
        odds: 2.8,
        jockey: 'Marc Dubois',
        trainer: 'Philippe Martin',
        age: 5,
        weight: '59kg',
        lastResults: ['1', '1', '2', '1', '3']
      },
      {
        number: 2,
        name: 'Silver Star',
        odds: 3.9,
        jockey: 'Emma White',
        trainer: 'Paul Green',
        age: 4,
        weight: '57kg',
        lastResults: ['2', '3', '1', '2', '1']
      }
    ],
    markets: [
      { id: 'win', name: 'Gagnant', description: 'Cheval gagnant', odds: 1 },
      { id: 'place', name: 'Placé', description: 'Dans les 3 premiers', odds: 0.5 },
      { id: 'exacta', name: 'Exacta', description: '1er et 2ème dans l\'ordre', odds: 8 }
    ]
  }
];

export const HorseRacing = () => {
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [selectedHorse, setSelectedHorse] = useState<number | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<string>('win');
  const [stake, setStake] = useState<number>(10);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const calculatePotentialWinnings = (odds: number, market: string) => {
    const marketMultiplier = races[0].markets.find(m => m.id === market)?.odds || 1;
    return (stake * odds * marketMultiplier).toFixed(2);
  };

  const placeBet = (raceId: string, horseNumber: number, odds: number, race: Race, horseName: string, market: string) => {
    const bet = {
      id: `horse-${raceId}-${horseNumber}-${Date.now()}`,
      type: 'Horse',
      selection: `${horseName} - ${market}`,
      odds,
      stake,
      details: {
        event: race.name,
        time: race.time,
        position: horseNumber,
        market
      }
    };
    
    console.log('Horse racing bet placed:', bet);
    setSelectedHorse(null);
    setStake(10);
  };

  const filteredRaces = races.filter(race => 
    race.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    race.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Paris Hippiques</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowResults(!showResults)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {showResults ? 'Voir les courses' : 'Voir les résultats'}
          </button>
        </div>
      </div>

      {showResults ? (
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Résultats des courses</h3>
          <div className="space-y-4">
            {races.map((race) => (
              <div key={race.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-800">{race.name}</h4>
                    <p className="text-sm text-gray-600">{race.location}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {race.date} - {race.time}
                  </div>
                </div>
                <div className="space-y-2">
                  {race.horses.map((horse, index) => (
                    <div key={horse.number} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{horse.name}</p>
                        <p className="text-sm text-gray-600">Jockey: {horse.jockey}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredRaces.map((race) => (
            <div key={race.id} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{race.name}</h3>
                  <p className="text-gray-600">{race.location}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {race.date}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {race.time}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <h4 className="font-semibold text-gray-700">Type de pari:</h4>
                  <select
                    value={selectedMarket}
                    onChange={(e) => setSelectedMarket(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                  >
                    {race.markets.map((market) => (
                      <option key={market.id} value={market.id}>
                        {market.name} - {market.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <h4 className="font-semibold text-gray-700">Mise (€):</h4>
                  <input
                    type="number"
                    value={stake}
                    onChange={(e) => setStake(Number(e.target.value))}
                    min="1"
                    className="border rounded-lg px-3 py-2 w-24"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {race.horses.map((horse) => (
                  <div key={horse.number} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center flex-1">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                        {horse.number}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800">{horse.name}</h4>
                          <div className="flex items-center gap-2">
                            {horse.lastResults.map((result, index) => (
                              <span
                                key={index}
                                className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700"
                              >
                                {result}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                          <p>Jockey: {horse.jockey}</p>
                          <p>Entraineur: {horse.trainer}</p>
                          <p>Age: {horse.age} ans</p>
                          <p>Poids: {horse.weight}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{horse.odds}</div>
                      <div className="text-sm text-green-600">
                        Gain potentiel: {calculatePotentialWinnings(horse.odds, selectedMarket)}€
                      </div>
                      <button
                        onClick={() => placeBet(race.id, horse.number, horse.odds, race, horse.name, selectedMarket)}
                        className="mt-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Parier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};