import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai';
import { IoGameControllerOutline } from 'react-icons/io5';
import { FaTrophy, FaTicketAlt, FaUserPlus } from 'react-icons/fa';
// import { BsHeart } from 'react-icons/bs';
// import { IoNotificationsOutline } from 'react-icons/io5';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import RegisterModal from './Auth/RegisterModal';

const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const menuItems = [
    { name: 'Accueil', icon: <AiOutlineHome className="w-4 h-4" />, href: '/' },
    { name: 'À propos', icon: <AiOutlineInfoCircle className="w-4 h-4" />, href: '/about' },
    { name: 'Nos Produits', icon: <IoGameControllerOutline className="w-4 h-4" />, href: '/products' },
    { name: 'Résultats', icon: <FaTrophy className="w-4 h-4" />, href: '/results' },
    { name: 'Vérifier un ticket', icon: <FaTicketAlt className="w-4 h-4" />, href: '/verify-ticket' },
    // { name: 'Jeu Responsable', icon: <BsHeart className="w-4 h-4" />, href: '/responsible-gaming' },
    // { name: 'Actualités', icon: <IoNotificationsOutline className="w-4 h-4" />, href: '/news' },
    // { name: 'Contact', icon: <AiOutlinePhone className="w-4 h-4" />, href: '/contact' },
  ];

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
  };

  return (
    <>
      <nav className="bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <span className="text-lg sm:text-xl font-bold text-accent-300">SONAL S.A.</span>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center px-2 py-1.5 rounded text-xs font-medium hover:bg-primary-800 hover:text-accent-300 transition-colors"
                  >
                    {item.icon}
                    <span className="ml-1">{item.name}</span>
                  </Link>
                ))}
               
              </div>
            </div>

            <div className='hidden md:flex md:flex-row gap-5'>
                <button
                  onClick={() => navigate("/contact")}
                  className="flex items-center px-2 py-1.5 rounded text-xs font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
                >
                  {/* <FaUserPlus className="w-4 h-4 mr-1" /> */}
                  Nous contacter
                </button>
                <button
                      onClick={() => setShowRegisterModal(true)}
                      className="flex items-center px-2 py-1.5 rounded text-xs font-medium bg-accent-500 hover:bg-accent-600 text-white transition-colors"
                >
                  {/* <FaUserPlus className="w-4 h-4 mr-1" /> */}
                  Placer un pari
                </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-1.5 rounded-md hover:bg-primary-800 focus:outline-none"
              >
                {isOpen ? <HiOutlineX className="w-5 h-5" /> : <HiOutlineMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-800 hover:text-accent-300 block"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowRegisterModal(true);
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium bg-accent-500 hover:bg-accent-600 text-white transition-colors"
              >
                <FaUserPlus className="w-5 h-5 mr-2" />
                Créer votre compte
              </button>
            </div>
          </div>
        )}
      </nav>

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSuccess={handleRegisterSuccess}
      />
    </>
  );
};

export default Navbar;