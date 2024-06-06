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
  const {title, description, price, discountPercentage, realPrice, rating, images, dimensions, brand, weight, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy} = location.state || {};
  const {width, height, depth} = dimensions

  const IconoFlecha = <FontAwesomeIcon icon = {fas.faArrowLeft}/>
  const IconoEstrella = <FontAwesomeIcon icon = {fas.faStar}/>

  fetch('/api/conexion.php')
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
      <Header />
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

              <div className="flex items-center my-4">
                <div className="flex items-center text-orange-500">
                  <span className="mr-2">{IconoEstrella} {rating}</span>
                </div>
              </div>
              <div className="text-xl text-gray-500 line-through">$ {price} USD</div>
              <div className="text-3xl font-bold mb-2">$ {realPrice} USD</div>
              <div className="text-green-500 font-bold mb-2">{discountPercentage}% OFF</div>
              <div className="mb-4">
                <span className="text-gray-600">AVAILABILITY:</span> <span className="text-green-500">{availabilityStatus}</span>
              </div>
              <div className="mb-4">
                <span className="text-gray-600">CATEGORY:</span> <span className="text-gray-900">Electronic Devices</span>
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
                  ADD TO CART
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  BUY NOW
                </button>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <button className="text-gray-600">ADD TO WISHLIST</button>
              </div>
            </div>
          </div>
          {/* Additional Section */}
          <div className="mt-8">
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2">
                <h3 className="text-lg font-bold mb-2">Description</h3>
                <p className="text-gray-600">
                  {description}
                </p>
                <p className="my-2 text-gray-600" >
                  Brand: {brand}
                </p>
                <h3 className="text-lg font-bold mt-2">Dimensions</h3>
                <p className="text-gray-600">
                  Width: {width}
                </p>
                <p className="text-gray-600">
                  Height: {height}
                </p>
                <p className="text-gray-600">
                  Depth: {depth}
                </p>
                <p className="text-gray-600">
                  Weight: {weight}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Features</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Free fast shipping and delivery</li>
                  <li>24/7 customer support</li>
                  <li>Secure payment method</li>
                  <li>Warranty Information: {warrantyInformation}</li>
                  <li>Return Policy: {returnPolicy}</li>
                </ul>
                <h3 className="text-lg font-bold mt-4 mb-2">Shipping Information</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>{shippingInformation}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
