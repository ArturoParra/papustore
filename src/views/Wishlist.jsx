import React from 'react'; // Importa React desde la biblioteca 'react'
import { Header } from '../components/Header'; // Importa el componente Header desde '../components/Header'
import { Footer } from '../components/Footer'; // Importa el componente Footer desde '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa el componente FontAwesomeIcon desde '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Importa los iconos faSearch y faShoppingCart desde '@fortawesome/free-solid-svg-icons'
import { ProductoWishlist } from '../components/ProductoWishlist'; // Importa el componente ProductoWishlist desde '../components/ProductoWishlist'
import { useAuth } from '../components/AuthProvider'; // Importa el componente useAuth desde '../components/AuthProvider'
import { useEffect, useState } from 'react'; // Importa useEffect y useState desde la biblioteca 'react'
import { Link, useNavigate } from "react-router-dom";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";


export const Wishlist = () => {
  // Extraer el email del usuario autenticado
  const { userEmail, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  // Estado de la lista de deseos
  const [wishlist, setWishlist] = useState([]);

  const IconoFlecha = <FontAwesomeIcon icon={fas.faArrowLeft}/>

  useEffect(() => {
    if(!isAuthenticated){
      Swal.fire({
        icon: "warning",
        title: "Log in to see your wishlist",
        showConfirmButton: false,
        timer: 2500,
      });
      setTimeout(() => { navigate("/tienda") }, 2500)
    }
  }, [])

  // Efecto para obtener los productos de la lista de deseos
  useEffect(() => {
    const fetchData = async () => {
      try 
      {
        const res = await fetch("/api/index.php", 
          {
          method: "POST",
          headers: 
          {
            "Content-Type": "application/json",
          },
          body: JSON.stringify
          ({
            functionName: "consultaWishlist",
            email: userEmail,
          }),
        });

        if (!res.ok)
        {
          throw new Error("Error en la solicitud fetch");
        }

        const data = await res.json();
        // Actualizar el estado de productos con los datos obtenidos
        console.log(data);

        setWishlist(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [userEmail]);


  const removeItem = async (id) => {
    try {
      const res = await fetch("/api/index.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          functionName: "eliminarProductoWishlist",
          email: userEmail,
          product_id: id,
        }),
      });
      
      if (!res.ok) {
        throw new Error("Error en la solicitud fetch");
      }
      // Actualizar el estado del carrito eliminando el producto
      setWishlist(wishlist.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };


  // Define un producto de ejemplo
  const product = {
    name: 'Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black',
    price: 999,
    originalPrice: 1299,
    stock: 'IN STOCK',
    imageUrl: 'https://via.placeholder.com/50',
  };

  return (
    <>
      <Header /> {/* Renderiza el componente Header */}
      {/* Contenedor principal */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 mt-12">
        {/* Contenedor del contenido de la lista de deseos */}
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-5xl">
        <Link to="/tienda">
                <button className="flex font-semibold text-sm text-black items-center sm:justify-start w-full sm:w-auto mb-4">
                  <span>{IconoFlecha} BACK TO SHOP</span>
                </button>
              </Link>
          <h1 className="text-2xl font-bold mb-4">Wishlist</h1> {/* Título de la lista de deseos */}
          <div>
            {/* Mapeo de los productos de la lista de deseos */}
            { wishlist.length == 0 && (<p className="font-bold text-3xl mt-10 text-center">
                There are no products in your wishlist{" "}
              </p>)
            }
            {wishlist.map((item) => (
              <ProductoWishlist 
                key={item.id} 
                item={item} 
                removeItem={removeItem} 
              />
            ))}
          </div>
        </div>
      </div>
      <Footer /> {/* Renderiza el componente Footer */}
    </>
  );
};
