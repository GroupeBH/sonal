import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCheck } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { validatePhoneNumber } from '../../utils/validators';
import { showSuccessNotification, showErrorNotification } from '../../utils/notifications';
// import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { postRequest } from '../../services/supabase';
import { setCurrentUser } from '../../redux/reducers/user';
import { useDispatch } from 'react-redux';

interface RegisterFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  submit?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onCancel }) => {
  const { login } = useAuth();
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [connecting, setConnecting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock user object
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      };

      const register = await postRequest('create_user', user)

      console.log(register)

      localStorage.setItem("currentUser", JSON.stringify(register?.data))

      dispatch(setCurrentUser(register?.data))
      login(user);
      showSuccessNotification('Compte créé avec succès! Bienvenue chez SONAL S.A.');
      onSuccess();
    } catch (error) {
      showErrorNotification('Une erreur est survenue lors de la création du compte. Veuillez réessayer.');
      setErrors({ submit: 'Une erreur est survenue. Veuillez réessayer.' });
      console.log(error)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
   <>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-700">
            Prénom
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
              <FaUser className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="pl-8 sm:pl-10 block py-3 border border-gray-300 w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 text-xs sm:text-sm"
              placeholder="Jean"
            />
          </div>
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-700">
            Nom
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
              <FaUser className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="pl-8 sm:pl-10 py-3 border border-gray-300 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-xs sm:text-sm"
              placeholder="Dupont"
            />
          </div>
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="pl-8 sm:pl-10 py-3 border border-gray-300 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-xs sm:text-sm"
              placeholder="exemple@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700">
            Téléphone
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
              <FaPhone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="pl-8 sm:pl-10 py-3 border border-gray-300 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-xs sm:text-sm"
              placeholder="0812345678"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
            <FaLock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="pl-8 sm:pl-10 py-3 border border-gray-300 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-xs sm:text-sm"
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-600">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-gray-700">
          Confirmer le mot de passe
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
            <FaLock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="pl-8 sm:pl-10 py-3 border border-gray-300 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-xs sm:text-sm"
          />
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      {errors.submit && (
        <div className="rounded-md bg-red-50 p-3">
          <p className="text-xs text-red-600">{errors.submit}</p>
        </div>
      )}

      <div className=''>
        <p>Si vous avez dejà un compte,{" "}
          <span
            className='text-blue-400 cursor-pointer'
            onClick={()=>{
              setConnecting(true)
              // onCancel()
            }}
          >
            connectez-vous
          </span>
        </p>
      </div>

      <div className="flex space-x-3 sm:space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-md text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          disabled={isSubmitting}
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 flex justify-center items-center py-2 sm:py-3 px-3 sm:px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {isSubmitting ? (
            <>
              <FaCheck className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
              Création en cours...
            </>
          ) : (
            'Créer un compte'
          )}
        </button>
      </div>
    </form>
    {connecting && (
      <LoginModal
        isOpen={connecting} 
        onClose={()=>setConnecting(false)}
        onSuccess={()=>setConnecting(false)}
      />
    )}
   </>
  );
};

export default RegisterForm;