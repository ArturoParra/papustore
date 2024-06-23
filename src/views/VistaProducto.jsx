import React, { useEffect, useState } from "react"; // Importa React, useEffect y useState desde la biblioteca 'react'
import Swal from "sweetalert2";
import { Header } from "../components/Header"; // Importa el componente Header desde '../components/Header'
import { Footer } from "../components/Footer"; // Importa el componente Footer desde '../components/Footer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importa el componente FontAwesomeIcon desde '@fortawesome/react-fontawesome'
import { fas } from "@fortawesome/free-solid-svg-icons"; // Importa el conjunto de iconos sólidos de FontAwesome desde "@fortawesome/free-solid-svg-icons"
import { Link, useParams } from "react-router-dom"; // Importa el componente Link desde 'react-router-dom'
import { useAuth } from "../components/AuthProvider";

export const VistaProducto = () => {
  const { userEmail, isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState(1); // Estado para la cantidad del producto
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para el índice de la imagen actual
  const [BackRes, setBackRes] = useState({}); // Estado para almacenar la respuesta de la solicitud al servidor
  const [BackImages, setBackImages] = useState([]); // Estado para almacenar la respuesta de la solicitud al servidor
  const [comments, setComments] = useState([]); // Estado para almacenar los comentarios del servidor
  const [flag, setFlag] = useState(false); //Bandera para la consulta de producto individual
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [priceWithDiscount, setpriceWithDiscount] = useState(0);
  const [discountPercentage, setdiscountPercentage] = useState(0);
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState(0);
  const [returnPolicy, setreturnPolicy] = useState("");
  const [shippingInformation, setshippingInformation] = useState("");
  const [warrantyInformation, setwarrantyInformation] = useState("");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [depth, setDepth] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  const IconoFlecha = <FontAwesomeIcon icon={fas.faArrowLeft} />; // Icono de flecha izquierda
  const IconoEstrella = <FontAwesomeIcon icon={fas.faStar} />; // Icono de estrella

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Función asincrónica para obtener datos del servidor
    const fetchData = async () => {
      try {
        // Realizar la solicitud al servidor
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

        // Manejar la respuesta aquí
        const data = await res.text(); // Leer la respuesta como texto
        // Procesar los datos recibidos
        return JSON.parse(data); // Convertir la cadena JSON a objeto
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Función para obtener los datos del servidor
    const getData = async () => {
      try {
        const res = await fetchData(); // Obtener datos del servidor

        setBackRes(res); // Establecer la respuesta del servidor en el estado
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        // Manejar el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
      }
    };

    getData(); // Llamar a la función para obtener los datos del servidor
  }, [id]); // Dependencia incluye 'id' para que se ejecute cuando 'id' cambie

  useEffect(() => {
    // Función asincrónica para obtener imágenes del servidor
    const fetchImages = async () => {
      try {
        // Realizar la solicitud al servidor
        const res = await fetch("/api/index.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            functionName: "consultaImagenes",
            id: id,
          }),
        });

        if (!res.ok) {
          throw new Error("Error en la solicitud fetch");
        }

        // Manejar la respuesta aquí
        const images = await res.json();

        // Verificar si las imágenes son un arreglo
        if (Array.isArray(images)) {
          // Convertir el arreglo de objetos a un arreglo de valores
          const imageUrls = images.map((image) => image.url);
          return imageUrls; // Devolver el arreglo de URLs
        } else {
          throw new Error("La respuesta no es un arreglo");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Función para obtener los datos del servidor
    const getImages = async () => {
      try {
        const res = await fetchImages(); // Obtener datos del servidor

        setBackImages(res); // Establecer la respuesta del servidor en el estado
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        // Manejar el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
      }
    };

    getImages(); // Llamar a la función para obtener los datos del servidor
  }, [id]); // Dependencia incluye 'id' para que se ejecute cuando 'id' cambie

  useEffect(() => {
    // Función asincrónica para obtener comentarios del servidor
    const fetchComments = async () => {
      try {
        // Realizar la solicitud al servidor
        const res = await fetch("/api/index.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            functionName: "consultaComentarios",
            id: id,
          }),
        });

        if (!res.ok) {
          throw new Error("Error en la solicitud fetch");
        }

        // Manejar la respuesta aquí
        const comments = await res.json();
        return comments; // Convertir la cadena JSON a objeto
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Función para obtener los datos del servidor
    const getComments = async () => {
      try {
        const res = await fetchComments(); // Obtener datos del servidor

        setComments(res); // Establecer la respuesta del servidor en el estado
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        // Manejar el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
      }
    };

    getComments(); // Llamar a la función para obtener los datos del servidor
  }, [id]); // Dependencia incluye 'id' para que se ejecute cuando 'id' cambie

  useEffect(() => {
    console.log(BackRes); // Imprimir la respuesta del servidor en la consola
    const {
      title,
      description,
      discountPercentage,
      priceWithDiscount,
      price,
      brand,
      rating,
      returnPolicy,
      shippingInformation,
      warrantyInformation,
      weight,
      width,
      height,
      depth,
      stock,
    } = BackRes;
    setTitle(title);
    setDescription(description);
    setPrice(price);
    setpriceWithDiscount(priceWithDiscount);
    setdiscountPercentage(discountPercentage);
    setBrand(brand);
    setRating(rating);
    setStock(stock);
    setreturnPolicy(returnPolicy);
    setshippingInformation(shippingInformation);
    setwarrantyInformation(warrantyInformation);
    setWeight(weight);
    setHeight(height);
    setWidth(width);
    setDepth(depth);
  }, [BackRes]); // Ejecutar el efecto cuando cambie BackRes
  
  useEffect(() => {
    console.log(stock)
  }, [stock])
  

  const addToCart = async () => {
    if (isAuthenticated) {
      if(stock > 0){
        if(stock >= quantity){
          try {
            const response = await fetch("/api/index.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                functionName: "insertarCarrito",
                email: userEmail,
                product_id: id,
                quantity: quantity,
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
                title: "Product couldn't be added to cart",
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
            text: "There are not enough products in stock",
            showConfirmButton: false,
            timer: 2500,
          });
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
        title: "Cannot add to wishlist",
        text: "Please log in into your account to add products to your cart",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  const submitComment = async () => {
    if (isAuthenticated) {
        try {
            const response = await fetch("/api/index.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    functionName: "agregarComentario",
                    email: userEmail,
                    name: "Nombre del usuario", // Aquí deberías pasar el nombre del usuario autenticado
                    product_id: id,
                    comment: newComment,
                    rating: newRating,
                }),
            });
            const result = await response.json();
            if (result.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    toast: "true",
                    title: "Review added",
                    text: "Thank you for your feedback",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setNewComment("");
                setNewRating(0);
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    toast: "true",
                    title: "Review couldn't be added",
                    text: result.message || "Try again",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Error al agregar el comentario:", error);
        }
    } else {
        alert("Log in to add a comment");
    }
};


  const addToWishlist = async () => {
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
            product_id: id,
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
              product_id: id,
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
            setIsInWishlist(true); // Actualiza el estado para reflejar que el producto está ahora en la wishlist
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

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  // Función para cambiar la cantidad del producto
  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  // Función para mostrar la siguiente imagen
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BackImages.length);
  };

  // Función para mostrar la imagen anterior
  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + BackImages.length) % BackImages.length
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 mt-14">
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-4xl mb-8">
          <Link to="/tienda">
            <p className="font-semibold">{IconoFlecha} BACK TO SHOP</p>
          </Link>
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
                  src={BackImages[currentImageIndex]}
                  alt="Product"
                  className="w-fit h-96"
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
                {BackImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-auto h-20 border ${
                      currentImageIndex === index ? "border-orange-500" : ""
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8">
              {/* Informacioin general del producto */}
              <h1 className="text-2xl font-bold">{title}</h1>

              <div className="flex items-center my-4">
                <div className="flex items-center text-orange-500">
                  <span className="mr-2">
                    {IconoEstrella} {rating}
                  </span>
                </div>
              </div>
              <div className="text-xl text-gray-500 line-through">
                $ {price} USD
              </div>
              <div className="text-3xl font-bold mb-2">
                $ {priceWithDiscount} USD
              </div>
              <div className="text-green-500 font-bold mb-2">
                {discountPercentage}% OFF
              </div>
              <div className="mb-4">
                <span className="text-gray-600 flex">
                  AVAILABILITY:
                  {stock > 10 ? (
                    <p className="text-green-700 font-semibold ml-1"> IN STOCK</p>
                  ) : stock < 10 && stock > 0 ? (
                    <p className="text-yellow-700 font-semibold ml-1"> LOW STOCK</p>
                  ) : (
                    <p className="text-red-700 font-semibold ml-1"> OUT OF STOCK</p>
                  )}
                </span>
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
                <button
                  onClick={addToCart}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  ADD TO CART
                </button>
                <Link to={{ pathname: `/pedido/${id}/${quantity}` }}>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    BUY NOW
                  </button>
                </Link>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <button onClick={addToWishlist} className="text-gray-600">ADD TO WISHLIST</button>
              </div>
            </div>
          </div>
          {/* Info adicional */}
          <div className="mt-8">
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2">
                <h3 className="text-lg font-bold mb-2">Description</h3>
                <p className="text-gray-600">{description}</p>
                <p className="my-2 text-gray-600">Brand: {brand}</p>
                <h3 className="text-lg font-bold mt-2">Dimensions</h3>
                <p className="text-gray-600">Width: {width}</p>
                <p className="text-gray-600">Height: {height}</p>
                <p className="text-gray-600">Depth: {depth}</p>
                <p className="text-gray-600">Weight: {weight}</p>
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
                <h3 className="text-lg font-bold mt-4 mb-2">
                  Shipping Information
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>{shippingInformation}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {isAuthenticated && (
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-4xl mb-8">
            <h3 className="text-lg font-bold mb-2">Add a Comment</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Write your comment here"
            />
            <div className="mb-2">
              <span className="font-semibold">Rating: </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={fas.faStar}
                  className={`cursor-pointer ${
                    star <= newRating ? "text-orange-500" : "text-gray-300"
                  }`}
                  onClick={() => setNewRating(star)}
                />
              ))}
            </div>
            <button
              onClick={submitComment}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit Comment
            </button>
          </div>
        )}
        {/* Sección de comentarios */}
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h3 className="text-lg font-bold mb-2">Comments</h3>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="mb-4 border p-4 rounded">
                <div className="flex flex-col mb-2">
                  <span className="font-semibold">
                    {comment.name} ({comment.email})
                  </span>
                  <div className="text-orange-500">
                    {Array(comment.rating)
                      .fill()
                      .map((_, i) => (
                        <FontAwesomeIcon key={i} icon={fas.faStar} />
                      ))}
                  </div>
                </div>
                <p className="text-gray-600">{comment.comment}</p>
                <small className="text-gray-500">
                  {new Date(comment.date).toLocaleDateString()}
                </small>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No comments yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
