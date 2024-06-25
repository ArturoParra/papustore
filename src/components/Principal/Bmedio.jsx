// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export function Bmedio( {productos} ) {

    const IconoFlecha = <FontAwesomeIcon icon={fas.faArrowRight} />;

    const handleProductLeft = () => {
        window.location.href = `/producto/${productos[0]?.id}`;
    }

    const handleProductRight = () => {
        window.location.href = `/producto/${productos[1]?.id}`;
    }
    
    return (
        <div className="flex flex-col w-10/12 mx-auto mt-12 md:flex-row">
            <div className="flex flex-col gap-2 md:flex-row w-full">
                <div className="flex items-center bg-gray-100 rounded-xl p-4 md:w-1/2">
                    <div className="flex flex-col w-full md:w-1/2 items-start">
                        <div className="text-white bg-sky-400 rounded-xl font-semibold text-[9px] p-1">
                            BRAND NEW
                        </div>

                        <div className="mt-2 font-semibold text-sm w-11/12">
                            {productos[0]?.title}
                        </div>

                        <div className="mt-2 text-gray-400 text-xs">
                            {productos[0]?.description}
                        </div>

                        <button className="flex bg-orange-400 text-white justify-center rounded-xl font-bold uppercase p-1.5 mt-2 text-[8px]" onClick={handleProductLeft}>
                            BUY NOW<div className="ml-0.5">{IconoFlecha}</div>
                        </button>
                    </div>

                    <div className="flex flex-col w-full md:w-1/2 items-center">
                        <img
                            loading="lazy"
                            srcSet={productos[0]?.thumbnail}
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
                                HOT DEAL
                            </div>

                            {/* Producto ofertado */}
                            <div className="mt-2 font-semibold text-sm w-11/12">
                                {productos[1]?.title}
                            </div>

                            <div className="mt-2 text-gray-400 text-xs">
                                {productos[1]?.description}
                            </div>
                            {/* Boton comprar ahora */}
                            <button className="flex bg-orange-400 text-white justify-center rounded-xl font-bold uppercase p-1.5 mt-2 mb-4 text-[8px]" onClick={handleProductRight}>
                                BUY NOW<div className="ml-0.5">{IconoFlecha}</div>
                            </button>
                        </div>
                    </div>

                    {/* Contenedor derecho */}
                    <div className="flex flex-col w-full md:w-1/2 ml-1 h-full">
                        {/* Definicion de multiples filas */}
                        <div className="flex flex-col font-bold h-full">
                            {/* Descuento en porcentaje */}
                            <div className="absolute flex justify-center items-center self-end bg-sky-400 text-white rounded-full p-2 mr-1 text-[10px] w-12 h-12">
                                ${productos[1]?.priceWithDiscount}
                            </div>
                            {/* Imagen del producto */}
                            <img
                                srcSet={productos[1]?.thumbnail}
                                className="rounded-ee-lg mt-5 w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}