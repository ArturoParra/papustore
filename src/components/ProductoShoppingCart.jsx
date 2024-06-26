import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { useAuth } from './AuthProvider';

// Componente ProductoShoppingCart que recibe props: item, incrementQuantity, decrementQuantity, removeItem
export const ProductoShoppingCart = ({ item, incrementQuantity, decrementQuantity, removeItem }) => {
  // Asignar valores predeterminados si las propiedades están indefinidas
  const {id, title, thumbnail, quantity, priceWithDiscount, stock} = item;
  const { userEmail } = useAuth();
  const [flag, setflag] = useState(false)
  const [producto, setProducto] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/index.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            functionName: "updateCarrito",
            email: userEmail,
            quantity: quantity,
            id: id
          }),
        });

        if (!res.ok) {
          throw new Error("Error en la solicitud fetch");
        }

      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [quantity]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await fetch("/api/index.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              functionName: "consultaProductoIndividual",
              id: id,
              flag: flag,
            }),
          });

          if (!res.ok) {
            throw new Error("Error en la solicitud fetch");
          }

          const data = await res.json();
          // Actualizar el estado de productos con los datos obtenidos

          setProducto(data);
        } catch (error) {
          console.error("Error: ", error);
        }
      };

      fetchData();
    }
  }, [userEmail]);

  useEffect(() => {
    console.log(producto)
  }, [producto])
  

  useEffect(() => {
    if(quantity > producto.stock){
      decrementQuantity(id)
      Swal.fire({
        icon: "warning",
        title: `Cannot add more ${title}`,
        text: "There is not enough stock for this product",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [producto, quantity])
  

  return (
    // Contenedor principal con clases de Tailwind CSS para estilo y diseño responsivo
    <div className="flex flex-col sm:flex-row items-center sm:items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      
      {/* Sección de detalles del producto */}
      <div className="w-full sm:w-2/5 flex flex-col items-center sm:items-center">
        {/* Imagen del producto */}
        <div className="w-20 mb-4">
          <img className="h-24 object-cover" src={thumbnail} alt={title} />
        </div>
        
        {/* Información del producto */}
        <div className="flex flex-col justify-between flex-grow text-center">
          {/* Nombre del producto, limitado a 40 caracteres */}
          <span className="font-bold text-sm">
            {title}
          </span>
          {/* Botón para remover el producto del carrito */}
          <button
            className="font-semibold hover:text-red-500 text-gray-500 text-xs mt-2"
            onClick={() => removeItem(id)}
          >
            REMOVE
          </button>
        </div>
      </div>

      {/* Sección para ajustar la cantidad del producto */}
      <div className="flex justify-center w-full sm:w-1/4 mt-4 sm:mt-0">
        <button
          className="text-gray-600"
          onClick={() => decrementQuantity(id)}
        >
          -
        </button>
        <input
          className="mx-2 border text-center w-8"
          type="text"
          value={quantity}
          readOnly
        />
        <button
          className="text-gray-600"
          onClick={() => incrementQuantity(id)}
        >
          +
        </button>
      </div>

      {/* Precio unitario del producto */}
      <span className="text-center w-full sm:w-1/4 font-semibold text-lg mt-4 sm:mt-0">
        ${priceWithDiscount}
      </span>

      {/* Precio total del producto (precio unitario * cantidad) */}
      <span className="text-center w-full sm:w-1/4 font-semibold text-lg mt-4 sm:mt-0">
        ${(priceWithDiscount * quantity).toFixed(2)}
      </span>
    </div>
  );
};
