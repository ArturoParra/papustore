import React, { useEffect, useState } from 'react';  // Importación de React y el hook useState
import JustValidate from 'just-validate' //Importacion de JustValidate
import { Header } from '../components/Header';  // Importación del componente Header
import { Footer } from '../components/Footer';  // Importación del componente Footer

// Componente principal FormularioInicio
export const FormularioInicio = () => {
  const [isSignUp, setIsSignUp] = useState(false);  // Estado local para manejar si el formulario es de registro (sign up) o inicio de sesión (sign in)

  useEffect(() => {
    const validator = new JustValidate('#login-form');

    validator
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
      .onSuccess((event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        alert(JSON.stringify(data, null, 2));
      });
  }, []);

  return (
    <>
      {/* Renderiza el componente Header */}
      <Header />

      {/* Contenedor principal del formulario, con estilos para centrar el contenido y aplicar un fondo */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          
          {/* Contenedor para los botones de alternancia entre SIGN IN y SIGN UP */}
          <div className="flex justify-center mb-4">
            <div
              className={`cursor-pointer ${!isSignUp ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
              onClick={() => setIsSignUp(false)}  // Alterna a formulario de SIGN IN
            >
              SIGN IN
            </div>
            <div
              className={`ml-8 cursor-pointer ${isSignUp ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
              onClick={() => setIsSignUp(true)}  // Alterna a formulario de SIGN UP
            >
              SIGN UP
            </div>
          </div>

          {/* Renderiza el formulario de SIGN UP si isSignUp es verdadero, de lo contrario renderiza el formulario de SIGN IN */}
          {isSignUp ? (
            /* Formulario de registro */
            <form>
              {/* Campo de entrada para el nombre */}
              <div className="mb-4">
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

              {/* Campo de entrada para el correo electrónico */}
              <div className="mb-4">
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

              {/* Campo de entrada para la contraseña */}
              <div className="mb-4">
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

              {/* Campo de entrada para confirmar la contraseña */}
              <div className="mb-4">
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

              {/* Checkbox para aceptar los términos y condiciones */}
              <div className="mb-4 flex items-center">
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
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  SIGN UP
                </button>
              </div>
            </form>
          ) : (
            /* Formulario de inicio de sesión */
            <form id='login-form'>
              {/* Campo de entrada para el correo electrónico */}
              <div className="mb-4">
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

              {/* Campo de entrada para la contraseña */}
              <div className="mb-4">
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
                  <a href="#" className="text-sm text-orange-500">FORGOT PASSWORD</a>  {/* Enlace para la recuperación de contraseña */}
                </div>
              </div>

              {/* Botón de envío para el formulario de SIGN IN */}
              <div className="flex items-center justify-between">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
