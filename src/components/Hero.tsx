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
      image: "https://res.cloudinary.com/dblzafklq/image/upload/v1741651122/gw2azhms9pqcqhuzo31v.jpg"
    },
    {
      id: 2,
      title: "Paris HIPPIQUES PMU Alr",
      description: "Pariez sur les courses internationales avec le PMU",
      image: "https://res.cloudinary.com/dblzafklq/image/upload/v1741651122/xk3v4hlaqzpyymtpoocq.jpg"
    },
    {
      id: 3,
      title: "Paris HIPPIQUES PMU Plr",
      description: "Le pari hippique par excellence avec le PMU",
      image: "https://res.cloudinary.com/dblzafklq/image/upload/v1741651122/ei2jrp5m7z5pvpvzgarc.jpg"
    },
    {
      id: 4,
      title: "Paris HIPPIQUES masse commune",
      description: "Pariez sur les courses de chevaux en direct avec des cotes dynamiques",
      image: "https://res.cloudinary.com/dblzafklq/image/upload/v1741651122/ei2jrp5m7z5pvpvzgarc.jpg"
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
      <div className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Image de fond avec overlay */}
            <div className="absolute inset-0 bg-black/80 from-slate-900/70 to-transparent" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />

            {/* Contenu vitreux */}
            <div className="absolute inset-0 flex items-center z-20">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="backdrop-blur-xl bg-slate-100/20 p-8 rounded-2xl shadow-2xl border border-slate-300/30 max-w-2xl">
                  <div className="space-y-6">
                    <div className="overflow-hidden">
                      <h1 className="animate-text-slide text-4xl sm:text-5xl md:text-6xl font-black text-slate-100 leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        {slide.title}
                      </h1>
                    </div>
                    
                    <div className="overflow-hidden">
                      <p className="animate-text-fade delay-200 text-lg sm:text-xl md:text-2xl text-slate-200 font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                        {slide.description}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <a
                        href="/results"
                        className="flex items-center justify-center px-8 py-4 bg-slate-100/90 hover:bg-slate-100 text-slate-900 font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                      >
                        <span>Voir les résultats</span>
                        <BsArrowRight className="ml-3 h-6 w-6" />
                      </a>

                      {isAuthenticated ? (
                        <a
                          href="/products"
                          className="flex items-center justify-center px-8 py-4 bg-blue-600/90 hover:bg-blue-700/90 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                        >
                          <span>Jouer maintenant</span>
                          <BsArrowRight className="ml-3 h-6 w-6" />
                        </a>
                      ) : (
                        <button
                          onClick={() => setShowRegisterModal(true)}
                          className="flex items-center justify-center px-8 py-4 bg-blue-600/90 hover:bg-blue-700/90 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                        >
                          <span>Placer un pari</span>
                          <FaUserPlus className="ml-3 h-6 w-6" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Indicateurs de slide */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-slate-100 w-12' : 'bg-slate-400/70 hover:bg-slate-300/90'
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSuccess={handleRegisterSuccess}
      />

      <style tsx global>{`
        @keyframes text-slide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes text-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-text-slide {
          animation: text-slide 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }

        .animate-text-fade {
          animation: text-fade 0.8s ease-out 0.2s forwards;
        }
      `}</style>
    </>
  );
};

export default Hero;