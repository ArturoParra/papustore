import React from "react";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";  
import { fas } from "@fortawesome/free-solid-svg-icons";  
import { Link } from "react-router-dom";  
import { useAuth } from '../components/AuthProvider';  // Asegúrate de ajustar la ruta

export const Producto = ({producto}) => {
  const { userEmail } = useAuth();  // Obtener el email del usuario desde el contexto de autenticación

  const IconoAddCart = <FontAwesomeIcon icon={fas.faCartPlus} />
  const IconoCorazon = <FontAwesomeIcon icon={fas.faHeart}/>

  const {id, title, price, priceWithDiscount, discountPercentage, rating, thumbnail} = producto

  const addToCart = async () => {
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
  };

  return (
    <>
      <div className="border border-slate-200 rounded-md p-3 shadow-md max-h-fit content-end justify-items-stretch">
        <Link to={{ pathname: `/producto/${id}` }}>
          <img className="object-cover mx-auto my-auto" src={thumbnail} alt="imagen producto" />
        </Link>

        <div className="pt-2">
        <Link to={{ pathname: `/producto/${id}` }}>
          <h3 className="text-black text-lg font-semibold uppercase">{title}</h3>
        </Link>
          <p className="text-green-600 text-l font-bold">%{discountPercentage} OFF</p>
          <p className="font-black text-slate-500 text-base line-through">$ {price} USD</p>
          <p className="font-black text-primary text-xl">$ {priceWithDiscount} USD</p>
          <div className="my-2">
            <button
              type="button"
              className="bg-primary hover:bg-orange-700 transition duration-300 ease-in-out rounded-md p-2 mx-2 text-white "
              onClick={addToCart}
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
