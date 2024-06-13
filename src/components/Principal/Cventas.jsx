import { Producto } from "./producto";
import { Categoria } from "./categoria";

// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";


export function Cventas()
{
    // Definicion de los iconos
    const IconoFlechaI = <FontAwesomeIcon className="my-auto bg-white" icon={fas.faCircleArrowLeft} />
    const IconoFlechaD = <FontAwesomeIcon className="my-auto bg-white" icon={fas.faCircleArrowRight} />
    
    return(
        <div className="w-10/12 mx-auto mt-12">

            <div className="flex justify-center font-semibold text-md">Comprar por categoria</div>
            
            <div className="relative mt-2">
                <div className="absolute top-1/2 -ml-4 text-4xl text-orange-400 hover:cursor-pointer">
                    {IconoFlechaI}
                </div>

                <div className="flex gap-3">
                    <Categoria/>
                    <Categoria/>
                    <Categoria/>
                    <Categoria/>
                    <Categoria/>
                    <Categoria/>
                </div>
                
                <div className="absolute top-1/2 left-full -ml-4 text-4xl text-orange-400 hover:cursor-pointer">
                    {IconoFlechaD}
                </div>
            </div>
        </div>
    );
}