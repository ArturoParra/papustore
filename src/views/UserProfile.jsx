import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const UserProfile = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sección de Configuración de Cuenta */}
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-bold mb-4">CONFIGURACIÓN DE CUENTA</h2>
            <div className="flex items-center mb-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Perfil"
                className="w-24 h-24 rounded-full mr-4"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">NOMBRE</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Nombre"/>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">NOMBRE COMPLETO</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Nombre Completo"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">NOMBRE DE USUARIO</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Nombre de usuario" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CORREO ELECTRÓNICO</label>
                <input type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Correo electrónico"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">NÚMERO DE TELÉFONO</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Número de teléfono"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CORREO ELECTRÓNICO SECUNDARIO</label>
                <input type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Correo electrónico secundario"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">PAÍS/REGIÓN</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="País/Región"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ESTADO</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Estado"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CÓDIGO POSTAL</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Código postal"/>
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                GUARDAR CAMBIOS
              </button>
            </div>
          </div>
          {/* Sección de Dirección de Envío */}
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-bold mb-4">DIRECCIÓN DE ENVÍO</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">NOMBRE</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Nombre"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">APELLIDO</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Apellido"/>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">NOMBRE DE LA EMPRESA (OPCIONAL)</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Nombre de la empresa"/>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">DIRECCIÓN</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Dirección"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">PAÍS</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="País"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">REGIÓN/ESTADO</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Región/Estado" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CIUDAD</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Ciudad"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CÓDIGO POSTAL</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Código postal"/>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">CORREO ELECTRÓNICO</label>
                <input type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Correo electrónico"/>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">NÚMERO DE TELÉFONO</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Número de teléfono"/>
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                GUARDAR CAMBIOS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
};
