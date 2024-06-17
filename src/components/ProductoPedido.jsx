import React, { useState } from "react";

export const ProductoPedido = ({item}) => {

    const {thumbnail, quantity, title, price} = item
    
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <img
          src={thumbnail}
          alt="Product"
          className="w-16 h-16 object-cover"
        />
        <div className="flex-1 ml-4">
          {title}
        </div>
        <div>
          {quantity} x <span className="text-primary">$ {price} USD</span>
        </div>
      </div>
    </>
  );
};