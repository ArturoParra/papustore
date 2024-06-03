import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export const Wishlist = () => {
  const IconoLupa = <FontAwesomeIcon icon={faSearch} />;
  const IconoCarrito = <FontAwesomeIcon icon={faShoppingCart} />;

  const products = [
    {
      name: 'Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black',
      price: 999,
      originalPrice: 1299,
      stock: 'IN STOCK',
      imageUrl: 'https://via.placeholder.com/50',
    },
    {
      name: 'Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone',
      price: 2300,
      originalPrice: null,
      stock: 'IN STOCK',
      imageUrl: 'https://via.placeholder.com/50',
    },
    {
      name: 'Portable Washing Machine, 11lbs capacity Model 18NMF1AM',
      price: 70,
      originalPrice: null,
      stock: 'IN STOCK',
      imageUrl: 'https://via.placeholder.com/50',
    },
    {
      name: 'TOZO T6 True Wireless Earbuds Bluetooth Headphones Touch Control with Wireless Charging Case IPX8 Waterproof Stereo Earphones in-Ear',
      price: 220,
      originalPrice: 250,
      stock: 'OUT OF STOCK',
      imageUrl: 'https://via.placeholder.com/50',
    },
    {
      name: 'Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart Home Camera with Color Night Vision, 2-Way Audio',
      price: 1499.99,
      originalPrice: null,
      stock: 'IN STOCK',
      imageUrl: 'https://via.placeholder.com/50',
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-5xl">
          <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-4">PRODUCTS</th>
                  <th className="py-2 px-4 text-center">PRICE</th>
                  <th className="py-2 px-4 text-center">STOCK</th>
                  <th className="py-2 px-4 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4 flex items-start space-x-4">
                      <img src={product.imageUrl} alt={product.name} className="w-16 h-16" />
                      <div>
                        <span className="block font-semibold">{product.name.length > 40 ? `${product.name.substring(0, 40)}...` : product.name}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <div className="flex flex-col items-center">
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">${product.originalPrice}</span>
                        )}
                        <span className="text-base">${product.price}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <span className={product.stock === 'IN STOCK' ? 'text-green-500' : 'text-red-500'}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-2 px-4 flex flex-col space-y-2 items-center">
                      <button
                        className={`flex items-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                          product.stock === 'OUT OF STOCK' ? 'bg-gray-500 cursor-not-allowed' : ''
                        }`}
                        disabled={product.stock === 'OUT OF STOCK'}
                      >
                        ADD TO CART {IconoCarrito}
                      </button>
                      <button className="text-gray-600">✖</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
