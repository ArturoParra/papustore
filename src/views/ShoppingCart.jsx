import React, { useState } from 'react'; // Importa React y el hook useState
import { Header } from '../components/Header'; // Importa el componente Header
import { Footer } from '../components/Footer'; // Importa el componente Footer
import { ProductoShoppingCart } from '../components/ProductoShoppingCart'; // Importa el componente ProductoShoppingCart

// Componente ShoppingCart
export const ShoppingCart = () => {
  // Estado inicial del carrito de compras, con un producto como ejemplo
  const [cart, setCart] = useState([
    { id: 1, name: '4K UHD LED Smart TV with Chromecast Built-in', price: 70, originalPrice: 99, quantity: 1, image: 'tv' },
  ]);

  // Función para incrementar la cantidad de un producto en el carrito
  const incrementQuantity = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  // Función para decrementar la cantidad de un producto en el carrito
  const decrementQuantity = (id) => {
    setCart(cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  // Función para remover un producto del carrito
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Función para calcular el total del carrito
  const cartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Cálculo del subtotal del carrito
  const subTotal = cartTotal();
  const discount = 24; // Descuento fijo
  const tax = 61.99; // Impuesto fijo
  const total = subTotal - discount + tax; // Cálculo del total con descuento e impuestos

  return (
    <>
      <Header /> {/* Renderiza el componente Header */}
      <div className="container mx-auto mt-10 p-4 sm:p-8">
        <div className="flex flex-col lg:flex-row shadow-md my-10">
          <div className="w-full lg:w-3/4 bg-white px-4 sm:px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">SHOPPING CART</h1> {/* Título del carrito */}
            </div>
            <div className="hidden sm:flex mt-10 mb-5">
              {/* Encabezados de las columnas en la vista de escritorio */}
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">PRODUCT DETAILS</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">QUANTITY</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">PRICE</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">TOTAL</h3>
            </div>
            {/* Renderiza los productos en el carrito */}
            {cart.map((item) => (
              <ProductoShoppingCart
                key={item.id}
                item={item}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                removeItem={removeItem}
              />
            ))}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-10 space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="flex font-semibold text-sm text-blue-600 items-center sm:justify-start w-full sm:w-auto">
                <svg className="fill-current mr-2 text-blue-600 w-4" viewBox="0 0 448 512">
                  <path d="M134.059 296H432c8.837 0 16 7.163 16 16v16c0 8.837-7.163 16-16 16H134.059l49.636 49.373c6.286 6.25 6.317 16.378.059 22.667L160 452.687c-6.308 6.279-16.454 6.255-22.667-.059L5.373 320c-6.249-6.284-6.249-16.444 0-22.627l132-132.373c6.313-6.316 16.455-6.349 22.667-.059l23.655 23.314c6.259 6.288 6.228 16.416-.059 22.666L134.059 296z" />
                </svg>
                CONTINUE SHOPPING {/* Botón para continuar comprando */}
              </button>
              <button className="bg-blue-500 font-semibold hover:bg-blue-600 py-3 text-sm text-white uppercase w-full sm:w-auto px-4">
                UPDATE CART {/* Botón para actualizar el carrito */}
              </button>
            </div>
          </div>

          <div id="summary" className="w-full lg:w-1/4 px-4 sm:px-8 py-10 bg-gray-100 mt-10 lg:mt-0">
            <h1 className="font-semibold text-2xl border-b pb-8">ORDER SUMMARY</h1> {/* Título del resumen de la orden */}
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">SUBTOTAL</span>
              <span className="font-semibold text-sm">${subTotal}</span> {/* Muestra el subtotal */}
            </div>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">DISCOUNT</span>
              <span className="font-semibold text-sm">${discount}</span> {/* Muestra el descuento */}
            </div>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">TAX</span>
              <span className="font-semibold text-sm">${tax}</span> {/* Muestra los impuestos */}
            </div>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>TOTAL</span>
                <span>${total.toFixed(2)}</span> {/* Muestra el total */}
              </div>
              <button className="bg-orange-500 font-semibold hover:bg-orange-600 py-3 text-sm text-white uppercase w-full">
                CHECKOUT {/* Botón para proceder al pago */}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* Renderiza el componente Footer */}
    </>
  );
};
