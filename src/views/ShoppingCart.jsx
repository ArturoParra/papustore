import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductoShoppingCart } from '../components/ProductoShoppingCart';
import { useAuth } from '../components/AuthProvider';

export const ShoppingCart = () => {
  const { userEmail } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('/api/index.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ functionName: 'getCartItems'}),
        });
        const result = await response.json();
        if (result.success) {
          setCart(result.cartItems);
        } else {
          console.error('Error al obtener los productos del carrito:', result.message);
        }
      } catch (error) {
        console.error('Error en la consulta:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userEmail]);

  const incrementQuantity = (id) => {
    setCart(cart.map(item => item.product_id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decrementQuantity = (id) => {
    setCart(cart.map(item => item.product_id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.product_id !== id));
  };

  const cartTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  };

  const subTotal = cartTotal();
  const discount = 24;
  const tax = 61.99;
  const total = subTotal - discount + tax;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto mt-10 p-4 sm:p-8">
        <div className="flex flex-col lg:flex-row shadow-md my-10">
          <div className="w-full lg:w-3/4 bg-white px-4 sm:px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">SHOPPING CART</h1>
            </div>
            <div className="hidden sm:flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">PRODUCT DETAILS</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">QUANTITY</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">PRICE</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4">TOTAL</h3>
            </div>
            {cart.map((item) => (
              <ProductoShoppingCart
                key={item.product_id}
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
                CONTINUE SHOPPING
              </button>
              <button className="bg-blue-500 font-semibold hover:bg-blue-600 py-3 text-sm text-white uppercase w-full sm:w-auto px-4">
                UPDATE CART
              </button>
            </div>
          </div>

          <div id="summary" className="w-full lg:w-1/4 px-4 sm:px-8 py-10 bg-gray-100 mt-10 lg:mt-0">
            <h1 className="font-semibold text-2xl border-b pb-8">ORDER SUMMARY</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">SUBTOTAL</span>
              <span className="font-semibold text-sm">${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">DISCOUNT</span>
              <span className="font-semibold text-sm">${discount}</span>
            </div>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">TAX</span>
              <span className="font-semibold text-sm">${tax}</span>
            </div>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>TOTAL</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="bg-orange-500 font-semibold hover:bg-orange-600 py-3 text-sm text-white uppercase w-full">
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
