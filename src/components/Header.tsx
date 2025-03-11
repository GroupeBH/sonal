import React, { useState } from 'react';
import { Menu, User, Bell, LogOut, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
  } | null;
}

export const Header = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });

  const isActive = (path: string) => {
    return location.pathname === path ? "bg-indigo-800" : "";
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement actual login logic here
    setAuthState({
      isAuthenticated: true,
      user: {
        name: "John Doe",
        email: "john@example.com"
      }
    });
    localStorage.setItem("currentUser", JSON.stringify({
      name: "John Doe",
      email: "john@example.com"
    }))
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null
    });
  };

  React.useEffect(()=>{
        if(currentUser){
          setAuthState({
            isAuthenticated: true,
            user: {
              name: "John Doe",
              email: "john@example.com"
            }
          });
        }
    }, [currentUser])

  return (
    <>
      <header className="bg-indigo-900 text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsMenuOpen(true)} className="hover:bg-indigo-800 p-2 rounded-lg">
                <Menu className="h-6 w-6 cursor-pointer" />
              </button>
              <Link to="/" className="text-2xl font-bold">Bet243 <span className='text-[15px]'>by SONAL</span></Link>
            </div>
            
            <div className="flex items-center space-x-6">
              <Bell className="h-6 w-6 cursor-pointer hover:text-indigo-200" />
              {authState.isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 hover:bg-indigo-800 p-2 rounded-lg">
                    <User className="h-6 w-6" />
                    <span>{authState.user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Se déconnecter
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center space-x-2 hover:bg-indigo-800 p-2 rounded-lg"
                >
                  <User className="h-6 w-6" />
                  <span>Connexion</span>
                </button>
              )}
            </div>
          </div>

          <nav className="flex space-x-1">
            <Link
              to="/sports"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-800 ${isActive('/sports')}`}
            >
              Paris Sportifs
            </Link>
            <Link
              to="/horse-racing"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-800 ${isActive('/horse-racing')}`}
            >
              Paris Hippiques
            </Link>
            <Link
              to="/lottery"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-800 ${isActive('/lottery')}`}
            >
              Loterie
            </Link>
            <Link
              to="/virtual"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-800 ${isActive('/virtual')}`}
            >
              Jeux Virtuels
            </Link>
          </nav>
        </div>
      </header>

      {/* Side Menu */}
      <Transition show={isMenuOpen}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-hidden"
          onClose={() => setIsMenuOpen(false)}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-40 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-y-0 left-0 max-w-full flex">
              <Transition.Child
                enter="transform transition ease-in-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative w-80 max-w-md">
                  <div className="h-full bg-white shadow-xl flex flex-col">
                    <div className="px-6 pt-6 pb-4 flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">Menu</h2>
                      <button
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="flex-1 px-6 py-4">
                      <nav className="space-y-2">
                        <Link
                          to="/"
                          className="block px-4 py-2 rounded-lg text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Accueil
                        </Link>
                        <Link
                          to="/sports"
                          className="block px-4 py-2 rounded-lg text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Paris Sportifs
                        </Link>
                        <Link
                          to="/horse-racing"
                          className="block px-4 py-2 rounded-lg text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Paris Hippiques
                        </Link>
                        <Link
                          to="/lottery"
                          className="block px-4 py-2 rounded-lg text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Loterie
                        </Link>
                        <Link
                          to="/virtual"
                          className="block px-4 py-2 rounded-lg text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Jeux Virtuels
                        </Link>
                      </nav>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Auth Modal */}
      <Transition show={isAuthModalOpen}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setIsAuthModalOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {isLoginMode ? 'Connexion' : 'Inscription'}
                </Dialog.Title>
                <button
                  onClick={() => setIsAuthModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                {!isLoginMode && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex justify-between items-center mt-6">
                  <button
                    type="button"
                    onClick={() => setIsLoginMode(!isLoginMode)}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    {isLoginMode ? "S'inscrire" : 'Se connecter'}
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    {isLoginMode ? 'Se connecter' : "S'inscrire"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};