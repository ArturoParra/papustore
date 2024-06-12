import * as React from "react";
import imagen from "../../assets/prueba.png";

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

  return (
    // Contenedor de las ofertas
    <div>
      <div className="flex justify-center w-10/12 mx-auto mt-3">
        {/* Definicion del diseño segun el tamaño de la pantalla */}
        <div className="flex flex-col sm:flex-row">
          {/* Definicion del contenedor de la oferta uno */}
          <div className="flex flex-col bg-gray-100 rounded-xl w-full p-3 xs:p-5 sm:w-2/3">

            {/* Subcontenedor de la oferta uno */}
            <div className="flex w-full my-auto items-center ">
              {/* Columna izquierda subcontenedor de la oferta uno */}
              <div className="flex flex-col w-1/2 sm:w-1/2">
                <div className="flex flex-col mt-1.5 items-center">
                  <div className="flex text-sky-600 justify-center font-semibold text-[10px] xs:text-xs sm:text-[10px] md:text-sm lg:text-base xl:text-xl xxl:text-2xl">
                    <div className="mr-1">{IconoFlecha}</div>MEJOR OFERTA
                  </div>
                  <div className="flex justify-center font-bold text-sm py-4 xs:text-base sm:text-sm md:text-lg lg:text-xl xl:text-2xl xxl:text-3xl">
                    CONSOLA XBOX
                  </div>
                  <div className="text-justify text-xs xs:text-sm sm:text-xs md:leading-normal md:text-[15.5px] lg:text-[20.2px] xl:text-[25px] xxl:text-[33px]">
                    Ahorra hasta 50% en juegos de Xbox. Obtén 3 meses de PC Game
                    Pass por $40 MXN.
                  </div>
                  <div>
                    <button className="flex bg-orange-400 text-white justify-center rounded-xl font-bold uppercase p-1.5 mt-4 text-[10px] xs:text-xs sm:text-[10px] md:text-sm lg:text-base xl:text-xl xxl:text-2xl">
                      COMPRAR AHORA<div className="ml-0.5">{IconoFlecha}</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Columna derecha subcontenedor de la oferta uno */}
              <div className="flex flex-col m-auto w-1/2 relative">
                <div className="flex absolute w-1/4 aspect-1 justify-center items-center right-0 bg-blue-500 border-2 border-white  text-white rounded-full text-[8px] xs:text-[11px] xs:border-1 sm:text-[10px] sm:border-2 md:text-xs md:border-3 lg:text-base lg:border-4 xl:text-lg xl:border-5 xxl:text-xl xxl:border-6">
                  $299
                </div>
                <img
                  srcSet="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
                  className="grow aspect-square bg-transparent pl-2.5"
                />
              </div>
            </div>

            {/* Selector de la oferta mostrada */}
            <div className="flex mx-auto gap-3 mt-4 text-xs xs:gap-4 sm:gap-5 sm:text-sm md:gap-6 md:text-base lg:gap-7 lg:text-lg xl:gap-8 xl:text-xl xxl:text-2xl">
              <div className="text-gray-400">{IconoCirculo}</div>
              <div className="text-black">{IconoCirculo}</div>
              <div className="text-black">{IconoCirculo}</div>
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
                      OFERTA VERANO
                    </div>
                    {/* Producto ofertado */}
                    <div className="text-center font-semibold text-sm mt-1.5 xs:text-xl sm:text-[11px] sm:leading-normal md:text-xs lg:text-base xl:text-lg xxl:text-2xl">
                      NUEVO GOOGLE PIXEL 6 PRO
                    </div>
                    {/* Boton comprar ahora */}
                    <button className="flex bg-orange-400 justify-center rounded-xl font-bold uppercase p-1.5 my-2 text-[10px] xs:text-xs sm:p-1 sm:text-[6px] md:text-[8px] lg:text-[11px] xl:text-sm xxl:text-base">
                      COMPRAR AHORA<div className="ml-0.5">{IconoFlecha}</div>
                    </button>
                  </div>
                </div>

                {/* Columna dos */}
                
                <div className="flex flex-col w-1/2 h-full ml-1 sm:ml-0">
                {/* Definicion de multiples filas */}
                <div className="flex flex-col font-bold h-full">
                    {/* Descuento en porcentaje */}
                    <div className="justify-center self-end bg-amber-300 px-2 py-1.5 mr-6 text-[8px] xs:text-[10px] sm:py-0.5 sm:mr-2 sm:text-[8px] md:text-[10px] lg:text-xs xl:text-sm xxl:text-base">
                      29% OFF
                    </div>
                    {/* Imagen del producto */}
                    <img
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&"
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
                      srcSet="https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/1.png"
                      className="my-auto aspect-square"
                    />
                  </div>
                  <div className="flex flex-col ml-1 w-1/2 items-center">
                    <div className="text-center font-semibold text-sm xs:text-base sm:text-xs md:text-sm lg:text-base xl:text-xl xxl:text-2xl">
                      Apple Airpods
                    </div>
                    <div className="text-center text-sky-400 mt-3 text-base xs:text-lg sm:text-sm md:text-base lg:text-lg xl:text-2xl xxl:text-3xl">
                      $129.99 USD
                    </div>
                    <button className="flex bg-orange-400 text-white justify-center rounded-xl font-bold uppercase p-1.5 mt-2 text-[10px] xs:text-xs sm:text-[6px] md:text-[9px] lg:text-[11px] xl:text-sm xxl:text-base">
                      COMPRAR AHORA<div className="ml-0.5">{IconoFlecha}</div>
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
                    Entrega Rapida
                  </div>
                  <div className="mt-1 text-gray-500 text-center capitalize">
                    Entrega en 24/H
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
                    Devoluciones
                  </div>
                  <div className="mt-1 text-gray-500 text-center capitalize">
                    Devoluciones en 24/H
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
                    Pago seguro
                  </div>
                  <div className="mt-1 text-gray-500 text-center capitalize">
                    Tù dinero esta seguro
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
                    Soporte 24/7
                  </div>
                  <div className="mt-1 text-gray-500 text-center capitalize">
                    Chat en vivo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}