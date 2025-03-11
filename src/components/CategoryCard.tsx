import React from 'react';
import { BettingCategory } from '../types';

interface CategoryCardProps {
  category: BettingCategory;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const Icon = category.icon;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
    >
      <div className="flex items-center space-x-4">
        <div className="bg-indigo-100 p-3 rounded-lg">
          <Icon className="h-8 w-8 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
          <p className="text-sm text-gray-600">{category.description}</p>
        </div>
      </div>
    </div>
  );
}