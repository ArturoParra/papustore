import { Producto } from "./producto";
import { Categoria } from "./categoria";

// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";


export function Accesorios()
{
    // Definicion de los iconos
    const IconoFlecha = <FontAwesomeIcon icon={fas.faArrowRight} />

    return(
        //Seccion de accesorio de computadoras
        <div className="w-10/12 mx-auto m-12">

            <div className="flex flex-col-reverse mt-4 ">

            <div className="flex flex-col">

            <div className="flex flex-col mt-6">
                <div className="font-semibold text-center">
                    Accesorios Destacados
                </div>

                <div className="flex flex-col text-center gap-1">
                    <div>Todos</div>
                    <div>Teclados y Mouse</div>
                    <div>Audifonos</div>
                    <div>Camara</div>
                    <div>Impresora</div>

                    <div className="flex justify-center text-blue-500 hover:text-blue-900 hover:cursor-pointer">
                        <div>Ver todos</div>
                        <div className=" ml-2 mt-1.5 text-xs">{IconoFlecha}</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">

                <div className="flex">
                    <div className="flex flex-col w-full">
                        <div><Producto/></div>
                        <div><Producto/></div>
                        <div><Producto/></div>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex flex-col w-full">
                        <div><Producto/></div>
                        <div><Producto/></div>
                        <div><Producto/></div>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex flex-col w-full">
                        <div><Producto/></div>
                        <div><Producto/></div>
                        <div><Producto/></div>
                    </div>
                </div>
            </div>
            </div>
                
                
                <div className="flex flex-col w-full">

                    <div className="bg-amber-200 rounded-md">

                        <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&"
                        className="w-full mx-auto aspect-square max-w-[108px] mt-6"
                        />

                        <div className="flex mt-2 text-orange-700 font-semibold justify-center">
                            Xioami True Wireless Eartbus
                        </div>

                        <div className="flex my-2 text-gray-500 text-sm text-center">
                            Escape the noise, It’s time to hear the magic with Xiaomi Earbuds.
                        </div>

                        <div className="flex justify-center items-end text-base gap-4 mt-2">
                            <div>
                                Solo por:
                            </div>

                            <div className=" bg-white font-semibold px-1 rounded-md">
                                $299 USD
                            </div>
                        </div>

                        <button className="flex w-9/12 mx-auto text-white bg-orange-400  justify-center rounded-xl font-bold uppercase p-1.5 m-6">
                                COMPRAR AHORA<div className="ml-2">{IconoFlecha}</div>
                        </button>
                    </div>




                    {/* Anuncion inferior */}
                    <div className="flex flex-col mt-6 rounded-md bg-cyan-900 p-8">
                        <div className="mx-auto bg-cyan-800 rounded-md text-white font-semibold p-1.5">
                            SUMMER SALES
                        </div>

                        <div className="mt-2 text-white font-bold text-xl text-center">
                            37% DE DESCUENTO
                        </div>

                        <div className="mt-2 text-yellow-300 font-semibold text-center">
                            Solo En Celurales
                        </div>

                        <button className="flex w-9/12 mx-auto text-white text-xs bg-sky-400  justify-center rounded-xl font-bold uppercase p-1.5 mt-4">
                            COMPRAR AHORA<div className="ml-2">{IconoFlecha}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}