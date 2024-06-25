// Importacion para iconos
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import  '../../styles/Animaciones.css';

export function Producto({producto}) {

  // Definicion de los iconos
  const IconoEstrellaVacia = <FontAwesomeIcon className="text-yellow-700" icon={farStar} />
  const IconoMediaEstrella = <FontAwesomeIcon className="my-auto text-yellow-700 bg-white" icon={fas.faStarHalfAlt} />
  const IconoEstrella = <FontAwesomeIcon className="my-auto text-yellow-700 bg-white" icon={fas.faStar} />
  

  const obtenerEstrellas = (rating) => {
    let estrellas = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            estrellas.push(<span key={i} className="twinkle">{IconoEstrella}</span>);
        } else if (rating >= i - 0.7 && rating <= i - 0.3) {
            estrellas.push(<span key={i} className="twinkle">{IconoMediaEstrella}</span>);
        } else {
            estrellas.push(<span key={i}>{IconoEstrellaVacia}</span>);
        }
    }
    return estrellas;
}


  return (
    <div className="flex flex-col border border-solid border-gray-200 p-2 mt-2 md:mt-0 md:h-full md:ml-2">
      
      <img
        loading="lazy"
        srcSet={producto.thumbnail}
        className="hover:cursor-pointer w-full aspect-[1.5] md:h-full px-2.5 py-3.5"
        onClick={() => { window.location.href = `/producto/${producto.id}`; }}
      />


      
      <div className="flex gap-1 justify-center text-sm sm:text-base md:text-xs lg:text-sm xl:text-base full:text-lg">
      {obtenerEstrellas(producto.rating).map((estrella, index) => (
        <React.Fragment key={index}>
          {estrella}
        </React.Fragment>
      ))}
      </div>
      

      <div className="mt-2 leading-5 text-zinc-900 text-center text-sm sm:text-lg md:text-[10px] md:leading-normal lg:text-xs xl:text-base full:text-lg">
        {producto.title}
      </div>
      
      <div className="mt-2 font-semibold text-sky-400 text-center text-base sm:text-lg md:text-xs lg:text-sm xl:text-base full:text-lg">
        ${producto.price}
      </div>
    </div>
  );
}
