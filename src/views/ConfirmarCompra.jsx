import React from 'react'

export const ConfirmarCompra = () => {
  return (
    <>
     <div className="bg-gray-100 p-8 flex flex-col lg:flex-row">
      {/* Billing Information */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full lg:w-2/3 mb-8 lg:mb-0 lg:mr-8">
        <h2 className="text-2xl font-bold mb-6">Billing Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="block text-gray-700">Company Name (Optional)</label>
            <input type="text" className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Company Name" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700">Address</label>
            <input type="text" className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Address" />
          </div>
          <div>
            <label className="block text-gray-700">Country</label>
            <input type="text" className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Country" />
          </div>
          <div>
            <label className="block text-gray-700">Region/State</label>
            <input type="text" className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Region/State" />
          </div>
          <div>
            <label className="block text-gray-700">City</label>
            <input type="text" className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="City" />
          </div>
          <div>
            <label className="block text-gray-700">Zip Code</label>
            <input type="text" className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Zip Code" />
          </div>
        </div>
      </div>
      {/* Order Summary */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full lg:w-1/3">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <img src="/path-to-image-1.jpg" alt="Product 1" className="w-16 h-16 object-cover" />
            <div className="flex-1 ml-4">Canon EOS 1500D DSLR Camera Body+ 18-...</div>
            <div>1 x <span className="text-blue-600">$70</span></div>
          </div>
          <div className="flex justify-between items-center">
            <img src="/path-to-image-2.jpg" alt="Product 2" className="w-16 h-16 object-cover" />
            <div className="flex-1 ml-4">Wired Over-Ear Gaming Headphones with U...</div>
            <div>3 x <span className="text-blue-600">$250</span></div>
          </div>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <div>Sub-total</div>
            <div>$320</div>
          </div>
          <div className="flex justify-between mb-2">
            <div>Shipping</div>
            <div>Free</div>
          </div>
          <div className="flex justify-between mb-2">
            <div>Discount</div>
            <div>$24</div>
          </div>
          <div className="flex justify-between mb-2">
            <div>Tax</div>
            <div>$61.99</div>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <div>Total</div>
            <div>$357.99 USD</div>
          </div>
        </div>
        <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          PLACE ORDER
        </button>
      </div>
    </div>
    </>
  )
}
