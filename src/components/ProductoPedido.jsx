import React, { useState } from "react";

export const ProductoPedido = ({item, quantityBuynow}) => {

    const { thumbnail, quantity, title, priceWithDiscount } = item
    console.log(quantityBuynow)
    
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
          {quantityBuynow ? quantityBuynow : quantity} x <span className="text-primary">$ {priceWithDiscount} USD</span>
        </div>
      </div>
    </>
  );
};
