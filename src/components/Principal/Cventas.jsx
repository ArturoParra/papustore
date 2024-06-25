import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { Categoria } from "./categoria";

export function Cventas({ productos }) {

  const IconoFlechaI = <FontAwesomeIcon className="my-auto bg-transparent" icon={fas.faCircleArrowLeft} />;
  const IconoFlechaD = <FontAwesomeIcon className="my-auto bg-transparent" icon={fas.faCircleArrowRight} />;
  
  const [categoriasConStock, setCategoriasConStock] = useState([]);
  const contenedorRef = useRef(null);

  useEffect(() => {
    const productosconstock = productos.filter(producto => producto.stock > 0);
    const categoriasConStock = [...new Set(productosconstock.map(producto => producto.category))];
    const productosCategoria = categoriasConStock.map(categoria => {
      const producto = productosconstock.find(producto => producto.category === categoria);
      return { thumbnail: producto.thumbnail, category: producto.category };
    });
    setCategoriasConStock(productosCategoria);
  }, [productos]);

  const scrollIzquierda = () => {
    if (contenedorRef.current) {
      if (contenedorRef.current.scrollLeft === 0) {
        contenedorRef.current.scrollLeft = contenedorRef.current.scrollWidth;
      } else {
        contenedorRef.current.scrollLeft -= 200;
      }
    }
  };

// Funcion para hacer scroll a la derecha
const scrollDerecha = () => {
    if (contenedorRef.current) {
      const scrollAmount = 200; // Incremento de scroll fijo
      const maxScrollLeft = contenedorRef.current.scrollWidth - contenedorRef.current.clientWidth;
      let newScrollLeft = contenedorRef.current.scrollLeft + scrollAmount;
  
      // Ajuste para volver al inicio de manera suave y mantener el scroll infinito
      if (newScrollLeft >= maxScrollLeft) {
        newScrollLeft = 0; // Volver al inicio
      }
  
      contenedorRef.current.scrollLeft = newScrollLeft;
    }
  };

  
  return (
    <div className="w-10/12 mx-auto mt-12">
      <div className="flex justify-center font-semibold text-md">COMPRAR POR CATEGORIA</div>
      
      <div className="relative mt-2">
        <div 
          className="absolute top-1/2 -ml-4 text-4xl text-orange-400 hover:cursor-pointer" 
          onClick={scrollIzquierda}
        >
          {IconoFlechaI}
        </div>

        <div ref={contenedorRef} className="flex gap-3 overflow-x-auto" style={{ overflowX: 'hidden', whiteSpace: 'nowrap' }}>
          {categoriasConStock.length > 0 && categoriasConStock.concat(categoriasConStock).map((categoria, index) => (
            <Categoria key={index} categorias={categoria} />
          ))}
        </div>

        <div 
          className="absolute top-1/2 right-0 -mr-4 text-4xl text-orange-400 hover:cursor-pointer" 
          onClick={scrollDerecha}
        >
          {IconoFlechaD}
        </div>
      </div>
    </div>
  );
}
