import React from "react";
import { Producto } from "../Principal/producto";

// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../AuthProvider";
import Swal from "sweetalert2";
import  '../../styles/Animaciones.css';


export function Mventas( {productosmasVendidos} )
{
    // Determinar si el usuario esta autenticado
    const { userEmail, isAuthenticated } = useAuth();


    // Definicion de los iconos
    const IconoFlecha = <FontAwesomeIcon className="my-auto" icon={fas.faArrowRight} />;
    const IconoCorazon = <FontAwesomeIcon className="my-auto" icon={fas.faHeart} />;
    const IconoCarrito = <FontAwesomeIcon icon={fas.faCartShopping} />;
    const IconoVer = <FontAwesomeIcon icon={fas.faEye} />;
    const IconoEstrellaVacia = <FontAwesomeIcon className="text-yellow-700" icon={farStar} />
    const IconoMediaEstrella = <FontAwesomeIcon className="my-auto text-yellow-700 bg-white" icon={fas.faStarHalfAlt} />
    const IconoEstrella = <FontAwesomeIcon className="my-auto text-yellow-700 bg-white" icon={fas.faStar} />
    const IconoFuego = <FontAwesomeIcon className="my-auto text-red-500" icon={fas.faFireFlameSimple} />


    // Funcion para agregar un producto al carrito
    const addToCart = async () =>
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
                  product_id: productosmasVendidos[0]?.id,
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
    const addToWishlist = async () =>
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
                product_id: productosmasVendidos[0]?.id,
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
                  product_id: productosmasVendidos[0]?.id,
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

    const handleAll = () =>
    {
        window.location.href = "/tienda";
    }

    const handleBestSale = () =>
    {
        window.location.href = `/producto/${productosmasVendidos[0]?.id}`;
    }


    return(
    //Seccion de las mejores ventas
    <div className="w-10/12 mx-auto mt-6">
        {/* Contenedor del temporizador */}
        <div className="flex flex-col gap-3 items-center w-full sm:flex-row sm:justify-between">
            {/* Izquierda */}
            <div className="flex flex-col items-center gap-3 sm:flex-row">
                {/* Titulo */}
                <div className="font-semibold text-xl xs:text-xl sm:text-sm lg:text-base xl:text-lg xxl:text-xl full:text-2xl">
                    TOP SALES
                </div>
                {/* Animacion */}
                <div className="flex flex-col items-center gap-3 sm:flex-row">
                    <div id="textfire" className="on-fire">
                        <span>{IconoFuego}{IconoFuego}{IconoFuego} ON FIRE PAPU PAPU {IconoFuego}{IconoFuego}{IconoFuego}</span>
                    </div>
                </div>
            </div>
            {/* Derecha */}
            <div className="flex text-blue-500 hover:text-blue-900 hover:cursor-pointer text-base xs:text-lg sm:text-sm lg:text-base xl:text-lg xxl:text-xl full:text-2xl" onClick={handleAll}>
                View all<div className="ml-3 mt-1.5 text-xs ">{IconoFlecha}</div>
            </div>
        </div>

        {/* Contenedor de los productos */}
        <div className="flex flex-col mt-6 w-full sm:mt-3 md:flex-row">
            {/* Oferta lateral */}
            <div className="flex flex-col border border-solid border-gray-200 p-3 md:w-1/4">
                {/* Imagen de la oferta */}
                <img 
                srcSet={productosmasVendidos[0]?.thumbnail}
                className=" aspect-[1.2]"
                />
                {/* Calificacion del producto en estrellas */}
                <div className="flex text-yellow-700 gap-1 mt-4 text-sm sm:text-base md:text-xs lg:text-sm xl:text-base xxl:text-lg full:text-xl">
                    {obtenerEstrellas(productosmasVendidos[0]?.rating).map((estrella, index) => (
                        <React.Fragment key={index}>
                            {estrella}
                        </React.Fragment>
                    ))}
                </div>
                {/* Titulo */}
                <div className="mt-4 font-semibold text-sm xs:text-base md:text-[9.5px] md:leading-normal md:text-justify lg:text-xs xl:text-lg xxl:text-xl full:text-2xl">
                    {productosmasVendidos[0]?.title}
                </div>
                {/* Precio */}
                <div className="flex mt-4 md:justify-normal">
                    {/* Sin descuento tachado */}
                    <div className="text-gray-500 line-through text-base xs:text-lg md:text-sm lg:text-base xl:text-xl xxl:text-2xl full:text-3xl">
                        ${productosmasVendidos[0]?.price}
                    </div>
                    {/* Con descuento */}
                    <div className="text-sky-400 ml-2 text-base xs:text-lg md:text-sm lg:text-base xl:text-xl xxl:text-2xl full:text-3xl">
                        ${productosmasVendidos[0]?.priceWithDiscount}
                    </div>
                </div>
                {/* Descripcion */}
                <div className="mt-4 text-gray-500 text-sm xs:text-base md:text-[9.5px] md:leading-normal md:text-justify lg:text-xs xl:text-lg xxl:text-xl full:text-2xl">
                    {productosmasVendidos[0]?.description}
                </div>
                {/* Contenedor funciones para el usuario */}
                <div className="flex mt-6 mb-2 justify-between">
                    {/* Agregar a favoritos */}
                    <div className="text-white bg-black rounded-md p-2 text-xs xs:text-sm md:p-1 md:text-[8px] md:leading-normal lg:text-xs xl:text-base xxl:text-lg full:text-xl hover:cursor-pointer hover:bg-red-400" onClick={addToWishlist}>
                        {IconoCorazon}
                    </div>
                    {/* Agregar a carrito */}
                    <div className="flex w-full justify-center mx-1  items-center bg-orange-400 hover:bg-orange-600 px-1.5 rounded-xl font-semibold text-white text-[11px] xs:text-sm md:text-[6px] md:leading-normal lg:text-[8px] xl:text-xs xxl:text-base full:text-lg hover:cursor-pointer" onClick={addToCart}>
                        <div>{IconoCarrito}</div>
                        <div className="ml-2 md:ml-0.5 lg:ml-2">AGREGAR AL CARRITO</div>
                    </div>
                    {/* Ver producto en vista producto */}
                    <div className="text-white bg-black rounded-md p-2 text-xs xs:text-sm md:p-1 md:text-[8px] md:leading-normal lg:text-xs xl:text-base xxl:text-lg full:text-xl hover:cursor-pointer hover:bg-blue-400" onClick={handleBestSale}>
                        {IconoVer}
                    </div>
                </div>
            </div>
            {/* Products network container */}
            <div className="grid gap-x-2 xs:grid-cols-2 md:flex md:flex-col md:w-3/4 md:gap-2">
                {/* Row one */}
                <div className="md:flex md:flex-grow">
                    {productosmasVendidos.slice(1, 5).map((producto, index) => (
                        <div key={index} className="md:w-1/4">
                            <Producto producto={producto} />
                        </div>
                    ))}
                </div>
                {/* Row two */}
                <div className="md:flex md:flex-grow mt-4 md:mt-0">
                    {productosmasVendidos.slice(5, 9).map((producto, index) => (
                        <div key={index} className="md:w-1/4">
                            <Producto producto={producto} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
}