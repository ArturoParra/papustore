import React from 'react'; // Importa React desde la biblioteca 'react'
import { Header } from '../components/Header'; // Importa el componente Header desde '../components/Header'
import { Footer } from '../components/Footer'; // Importa el componente Footer desde '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa el componente FontAwesomeIcon desde '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Importa los iconos faSearch y faShoppingCart desde '@fortawesome/free-solid-svg-icons'
import { ProductoWishlist } from '../components/ProductoWishlist'; // Importa el componente ProductoWishlist desde '../components/ProductoWishlist'

export const Wishlist = () => {
  
  // Define un producto de ejemplo
  const product = {
    name: 'Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black',
    price: 999,
    originalPrice: 1299,
    stock: 'IN STOCK',
    imageUrl: 'https://via.placeholder.com/50',
  };

  return (
    <>
      <Header /> {/* Renderiza el componente Header */}
      {/* Contenedor principal */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        {/* Contenedor del contenido de la lista de deseos */}
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-5xl">
          <h1 className="text-2xl font-bold mb-4">Wishlist</h1> {/* Título de la lista de deseos */}
          <div className="overflow-x-auto">
            <ProductoWishlist product={product} /> {/* Renderiza el componente ProductoWishlist con el producto dado */}
          </div>
        </div>
      </div>
      <Footer /> {/* Renderiza el componente Footer */}
    </>
  );
};
