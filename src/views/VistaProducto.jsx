import React, { useEffect, useState } from 'react'; // Importa React, useEffect y useState desde la biblioteca 'react'
import { Header } from '../components/Header' // Importa el componente Header desde '../components/Header'
import { Footer } from '../components/Footer' // Importa el componente Footer desde '../components/Footer'
import { useLocation } from 'react-router-dom'; // Importa el hook useLocation desde 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa el componente FontAwesomeIcon desde '@fortawesome/react-fontawesome'
import { fas } from "@fortawesome/free-solid-svg-icons"; // Importa el conjunto de iconos sólidos de FontAwesome desde "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"; // Importa el componente Link desde 'react-router-dom'
import { data } from 'autoprefixer'; // Importa 'data' desde 'autoprefixer'

export const VistaProducto = () => {
  const [quantity, setQuantity] = useState(1) // Estado para la cantidad del producto
  const [currentImageIndex, setCurrentImageIndex] = useState(0) // Estado para el índice de la imagen actual
  const location = useLocation(); // Hook useLocation para obtener la ubicación actual
  const [BackRes, setBackRes] = useState([]) // Estado para almacenar la respuesta de la solicitud al servidor

  // Datos de la BD
  const [nombre, setNombre] = useState('') // Estado para el nombre del producto

  //! Esto probablemente habrá que cambiarlo
  //TODO: Cambiar la lógica del producto, esto tiene que venir la de BD
  const {id, title, description, price, discountPercentage, realPrice, rating, images, dimensions, brand, weight, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy} = location.state || {}; // Desestructuración de las propiedades del objeto location.state
  const {width, height, depth} = dimensions // Desestructuración de las propiedades de dimensions

  const IconoFlecha = <FontAwesomeIcon icon = {fas.faArrowLeft}/> // Icono de flecha izquierda
  const IconoEstrella = <FontAwesomeIcon icon = {fas.faStar}/> // Icono de estrella

  useEffect(() => {
    // Función asincrónica para obtener datos del servidor
    const fetchData = async () => {
        try {
            // Realizar la solicitud al servidor
            const res = await fetch('/api/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    functionName: 'consulta',
                    id:id            
                })
            });

            if (!res.ok) {
              throw new Error('Error en la solicitud fetch');
            }

            // Manejar la respuesta aquí
            const data = await res.text(); // Leer la respuesta como texto
            console.log(data)

            // Procesar los datos recibidos
            // Por ejemplo, si recibes datos en formato JSON, puedes hacer lo siguiente:
            return JSON.parse(data); // Convertir la cadena JSON a objeto
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Función para obtener los datos del servidor
    const getData = async () => {
      try {
        const res = await fetchData(); // Obtener datos del servidor
        
        if (!Array.isArray(res)) {
          throw new Error("La respuesta no es un array");
        }
    
        const [producto] = res; // Obtener el primer elemento del array de respuesta
        
        if (!producto || typeof producto !== 'object') {
          throw new Error("El objeto producto no es válido");
        }
        
        const { nombre } = producto; // Obtener el nombre del producto del objeto
        
        if (!nombre) {
          throw new Error("La propiedad nombre no existe en el objeto producto");
        }
        
        setNombre(nombre); // Establecer el nombre del producto en el estado
        setBackRes(res); // Establecer la respuesta del servidor en el estado
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        // Manejar el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
      }
    };
    
    getData(); // Llamar a la función para obtener los datos del servidor

  }, []); // Dependencia vacía para que el efecto se ejecute solo una vez

  useEffect(() => {
    console.log(BackRes); // Imprimir la respuesta del servidor en la consola
  }, [BackRes]); // Ejecutar el efecto cuando cambie BackRes

  const imagenes = images // Asignar las imágenes a la variable 'imagenes'
  
  // Función para cambiar la cantidad del producto
  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  // Función para mostrar la siguiente imagen
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Función para mostrar la imagen anterior
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 mt-14">
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-4xl">
        <Link to="/tienda"><p className="font-semibold">{IconoFlecha} BACK TO SHOP</p></Link>
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
              {/* Caroussel de imagenes */}
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

              {/* Informacioin general del producto */}
              <h1 className="text-2xl font-bold">{title}{nombre}</h1>

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
              {/* Botones para agregar al carrito, agregar a la wishlist y comprar ahora */}
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
          {/* Info adicional */}
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
