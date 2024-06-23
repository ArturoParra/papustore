import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductoShoppingCart } from "../components/ProductoShoppingCart";
import { useAuth } from "../components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export const ShoppingCart = () => {
  const navigate = useNavigate();
  const { userEmail } = useAuth();
  const [cart, setCart] = useState([]);

  const IconoFlecha = <FontAwesomeIcon icon={fas.faArrowLeft} />;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/index.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            functionName: "consultaCarrito",
            email: userEmail,
          }),
        });

        if (!res.ok) {
          throw new Error("Error en la solicitud fetch");
        }

        const data = await res.json();
        // Actualizar el estado de productos con los datos obtenidos

        setCart(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [userEmail]);

  const incrementQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const removeItem = async (id) => {
    try {
      const res = await fetch("/api/index.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          functionName: "eliminarProductoCarrito",
          email: userEmail,
          product_id: id,
        }),
      });

      if (!res.ok) {
        throw new Error("Error en la solicitud fetch");
      }

      // Actualizar el estado del carrito eliminando el producto
      setCart(cart.filter((item) => item.id !== id));
      console.log("Producto eliminado del carrito:", id);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cartTotal = () => {
    return cart.reduce(
      (total, item) => total + (item.priceWithDiscount || 0) * item.quantity,
      0
    );
  };

  const handleCheckoutNav = () => {
    if (cart.length > 0) {
      navigate("/pedido");
    } else {
      Swal.fire({
        icon: "warning",
        title: "Cannot proceed to checkout",
        text: "Add some products to your shopping cart first",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  const total = cartTotal();

  return (
    <>
      <Header />
      <div className="container mx-auto mt-10 p-4 sm:p-8">
        <div className="flex flex-col lg:flex-row shadow-md my-10">
          <div className="w-full lg:w-3/4 bg-white px-4 sm:px-10 py-10">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-5 space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/tienda">
                <button className="flex font-semibold text-sm text-black items-center sm:justify-start w-full sm:w-auto">
                  <span>{IconoFlecha} BACK TO SHOP</span>
                </button>
              </Link>
            </div>
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">SHOPPING CART</h1>
            </div>
            {cart.length == 0 ? (
              <p className="font-bold text-3xl mt-10 text-center">
                There are no products in your cart{" "}
              </p>
            ) : (
              <div className="hidden sm:flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  PRODUCT DETAILS
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">
                  QUANTITY
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">
                  PRICE
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">
                  TOTAL
                </h3>
              </div>
            )}
            {cart.map((item) => (
              <ProductoShoppingCart
                key={item.id}
                item={item}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>

          <div
            id="summary"
            className="w-full lg:w-1/4 px-4 sm:px-8 py-10 bg-gray-100 mt-10 lg:mt-0"
          >
            <h1 className="font-semibold text-2xl">Cart Summary</h1>
            <div className="mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>TOTAL</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckoutNav}
                className="bg-orange-500 font-semibold hover:bg-orange-600 py-3 text-sm text-white uppercase w-full"
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
