import React from 'react';

const ProductoShoppingCart = ({ item, incrementQuantity, decrementQuantity, removeItem }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="w-full sm:w-2/5 flex flex-col items-center sm:items-start">
        <div className="w-20 mb-4">
          <img className="h-24 object-cover" src="https://via.placeholder.com/50" alt={item.name} />
        </div>
        <div className="flex flex-col justify-between flex-grow text-center sm:text-left">
          <span className="font-bold text-sm">{item.name.length > 40 ? `${item.name.substring(0, 40)}...` : item.name}</span>
          {item.originalPrice && (
            <span className="text-red-500 text-xs line-through">${item.originalPrice}</span>
          )}
          <button
            className="font-semibold hover:text-red-500 text-gray-500 text-xs mt-2"
            onClick={() => removeItem(item.id)}
          >
            REMOVE
          </button>
        </div>
      </div>
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
      <span className="text-center w-full sm:w-1/4 font-semibold text-lg mt-4 sm:mt-0">
        ${item.price}
      </span>
      <span className="text-center w-full sm:w-1/4 font-semibold text-lg mt-4 sm:mt-0">
        ${item.price * item.quantity}
      </span>
    </div>
  );
};

export default ProductoShoppingCart;
