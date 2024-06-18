import React from 'react';  // Importa React, necesario para crear componentes
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Importa FontAwesomeIcon para usar íconos
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';  // Importa el ícono de carrito de compras de FontAwesome
import { useAuth } from './AuthProvider';  // Importa el componente useAuth desde './AuthProvider'
import { useEffect } from 'react';  // Importa useEffect desde la biblioteca 'react'

// Componente ProductoWishlist que recibe una prop 'product'
export const ProductoWishlist = ({ item, removeItem }) => {

  const {id, price, priceWithDiscount,stock,thumbnail,title} = item;
  
  // Extraer el email del usuario autenticado
  const { userEmail, isAuthenticated } = useAuth();  // Obtener el email del usuario desde el contexto de autenticación
  const IconoCarrito = <FontAwesomeIcon icon={faShoppingCart} />;  // Define el ícono del carrito de compras


  // Insertar producto en el carrito
  const addToCart = async () => {
    if(isAuthenticated){
      try {
        const response = await fetch('/api/index.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ functionName: 'insertarCarrito', email: userEmail, product_id: id, quantity: 1 }),
        });
        const result = await response.json();
        if (result.success) {
          alert('Producto añadido al carrito');
        } else {
          alert('Error al añadir el producto al carrito');
        }
      } catch (error) {
        console.error('Error al añadir el producto al carrito:', error);
      }
    }else{
      alert("Log in to add to cart")
    }
  };


  return (
    // Contenedor principal con clases de Tailwind CSS para el estilo y diseño responsivo
    <div className="flex flex-col md:flex-row items-start md:items-start md:space-x-4 border-t py-4">
      {/* Sección de detalles del producto */}
      <div className="w-full md:w-3/4 flex-shrink-0 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
        {/* Imagen del producto */}
        <img src={thumbnail} alt={title} className="w-16 h-16 md:w-20 md:h-20" />
        <div className="flex-1">
          {/* Nombre del producto, limitado a 40 caracteres */}
          <span className="block font-semibold text-lg md:text-xl">
            {title}
          </span>
          {/* Sección de precios */}
          <div className="mt-2">
            <span className="text-gray-500 line-through text-sm">
              ${price}
            </span>
            <span className="block text-base font-bold">${priceWithDiscount}</span>
          </div>
          {/* Disponibilidad del producto */}
          <div className="text-left mt-2 mb-4">
            <span className={`px-2 py-1 text-xs font-semibold rounded ${
              stock === 0 ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            }`}>
              {stock === 0 ? 'Out of Stock' : `In Stock`}
            </span>
          </div>
        </div>
      </div>
      {/* Sección de acciones (agregar al carrito y eliminar) */}
      <div className="w-full md:w-1/4 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-2">
          {/* Botón para agregar al carrito */}
          <button
            className={`flex items-center ${stock > 0 ? 'bg-orange-500 hover:bg-orange-600' : 'bg-red-500'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${stock === 0 ? 'opacity-75 cursor-not-allowed' : ''}`}
            onClick={() => {
              if (stock > 0)
              {
                addToCart(id);
              } else {
                alert('Producto no disponible');
              }
            }}
          >
            ADD TO CART {IconoCarrito}
          </button>
          {/* Botón para eliminar el producto de la wishlist */}
          <button className="text-gray-600" onClick={() => removeItem(id)}>✖</button>
        </div>
      </div>
    </div>
  );
};
