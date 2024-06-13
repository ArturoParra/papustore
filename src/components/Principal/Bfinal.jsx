import { Producto } from "./producto";
import { Categoria } from "./categoria";

// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";


export function Bfinal()
{
    // Definicion de los iconos
    const IconoFlecha = <FontAwesomeIcon icon={fas.faArrowRight} />

    return(
        //Seccion de las mejores ventas
        <div className="w-10/12 mx-auto m-12 bg-orange-100 rounded-md">
            
            <div className="flex flex-col w-full p-4">
                
                <div className="flex flex-col ml-1 items-center">

                    <div className="text-white bg-sky-400 rounded-xl font-semibold text-[9px] p-1">
                        Ahorra $200.00
                    </div>

                    <div className="mt-2 text-center font-semibold text-sm">
                        Macbook Pro
                    </div>

                    <div className="mt-2 text-xs text-center">
                        Repleto de innovación, el HomePod mini ofrece resultados inesperados.
                    </div>

                    <button className="flex bg-orange-400 text-white justify-center rounded-xl font-bold uppercase p-1.5 mt-2 text-[10px]">
                    COMPRAR AHORA<div className="ml-0.5">{IconoFlecha}</div>
                    </button>
                </div>

                
                


                
                <div className="flex flex-col m-auto w-full relative">
                <div className="flex absolute w-1/6 aspect-1 justify-center items-center left-0 bg-orange-200 border-2 border-white  text-black font-semibold rounded-full text-[8px] xs:text-[11px] xs:border-1 sm:text-[10px] sm:border-2 md:text-xs md:border-3 lg:text-base lg:border-4 xl:text-lg xl:border-5 xxl:text-xl xxl:border-6">
                  $299
                </div>
                <img
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b2cd5bea55d3d7c5071befb489548638fb00fe5f444635c273300c3838e03554?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b2cd5bea55d3d7c5071befb489548638fb00fe5f444635c273300c3838e03554?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b2cd5bea55d3d7c5071befb489548638fb00fe5f444635c273300c3838e03554?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b2cd5bea55d3d7c5071befb489548638fb00fe5f444635c273300c3838e03554?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b2cd5bea55d3d7c5071befb489548638fb00fe5f444635c273300c3838e03554?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b2cd5bea55d3d7c5071befb489548638fb00fe5f444635c273300c3838e03554?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b2cd5bea55d3d7c5071befb489548638fb00fe5f444635c273300c3838e03554?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b2cd5bea55d3d7c5071befb489548638fb00fe5f444635c273300c3838e03554?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&"
                  className="w-full"
                />
              </div>
                
            </div>
        </div>
    );
}