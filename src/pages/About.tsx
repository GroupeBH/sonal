import React from 'react';
import { Trophy, Shield, Users, Zap, Heart } from 'lucide-react';

export const About = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            À Propos de Bet243
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Découvrez ce qui fait de nous la meilleure plateforme de paris sportifs en ligne.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {/* Notre Mission */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Trophy className="w-8 h-8 text-indigo-600" />
                <h3 className="ml-3 text-xl font-bold text-gray-900">Notre Mission</h3>
              </div>
              <p className="text-gray-600">
                Notre mission est de fournir une expérience de paris sportifs transparente, sécurisée et divertissante. Nous nous engageons à offrir des cotes compétitives, une interface conviviale et un support client exceptionnel.
              </p>
            </div>

            {/* Sécurité et Fiabilité */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-green-600" />
                <h3 className="ml-3 text-xl font-bold text-gray-900">Sécurité et Fiabilité</h3>
              </div>
              <p className="text-gray-600">
                La sécurité de vos données et transactions est notre priorité. Nous utilisons les dernières technologies de cryptage pour garantir que vos informations sont protégées à tout moment.
              </p>
            </div>

            {/* Notre Communauté */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-blue-600" />
                <h3 className="ml-3 text-xl font-bold text-gray-900">Notre Communauté</h3>
              </div>
              <p className="text-gray-600">
                Rejoignez une communauté dynamique de passionnés de sport. Partagez vos pronostics, discutez des matchs et profitez de l'excitation des paris sportifs avec des milliers d'autres utilisateurs.
              </p>
            </div>

            {/* Innovation Technologique */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-yellow-600" />
                <h3 className="ml-3 text-xl font-bold text-gray-900">Innovation Technologique</h3>
              </div>
              <p className="text-gray-600">
                Nous repoussons les limites de la technologie pour vous offrir une expérience de paris fluide et immersive. Notre plateforme est constamment mise à jour pour répondre à vos besoins.
              </p>
            </div>
          </div>
        </div>

        {/* Engagement */}
        <div className="mt-12 bg-indigo-600 rounded-lg p-8 text-center">
          <div className="flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
            <h3 className="ml-3 text-2xl font-bold text-white">Notre Engagement</h3>
          </div>
          <p className="mt-4 text-lg text-indigo-100">
            Nous nous engageons à promouvoir un environnement de paris responsable. Jouez avec modération et profitez de l'expérience en toute sécurité.
          </p>
        </div>
      </div>
    </div>
  );
};