import React, { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { Tarjetap } from '../components/Principal/tarjetap';
import { useAuth } from "../components/AuthProvider";
import Swal from "sweetalert2";
import  '../styles/Animaciones.css';

export function SearchList( {filteredProducts} )
{
    // Determinar si el usuario esta autenticado
    const { userEmail, isAuthenticated } = useAuth();

    if (filteredProducts.length === 0)
    {
      return <p className="flex flex-col mt-2 gap-5 bg-white text-red-600 font-bold shadow-md rounded-lg p-1 overflow-y-auto text-center error">No products were found that match your search.</p>;

    }

    const IconoCorazon = <FontAwesomeIcon className="my-auto" icon={fas.faHeart} />;
    const IconoCarrito = <FontAwesomeIcon icon={fas.faCartShopping} />;
    const IconoEstrellaVacia = <FontAwesomeIcon className="text-yellow-700" icon={farStar} />
    const IconoMediaEstrella = <FontAwesomeIcon className="my-auto text-yellow-700 bg-white" icon={fas.faStarHalfAlt} />
    const IconoEstrella = <FontAwesomeIcon className="my-auto text-yellow-700 bg-white" icon={fas.faStar} />

    // Estado para guardar los productos con mejor calificacion
    const [productosRating, setProductosRating] = React.useState([]);

    // Funcion para obtener los productos con mas rating
    useEffect(() => 
    {
        // Ordenar los productos por rating
        const productosOrdenados = [...filteredProducts].sort((a, b) => b.rating - a.rating);
        
        // Guardar en el estado
        setProductosRating(productosOrdenados);

    }, [filteredProducts]);


    // Funcion para agregar un producto al carrito
    const addToCart = async (productId) =>
        {
            if (isAuthenticated) {
              if(productosmasVendidos[0]?.stock > 0){
                try {
                  const response = await fetch("/api/index.php", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      functionName: "insertarCarrito",
                      email: userEmail,
                      product_id: productId,
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
        
        // Funcion para agregar un producto a la lista de deseos
        const addToWishlist = async (productId) =>
        {
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
                    product_id: productId,
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
                      product_id: productId,
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
    
        const obtenerEstrellas = (rating) =>
        {
            let estrellas = [];
            for (let i = 1; i <= 5; i++)
            {
                if (rating >= i)
                {
                    estrellas.push(<span key={i} className="twinkle">{IconoEstrella}</span>);
                } 
                else if (rating >= i - 0.7 && rating <= i - 0.3)
                {
                    estrellas.push(<span key={i} className="twinkle">{IconoMediaEstrella}</span>);
                } 
                else 
                {
                    estrellas.push(<span key={i}>{IconoEstrellaVacia}</span>);
                }
            }
            return estrellas;
        }

        return (
            <div className="flex flex-col mt-2 gap-5 bg-white shadow-md rounded-lg p-1 overflow-y-auto" style={{ maxHeight: 'calc(3 * 6em)' }}>
                {productosRating.map((product) => 
                (
                    <div className="flex " key={product.id}>
                        <Tarjetap producto={product} />
                        <div className="flex flex-col justify-center items-center">
                            <div className='flex mt-2 gap-5 items-center'>
                                <button onClick={() => addToWishlist(product.id)} className="bg-black hover:bg-red-400 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                    {IconoCorazon}
                                </button>
                                <button onClick={() => addToCart(product.id)} className="bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                    {IconoCarrito}
                                </button>     
                            </div>
        
                            <div className="flex text-yellow-700 gap-1 mt-4 text-sm sm:text-base md:text-xs lg:text-sm xl:text-base xxl:text-lg full:text-xl">
                            {obtenerEstrellas(product.rating).map((estrella, index) => (
                                <React.Fragment key={index}>
                                    {estrella}
                                </React.Fragment>
                            ))}
                            </div>
        
                        </div>
                    </div>
                ))}
            </div>
          );
        }
