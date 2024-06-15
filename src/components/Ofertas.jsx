import * as React from "react";
import { Mventas } from "./Principal/Mventas";
import { Cventas } from "./Principal/Cventas";
import { Dventas } from "./Principal/Dventas";
import { Bmedio } from "./Principal/Bmedio";
import { Accesorios } from "./Principal/Accesorios";
import { Bfinal } from "./Principal/Bfinal";
import { Productos } from "./Principal/Productos";

import { useEffect } from "react";

// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";



export function Ofertas() {
  // Definicion de los iconos
  const IconoFlecha = (
    <FontAwesomeIcon className="my-auto" icon={fas.faArrowRight} />
  );
  const IconoCirculo = (
    <FontAwesomeIcon className="my-auto" icon={fas.faCircle} />
  );


  // Estado para almacenar las mejores ofertas y el indice de la oferta actual
  const [mejoresOfertas, setMejoresOfertas] = React.useState([]);
  const [indiceOfertaActual, setIndiceOfertaActual] = React.useState(0);

  // Estado para almacennar la mejor laptop y el mejor accesorio
  const [mejorLaptop, setMejorLaptop] = React.useState({});
  const [mejorAccesorio, setMejorAccesorio] = React.useState({});
  
  useEffect(() =>
  {
    // Función para obtener datos del servidor y convertirlos a JSON
    const fetchData = async () =>
    {
        try // Intentar obtener los datos del servidor
        {
            // Realizar una solicitud fetch al servidor
            const res = await fetch('/api/index.php', 
            {
                // Configurar la solicitud
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify
                ({
                    functionName: 'consultaProductos',
                })
            });
            
            // Verificar si la solicitud fue exitosa
            if (!res.ok)
            {
              throw new Error('Error en la solicitud fetch');
            }
            
            // Manejar la respuesta del servidor
            const data = await res.json(); // Convertir la respuesta a JSON

            // Devolver los datos obtenidos
            return data
        } 
        catch (error) // Capturar errores
        {
            console.error('Error:', error);
        }
    };

    // Funcion para llamar a la funcion fetchData y procesar los datos obtenidos
    const getData = async () => 
    {
      try // Intentar obtener los datos de fetchData
      {
        // Llamar a la función fetchData
        const res = await fetchData();
        
        // Verificar si res es un array
        if (!Array.isArray(res))
        {
          throw new Error("La respuesta no es un array");
        }

        // Mostar los datos obtenidos
        console.log("Datos obtenidos:", res);

        filtrarProductos(res);
        obtenerCategorias(res);
        
      }
      catch (error) // Capturar errores
      {
        console.error("Error al obtener los datos:", error);
      }
    };

    // Llamar a la función getData
    getData();
  }, []); // Dependencia vacía para que el efecto se ejecute solo una vez
  
  
  // Funcion para filtrar los productos (3 mejores ofertas)
  const filtrarProductos = (productos) =>
  {
    // Verificar si productos es un array
    if (!Array.isArray(productos))
    {
      throw new Error("El argumento no es un array");
    }

    // Ordernar los productos por discountPercentage de forma descendente
    productos.sort((a, b) => b.discountPercentage - a.discountPercentage);

    // Filtrar los productos que tienen stock y obtener los 3 primeros
    const mejoresofertas = productos.filter((producto) => producto.stock > 0).slice(0, 3);
    setMejoresOfertas(mejoresofertas);


    // Obtener la mejor laptop
    const mejorlaptop = productos.filter((producto) => producto.category === "laptops" && producto.stock > 0)[0];
    // Si no se encuentra la mejor laptop
    if (!mejorlaptop)
    {
      // Buscar la cuarta mejor oferta
      const cuartamejoroferta = productos.filter((producto) => producto.stock > 0)[3];
      setMejorLaptop(cuartamejoroferta);
    }
    else
    {
      setMejorLaptop(mejorlaptop);
    }

    // Obtener el mejor accesorio
    const mejoraccesorio = productos.filter((producto) => producto.category === "mobile-accessories" && producto.stock > 0)[0];
    // Si no se encuentra el mejor accesorio ni la mejor laptop
    if (!mejoraccesorio && !mejorlaptop)
    {
      // Buscar la quinta mejor oferta
      const quintamejoroferta = productos.filter((producto) => producto.stock > 0)[4];
      setMejorAccesorio(quintamejoroferta);
    }
    else if (!mejoraccesorio) // Si no se encuentra el mejor accesorio
    {
      // Buscar la cuarta mejor oferta
      const cuartamejoroferta = productos.filter((producto) => producto.stock > 0)[3];
      setMejorAccesorio(cuartamejoroferta);
    }
    else
    {
      setMejorAccesorio(mejoraccesorio);
    }

    console.log("Mejor laptop:", mejorlaptop);
    console.log("Mejor accesorio:", mejoraccesorio);
    console.log("Mejores ofertas:", mejoresofertas);

    // Devolver las mejores ofertas
    return mejoresofertas;
  };

  // Temporizador para cambiar automaticamente la oferta
  useEffect(() =>
  {
    const timer = setTimeout(() => 
    {
      setIndiceOfertaActual((indice) => (indice + 1) % mejoresOfertas.length);
    }, 3000); // cambiar cada 3 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
  }, [indiceOfertaActual, mejoresOfertas]); // Dependencias del efecto


  
  
  return (
    // Contenedor de las ofertas
    <div>
      <div className="flex justify-center w-10/12 mx-auto mt-20">
        {/* Definicion del diseño segun el tamaño de la pantalla */}
        <div className="flex flex-col sm:flex-row">
          {/* Definicion del contenedor de la oferta uno */}
          <div className="flex flex-col bg-gray-100 rounded-xl w-full p-3 xs:p-5 sm:w-2/3">
            {/* Renderizado de las tres mejores ofertas por tiempo */}
            <div className="flex w-full my-auto items-center ">
              {/* Columna izquierda subcontenedor de la oferta uno */}
              <div className="flex flex-col w-1/2 sm:w-1/2">
                <div className="flex flex-col mt-1.5 items-center">
                  <div className="flex text-sky-600 justify-center font-semibold text-[10px] xs:text-xs sm:text-[10px] md:text-sm lg:text-base xl:text-xl xxl:text-2xl">
                    <div className="mr-1">{IconoFlecha}</div>BEST OFFER
                  </div>
                  <div className="flex justify-center text-center font-bold text-sm py-4 xs:text-base sm:text-sm md:text-lg lg:text-xl xl:text-2xl xxl:text-3xl">
                    {mejoresOfertas[indiceOfertaActual]?.title}
                  </div>
                  <div className="text-justify text-xs xs:text-sm sm:text-xs md:leading-normal md:text-[15.5px] lg:text-[20.2px] xl:text-[25px] xxl:text-[33px]">
                    {mejoresOfertas[indiceOfertaActual]?.description}
                  </div>
                  <div>
                    <button className="flex bg-orange-400 text-white justify-center rounded-xl font-bold uppercase p-1.5 mt-4 text-[10px] xs:text-xs sm:text-[10px] md:text-sm lg:text-base xl:text-xl xxl:text-2xl">
                      BUY NOW<div className="ml-0.5">{IconoFlecha}</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Columna derecha subcontenedor de la oferta uno */}
              <div className="flex flex-col m-auto w-1/2 relative">
                <div className="flex absolute w-1/4 aspect-1 justify-center items-center right-0 bg-blue-500 border-2 border-white  text-white rounded-full text-[8px] xs:text-[11px] xs:border-1 sm:text-[10px] sm:border-2 md:text-xs md:border-3 lg:text-base lg:border-4 xl:text-lg xl:border-5 xxl:text-xl xxl:border-6">
                  ${mejoresOfertas[indiceOfertaActual]?.price}
                </div>
                <img
                  srcSet={mejoresOfertas[indiceOfertaActual]?.thumbnail}
                  className="grow aspect-square bg-transparent pl-2.5"
                />
              </div>
            </div>

            {/* Selector de la oferta mostrada */}
            <div className="flex mx-auto gap-3 mt-4 text-xs xs:gap-4 sm:gap-5 sm:text-sm md:gap-6 md:text-base lg:gap-7 lg:text-lg xl:gap-8 xl:text-xl xxl:text-2xl">
            {
              mejoresOfertas.map((_, index) => (
                <div key={index} className={`text-${index === indiceOfertaActual ? 'black' : 'gray'}-400`}>{IconoCirculo}</div>
              ))
            }
            </div>
          </div>

          {/* Definicion del contenedor de las dos ofertas */}
          <div className="flex flex-col ml-0 mt-4 w-full sm:w-1/3 sm:ml-3 sm:mt-0">
              {/* Contenedor segunda oferta */}
              <div className="flex flex-grow bg-black rounded-xl w-full pt-2 pl-3 xs:mb-2.5 xs:pt-3 xs:pl-4 sm:pt-2 sm:pl-3 md:pt-5 md:pl-6 lg:pt-6 lg:pl-7 xl:pt-7 xl:pl-8 xxl:pt-8 xxl:pl-9">
                {/* Columna uno */}
                <div className="flex flex-col w-1/2">
                  {/* Definicon de multiples filas */}
                  <div className="flex flex-col my-auto items-center text-white">
                    {/* Titulo del la oferta */}
                    <div className="text-center text-yellow-400 font-medium uppercase text-xs xs:text-base sm:leading-normal sm:text-[10px] md:text-xs lg:text-base xl:text-lg xxl:text-xl">
                      SUMMER OFFER
                    </div>
                    {/* Producto ofertado */}
                    <div className="text-center font-semibold text-sm mt-1.5 xs:text-xl sm:text-[11px] sm:leading-normal md:text-xs lg:text-base xl:text-lg xxl:text-2xl">
                      {mejorLaptop.title}
                    </div>
                    {/* Boton comprar ahora */}
                    <button className="flex bg-orange-400 justify-center rounded-xl font-bold uppercase p-1.5 my-2 text-[10px] xs:text-xs sm:p-1 sm:text-[6px] md:text-[8px] lg:text-[11px] xl:text-sm xxl:text-base">
                      BUY NOW<div className="ml-0.5">{IconoFlecha}</div>
                    </button>
                  </div>
                </div>

                {/* Columna dos */}
                
                <div className="flex flex-col w-1/2 h-full ml-1 sm:ml-0">
                {/* Definicion de multiples filas */}
                <div className="flex flex-col font-bold h-full">
                    {/* Descuento en porcentaje */}
                    <div className="justify-center self-end bg-amber-300 px-2 py-1.5 mr-6 text-[8px] xs:text-[10px] sm:py-0.5 sm:mr-2 sm:text-[8px] md:text-[10px] lg:text-xs xl:text-sm xxl:text-base">
                      {mejorLaptop.discountPercentage}% OFF
                    </div>
                    {/* Imagen del producto */}
                    <img
                      srcSet={mejorLaptop.thumbnail}
                      className="rounded-ee-lg w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Definicion del contenedor de la oferta tres */}
              <div className="flex flex-grow justify-center bg-gray-100 rounded-xl mt-5 py-2 px-3 w-full xs:mt-2.5 sm:py-3 sm:px-1">
                <div className="flex items-center">
                  <div className="flex flex-col w-1/2">
                    <img
                      loading="lazy"
                      srcSet={mejorAccesorio.thumbnail}
                      className="my-auto aspect-square"
                    />
                  </div>
                  <div className="flex flex-col ml-1 w-1/2 items-center">
                    <div className="text-center font-semibold text-sm xs:text-base sm:text-xs md:text-base lg:text-lg xl:text-2xl xxl:text-3xl">
                      {mejorAccesorio.title}
                    </div>
                    <div className="text-center text-sky-400 mt-3 text-base xs:text-lg sm:text-sm md:text-base lg:text-lg xl:text-2xl xxl:text-3xl">
                      ${mejorAccesorio.price}
                    </div>
                    <button className="flex bg-orange-400 text-white justify-center rounded-xl font-bold uppercase p-1.5 mt-2 text-[10px] xs:text-xs sm:text-[6px] md:text-[9px] lg:text-[11px] xl:text-sm xxl:text-base">
                      BUY NOW<div className="ml-0.5">{IconoFlecha}</div>
                    </button>
                  </div>
                </div>
              </div>
          </div>

          
        </div>
      </div>

      {/* Contenedor de las promociones */}
      <div className="w-10/12 mx-auto mt-3 p-2 border border-solid border-gray-200 rounded-xl text-[8px] xs:text-[10px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] xxl:text-[16px]">
        <div className="flex flex-col gap-5 sm:flex-row justify-center sm:gap-0">
          <div className="flex justify-center items-center w-full gap-5 sm:w-1/2 sm:gap-2  ">
            <div className="flex flex-col w-1/2">
              <div className="flex flex-col sm:flex-row">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed19693cf7caf752f19f8cb438dbbb8887da76e084bf55bfc6e6d4a9a60f1786?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&"
                  className="m-auto aspect-square w-4 xs:w-6 sm:w-4 md:w-6 lg:w-8 xl:w-10 xxl:w-13"
                />

                <div className="flex flex-col items-center mx-auto">
                  <div className="font-medium uppercase text-zinc-900 text-center">
                    Fast Delivery
                  </div>
                  <div className="mt-1 text-gray-500 text-center capitalize">
                    Delivery in 24/H
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-1/2">
              <div className="flex flex-col sm:flex-row ">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe9621ca073d78ecaf5f5ab5ec799220cf6df68042882ae15e33765d6b50d663?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&"
                  className="m-auto aspect-square w-4 xs:w-6 sm:w-4 md:w-6 lg:w-8 xl:w-10 xxl:w-13"
                />

                <div className="flex flex-col items-center mx-auto">
                  <div className="font-medium uppercase text-zinc-900 text-center">
                    Returns
                  </div>
                  <div className="mt-1 text-gray-500 text-center capitalize">
                    Returns in 24/H
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center w-full gap-5 sm:w-1/2 sm:gap-2  ">
            <div className="flex flex-col w-1/2 ">
              <div className="flex flex-col sm:flex-row">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1831cb3e8e26305bacaa073dc4e84148e709c1ff4b7e69f2b72e05e52de8bb96?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&"
                  className="m-auto aspect-square w-4 xs:w-6 sm:w-4 md:w-6 lg:w-8 xl:w-10 xxl:w-13"
                />

                <div className="flex flex-col items-center mx-auto">
                  <div className="font-medium uppercase text-zinc-900 text-center">
                    Secure Payment
                  </div>
                  <div className="mt-1 text-gray-500 text-center capitalize">
                    Your money is safe
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-1/2">
              <div className="flex flex-col sm:flex-row">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6aa7eb55b0828a45827bce4914df35597a67c2ed823acb51074053fb3a05ed9a?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&"
                  className="m-auto aspect-square w-4 xs:w-6 sm:w-4 md:w-6 lg:w-8 xl:w-10 xxl:w-13"
                />

                <div className="flex flex-col mx-auto  ">
                  <div className="font-medium uppercase text-zinc-900">
                    24/7 Support
                  </div>
                  <div className="mt-1 text-gray-500 text-center capitalize">
                    Live Chat
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Mventas/>
      {/* Enviar los productos obtenidos a Cventas */}
      <Cventas/>
      <Dventas/>
      <Bmedio/>
      <Accesorios/>
      <Bfinal/>
      <Productos/>
    </div>
  );
}