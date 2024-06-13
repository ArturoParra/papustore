import { Producto } from "./producto";
import { Categoria } from "./categoria";

// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Tarjetap } from "./tarjetap";


export function Productos()
{
    // Definicion de los iconos
    const IconoFlecha = <FontAwesomeIcon icon={fas.faArrowRight} />

    return(
        //Seccion de las mejores ventas
        <div className="w-9/12 mx-auto m-12">
            
            <div className="flex flex-col justify-between gap-10">
                
                <div className="w-full">

                    <div className="font-semibold">
                        FLASH SALE TODAY
                    </div>
                    

                    <div>
                        <div className="mt-3 border border-solid border-gray-200">
                            <Tarjetap/>
                        </div>

                        <div className="mt-3 border border-solid border-gray-200">
                            <Tarjetap/>
                        </div>

                        <div className="mt-3 border border-solid border-gray-200">
                            <Tarjetap/>
                        </div>
                    </div>
                </div>


                <div className="w-full">
                    <div className="font-semibold">
                    BEST SELLERS
                    </div>

                    <div>
                        <div className="mt-3 border border-solid border-gray-200">
                            <Tarjetap/>
                        </div>

                        <div className="mt-3 border border-solid border-gray-200">
                            <Tarjetap/>
                        </div>

                        <div className="mt-3 border border-solid border-gray-200">
                            <Tarjetap/>
                        </div>
                    </div>
                </div>


                <div className="w-full">
                    <div className="font-semibold">
                    TOP RATED
                    </div>

                    <div>
                        <div className="mt-3 border border-solid border-gray-200">
                            <Tarjetap/>
                        </div>

                        <div className="mt-3 border border-solid border-gray-200">
                            <Tarjetap/>
                        </div>

                        <div className="mt-3 border border-solid border-gray-200">
                            <Tarjetap/>
                        </div>
                    </div>
                </div>


                <div className="w-full">
                    <div className="font-semibold">
                    NEW ARRIVAL
                    </div>

                    <div>
                        <div className="mt-3 border border-solid border-gray-200">
                            <Tarjetap/>
                        </div>

                        <div className="mt-3 border border-solid border-gray-200">
                            <Tarjetap/>
                        </div>

                        <div className="mt-3 border border-solid border-gray-200">
                            <Tarjetap/>
                        </div>
                    </div>
                </div>
            </div>
           
            
            

        </div>
    );
}


























