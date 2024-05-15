import * as React from "react";

// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export function Ofertas() {
  // Definicion de los iconos
  const IconoFlecha = <FontAwesomeIcon className="my-auto" icon={fas.faArrowRight}/>
  const IconoCirculo = <FontAwesomeIcon className="my-auto" icon={fas.faCircle}/>

  return (
    // Contenedor de las ofertas
    <div className="flex mx-auto justify-center xss:mt-3 xss:w-10/12">
      {/* Definicion del diseño segun el tamaño de la pantalla */}
      <div className="flex flex-col xss:flex-col md:flex-row">
        {/* Definicion del contenedor de la oferta uno */}
        <div className="flex flex-col bg-gray-100 rounded-xl xss:w-full xss:p-3 xs:p-5">
          <div className="flex w-full xss:items-center">
              <div className="flex flex-col xss:w-1/2">
                <div className="flex flex-col xss:mt-1.5 xss:items-center">
                  <div className="flex text-sky-600 justify-center font-semibold xss:text-[10px] xs:text-xs">
                    <div className="mr-1">{IconoFlecha}</div>MEJOR OFERTA
                  </div>
                  <div className="flex justify-center font-bold xss:text-sm xss:py-4 xs:text-base">
                    XBOX CONSOLES
                  </div>
                  <div className="text-justify xss:text-xs xs:text-sm">
                    Save up to 50% on select Xbox games. Get 3 month of PC Game
                    Pass for $2 USD.
                  </div>
                  <div>
                    <button className="flex bg-orange-400 text-white justify-center rounded-xl font-bold uppercase xss:p-1.5 xss:mt-2 xss:text-[10px] xs:text-xs">
                      COMPRAR AHORA<div className="ml-0.5">{IconoFlecha}</div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col m-auto w-1/2">
                <img srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d5100f20cca3aa6af27ea157890867bef180c72902c1668c77717636fc7294d8?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5100f20cca3aa6af27ea157890867bef180c72902c1668c77717636fc7294d8?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5100f20cca3aa6af27ea157890867bef180c72902c1668c77717636fc7294d8?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5100f20cca3aa6af27ea157890867bef180c72902c1668c77717636fc7294d8?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5100f20cca3aa6af27ea157890867bef180c72902c1668c77717636fc7294d8?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5100f20cca3aa6af27ea157890867bef180c72902c1668c77717636fc7294d8?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5100f20cca3aa6af27ea157890867bef180c72902c1668c77717636fc7294d8?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5100f20cca3aa6af27ea157890867bef180c72902c1668c77717636fc7294d8?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&" 
                className="grow aspect-[0.85]" />
              </div>
            
          </div>
          <div className="flex mx-auto xss:gap-3 xss:mt-4 xs:gap-4">
            <div className="text-xs text-gray-400">{IconoCirculo}</div>
            <div className="text-xs text-black">{IconoCirculo}</div>
            <div className="text-xs text-black">{IconoCirculo}</div>
          </div>
        </div>
        
        {/* Definicion del contenedor de la oferta dos */}
        <div className="flex flex-col xss:ml-0 xss:flex-col xss:mt-3 xss:w-full">
          <div className="flex flex-col">
            {/* Contenedor segunda oferta */}
            <div className="flex bg-black rounded-lg xss:w-full xss:pt-2 xss:pl-3 xs:pt-3 xs:pl-4">
              {/* Columna uno */}
              <div className="flex flex-col xss:w-1/2">
                {/* Definicon de multiples filas */}
                <div className="flex flex-col my-auto items-center text-white">
                  {/* Titulo del la oferta */}
                  <div className="text-center text-yellow-400 font-medium uppercase xss:text-xs xs:text-base">
                    SUMMER SALES
                  </div>
                  {/* Producto ofertado */}
                  <div className="text-center font-semibold xss:text-sm xss:mt-1.5 xs:text-xl">
                    NEW GOOGLE PIXEL 6 PRO
                  </div>
                  {/* Boton comprar ahora */}
                  <button className="flex bg-orange-400 justify-center rounded-xl font-bold uppercase xss:p-1.5 xss:mt-2 xss:text-[10px] xs:text-xs">
                    COMPRAR AHORA<div className="ml-0.5">{IconoFlecha}</div>
                  </button>
                </div>
              </div>

              {/* Columna dos */}
              <div className="flex flex-col xss:w-1/2 xss:ml-1 ">
                {/* Definicion de multiples filas */}
                <div className="flex flex-col font-bold">
                  {/* Descuento en porcentaje */}
                  <div className="justify-center self-end bg-amber-300 xss:px-2 xss:py-1.5 xss:mr-6 xss:text-[8px] xs:text-[10px]">
                    29% OFF
                  </div>
                  {/* Imagen del producto */}
                  <img
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&"
                    className="rounded-ee-lg w-full aspect-[1.18]"
                  />
                </div>
              </div>
            </div>

            {/* Definicion del contenedor de la oferta tres */}
            <div className="justify-center bg-gray-100 rounded-md xss:mt-3 xss:py-2 xss:px-3 xss:w-full">
              <div className="flex xss:items-center">
                <div className="flex flex-col xss:w-1/2">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&"
                    className="my-auto aspect-square"
                  />
                </div>
                <div className="flex flex-col xss:ml-1 xss:w-1/2 xss:items-center">
                  <div className="text-center font-semibold xss:text-sm xs:text-base">Xioami FlipBuds Pro</div>
                  <div className="text-center text-sky-400 xss:mt-3 xss:text-base xs:text-lg ">$299 USD</div>
                  <button className="flex bg-orange-400 text-white justify-center rounded-xl font-bold uppercase xss:p-1.5 xss:mt-2 xss:text-[10px] xs:text-xs">
                      COMPRAR AHORA<div className="ml-0.5">{IconoFlecha}</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>        
      </div>
    </div>
  );
}
