import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const FormularioInicio = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex justify-center mb-4">
            <div
              className={`cursor-pointer ${!isSignUp ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
              onClick={() => setIsSignUp(false)}
            >
              SIGN IN
            </div>
            <div
              className={`ml-8 cursor-pointer ${isSignUp ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
              onClick={() => setIsSignUp(true)}
            >
              SIGN UP
            </div>
          </div>

          {isSignUp ? (
            <form>
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
            <form>
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
                  <a href="#" className="text-sm text-orange-500">FORGOT PASSWORD</a>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  SIGN IN
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
