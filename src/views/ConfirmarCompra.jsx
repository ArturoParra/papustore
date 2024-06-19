import React, { useEffect, useState, useRef } from 'react';
import JustValidate from 'just-validate';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { ProductoPedido } from '../components/ProductoPedido';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

export const ConfirmarCompra = () => {
  const { userEmail } = useAuth();
  const [pedido, setPedido] = useState([]);
  const [subTotal, setsubTotal] = useState(0);
  const [papuCreditos, setPapuCreditos] = useState(20000); // Variable de estado para los PapuCreditos
  const navigate = useNavigate();
  const formRef = useRef(null);
  const validatorRef = useRef(null);

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
        setPedido(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [userEmail]);

  const pedidoTotal = () => {
    return pedido.reduce(
      (total, item) => total + (item.priceWithDiscount || 0) * item.quantity,
      0
    );
  };

  useEffect(() => {
    setsubTotal(pedidoTotal);
  }, [pedido]);

  useEffect(() => {
    if (!validatorRef.current) {
      validatorRef.current = new JustValidate(formRef.current, {
        validateBeforeSubmitting: true,
      });

      validatorRef.current
        .addField('#company-name', [
          {
            rule: 'required',
            errorMessage: 'El nombre de la empresa es obligatorio',
          },
        ])
        .addField('#address', [
          {
            rule: 'required',
            errorMessage: 'La dirección es obligatoria',
          },
        ])
        .addField('#country', [
          {
            rule: 'required',
            errorMessage: 'El país es obligatorio',
          },
        ])
        .addField('#region-state', [
          {
            rule: 'required',
            errorMessage: 'La región/estado es obligatorio',
          },
        ])
        .addField('#city', [
          {
            rule: 'required',
            errorMessage: 'La ciudad es obligatoria',
          },
        ])
        .addField('#zip-code', [
          {
            rule: 'required',
            errorMessage: 'El código postal es obligatorio',
          },
        ]);
    }
  }, []);

  const placeOrder = async (event) => {
    event.preventDefault();
    const isValid = await validatorRef.current.revalidate();

    if (!isValid) {
      return;
    }

    try {
      const res = await fetch("/api/index.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          functionName: "agregarCompra",
          email: userEmail,
          total: subTotal,
          pedido: pedido
        }),
      });

      const result = await res.json();

      if (result.success) {
        alert('Compra registrada con éxito');
      } else {
        alert('Error al registrar compra');
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setTimeout(() => {
      navigate('/tienda'); // Cambia '/nueva-ruta' por la ruta a la que deseas navegar
    }, 3000);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 p-8 flex flex-col lg:flex-row">
        <form ref={formRef} className="bg-white p-8 rounded-lg shadow-md w-full lg:w-2/3 mb-8 lg:mb-0 lg:mr-8" onSubmit={placeOrder}>
          <h2 className="text-2xl font-bold mb-6">Billing Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-gray-700">Company Name (Optional)</label>
              <input id="company-name" type="text" className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Company Name" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700">Address</label>
              <input id="address" type="text" className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Address" />
            </div>
            <div>
              <label className="block text-gray-700">Country</label>
              <input id="country" type="text" className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Country" />
            </div>
            <div>
              <label className="block text-gray-700">Region/State</label>
              <input id="region-state" type="text" className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Region/State" />
            </div>
            <div>
              <label className="block text-gray-700">City</label>
              <input id="city" type="text" className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="City" />
            </div>
            <div>
              <label className="block text-gray-700">Zip Code</label>
              <input id="zip-code" type="text" className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Zip Code" />
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">PapuCredits</h2>
            <div className="flex items-center text-lg text-gray-700">
              <FontAwesomeIcon icon={faDollarSign} className="mr-2 text-green-500" />
              <span className="font-bold">{papuCreditos.toLocaleString()}</span>
              <span className="ml-2 text-sm">USD</span>
            </div>
          </div>
          <button type="submit" className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            PLACE ORDER
          </button>
        </form>
        <div className="bg-white p-8 rounded-lg shadow-md w-full lg:w-1/3">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="mb-4">
            {pedido.map((item) => (
              <ProductoPedido key={item.id} item={item} />
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <div>Sub-total</div>
              <div>$ {subTotal} USD</div>
            </div>
            <div className="flex justify-between mb-2">
              <div>Shipping</div>
              <div>Free</div>
            </div>
            <div className="flex justify-between mb-2">
              <div>Discount</div>
              <div>$24</div>
            </div>
            <div className="flex justify-between mb-2">
              <div>Tax</div>
              <div>$61.99</div>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <div>Total</div>
              <div>$ {subTotal} USD</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
