import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useAuth } from "../components/AuthProvider";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export const PurchaseHistory = () => {
  const { userEmail } = useAuth();
  const [purchase, setPurchase] = useState(null);
  const { id } = useParams();

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
            functionName: "getPurchaseHistory",
            email: userEmail,
            id: id,
          }),
        });

        if (!res.ok) {
          throw new Error("Error en la solicitud fetch");
        }

        const data = await res.json();
        setPurchase(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [userEmail]);

  if (!purchase) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto mt-10 p-4 sm:p-8 flex justify-center">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
          <div className="mb-10">
            <Link to="/perfil">
              <button className="flex font-semibold text-sm text-black items-center mb-4">
                <span>{IconoFlecha} BACK TO PROFILE</span>
              </button>
            </Link>
            <div className="text-center border-b pb-8">
              <h1 className="font-semibold text-2xl">PURCHASE HISTORY</h1>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-gray-600 text-xs uppercase">ACCOUNT INFORMATION</h3>
            <div className="mt-2 border p-2 rounded">
              <label className="block font-semibold">EMAIL</label>
              <p className="text-gray-700">{purchase.email}</p>
            </div>
            <div className="mt-2 border p-2 rounded">
              <label className="block font-semibold">DATE</label>
              <p className="text-gray-700">{new Date(purchase.date).toLocaleDateString()}</p>
            </div>
            <div className="mt-2 border p-2 rounded">
              <label className="block font-semibold">TOTAL</label>
              <p className="text-gray-700">${purchase.total} USD</p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-gray-600 text-xs uppercase">SHIPPING ADDRESS</h3>
            <div className="mt-2 border p-2 rounded">
              <label className="block font-semibold">COUNTRY</label>
              <p className="text-gray-700">{purchase.country}</p>
            </div>
            <div className="mt-2 border p-2 rounded">
              <label className="block font-semibold">STATE</label>
              <p className="text-gray-700">{purchase.state}</p>
            </div>
            <div className="mt-2 border p-2 rounded">
              <label className="block font-semibold">ZIP CODE</label>
              <p className="text-gray-700">{purchase.zip}</p>
            </div>
            <div className="mt-2 border p-2 rounded">
              <label className="block font-semibold">ADDRESS</label>
              <p className="text-gray-700">{purchase.address}</p>
            </div>
            <div className="mt-2 border p-2 rounded">
              <label className="block font-semibold">CITY</label>
              <p className="text-gray-700">{purchase.city}</p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-semibold text-gray-600 text-xs uppercase">PRODUCTS</h3>
            <div className="mt-2">
              {purchase.products.map((product) => (
                <div key={product.product_id} className="border p-2 rounded mb-4 flex">
                  <img src={product.thumbnail} alt={product.title} className="w-20 h-20 object-cover mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-700">{product.title}</h4>
                    <p className="text-gray-600">Quantity: {product.quantity}</p>
                    <p className="text-gray-600">Unit Price: ${product.unit_price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
