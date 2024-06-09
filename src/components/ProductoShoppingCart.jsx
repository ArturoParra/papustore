import React from 'react';

// Componente ProductoShoppingCart que recibe props: item, incrementQuantity, decrementQuantity, removeItem
export const ProductoShoppingCart = ({ item, incrementQuantity, decrementQuantity, removeItem }) => {
  return (
    // Contenedor principal con clases de Tailwind CSS para estilo y diseño responsivo
    <div className="flex flex-col sm:flex-row items-center sm:items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      
      {/* Sección de detalles del producto */}
      <div className="w-full sm:w-2/5 flex flex-col items-center sm:items-start">
        {/* Imagen del producto */}
        <div className="w-20 mb-4">
          <img className="h-24 object-cover" src="https://via.placeholder.com/50" alt={item.name} />
        </div>
        
        {/* Información del producto */}
        <div className="flex flex-col justify-between flex-grow text-center sm:text-left">
          {/* Nombre del producto, limitado a 40 caracteres */}
          <span className="font-bold text-sm">
            {item.name.length > 40 ? `${item.name.substring(0, 40)}...` : item.name}
          </span>
          {/* Precio original si existe, mostrado tachado */}
          {item.originalPrice && (
            <span className="text-red-500 text-xs line-through">
              ${item.originalPrice}
            </span>
          )}
          {/* Botón para remover el producto del carrito */}
          <button
            className="font-semibold hover:text-red-500 text-gray-500 text-xs mt-2"
            onClick={() => removeItem(item.id)}
          >
            REMOVE
          </button>
        </div>
      </div>

      {/* Sección para ajustar la cantidad del producto */}
      <div className="flex justify-center w-full sm:w-1/4 mt-4 sm:mt-0">
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

      {/* Precio unitario del producto */}
      <span className="text-center w-full sm:w-1/4 font-semibold text-lg mt-4 sm:mt-0">
        ${item.price}
      </span>

      {/* Precio total del producto (precio unitario * cantidad) */}
      <span className="text-center w-full sm:w-1/4 font-semibold text-lg mt-4 sm:mt-0">
        ${item.price * item.quantity}
      </span>
    </div>
  );
};

