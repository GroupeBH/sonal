import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-1.5 sm:space-x-2">
      <div className="relative w-8 h-8 sm:w-12 sm:h-12">
        <div className="absolute inset-0 bg-white rounded-lg">
          {/* Blue square background */}
          <div className="absolute inset-1 bg-primary-600 rounded-lg" />
          
          {/* Red horse head */}
          <div className="absolute inset-2">
            <div className="w-full h-full relative">
              <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-secondary-600 transform -rotate-12 rounded-tr-full" />
              <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-secondary-700 transform rotate-45 rounded-br-full" />
            </div>
          </div>
          
          {/* Yellow lottery ball */}
          <div className="absolute bottom-1 right-1 w-2 h-2 sm:w-3 sm:h-3 bg-accent-400 rounded-full" />
          
          {/* Blue curved line */}
          <div className="absolute bottom-2 left-1 right-1 h-1.5 sm:h-2 bg-primary-600 rounded-full transform -rotate-12" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg sm:text-xl font-bold leading-none">SONAL S.A.</span>
        <span className="text-[10px] sm:text-xs text-gray-600">Pour le Social</span>
        <div className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5">
          <div className="w-full h-full relative">
            <div className="absolute inset-0 border-2 border-accent-400 rounded-sm transform rotate-45" />
            <div className="absolute inset-1 bg-accent-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;