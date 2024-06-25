import React from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import { useState } from "react";

export const Producto = ({ producto }) => {
  const { userEmail, isAuthenticated } = useAuth(); // Obtener el email del usuario desde el contexto de autenticación
  const [isInWishlist, setIsInWishlist] = useState(false); // Estado para verificar si el producto ya está en la wishlist

  const IconoAddCart = <FontAwesomeIcon icon={fas.faCartPlus} />;
  const IconoCorazon = <FontAwesomeIcon icon={fas.faHeart} />;

  const {
    id,
    title,
    price,
    priceWithDiscount,
    discountPercentage,
    rating,
    thumbnail,
    stock,
  } = producto;

  const addToCart = async () => {
    if (isAuthenticated) {
      if(stock > 0){
        try {
          const response = await fetch("/api/index.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              functionName: "insertarCarrito",
              email: userEmail,
              product_id: id,
              quantity: 1,
            }),
          });
          const result = await response.json();
          if (result.success) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              toast: "true",
              title: "Product added to cart",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              toast: "true",
              title: "Product cannot be added to cart",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {
          console.error("Error al añadir el producto al carrito:", error);
        }
      }else{
        Swal.fire({
          icon: "warning",
          title: "Cannot add to cart",
          text: "This product is out of stock",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Cannot add to cart",
        text: "Please log in into your account to add products to your shopping cart",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  // Función para añadir un producto a la lista de deseos
  const addToWishlist = async () => {
    if (isAuthenticated) {
      try {
        // Verificar si el producto ya está en la wishlist
        const responseCheck = await fetch("/api/index.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            functionName: "verificarProductoWishlist",
            email: userEmail,
            product_id: id,
          }),
        });
        const resultCheck = await responseCheck.json();

        if (resultCheck) {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            toast: "true",
            title: "This product is already in your wishlist",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          // Si no existe, procede a insertarlo
          const responseInsert = await fetch("/api/index.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              functionName: "insertarWishlist",
              email: userEmail,
              product_id: id,
            }),
          });
          const resultInsert = await responseInsert.json();

          if (resultInsert.success) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              toast: "true",
              title: "Product added to wishlist",
              showConfirmButton: false,
              timer: 1500,
            });
            setIsInWishlist(true); // Actualiza el estado para reflejar que el producto está ahora en la wishlist
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              toast: "true",
              title: "Product couldn't be added to wishlist",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      } catch (error) {
        console.error(
          "Error al añadir el producto a la lista de deseos:",
          error
        );
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Cannot add to wishlist",
        text: "Please log in into your account to add products to your wishlist",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <>
      <div className="border border-slate-200 rounded-md p-3 shadow-md max-h-fit content-end justify-items-stretch bg-white">
        <Link to={{ pathname: `/producto/${id}` }}>
          <img
            className="object-cover mx-auto my-auto"
            src={thumbnail}
            alt="imagen producto"
          />
        </Link>

        <div className="pt-2">
          <Link to={{ pathname: `/producto/${id}` }}>
            <h3 className="text-black text-lg font-semibold uppercase">
              {title}
            </h3>
          </Link>
          <p className="text-green-600 text-l font-bold">
            %{discountPercentage} OFF
          </p>
          <p className="font-black text-slate-500 text-base line-through">
            $ {price} USD
          </p>
          <p className="font-black text-primary text-xl">
            $ {priceWithDiscount} USD
          </p>
          <div className="my-2">
            <button
              type="button"
              className={`${
                stock == 0
                  ? "bg-red-500"
                  : "bg-primary hover:bg-orange-700"
              } transition duration-300 ease-in-out rounded-md p-2 mx-2 text-white `}
              onClick={addToCart}
            >
              {IconoAddCart}
            </button>
            <button
              type="button"
              className="bg-primary hover:bg-orange-700 transition duration-300 ease-in-out rounded-md p-2 mx-2 text-white "
              onClick={addToWishlist}
            >
              {IconoCorazon}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
