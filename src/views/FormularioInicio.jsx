import React, { useState } from 'react';
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const FormularioInicio = () => {
    const [isSignUp, setIsSignUp] = useState(false);
  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
          <div
            className={`cursor-pointer ${!isSignUp ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
            onClick={() => setIsSignUp(false)}
          >
            INICIAR SESIÓN
          </div>
          <div
            className={`ml-8 cursor-pointer ${isSignUp ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
            onClick={() => setIsSignUp(true)}
          >
            ÚNETE
          </div>
        </div>

        {isSignUp ? (
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                NOMBRE
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="NOMBRE"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                DIRECCIÓN DE CORREO ELECTRÓNICO
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="DIRECCIÓN DE CORREO ELECTRÓNICO"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                CONTRASEÑA
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="+8 CARACTERES"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                CONFIRMAR CONTRASEÑA
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirm-password"
                type="password"
                placeholder="CONFIRMAR CONTRASEÑA"
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                id="terms"
              />
              <label className="text-sm text-gray-600" htmlFor="terms">
                ESTÁS DE ACUERDO CON LOS <a href="#" className="text-orange-500">TÉRMINOS DE CONDICIÓN</a> Y <a href="#" className="text-orange-500">POLÍTICA DE PRIVACIDAD</a>.
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
               ÚNETE
              </button>
            </div>
          </form>
        ) : (
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              DIRECCIÓN DE CORREO ELECTRÓNICO
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="DIRECCIÓN DE CORREO ELECTRÓNICO"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                CONTRASEÑA
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="CONTRASEÑA"
              />
              <div className="text-right mt-2">
                <a href="#" className="text-sm text-orange-500">OLVIDÉ MI CONTRASEÑA</a>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                INICIAR SESIÓN
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
    <Footer/>
    </>
  )
}
