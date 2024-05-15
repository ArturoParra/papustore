import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo-papustore.png";

export function Header() {
  const iconoDrop = (
    <FontAwesomeIcon className="text-black text-lg pl-2 pb-0.5 mb-auto" icon={fas.faSortDown} />
  );
  const iconoFlecha = <FontAwesomeIcon className="text-black text-lg pb-0.5" icon={fas.faArrowRight} />;
  const iconoLupa = <FontAwesomeIcon className="text-black text-lg" icon={fas.faSearch} />;
  const iconoCarrito = <FontAwesomeIcon className="text-white text-3xl" icon={fas.faCartShopping} />;
  const IconoCorazon = <FontAwesomeIcon className="text-white text-3xl" icon={fas.faHeart} />;
  const iconoUsuario = <FontAwesomeIcon className="text-white text-3xl" icon={fas.faUser} />;

  const categorias = [
    "Categorias",
    "Celulares",
    "Laptops",
    "Perfumes",
    "Cuidado de la piel",
    "Comestibles",
    "Decoracion del hogar",
    "Muebles",
    "Tops",
    "Vestidos de Mujer",
    "Zapatos de Mujer",
    "Camisas de Hombre",
    "Zapatos de Hombre",
    "Relojes de Hombre",
    "Relojes de Mujer",
    "Bolsos de Mujer",
    "Joyas de Mujer",
    "Gafas de Sol",
    "Automóviles",
    "Motocicletas",
    "Iluminación",
  ];

  const [busqueda, setInputValue] = useState("");
  const [mostrarCategorias, setMostrarCategorias] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);

  const escribiendo = (event) => {
    setInputValue(event.target.value);
  };

  const toggleCategorias = () => {
    setMostrarCategorias(!mostrarCategorias);
  };

  const seleccionarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setMostrarCategorias(false);
  };

  const handleMouseEnter = (category) => {
    setHoveredItem(category);
  };

  const handleMouseLeave = () => {
    setHoveredItem(categoriaSeleccionada);
  };

  // Establecer la primera categoría como categoría seleccionada por defecto
  useState(() => {
    setCategoriaSeleccionada(categorias[0]);
  }, []);

  return (
    <header className="flex justify-center items-center px-16 py-5 w-full bg-zinc-900 max-md:px-5 max-md:max-w-ful">
      <div className="flex gap-5 justify-between w-full max-w-[1320px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-2 justify-center text-3xl font-bold tracking-tighter text-white whitespace-nowrap">
          <img src={logo} alt="PapuStore" />
        </div>

        <div className="relative">
          <div
            className="flex gap-2 justify-center px-6 py-3.5 bg-gray-100 rounded-xl max-md:px-5 cursor-pointer"
            onClick={toggleCategorias}
          >
            <div className="flex items-center">
              <span className="spinner-text">{categoriaSeleccionada}</span>
              {iconoDrop}
            </div>
          </div>
          {mostrarCategorias && (
            <div className="absolute bg-white shadow-lg rounded-lg py-2 mt-1 w-56">
              {categorias.map((categoria, index) => (
                <div
                  key={index}
                  className="px-4 py-0.5 hover:bg-yellow-200 hover:font-bold cursor-pointer flex justify-between items-center"
                  onClick={() => seleccionarCategoria(categoria)}
                  onMouseEnter={() => handleMouseEnter(categoria)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className={`${hoveredItem === categoria ? "highlighted" : ""}`}>
                    {categoria}
                  </span>
                  {hoveredItem === categoria && iconoFlecha}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 w-2/5 px-5 py-3.5 text-sm leading-5 bg-white rounded-xl shadow-lg text-black max-md:flex-wrap font-bold items-center">
          <input
            type="text"
            placeholder="Realizar una búsqueda..."
            value={busqueda}
            onChange={escribiendo}
            className="w-full outline-none placeholder-slate-400"
          />
          {iconoLupa}
        </div>

        <div className="flex gap-8 justify-between my-auto">
          {iconoCarrito}
          {IconoCorazon}
          {iconoUsuario}
        </div>
      </div>
    </header>
  );
}
