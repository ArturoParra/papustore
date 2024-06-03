import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const ProductView = () => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/401',
    'https://via.placeholder.com/402',
    'https://via.placeholder.com/403',
    'https://via.placeholder.com/404'
  ];

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-4xl">
          <div className="flex flex-wrap md:flex-nowrap">
            <div className="w-full md:w-1/2">
              <div className="relative mb-4 flex items-center justify-center">
                <button
                  className="absolute left-0 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                  onClick={handlePreviousImage}
                >
                  <span className="sr-only">Previous</span>
                  &lt;
                </button>
                <img
                  src={images[currentImageIndex]}
                  alt="Product"
                  className="w-full h-auto"
                />
                <button
                  className="absolute right-0 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                  onClick={handleNextImage}
                >
                  <span className="sr-only">Next</span>
                  &gt;
                </button>
              </div>
              <div className="flex justify-center space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-20 h-20 border ${currentImageIndex === index ? 'border-orange-500' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8">
              <h1 className="text-2xl font-bold">2020 Apple MacBook Pro with Apple M1 Chip</h1>
              <p className="text-gray-600">13 inches, 8GB RAM, 256GB SSD - Space Gray</p>
              <div className="flex items-center my-4">
                <div className="flex items-center text-orange-500">
                  <span className="mr-2">4.7 Rating</span>
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">$1699 <span className="text-gray-500 line-through">$1999.00</span></div>
              <div className="text-green-500 font-bold mb-2">21% OFF</div>
              <div className="mb-4">
                <span className="text-gray-600">AVAILABILITY:</span> <span className="text-green-500">IN STOCK</span>
              </div>
              <div className="mb-4">
                <span className="text-gray-600">CATEGORY:</span> <span className="text-gray-900">Electronic Devices</span>
              </div>
              <div className="flex items-center mb-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
                >
                  -
                </button>
                <span className="mx-4">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
                >
                  +
                </button>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  ADD TO CART
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  BUY NOW
                </button>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <button className="text-gray-600">ADD TO WISHLIST</button>
              </div>
            </div>
          </div>
          {/* Additional Section */}
          <div className="mt-8">
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2">
                <h3 className="text-lg font-bold mb-2">Description</h3>
                <p className="text-gray-600">
                  The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max, the first Apple silicon designed for professionals, you get groundbreaking performance and amazing battery life. Add to that a stunning Liquid Retina XDR display, the best camera and audio ever in a Mac notebook, and all the ports you need. The first notebook of its kind, this MacBook Pro is a beast. The M1 Pro takes the exceptional performance of the M1 architecture to a new level for pro users.
                </p>
                <p className="text-gray-600">
                  Even the most ambitious projects are easily handled with up to 10 CPU cores, up to 16 GPU cores, a 16-core Neural Engine, and dedicated encode and decode media engines that support H.264, HEVC, and ProRes codecs.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Features</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Free 1-year warranty</li>
                  <li>Free fast shipping and delivery</li>
                  <li>100% money-back guarantee</li>
                  <li>24/7 customer support</li>
                  <li>Secure payment method</li>
                </ul>
                <h3 className="text-lg font-bold mt-4 mb-2">Shipping Information</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Courier: 2-4 days, free shipping</li>
                  <li>Local Shipping: up to a week, $19.00</li>
                  <li>UPS Ground Shipping: 4-6 days, $29.00</li>
                  <li>Unishop Global Export: 3-4 days, $39.00</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
