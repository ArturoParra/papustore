// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export function Bmedio() {
    const IconoFlecha = <FontAwesomeIcon icon={fas.faArrowRight} />;
    
    return (
        <div className="flex flex-col w-10/12 mx-auto mt-12 md:flex-row">
            <div className="flex flex-col gap-2 md:flex-row w-full">
                <div className="flex items-center bg-gray-100 rounded-xl p-4 md:w-1/2">
                    <div className="flex flex-col w-full md:w-1/2 items-start">
                        <div className="text-white bg-sky-400 rounded-xl font-semibold text-[9px] p-1">
                            PRESENTAMOS
                        </div>

                        <div className="mt-2 font-semibold text-sm w-11/12">
                            Nueva Apple Homepod Mini
                        </div>

                        <div className="mt-2 text-gray-400 text-xs">
                            Repleto de innovación, el HomePod mini ofrece resultados inesperados.
                        </div>

                        <button className="flex bg-orange-400 text-white justify-center rounded-xl font-bold uppercase p-1.5 mt-2 text-[8px]">
                            COMPRAR AHORA<div className="ml-0.5">{IconoFlecha}</div>
                        </button>
                    </div>

                    <div className="flex flex-col w-full md:w-1/2 items-center">
                        <img
                            loading="lazy"
                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1df9d46754e2f8c7b3ae30233de0c9e68148f8ace673f842be229fd834a996a7?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&"
                            className="my-auto aspect-square"
                        />
                    </div>
                </div>

                {/* Contenedor derecho */}
                <div className="flex bg-black rounded-xl w-full pt-4 pl-3 md:w-1/2">
                    {/* Columna uno */}
                    <div className="flex flex-col w-full md:w-1/2">
                        {/* Definicion de multiples filas */}
                        <div className="flex flex-col my-auto items-start text-white">
                            <div className="text-black bg-yellow-400 rounded-xl font-semibold text-[9px] p-1">
                                LANZAMIENTO
                            </div>

                            {/* Producto ofertado */}
                            <div className="mt-2 font-semibold text-sm w-11/12">
                                XIOAMI MI 11 ULTRA
                            </div>

                            <div className="mt-2 text-gray-400 text-xs">
                                *Datos proporcionados por laboratorios internos. Medición de la industria.
                            </div>
                            {/* Boton comprar ahora */}
                            <button className="flex bg-orange-400 text-white justify-center rounded-xl font-bold uppercase p-1.5 mt-2 mb-4 text-[8px]">
                                COMPRAR AHORA<div className="ml-0.5">{IconoFlecha}</div>
                            </button>
                        </div>
                    </div>

                    {/* Contenedor derecho */}
                    <div className="flex flex-col w-full md:w-1/2 ml-1 h-full">
                        {/* Definicion de multiples filas */}
                        <div className="flex flex-col font-bold h-full">
                            {/* Descuento en porcentaje */}
                            <div className="absolute flex justify-center items-center self-end bg-sky-400 text-white rounded-full p-2 mr-1 text-[10px] w-12 h-12">
                                $590
                            </div>
                            {/* Imagen del producto */}
                            <img
                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bab3fc3f6734a24f872e9f592d8065ef1911403e59145a39ed761bbf791deb5?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&"
                                className="rounded-ee-lg mt-5 w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}