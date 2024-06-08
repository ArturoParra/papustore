import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export const ProductoWishlist = ({ product }) => {
  const IconoCarrito = <FontAwesomeIcon icon={faShoppingCart} />;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-start md:space-x-4 border-t py-4">
      <div className="w-full md:w-3/4 flex-shrink-0 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
        <img src={product.imageUrl} alt={product.name} className="w-16 h-16 md:w-20 md:h-20" />
        <div className="flex-1">
          <span className="block font-semibold text-lg md:text-xl">
            {product.name.length > 40 ? `${product.name.substring(0, 40)}...` : product.name}
          </span>
          <div className="mt-2">
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">${product.originalPrice}</span>
            )}
            <span className="block text-base font-bold">${product.price}</span>
          </div>
          <div className="text-left mt-2 mb-4">
            <span className={product.stock === 'IN STOCK' ? 'text-green-500' : 'text-red-500'}>
              {product.stock}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-2">
          <button
            className={`flex items-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              product.stock === 'OUT OF STOCK' ? 'bg-gray-500 cursor-not-allowed' : ''
            }`}
            disabled={product.stock === 'OUT OF STOCK'}
          >
            ADD TO CART {IconoCarrito}
          </button>
          <button className="text-gray-600">✖</button>
        </div>
      </div>
    </div>
  );
};
