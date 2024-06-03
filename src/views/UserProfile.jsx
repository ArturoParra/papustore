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
            {/* Account Settings Section */}
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-bold mb-4">ACCOUNT SETTINGS</h2>
              <div className="flex items-center mb-4">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Profile"
                  className="w-24 h-24 rounded-full mr-4"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">DISPLAY NAME</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Display Name"/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">FULL NAME</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Full Name"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">USERNAME</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Username" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">EMAIL</label>
                  <input type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Email"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">PHONE NUMBER</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Phone Number"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">SECONDARY EMAIL</label>
                  <input type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Secondary Email"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">COUNTRY/REGION</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Country/Region"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">STATE</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="State"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ZIP CODE</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Zip Code"/>
                </div>
              </div>
              <div className="mt-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  SAVE CHANGES
                </button>
              </div>
            </div>
            {/* Shipping Address Section */}
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-bold mb-4">SHIPPING ADDRESS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">FIRST NAME</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="First Name"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">LAST NAME</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Last Name"/>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">COMPANY NAME (OPTIONAL)</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Company Name"/>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">ADDRESS</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Address"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">COUNTRY</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Country"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">REGION/STATE</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Region/State" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CITY</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="City"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ZIP CODE</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Zip Code"/>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">EMAIL</label>
                  <input type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Email"/>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">PHONE NUMBER</label>
                  <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Phone Number"/>
                </div>
              </div>
              <div className="mt-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  SAVE CHANGES
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
