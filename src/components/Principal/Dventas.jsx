import { Producto } from "./producto";
import { Categoria } from "./categoria";

// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";


export function Dventas()
{
    // Definicion de los iconos
    const IconoFlecha = <FontAwesomeIcon className="my-auto" icon={fas.faArrowRight} />
    const IconoCorazon = <FontAwesomeIcon className="my-auto" icon={fas.faHeart} />;
    const IconoCarrito = <FontAwesomeIcon icon={fas.faCartShopping} />;
    const IconoVer = <FontAwesomeIcon icon={fas.faEye} />;
    const IconoEstrella = <FontAwesomeIcon className="my-auto bg-white" icon={fas.faStar} />

    return(
    //Seccion de los productos destacados
    <div className="w-10/12 mx-auto mt-12">
        {/* Contenedor de los productos */}
        <div className="flex flex-col w-full md:flex-row">
            {/* Oferta lateral */}
            <div className="flex flex-col w-full bg-amber-200 p-2 md:w-1/4">
                {/* Titulo */}
                <div className="flex mt-4 text-orange-700 font-semibold justify-center text-[14px] xs:text-lg sm:text-2xl md:text-[9px] md:mt-2 md:leading-normal lg:text-xs xl:text-base xxl:text-xl full:text-2xl">
                    COMPUTADORAS Y ACCESORIOS
                </div>
                {/* Descuento */}
                <div className="flex mt-2 font-bold justify-center text-xl xs:text-2xl sm:text-3xl md:text-sm md:mt-2 md:leading-normal lg:text-lg xl:text-2xl xxl:text-[28px] full:text-3xl">
                    32% DE DESCUENTO
                </div>
                {/* Descripcion */}
                <div className="flex mt-2 text-gray-500 justify-center text-xs xs:text-sm sm:text-base md:text-[8px] md:leading-normal lg:text-[11px] xl:text-sm xxl:text-lg full:text-xl">
                    En todos los productos de electronica
                </div>
                {/* Timer */}
                <div className="flex justify-center items-center gap-1 mt-4">
                    <div className="text-sm sm:text-base md:text-[10px] md:leading-normal lg:text-xs xl:text-base xxl:text-xl full:text-2xl">
                        Termina en:
                    </div>
                    <div className="bg-white font-semibold px-1 rounded-md text-sm sm:text-base md:text-[10px] md:leading-normal lg:text-xs xl:text-base xxl:text-xl full:text-2xl">
                        8d : 21h: 57m: 23s
                    </div>
                </div>
                {/* Comprar */}
                <button className="flex w-8/12 mx-auto text-white bg-orange-400  justify-center rounded-xl font-bold uppercase p-1.5 m-6 text-xs xs:text-base sm:text-lg md:text-[8px] md:leading-normal md:mx-auto md:m-4 lg:text-[11px] xl:text-sm xxl:text-base full:text-xl">
                        COMPRAR AHORA<div className="ml-2">{IconoFlecha}</div>
                </button>
                {/* Imagen de la oferta */}
                <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/31a46dbd8c4b308cf0cf876581c66b1feda833724476e90fbfbf2e09798904d2?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/31a46dbd8c4b308cf0cf876581c66b1feda833724476e90fbfbf2e09798904d2?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/31a46dbd8c4b308cf0cf876581c66b1feda833724476e90fbfbf2e09798904d2?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/31a46dbd8c4b308cf0cf876581c66b1feda833724476e90fbfbf2e09798904d2?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/31a46dbd8c4b308cf0cf876581c66b1feda833724476e90fbfbf2e09798904d2?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/31a46dbd8c4b308cf0cf876581c66b1feda833724476e90fbfbf2e09798904d2?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/31a46dbd8c4b308cf0cf876581c66b1feda833724476e90fbfbf2e09798904d2?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/31a46dbd8c4b308cf0cf876581c66b1feda833724476e90fbfbf2e09798904d2?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&"
                    className="w-full aspect-square"
                />
            </div>

            <div className="flex flex-col w-full mt-4 sm:rela md:w-3/4 md:mt-0">
                {/* Contenedor del selector*/}
                <div className="flex flex-col items-center gap-1 sm:flex-row  sm:justify-between sm:gap-0 md:ml-2">
                    {/* Izquierda */}
                    <div className="font-semibold text-xl xs:text-2xl sm:text-sm lg:text-base xl:text-lg xxl:text-xl full:text-2xl">
                        Productos Destacados
                    </div>
                    {/* Derecha */}
                    <div className="flex flex-col items-center text-center text-base xs:text-lg sm:flex-row sm:gap-2 sm:text-sm lg:text-base lg:gap-3 xl:text-lg xl:gap-5 xxl:text-xl xxl:gap-6 full:text-2xl">
                        {/* Categorias destacatas */}
                        <div>Todos</div>
                        <div>Celulares</div>
                        <div>Laptops</div>
                        <div>Audifonos</div>
                        <div>TV</div>
                        {/* Ver todo */}
                        <div className="flex items-center text-blue-500 hover:text-blue-900 hover:cursor-pointer text-base xs:text-lg sm:text-sm lg:text-base xl:text-lg xxl:text-xl full:text-2xl">
                            <div>Ver todos</div>
                            <div className=" ml-2 mt-1.5 text-xs">{IconoFlecha}</div>
                        </div>
                    </div>
                </div>
                {/* Contenedor de la red de productos */}
                <div className="grid gap-x-2 mt-1 xs:grid-cols-2 md:flex md:flex-col md:flex-grow md:gap-2">
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
    </div>
    );
}