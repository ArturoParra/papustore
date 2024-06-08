import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ProductoWishlist } from '../components/ProductoWishlist';

export const Wishlist = () => {
  const IconoLupa = <FontAwesomeIcon icon={faSearch} />;
  const IconoCarrito = <FontAwesomeIcon icon={faShoppingCart} />;

  const product = {
    name: 'Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black',
    price: 999,
    originalPrice: 1299,
    stock: 'IN STOCK',
    imageUrl: 'https://via.placeholder.com/50',
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-5xl">
          <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
          <div className="overflow-x-auto">
            <ProductoWishlist product={product} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
