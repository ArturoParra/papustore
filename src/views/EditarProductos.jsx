import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export const EditarProductos = () => {
  const [products, setProducts] = useState([]);
  const {isAuthenticatedadmin} = useAuth()
  const navigate = useNavigate()
  const IconoFlecha = <FontAwesomeIcon icon={fas.faArrowLeft}/>

  useEffect(() => {
    if(!isAuthenticatedadmin){
      navigate("/")
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/index.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            functionName: "consultaProductos",
          }),
        });

        if (!res.ok) {
          throw new Error("Error en la solicitud fetch");
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="p-4 mt-14 bg-gray-100">
        <div className="container mx-auto p-4 ">
        <Link to="/administrador">
                  <button className="flex font-semibold text-sm text-black items-center sm:justify-start w-full sm:w-auto mb-4">
                    <span>{IconoFlecha} BACK TO DASHBOARD</span>
                  </button>
                </Link>
          <h1 className="text-2xl font-bold mb-4 ">Product List</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg shadow bg-white">
                <div className="flex justify-center items-center h-48 mb-4">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <Link to={{pathname: `/editproducto/${product.id}`}}>
                  <button className="mt-4 px-4 py-2 bg-primary text-white rounded">
                    Edit
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
