import React, { useState } from 'react';
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const VistaProducto = () => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();

  //! Esto probablemente habrá que cambiarlo
  //TODO: Cambiar la lógica del producto, esto tiene que venir la de BD
  const {title, description, price, discountPercentage, realPrice, rating, images} = location.state || {};

  const IconoFlecha = <FontAwesomeIcon icon = {fas.faArrowLeft}/>

  fetch('/api/index.php')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error de red');
    }
    return response.text();
  })
  .then(data => {
    console.log(data); // Aquí verás la respuesta del servidor PHP en la consola del navegador
  })
  .catch(error => {
    console.error('Hubo un problema con la petición fetch:', error);
  });

  const imagenes = images
  
  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-4xl">
          <div className="flex flex-wrap md:flex-nowrap">
            <div className="w-full md:w-1/2">
              <div className="relative mb-4 flex items-center justify-center">
                <button
                  className="absolute left-0 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                  onClick={handlePreviousImage}
                >
                  <span className="sr-only">Previous</span>
                  &lt;
                </button>
                <img
                  src={images[currentImageIndex]}
                  alt="Product"
                  className="w-full h-auto"
                />
                <button
                  className="absolute right-0 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                  onClick={handleNextImage}
                >
                  <span className="sr-only">Next</span>
                  &gt;
                </button>
              </div>
              <div className="flex justify-center space-x-2 overflow-x-auto">
                {imagenes.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-20 h-20 border ${currentImageIndex === index ? 'border-orange-500' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8">
              <Link to="/tienda"><p className="font-semibold">{IconoFlecha} BACK TO SHOP</p></Link>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-gray-600">{description}</p>
              <div className="flex items-center my-4">
                <div className="flex items-center text-orange-500">
                  <span className="mr-2">{rating} </span>
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">$ {realPrice} <span className="text-gray-500 line-through">$ {price}</span></div>
              <div className="text-green-500 font-bold mb-2">{discountPercentage}% OFF</div>
              <div className="mb-4">
                <span className="text-gray-600">DISPONIBILIDAD:</span> <span className="text-green-500">DISPONIBLE</span>
              </div>
              <div className="mb-4">
                <span className="text-gray-600">CATEGORÍA:</span> <span className="text-gray-900">Dispositivos electrónicos</span>
              </div>
              <div className="flex items-center mb-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
                >
                  -
                </button>
                <span className="mx-4">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
                >
                  +
                </button>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                AGREGAR AL CARRITO
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                COMPRAR AHORA
                </button>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <button className="text-gray-600">AGREGAR A WISHLIST</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer/>
    </>
  )
}
