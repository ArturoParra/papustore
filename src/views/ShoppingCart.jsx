// src/Cart.js
import React, { useState } from 'react';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const ShoppingCart = () => {
    const [cart, setCart] = useState([
        { id: 1, name: '4K UHD LED Smart TV with Chromecast Built-in', price: 70, originalPrice: 99, quantity: 1, image: 'tv' },
        { id: 2, name: 'Wired Over-Ear Gaming Headphones with USB', price: 250, quantity: 3, image: 'headphones' },
      ]);
    
      const incrementQuantity = (id) => {
        setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
      };
    
      const decrementQuantity = (id) => {
        setCart(cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
      };
    
      const removeItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
      };
    
      const cartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
      };
    
      const subTotal = cartTotal();
      const discount = 24;
      const tax = 61.99;
      const total = subTotal - discount + tax;

  return (
    <>
    <Header/>
    <div className="container mx-auto mt-10 p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row shadow-md my-10">
        <div className="w-full lg:w-3/4 bg-white px-4 sm:px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
          </div>
          <div className="hidden sm:flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
          </div>
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div className="flex w-full sm:w-2/5">
                <div className="w-20">
                  <img className="h-24" src={`/img/${item.image}.jpg`} alt={item.name} />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.name}</span>
                  <span className="text-red-500 text-xs">${item.originalPrice}</span>
                  <button
                    className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex justify-center w-full sm:w-1/5 mt-4 sm:mt-0">
                <button
                  className="text-gray-600"
                  onClick={() => decrementQuantity(item.id)}
                >
                  -
                </button>
                <input
                  className="mx-2 border text-center w-8"
                  type="text"
                  value={item.quantity}
                  readOnly
                />
                <button
                  className="text-gray-600"
                  onClick={() => incrementQuantity(item.id)}
                >
                  +
                </button>
              </div>
              <span className="text-center w-full sm:w-1/5 font-semibold text-sm mt-4 sm:mt-0">
                ${item.price}
              </span>
              <span className="text-center w-full sm:w-1/5 font-semibold text-sm mt-4 sm:mt-0">
                ${item.price * item.quantity}
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center mt-10">
            <button className="flex font-semibold text-sm text-blue-600">
              <svg className="fill-current mr-2 text-blue-600 w-4" viewBox="0 0 448 512">
                <path d="M134.059 296H432c8.837 0 16 7.163 16 16v16c0 8.837-7.163 16-16 16H134.059l49.636 49.373c6.286 6.25 6.317 16.378.059 22.667L160 452.687c-6.308 6.279-16.454 6.255-22.667-.059L5.373 320c-6.249-6.284-6.249-16.444 0-22.627l132-132.373c6.313-6.316 16.455-6.349 22.667-.059l23.655 23.314c6.259 6.288 6.228 16.416-.059 22.666L134.059 296z" />
              </svg>
              Return to Shop
            </button>
            <button className="bg-blue-500 font-semibold hover:bg-blue-600 py-3 text-sm text-white uppercase w-1/3 sm:w-1/5">
              Update Cart
            </button>
          </div>
        </div>

        <div id="summary" className="w-full lg:w-1/4 px-4 sm:px-8 py-10 bg-gray-100">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Subtotal</span>
            <span className="font-semibold text-sm">${subTotal}</span>
          </div>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Discount</span>
            <span className="font-semibold text-sm">${discount}</span>
          </div>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Tax</span>
            <span className="font-semibold text-sm">${tax}</span>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="bg-orange-500 font-semibold hover:bg-orange-600 py-3 text-sm text-white uppercase w-full">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

