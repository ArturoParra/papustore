// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";


export function Bfinal({ producto }) {
    // Definicion de los iconos
    const IconoFlecha = <FontAwesomeIcon icon={fas.faArrowRight} />

    // Funcion para mostrar el producto mas caro
    const handleExpensiveProduct = () => {
        window.location.href = `/producto/${producto.id}`;
    }

    return (
        //Seccion de las mejores ventas
        <div className="w-10/12 mx-auto m-12 bg-gray-800 rounded-md">

            <div className="flex flex-col w-full p-4 md:flex-row">

                <div className="flex flex-col ml-1 items-center md:w-1/2 md:gap-2 md:justify-center">

                    <div className="text-white uppercase bg-gold-500 rounded-xl font-semibold text-[9px] p-1 md:text-xl">
                        {producto?.category}
                    </div>

                    <div className="mt-2 text-yellow-600 text-center font-bold text-sm md:text-xl">
                        {producto?.title}
                    </div>

                    <div className="mt-2 text-yellow-600 text-xs text-center md:text-xl">
                        {producto?.description}
                    </div>

                    <button className="flex text-white justify-center rounded-xl font-bold uppercase p-1.5 mt-2 text-[10px] md:text-xl" onClick={handleExpensiveProduct}>
                        SHOP NOW<div className="ml-0.5">{IconoFlecha}</div>
                    </button>
                </div>

                <div className="flex flex-col m-auto w-full relative md:w-1/2">
                    <div className="flex absolute w-1/6 h-1/6 rounded-full justify-center items-center left-0 bg-yellow-600 border-2 border-white text-gray-800 font-semibold text-[8px] p-10 xs:text-[11px] xs:border-2 sm:text-[10px] sm:border-2 md:text-xs md:border-2 lg:text-base lg:border-2 xl:text-lg xl:border-2 xxl:text-xl xxl:border-6">
                        ${producto?.price}
                    </div>
                    <img
                        srcSet={producto?.thumbnail}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}