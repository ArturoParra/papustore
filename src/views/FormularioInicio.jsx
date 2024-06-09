import React, { useEffect, useState, useRef } from 'react';
import JustValidate from 'just-validate'; 
import { Header } from '../components/Header';  
import { Footer } from '../components/Footer';  

// Componente principal FormularioInicio
export const FormularioInicio = () => {
  const [isSignUp, setIsSignUp] = useState(false);  
  const signupValidator = useRef(null);

  useEffect(() => {
    if (isSignUp && !signupValidator.current) {
      signupValidator.current = new JustValidate('#signup-form');

      signupValidator.current
        .addField('#name', [
          {
            rule: 'required',
            errorMessage: 'El nombre es requerido',
          },
        ])
        .addField('#email', [
          {
            rule: 'required',
            errorMessage: 'El correo electrónico es requerido',
          },
          {
            rule: 'email',
            errorMessage: 'Correo electrónico inválido',
          },
        ])
        .addField('#password', [
          {
            rule: 'required',
            errorMessage: 'La contraseña es requerida',
          },
          {
            rule: 'minLength',
            value: 8,
            errorMessage: 'La contraseña debe tener al menos 8 caracteres',
          },
        ])
        .addField('#confirm-password', [
          {
            rule: 'required',
            errorMessage: 'La confirmación de la contraseña es requerida',
          },
          {
            validator: (value, fields) => {
              return value === fields['#password'].elem.value;
            },
            errorMessage: 'Las contraseñas no coinciden',
          },
        ])
        .addField('#terms', [
          {
            rule: 'required',
            errorMessage: 'Debes aceptar los términos y condiciones',
          },
        ])
        .onSuccess((event) => {
          event.preventDefault();
          const form = event.target;
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          console.log(data);
          alert(JSON.stringify(data, null, 2));
          form.reset();
        });
    }

    return () => {
      if (signupValidator.current) {
        signupValidator.current.destroy();
        signupValidator.current = null;
      }
    };
  }, [isSignUp]);

  const handleTabChange = (isSignUpTab) => {
    setIsSignUp(isSignUpTab);
    document.getElementById('signup-form')?.reset();
    document.getElementById('login-form')?.reset();
    document.querySelectorAll('.just-validate-error-label').forEach(label => label.remove());
    document.querySelectorAll('.is-invalid').forEach(input => input.classList.remove('is-invalid'));
  };

  return (
    <>
      {/* Renderiza el componente Header */}
      <Header />


      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          
          <div className="flex justify-center mb-4">
            <div
              className={`cursor-pointer ${!isSignUp ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
              onClick={() => handleTabChange(false)}  

            >
              SIGN IN
            </div>
            <div
              className={`ml-8 cursor-pointer ${isSignUp ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
              onClick={() => handleTabChange(true)}  
            >
              SIGN UP
            </div>
          </div>

          {/* Renderiza el formulario de SIGN UP si isSignUp es verdadero, de lo contrario renderiza el formulario de SIGN IN */}
          {isSignUp ? (
            <form id="signup-form" className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  NAME
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  EMAIL ADDRESS
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email Address"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="8+ Characters"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                  CONFIRM PASSWORD
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>

              <div className="flex items-center">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  id="terms"
                />
                <label className="text-sm text-gray-600" htmlFor="terms">
                  YOU AGREE WITH THE <a href="#" className="text-orange-500">TERMS AND CONDITIONS</a> AND <a href="#" className="text-orange-500">PRIVACY POLICY</a>.
                </label>
              </div>
              
              {/* Botón de envío para el formulario de SIGN UP */}
              <div className="flex items-center justify-between">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                >
                  SIGN UP
                </button>
              </div>
            </form>
          ) : (
            <form id="login-form" className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  EMAIL ADDRESS
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email Address"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
                <div className="text-right mt-2">

                  <a href="#" className="text-sm text-orange-500">FORGOT PASSWORD</a>  
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                >
                  SIGN IN
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      {/* Renderiza el componente Footer */}
      <Footer />
    </>
  );
};
