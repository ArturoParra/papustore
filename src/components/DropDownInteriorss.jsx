import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Tarjetap } from "../components/Principal/tarjetap";

export function DropDownInteriorss({ Categoria, Productos })
{
  const IconoFlecha = <FontAwesomeIcon className="ml-2" icon={fas.faChevronRight} />;

    // Estado para alamacenar el los productos de la categoria seleccionada
    const [ProductosCategoria, setProductosCategoria] = React.useState([]);

    // Definir las marcas
    const [MarcaSeleccionada, setMarcaSeleccionada] = useState("All");

    // Estado para almacenar los productos filtrados por marca
    const [ProductosMarca, setProductosMarca] = useState([]);

    // Filtrar los productos de la categoria seleccionada que tengan stock
    useEffect(() => 
    {
        const ProductosCategoria = Productos.filter((producto) => producto.category === Categoria && producto.stock > 0);
        setProductosCategoria(ProductosCategoria);
    }, [Productos, Categoria]);

    // Filtrar los productos de la categoria seleccionada por marca
    useEffect(() => 
    {
        const ProductosFiltrados = ProductosCategoria.filter((producto) => MarcaSeleccionada === "All" || producto.brand === MarcaSeleccionada);
        setProductosMarca(ProductosFiltrados);
    }, [ProductosCategoria, MarcaSeleccionada]);



    // Estado para almacenar las marcas de los productos de la categoria seleccionada
    const [Marcas, setMarcas] = React.useState([]);

    // Funcion para obtener las marcas de los productos de la categoria seleccionada
    useEffect(() => 
    {
        // Obtener las marcas de los productos de la categoria seleccionada
        const MarcasUnicas = [...new Set(ProductosCategoria.map((producto) => producto.brand))];
        
        // Si no hay marcas se agrega la marca "All"
        if(MarcasUnicas[0] === "")
        {
            MarcasUnicas[0] = "All";
        }
        else
        {
            MarcasUnicas.unshift("All");
        }

        // Almacenar las marcas de los productos de la categoria seleccionada en el estado
        setMarcas(MarcasUnicas);
    }, [ProductosCategoria]);


  // Funcion para seleccionar una marca y aplicar el filtro
  const SeleccionarMarca = (marca) => {
    if (marca === "All")
    {
      setMarcaSeleccionada("All");
    } else {
      setMarcaSeleccionada(marca);
    }
    
  };

  

  // Definicion  onMouseEnter -> En el selector
  const [ElementoSobre, SetElementoSobre] = useState(MarcaSeleccionada);

  const SobreSelector = (Categoria) => {
    SetElementoSobre(Categoria);
  };

  const FueraSelector = () => {
    SetElementoSobre(MarcaSeleccionada);
  };


  // Agrega una referencia para el contenedor de las marcas
  const marcasRef = React.useRef(null);

  useEffect(() => {
    if (Marcas.length > 0) {
      const dropdownWidth = marcasRef.current?.offsetWidth;
      const longestMarca = Marcas.reduce((a, b) => a.length > b.length ? a : b, "");

      const longestMarcaWidth = Math.ceil((longestMarca.length * 7) + 20); // Aproximadamente 7px por caracter

      if (longestMarcaWidth > dropdownWidth) {
        marcasRef.current.style.width = `${longestMarcaWidth}px`;
      }
    }
  }, [Marcas]);

  return (
    // Contenedor del dropdown
    <div className="flex flex-col w-1/2 sm:w-full sm:flex-row gap-5 bg-white shadow-md rounded-lg p-1">
      
      {/* Dropdown de las marcas */}
    <div ref={marcasRef} className="flex flex-col p-2 w-full sm:w-1/4">
      <div className="text-center justify-center items-center mb-1">Brands</div>
      {/* Mapear las marcas */}
      
      {Marcas.map((Marca, Indice) => (
        <div className="relative" key={Indice}>
          <div
            className={`flex justify-between bg-white border border-solid border-black rounded-md p-1 items-center mt-1 px-1 text-xs cursor-pointer hover:bg-yellow-500 hover:font-bold ${ElementoSobre === Marca ? "highlighted" : ""}`}
            onClick={() => SeleccionarMarca(Marca)}
            onMouseEnter={() => SobreSelector(Marca)}
            onMouseLeave={FueraSelector}
          >
            <span>{Marca}</span>
            {ElementoSobre === Marca && IconoFlecha}
          </div>
        </div>
      ))}

    </div>


      {/* Productos de la categoria seleccionada o filtrados por marca */}
      <div className="p-2 w-full sm:w-3/4">
        <div>Products</div>
        <div className="flex flex-col p-1 overflow-y-auto" style={{ maxHeight: 'calc(3 * 6em)' }}>
          {/* Mapear los productos de la categoria seleccionada */}
          {ProductosMarca.map((Producto, Indice) => (
            <div key={Indice} className="flex justify-between bg-white border border-solid border-black rounded-md p-1 items-center mt-1 px-1 text-xs">
              {/*Llamar a un componente */}
              <Tarjetap producto={Producto} />
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
}