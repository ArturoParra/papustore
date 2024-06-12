import { Producto } from "./producto";

// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export function Mventas()
{
    // Definicion de los iconos
    const IconoFlecha = <FontAwesomeIcon className="my-auto" icon={fas.faArrowRight} />
    const IconoCorazon = <FontAwesomeIcon className="my-auto" icon={fas.faHeart} />;
    const IconoCarrito = <FontAwesomeIcon icon={fas.faCartShopping} />;
    const IconoVer = <FontAwesomeIcon icon={fas.faEye} />;
    const IconoEstrella = <FontAwesomeIcon className="my-auto bg-white" icon={fas.faStar} />

    return(
    //Seccion de las mejores ventas
    <div className="w-10/12 mx-auto mt-6">
        {/* Contenedor del temporizador */}
        <div className="flex flex-col gap-3 items-center w-full sm:flex-row sm:justify-between">
            {/* Izquierda */}
            <div className="flex flex-col items-center gap-3 sm:flex-row">
                {/* Titulo */}
                <div className="font-semibold text-xl xs:text-xl sm:text-sm lg:text-base xl:text-lg xxl:text-xl full:text-2xl">
                    Top ventas
                </div>
                {/* Timer */}
                <div className="flex flex-col items-center gap-3 sm:flex-row">
                    <div className="text-base xs:text-lg sm:text-sm lg:text-base xl:text-lg xxl:text-xl full:text-2xl">
                        Se actualiza en:
                    </div>
                    <div className=" bg-yellow-300 font-semibold px-1 rounded-md text-base xs:text-lg sm:text-sm lg:text-base xl:text-lg xxl:text-xl full:text-2xl">
                        16d : 21h: 57m: 23s
                    </div>
                </div>
            </div>
            {/* Derecha */}
            <div className="flex text-blue-500 hover:text-blue-900 hover:cursor-pointer text-base xs:text-lg sm:text-sm lg:text-base xl:text-lg xxl:text-xl full:text-2xl">
                Ver todos<div className="ml-3 mt-1.5 text-xs sm:mt-1">{IconoFlecha}</div>
            </div>
        </div>

        {/* Contenedor de los productos */}
        <div className="flex flex-col mt-6 w-full sm:mt-3 md:flex-row">
            {/* Oferta lateral */}
            <div className="flex flex-col border border-solid border-gray-200 p-3 md:w-1/4">
                {/* Imagen de la oferta */}
                <img 
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9d192b3be000bd8992a2be4c4b622dbd8ab1608e159b5b5082921f4659e90a39?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9d192b3be000bd8992a2be4c4b622dbd8ab1608e159b5b5082921f4659e90a39?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9d192b3be000bd8992a2be4c4b622dbd8ab1608e159b5b5082921f4659e90a39?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9d192b3be000bd8992a2be4c4b622dbd8ab1608e159b5b5082921f4659e90a39?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9d192b3be000bd8992a2be4c4b622dbd8ab1608e159b5b5082921f4659e90a39?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9d192b3be000bd8992a2be4c4b622dbd8ab1608e159b5b5082921f4659e90a39?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9d192b3be000bd8992a2be4c4b622dbd8ab1608e159b5b5082921f4659e90a39?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9d192b3be000bd8992a2be4c4b622dbd8ab1608e159b5b5082921f4659e90a39?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&" 
                className=" aspect-[1.2]"
                />
                {/* Calificacion del producto en estrellas */}
                <div className="flex text-yellow-700 gap-1 mt-4 text-sm sm:text-base md:text-xs lg:text-sm xl:text-base xxl:text-lg full:text-xl">
                    <div>{IconoEstrella}</div>
                    <div>{IconoEstrella}</div>
                    <div>{IconoEstrella}</div>
                    <div>{IconoEstrella}</div>
                    <div>{IconoEstrella}</div>
                    <div className="text-black">(738)</div>
                </div>
                {/* Titulo */}
                <div className="mt-4 font-semibold text-sm xs:text-base md:text-[9.5px] md:leading-normal md:text-justify lg:text-xs xl:text-lg xxl:text-xl full:text-2xl">
                    Xbox Series S-512GB SSD Console with Wireless Controller - EU Version
                </div>
                {/* Precio */}
                <div className="flex mt-4 md:justify-normal">
                    {/* Sin descuento tachado */}
                    <div className="text-gray-500 line-through text-base xs:text-lg md:text-sm lg:text-base xl:text-xl xxl:text-2xl full:text-3xl">
                        $865.99
                    </div>
                    {/* Con descuento */}
                    <div className="text-sky-400 ml-2 text-base xs:text-lg md:text-sm lg:text-base xl:text-xl xxl:text-2xl full:text-3xl">
                        $442.12
                    </div>
                </div>
                {/* Descripcion */}
                <div className="mt-4 text-gray-500 text-sm xs:text-base md:text-[9.5px] md:leading-normal md:text-justify lg:text-xs xl:text-lg xxl:text-xl full:text-2xl">
                    Games built using the Xbox Series X|S development kit showcase unparalleled load times, visual
                </div>
                {/* Contenedor funciones para el usuario */}
                <div className="flex mt-6 mb-2 justify-between">
                    {/* Agregar a favoritos */}
                    <div className="text-white bg-black rounded-md p-2 text-xs xs:text-sm md:p-1 md:text-[8px] md:leading-normal lg:text-xs xl:text-base xxl:text-lg full:text-xl hover:bg-red-400">
                        {IconoCorazon}
                    </div>
                    {/* Agregar a carrito */}
                    <div className="flex w-full justify-center mx-1  items-center bg-orange-400 px-1.5 rounded-xl font-semibold text-white text-[11px] xs:text-sm md:text-[6px] md:leading-normal lg:text-[8px] xl:text-xs xxl:text-base full:text-lg">
                        <div>{IconoCarrito}</div>
                        <div className="ml-2 md:ml-0.5 lg:ml-2">AGREGAR AL CARRITO</div>
                    </div>
                    {/* Ver producto en vista producto */}
                    <div className="text-white bg-black rounded-md p-2 text-xs xs:text-sm md:p-1 md:text-[8px] md:leading-normal lg:text-xs xl:text-base xxl:text-lg full:text-xl">
                        {IconoVer}
                    </div>
                </div>
            </div>
            {/* Contenedor de la red de productos */}
            <div className="grid gap-x-2 xs:grid-cols-2 md:flex md:flex-col md:w-3/4 md:gap-2">
                {/* Fila uno */}
                <div className="md:flex md:flex-grow">
                    <div className="md:w-1/4"><Producto/></div>
                    <div className="md:w-1/4"><Producto/></div>
                    <div className="md:w-1/4"><Producto/></div>
                    <div className="md:w-1/4"><Producto/></div>
                </div>
                {/* Fila dos */}
                <div className="md:flex md:flex-grow">
                    <div className="md:w-1/4"><Producto/></div>
                    <div className="md:w-1/4"><Producto/></div>
                    <div className="md:w-1/4"><Producto/></div>
                    <div className="md:w-1/4"><Producto/></div>
                </div>
            </div>
        </div>
    </div>
    );
}