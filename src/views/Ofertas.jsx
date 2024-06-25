import * as React from "react";

import { useEffect } from "react";

// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";


// Importaciones para componentes
import { Mventas } from "../components/Principal/Mventas";
import { Cventas } from "../components/Principal/Cventas";
import { Dventas } from "../components/Principal/Dventas";
import { Bmedio } from "../components/Principal/Bmedio";
import { Otrasc } from "../components/Principal/Otrasc";
import { Bfinal } from "../components/Principal/Bfinal";
import { Productos } from "../components/Principal/Productos";

export function Ofertas() {
  // Definicion de los iconos
  const IconoFlecha = (
    <FontAwesomeIcon className="my-auto" icon={fas.faArrowRight} />
  );
  const IconoCirculo = (
    <FontAwesomeIcon className="my-auto" icon={fas.faCircle} />
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Estado para guardar todos los productos
  const [productos, setProductos] = React.useState([]);

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
        else
        {
         setProductos(res); 
        }
      }
      catch (error) // Capturar errores
      {
        console.error("Error al obtener los datos:", error);
      }
    };

    // Llamar a la función getData
    getData();
  }, []); // Dependencia vacía para que el efecto se ejecute solo una vez
  

  // Estado para almacenar las mejores ofertas y el indice de la oferta actual
  const [mejoresOfertas, setMejoresOfertas] = React.useState([]);

  // Estado para almacenar el producto mas caro
  const [productoMasCaro, setProductoMasCaro] = React.useState({});

  useEffect(() => {
    // Filtrar el producto mas caro
    const productomasCaro = productos.filter((producto) => producto.stock > 0).sort((a, b) => b.price - a.price)[0];

    // Guardar el producto en el estado
    setProductoMasCaro(productomasCaro);

    // Ordenar los productos por descuento
    const productosordenados = productos.sort((a, b) => b.discountPercentage - a.discountPercentage);

    // Filtrar los productos que tienen stock y obtener los 3 primeros
    const mejoresofertasgenerales = productosordenados.filter((producto) => producto.stock > 0).slice(0, 3);
    setMejoresOfertas(mejoresofertasgenerales);

    // Obtener la mejor laptop
    const mejorofertalaptop = productos.filter((producto) => producto.category === "laptops" && producto.stock > 0)[0];

    if(!mejorofertalaptop) // Si no hay laptops en stock
    {
      // Bucar la cuarta mejor oferta general
      const cuartamejoroferta = productosordenados.filter((producto) => producto.stock > 0)[3];
      setMejoresOfertas((mejoresOfertas) => [...mejoresOfertas, cuartamejoroferta]);
    }
    else // Si hay laptops en stock
    {
      setMejoresOfertas((mejoresOfertas) => [...mejoresOfertas, mejorofertalaptop]);
    }

    // Obtener el mejor accesorio
    const mejoraccesorio = productos.filter((producto) => producto.category === "mobile-accessories" && producto.stock > 0)[0];

    if(!mejoraccesorio && !mejorofertalaptop) // Si no hay accesorios ni laptops en stock
    {
      // Bucar la quinta mejor oferta general
      const quintamejoroferta = productosordenados.filter((producto) => producto.stock > 0)[4];
      setMejoresOfertas((mejoresOfertas) => [...mejoresOfertas, quintamejoroferta]);
    }
    else if(!mejoraccesorio) // Si no hay accesorios en stock pero si laptops
    {
      // Buscar la cuarta mejor oferta general
      const cuartamejoroferta = productosordenados.filter((producto) => producto.stock > 0)[3];
      setMejoresOfertas((mejoresOfertas) => [...mejoresOfertas, cuartamejoroferta]);
    }
    else // Si hay accesorios en stock
    {
      setMejoresOfertas((mejoresOfertas) => [...mejoresOfertas, mejoraccesorio]);
    }
  }, [productos]);


  // Estado para almacenar las mejores ventas
  const [mejoresVentas, setMejoresVentas] = React.useState([]);

  useEffect(() =>
  {
    // Filtrar los productos que no estan en mejores ofertas
    const productosrestantes = productos.filter((producto) => !mejoresOfertas.includes(producto) && productoMasCaro !== producto && producto.stock > 0);

    // Ordenar los productos restantes por ventas
    const productosordenados = productosrestantes.sort((a, b) => b.total_sales - a.total_sales);

    // Tomar los primeros 9 productos
    const mejoresventas = productosordenados.slice(0, 9);

    // Guardar los productos en el estado
    setMejoresVentas(mejoresventas);
  
  }, [mejoresOfertas]);


  // Estado para almacenar las ventas destacadas
  const [ventasDestacadas, setVentasDestacadas] = React.useState([]);

  useEffect(() => {

    // Filtrar los productos que no estan en mejores ofertas ni en mejores ventas
    const productosrestantes = productos.filter((producto) => !mejoresOfertas.includes(producto) && !mejoresVentas.includes(producto) && producto.stock > 0);

    // Agrupar los productos restantes por categoria
    const productosporcategoria = productosrestantes.reduce((acumulador, producto) => 
    {
      if (!acumulador[producto.category]) // Si la categoria no existe en el acumulador
      {
        acumulador[producto.category] = [];
      }

      acumulador[producto.category].push(producto); // Agregar el producto a la categoria
      return acumulador;
    }, {});

    // Obtener el productos mas vendido de cada categoria
    const ventasdestacadas = Object.values(productosporcategoria).map((productos) => productos.sort((a, b) => b.total_sales - a.total_sales)[0]);

    // Guardar los productos en el estado
    setVentasDestacadas(ventasdestacadas);

  }, [mejoresVentas]);


  // Estado para almacenar los productos del banner medio
  const [productosBannerMedio, setProductosBannerMedio] = React.useState([]);

  useEffect(() =>
  {
    // Filtrar los productos que no estan en mejores ofertas, mejores ventas ni ventas destacadas
    const productosrestantes = productos.filter((producto) => !mejoresOfertas.includes(producto) && !mejoresVentas.includes(producto) && !ventasDestacadas.includes(producto) && producto.stock > 0);
    
    // Seleccionar una categoria aleatoria
    const categoria1 = productosrestantes[Math.floor(Math.random() * productosrestantes.length)]?.category;

    // Obtener las categorias restantes
    const categoriasrestantes = productosrestantes.filter((producto) => producto?.category !== categoria1);

    // Seleccionar una segunda categoria aleatoria
    const categoria2 = categoriasrestantes[Math.floor(Math.random() * categoriasrestantes.length)]?.category;

    // Obtener un producto aleatorio de cada categoria
    const producto1 = productosrestantes.find((producto) => producto.category === categoria1);
    const producto2 = productosrestantes.find((producto) => producto.category === categoria2);

    // Guardar los productos en el estado
    setProductosBannerMedio([producto1, producto2]);
    
  }, [ventasDestacadas]);


  // Estado para almacenar los productos mas vendidos de otras categorias
  const [ventasOtrasCategorias, setVentasOtrasCategorias] = React.useState([]);
  

  useEffect(() =>
  {
    // Filtrar los productos que no estan en mejores ofertas, mejores ventas, ventas destacadas ni en el banner medio
    const productosrestantes = productos.filter((producto) => !mejoresOfertas.includes(producto) && !mejoresVentas.includes(producto) && !ventasDestacadas.includes(producto) && !productosBannerMedio.includes(producto) && producto.stock > 0);
    
    // Agrupar los productos restantes por categoria
    const productosporcategoria = productosrestantes.reduce((acumulador, producto) => 
      {
        if (!acumulador[producto.category]) // Si la categoria no existe en el acumulador
        {
          acumulador[producto.category] = [];
        }
  
        acumulador[producto.category].push(producto); // Agregar el producto a la categoria
        return acumulador;
      }, {});

    // Obtener el productos mas vendido de cada categoria
    const ventasotrascategorias = Object.values(productosporcategoria).map((productos) => productos.sort((a, b) => b.total_sales - a.total_sales)[0]);

    // Guardar los productos en el estado
    setVentasOtrasCategorias(ventasotrascategorias);
    
  }, [productosBannerMedio]);

  // Estado para almacenar todos los productos restantes finales
  const [productosFinales, setProductosFinales] = React.useState([]);

  useEffect(() =>
  {
    const productosrestantes = productos.filter((producto) => producto !== productoMasCaro && !mejoresOfertas.includes(producto) && !mejoresVentas.includes(producto) && !ventasDestacadas.includes(producto) && !productosBannerMedio.includes(producto) && !ventasOtrasCategorias.includes(producto) && producto.stock > 0);

    setProductosFinales(productosrestantes);
  }, [ventasOtrasCategorias]);



  // Estado para almacenar el indice de la oferta mostrada
  const [indiceOfertaActual, setIndiceOfertaActual] = React.useState(0);

  // Temporizador para cambiar automaticamente la oferta
  useEffect(() =>
  {
    const timer = setTimeout(() => 
    {
      setIndiceOfertaActual((indice) => (indice + 1) % (mejoresOfertas.length - 2));
    }, 3000); // cambiar cada 3 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
  }, [indiceOfertaActual, mejoresOfertas]); // Dependencias del efecto


  // Funciones para el manejo de productos
  const handleBestDiscount = () =>
  {
    window.location.href = `/producto/${mejoresOfertas[indiceOfertaActual]?.id}`;
  };

  const handleThirdDiscount = () =>
  {
    window.location.href = `/producto/${mejoresOfertas[3]?.id}`;
  }

  const handleFourdDiscount = () =>
  {
    window.location.href = `/producto/${mejoresOfertas[4]?.id}`;
  }

  
  
  return (
    // Contenedor de las ofertas
    <div>
      <div className="flex justify-center w-10/12 mx-auto mt-20">
        {/* Definicion del diseño segun el tamaño de la pantalla */}
        <div className="flex flex-col sm:flex-row">
          {/* Definicion del contenedor de la oferta uno */}
          <div className="flex flex-col bg-gray-100 rounded-xl w-full h-full p-3 xs:p-5 sm:w-2/3">
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
                  {mejoresOfertas[indiceOfertaActual]?.description && (
                    <div className="text-justify text-xs xs:text-sm sm:text-xs md:leading-normal md:text-[15.5px] lg:text-[20.2px] xl:text-[25px] xxl:text-[33px]">
                      {mejoresOfertas[indiceOfertaActual]?.description.substring(0, 140)}
                      {mejoresOfertas[indiceOfertaActual]?.description.length > 140 && '...'}
                    </div>
                  )}
                  <div>
                    <button className="flex bg-orange-400 text-white justify-center rounded-xl font-bold uppercase p-1.5 mt-4 text-[10px] xs:text-xs sm:text-[10px] md:text-sm lg:text-base xl:text-xl xxl:text-2xl" onClick={handleBestDiscount}>
                      BUY NOW<div className="ml-0.5">{IconoFlecha}</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Columna derecha subcontenedor de la oferta uno */}
              <div className="flex flex-col m-auto w-1/2 relative">
                <div className="flex absolute w-1/4 h-1/4 aspect-1 justify-center items-center right-0 bg-blue-500 border-2 border-white  text-white rounded-full text-[8px] xs:text-[11px] xs:border-1 sm:text-[10px] sm:border-2 md:text-xs md:border-3 lg:text-base lg:border-4 xl:text-lg xl:border-5 xxl:text-xl xxl:border-6">
                  ${mejoresOfertas[indiceOfertaActual]?.price}
                </div>
                <img
                  srcSet={mejoresOfertas[indiceOfertaActual]?.thumbnail}
                  className="grow aspect-square bg-transparent pl-2.5 object-cover"
                />
              </div>
            </div>

            {/* Selector de la oferta mostrada */}
            <div className="flex mx-auto gap-3 mt-4 text-xs xs:gap-4 sm:gap-5 sm:text-sm md:gap-6 md:text-base lg:gap-7 lg:text-lg xl:gap-8 xl:text-xl xxl:text-2xl">
            {
              mejoresOfertas.slice(0, 3).map((_, index) => (
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
                      {mejoresOfertas[3]?.title}
                    </div>
                    {/* Boton comprar ahora */}
                    <button className="flex bg-orange-400 justify-center rounded-xl font-bold uppercase p-1.5 my-2 text-[10px] xs:text-xs sm:p-1 sm:text-[6px] md:text-[8px] lg:text-[11px] xl:text-sm xxl:text-base" onClick={handleThirdDiscount}>
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
                      {mejoresOfertas[3]?.discountPercentage}% OFF
                    </div>
                    {/* Imagen del producto */}
                    <img
                      srcSet={mejoresOfertas[3]?.thumbnail}
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
                      srcSet={mejoresOfertas[4]?.thumbnail}
                      className="my-auto aspect-square"
                    />
                  </div>
                  <div className="flex flex-col ml-1 w-1/2 items-center">
                    <div className="text-center font-semibold text-sm xs:text-base sm:text-xs md:text-base lg:text-lg xl:text-2xl xxl:text-3xl">
                      {mejoresOfertas[4]?.title}
                    </div>
                    <div className="text-center text-sky-400 mt-3 text-base xs:text-lg sm:text-sm md:text-base lg:text-lg xl:text-2xl xxl:text-3xl">
                      ${mejoresOfertas[3]?.price}
                    </div>
                    <button className="flex bg-orange-400 text-white justify-center rounded-xl font-bold uppercase p-1.5 mt-2 text-[10px] xs:text-xs sm:text-[6px] md:text-[9px] lg:text-[11px] xl:text-sm xxl:text-base" onClick={handleFourdDiscount}>
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
      
      <Mventas productosmasVendidos={mejoresVentas} />
      <Cventas productos={productos}/>
      <Dventas ventasDestacadas={ventasDestacadas} productos={productos}/>
      <Bmedio productos = {productosBannerMedio} />
      <Otrasc ventasOtrasCategorias={ventasOtrasCategorias} productos={productos}/>
      <Bfinal producto = {productoMasCaro}/>
      <Productos productos = {productosFinales} />
    </div>
  );
}