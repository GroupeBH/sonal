import React, { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { FaUserPlus } from 'react-icons/fa';
import RegisterModal from './Auth/RegisterModal';
import { useAuth } from '../contexts/AuthContext';

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const slides = [
    {
      id: 1,
      title: "BET243 Addition",
      description: "Un nouveau concept de paris innovant avec des gains multiplicateurs",
      image: "https://images.unsplash.com/photo-1534297635662-a262cdcb8bee?auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Paris HIPPIQUES PMU Alr",
      description: "Pariez sur les courses internationales avec le PMU",
      image: "https://images.unsplash.com/photo-1582507225413-dac2b5dffd8d?auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "Paris HIPPIQUES PMU Plr",
      description: "Le pari hippique par excellence avec le PMU",
      image: "https://images.unsplash.com/photo-1584937091925-f1f6cc4bdb6e?auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      title: "Paris HIPPIQUES masse commune",
      description: "Pariez sur les courses de chevaux en direct avec des cotes dynamiques",
      image: "https://images.unsplash.com/photo-1558604680-932c5b8a4738?auto=format&fit=crop&q=80",
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
  };

  return (
    <>
      <div className="relative h-[600px] overflow-hidden">
        {/* Background Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-transparent z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Fixed Content */}
        <div className="absolute inset-0 flex items-center z-20">
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center max-w-lg mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4 text-center">
                {slides[currentSlide].title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white mb-3 md:mb-8 text-center">
                {slides[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto sm:justify-center">
                <a
                  href="/results"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium rounded-md text-primary-900 bg-accent-400 hover:bg-accent-500 transition-colors"
                >
                  Voir les résultats
                  <BsArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </a>
                {isAuthenticated ? (
                  <a
                    href="/products"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium rounded-md text-white bg-secondary-600 hover:bg-secondary-700 transition-colors"
                  >
                    Jouer maintenant
                    <BsArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </a>
                ) : (
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium rounded-md text-white bg-secondary-600 hover:bg-secondary-700 transition-colors"
                  >
                    Créer votre compte
                    <FaUserPlus className="ml-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSuccess={handleRegisterSuccess}
      />
    </>
  );
};

export default Hero;