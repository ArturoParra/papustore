import React from "react";  // Importa la librería React
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";  // Importa el componente FontAwesomeIcon para usar íconos
import { fas } from "@fortawesome/free-solid-svg-icons";  // Importa los íconos sólidos de FontAwesome
import { Link } from "react-router-dom";  // Importa el componente Link de React Router para la navegación

// Componente Producto que recibe el prop 'producto'
export const Producto = ({producto}) => {
  // Define íconos usando FontAwesome
  const IconoAddCart = <FontAwesomeIcon icon={fas.faCartPlus} />
  const IconoCorazon = <FontAwesomeIcon icon={fas.faHeart}/>

  // Desestructura propiedades del objeto 'producto'
  const {id, title, price, discountPercentage, rating, thumbnail} = producto

  // Función para calcular el precio con descuento
  const CalcularPrecio = (price, discountPercentage) => {
    const newPrice = price - (price * (discountPercentage / 100))
    return parseFloat(newPrice.toFixed(2))  // Redondea a 2 decimales
  };

  // TODO: Cambiar la lógica del producto, esto tiene que venir la de BD
  const realPrice = CalcularPrecio(price, discountPercentage)

  // Crear un nuevo objeto de producto con el precio real calculado
  const productoActualizado = {...producto, realPrice}

  return (
    <>
      <div className="border border-slate-200 rounded-md p-3 shadow-md max-h-fit content-end justify-items-stretch">
        <Link to="/producto" state={productoActualizado}>
          <img className="object-cover mx-auto my-auto" src={thumbnail} alt="imagen producto" />
        </Link>

        <div className="pt-2">
          <Link to="/producto" state={producto}>
            <h3 className="text-black text-lg font-semibold uppercase">{title}</h3>
          </Link>
          <p className="text-green-600 text-l font-bold">%{discountPercentage} OFF</p>
          <p className="font-black text-slate-500 text-base line-through">$ {price} USD</p>
          <p className="font-black text-primary text-xl">$ {CalcularPrecio(price, discountPercentage)} USD</p>
          <div className="my-2">
          {/*Botón para agregar al carrito con ícono*/}
             <button
              type="button"
              className="bg-primary hover:bg-orange-700 transition duration-300 ease-in-out rounded-md p-2 mx-2 text-white "
            >
              {IconoAddCart}
            </button>
            {/*Botón para marcar como favorito con ícono*/}
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
