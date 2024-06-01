import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export const Producto = ({producto}) => {
  const IconoAddCart = <FontAwesomeIcon icon={fas.faCartPlus} />
  const IconoCorazon = <FontAwesomeIcon icon={fas.faHeart}/>
  const {id,title,price,discountPercentage,rating,thumbnail} = producto

  const CalcularPrecio = (price, discountPercentage) => {
    const newPrice = price - (price * (discountPercentage / 100))
    return parseFloat(newPrice.toFixed(2))
};


  return (
    <>
      <div className="border border-slate-200 rounded-md p-3 shadow-md ">
        <img className="object-cover" src={thumbnail} alt="imagen guitarra" />

        <div className="w-2/3">
          <h3 className="text-black text-lg font-semibold uppercase">{title}</h3>
          <p className="text-green-600 text-l font-bold">%{discountPercentage} OFF</p>
          <p className="font-black text-slate-500 text-base line-through">$ {price}</p>
          <p className="font-black text-primary text-xl">$ {CalcularPrecio(price,discountPercentage)}</p>
          <div className="my-2">
            <button
              type="button"
              className="bg-primary hover:bg-orange-700 transition duration-300 ease-in-out rounded-md p-2 mx-2 text-white "
            >
              {IconoAddCart}
            </button>
            <button
              type="button"
              className="bg-primary hover:bg-orange-700 transition duration-300 ease-in-out rounded-md p-2 mx-2 text-white "
            >
              {IconoCorazon}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
