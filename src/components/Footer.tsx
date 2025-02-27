import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">SONAL S.A.</h3>
            <p className="text-sm sm:text-base text-primary-100 mt-3 sm:mt-4">
              La Société Nationale de Loterie, votre partenaire de confiance pour des jeux de loterie responsables en RDC.
            </p>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-accent-300 mb-3 sm:mb-4">Liens Rapides</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="/about" className="text-sm sm:text-base text-primary-100 hover:text-accent-300">À propos</a></li>
              <li><a href="/products" className="text-sm sm:text-base text-primary-100 hover:text-accent-300">Nos Produits</a></li>
              <li><a href="/results" className="text-sm sm:text-base text-primary-100 hover:text-accent-300">Résultats</a></li>
              <li><a href="/responsible-gaming" className="text-sm sm:text-base text-primary-100 hover:text-accent-300">Jeu Responsable</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-accent-300 mb-3 sm:mb-4">Contact</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li className="flex items-center text-sm sm:text-base text-primary-100">
                <MdPhone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span>+243 123 456 789</span>
              </li>
              <li className="flex items-center text-sm sm:text-base text-primary-100">
                <MdEmail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span>contact@sonal.cd</span>
              </li>
              <li className="flex items-center text-sm sm:text-base text-primary-100">
                <MdLocationOn className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span>Kinshasa, RDC</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-accent-300 mb-3 sm:mb-4">Suivez-nous</h4>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="text-primary-100 hover:text-accent-300">
                <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="text-primary-100 hover:text-accent-300">
                <FaTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="text-primary-100 hover:text-accent-300">
                <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-primary-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs sm:text-sm text-primary-200">
              © {new Date().getFullYear()} SONAL S.A. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/privacy" className="text-xs sm:text-sm text-primary-200 hover:text-accent-300">
                Politique de confidentialité
              </a>
              <a href="/terms" className="text-xs sm:text-sm text-primary-200 hover:text-accent-300">
                Conditions d'utilisation
              </a>
              <a href="/legal" className="text-xs sm:text-sm text-primary-200 hover:text-accent-300">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;