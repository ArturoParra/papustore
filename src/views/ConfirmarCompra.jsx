import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useAuth } from "../components/AuthProvider";
import { ProductoPedido } from "../components/ProductoPedido";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const ConfirmarCompra = () => {
  const { userEmail } = useAuth();
  const [pedido, setPedido] = useState([]);
  const [subTotal, setsubTotal] = useState(0);
  const [userdata, setuserdata] = useState([]);
  const [flag, setFlag] = useState(true); // Bandera para la consulta de producto individual
  const [precio, setprecio] = useState(0);

  const { id, quantity } = useParams();

  const [papuCreditos, setPapuCreditos] = useState(0); // Variable de estado para los PapuCreditos
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const formRef = useRef(null); // Ref for the form

  const navigate = useNavigate();

  const IconoFlecha = <FontAwesomeIcon icon={fas.faArrowLeft}/>

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

          setPedido(data);
          setprecio(data[0].priceWithDiscount);
        } catch (error) {
          console.error("Error: ", error);
        }
      };

      fetchData();
    }
  }, [userEmail]);

  useEffect(() => {
    if (!id) {
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

          setPedido(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();
    }
  }, [userEmail]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/index.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            functionName: "consultaUsuarioData",
            email: userEmail,
          }),
        });

        if (!res.ok) {
          throw new Error("Error en la solicitud fetch");
        }

        const data = await res.json();
        // Actualizar el estado de productos con los datos obtenidos

        setuserdata(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const { papu_credits, country, state, zip, company, address, city } =
      userdata;
    setPapuCreditos(papu_credits);
    setCountry(country);
    setState(state);
    setZip(zip);
    setCompany(company);
    setAddress(address);
    setCity(city);
  }, [userdata]);

  const pedidoTotal = () => {
    const total = id
      ? precio * quantity
      : pedido.reduce(
          (total, item) =>
            total + (item.priceWithDiscount || 0) * item.quantity,
          0
        );
    return total;
  };

  useEffect(() => {
    setsubTotal(pedidoTotal());
    console.log(pedido);
  }, [pedido]);

  const placeOrder = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const addressInput = document.getElementById("address");
    const countryInput = document.getElementById("country");
    const stateInput = document.getElementById("state");
    const cityInput = document.getElementById("city");
    const zipInput = document.getElementById("zip");

    if (
      !addressInput.value ||
      !countryInput.value ||
      !stateInput.value ||
      !cityInput.value ||
      !zipInput.value
    ) {
      Swal.fire({
        icon: "error",
        title: "Validation failed",
        text: "Please fill in all required fields",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }

    if (papuCreditos > subTotal) {
      try {
        if (id) {
          const res = await fetch("/api/index.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              functionName: "agregarCompraIndividual",
              email: userEmail,
              total: subTotal,
              pedido: pedido,
              quantity: quantity,
            }),
          });

          const result = await res.json();

          if (result.success) {
            Swal.fire({
              icon: "success",
              title: "The order was placed successfully",
              text: "Enjoy your products!",
              showConfirmButton: false,
              timer: 2500,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "There was an error placing the order",
              text: "Try again",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        } else {
          const res = await fetch("/api/index.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              functionName: "agregarCompra",
              email: userEmail,
              total: subTotal,
              pedido: pedido,
            }),
          });

          const result = await res.json();

          if (result.success) {
            Swal.fire({
              icon: "success",
              title: "The order was placed successfully",
              text: "Enjoy your products!",
              showConfirmButton: false,
              timer: 2500,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "There was an error placing the order",
              text: "Try again",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "You don't have enough papuCredits",
        text: "Choose other products",
        showConfirmButton: false,
        timer: 2500,
      });
    }

    setTimeout(() => {
      navigate("/tienda"); // Cambia '/nueva-ruta' por la ruta a la que deseas navegar
    }, 3000);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 p-8 flex flex-col lg:flex-row">
        {/* Billing Information */}
        <form ref={formRef} onSubmit={placeOrder} className="bg-white p-8 rounded-lg shadow-md w-full lg:w-2/3 mb-8 lg:mb-0 lg:mr-8">
        <Link to="/carrito">
                <button className="flex font-semibold text-sm text-black items-center sm:justify-start w-full sm:w-auto mb-4">
                  <span>{IconoFlecha} BACK TO CART</span>
                </button>
              </Link>
          <h2 className="text-2xl font-bold mb-6">Billing Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-gray-700">
                Address 
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Company Name"
              />
            </div>
            <div>
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Country"
              />
            </div>
            <div>
              <label className="block text-gray-700">State</label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="State"
              />
            </div>
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-gray-700">Zip Code</label>
              <input
                type="text"
                id="zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Zip Code"
              />
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">PapuCreditos</h2>
            <div className="flex items-center text-lg text-gray-700">
              <FontAwesomeIcon
                icon={faDollarSign}
                className="mr-2 text-green-500"
              />
              <span className="font-bold">{papuCreditos}</span>
              <span className="ml-2 text-sm">USD</span>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            PLACE ORDER
          </button>
        </form>
        {/* Order Summary */}
        <div className="bg-white p-8 rounded-lg shadow-md w-full lg:w-1/3">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="mb-4">
            {pedido.map((item) => (
              <ProductoPedido key={item.id} item={item} quantityBuynow={quantity} />
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
