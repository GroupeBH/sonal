import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from '../components/CategoryCard';
import { FolderRoot, Users, Ticket, Gamepad2, Trophy, Star, TrendingUp, Clock } from 'lucide-react';
import { BettingCategory } from '../types';
import Hero from '../components/Hero';

const categories: BettingCategory[] = [
  {
    id: 'sports',
    name: 'Paris Sportifs',
    description: 'Football, Basketball, Tennis et plus',
    icon: FolderRoot
  },
  {
    id: 'horse-racing',
    name: 'Paris Hippiques',
    description: 'Courses de chevaux en direct',
    icon: Users
  },
  {
    id: 'lottery',
    name: 'Loterie en Ligne',
    description: 'Tirages quotidiens et jackpots',
    icon: Ticket
  },
  {
    id: 'virtual',
    name: 'Jeux Virtuels',
    description: 'Sports virtuels et simulations',
    icon: Gamepad2
  },
  // {
  //   id: 'scratch',
  //   name: 'Jeux de grattage',
  //   description: 'Sports virtuels et simulations',
  //   icon: Gamepad2
  // }
];

const featuredEvents = [
  {
    id: '1',
    title: 'Ligue des Champions',
    match: 'PSG vs Manchester City',
    time: '20:00',
    date: '20 Mars 2024',
    odds: 2.45,
    type: 'Football'
  },
  {
    id: '2',
    title: 'Prix de l\'Arc de Triomphe',
    match: 'Course Principale',
    time: '14:30',
    date: '20 Mars 2024',
    odds: 3.50,
    type: 'Hippique'
  }
];

const promotions = [
  {
    id: '1',
    title: 'Bonus de Bienvenue',
    description: 'Jusqu\'à 100€ offerts pour votre premier dépôt',
    color: 'from-green-500 to-emerald-700'
  },
  {
    id: '2',
    title: 'Paris Gratuits',
    description: 'Recevez 10€ de paris gratuits chaque semaine',
    color: 'from-purple-500 to-indigo-700'
  }
];

export const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/${categoryId}`);
  };

  return (
    <div>
      <Hero />
      <div className="space-y-12 pt-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Bienvenue sur Bet243</h2>
          <p className="mt-2 text-gray-600">Découvrez nos différentes options de paris</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Événements à la Une
            </h3>
            <button className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Voir tout
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredEvents.map((event) => (
              <div key={event.id} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">{event.type}</span>
                  <div className="flex items-center gap-2 text-white/80">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                </div>
                <p className="text-lg font-medium">{event.title}</p>
                <p className="text-sm opacity-90 mt-1">{event.match}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xl font-bold">Cote: {event.odds}</span>
                  <button className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors">
                    Parier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className={`bg-gradient-to-r ${promo.color} text-white rounded-xl p-6 shadow-md`}
            >
              <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
              <p className="text-white/90">{promo.description}</p>
              <button className="mt-4 bg-white text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                En savoir plus
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-indigo-600" />
            Derniers Gagnants
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Jean D.</p>
                  <p className="text-sm text-gray-600">Paris Sportifs - Football</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">+1,250 €</p>
                <p className="text-sm text-gray-600">il y a 2 heures</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Marie L.</p>
                  <p className="text-sm text-gray-600">Paris Hippiques</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">+850 €</p>
                <p className="text-sm text-gray-600">il y a 3 heures</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};