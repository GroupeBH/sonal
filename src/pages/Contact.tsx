import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contactez-Nous
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Nous sommes là pour répondre à vos questions et vous aider à résoudre vos problèmes.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center">
              <Mail className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Email</h3>
            <p className="mt-2 text-gray-600">
              Envoyez-nous un email à l'adresse suivante :
            </p>
            <a
              href="mailto:support@plateforme.com"
              className="mt-4 inline-block text-indigo-600 hover:text-indigo-500"
            >
              support@bet243.com
            </a>
          </div>

          {/* Téléphone */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center">
              <Phone className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Téléphone</h3>
            <p className="mt-2 text-gray-600">
              Appelez-nous pour un support immédiat :
            </p>
            <a
              href="tel:+33123456789"
              className="mt-4 inline-block text-green-600 hover:text-green-500"
            >
              +243813456777
            </a>
          </div>

          {/* Adresse */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Adresse</h3>
            <p className="mt-2 text-gray-600">
              Retrouvez-nous à notre siège social :
            </p>
            <p className="mt-4 text-blue-600">
               203 Av. de l'Equateur, Kinshasa
            </p>
          </div>
        </div>

        {/* Formulaire de Contact */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900">Envoyez-nous un Message</h3>
          <form className="mt-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};