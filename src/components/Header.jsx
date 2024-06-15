// Importaciones para manejo de estados
import { useEffect, useState } from "react";

// Importacion para logo
import logo from "../assets/logo-papustore.png";

// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@react-hook/media-query";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function Header() {
  // Definicion del tamaño de pantalla lg
  const lg = useMediaQuery("(min-width: 1024px)");
  const { isAuthenticated } = useAuth(); // Usar el contexto de autenticación

  // Definicion de los iconos
  const IconoLupa = <FontAwesomeIcon icon={fas.faSearch} />;
  const IconoHerramientas = <FontAwesomeIcon icon={fas.faGripLines} />;
  const IconoCatego = <FontAwesomeIcon icon={fas.faLayerGroup} />;
  const IconoCarrito = <FontAwesomeIcon icon={fas.faCartShopping} />;
  const IconoCorazon = <FontAwesomeIcon icon={fas.faHeart} />;
  const IconoUsuario = <FontAwesomeIcon icon={fas.faUser} />;

  // Definicion del estado para el icono de herramientas
  const [MostrarHerramientas, SetMostrarHerramientas] = useState(false);

  const ClicHerramientas = () => {
    SetMostrarHerramientas(!MostrarHerramientas);
  };

  // Funciones para los clics en cada una de las herramientas
  const HandleCategoria = () => {
    SetMostrarHerramientas(!MostrarHerramientas);
  };

  // Definicion de los iconos de herramientas
  const Iconos = [
    { Nombre: IconoCatego, onclick: HandleCategoria },
    { Nombre: IconoCarrito, onclick: HandleCategoria },
    { Nombre: IconoCorazon, onclick: HandleCategoria },
    { Nombre: IconoUsuario, onclick: HandleCategoria },
  ];

  return (
    <header className="flex top-0 left-0 fixed w-full z-50 mb-14 flex-col xss:bg-black xs:bg-red-300 sm:bg-slate-400 md:bg-orange-400 lg:bg-violet-500 xl:bg-fuchsia-400">
      {/* Dividir tres */}
      {lg ? (
        <div className="flex justify-between items-center lg:px-12 lg:py-2">
          <div>
            <Link to="/">
              <img src={logo} alt="papustore" className="lg:w-20 lg:h-10" />
            </Link>
          </div>

          <div className="relative">
            <div className="justify-center bg-white px-5 py-2 rounded-xl cursor-pointer">
              <span> Categorias </span>
            </div>
          </div>

          {/* Se renderiza para pantallas mayores a 360 pixeles */}
          <div className="flex items-center bg-white rounded-xl font-bold p-2 w-2/5 text-sm">
            <input
              type="text"
              placeholder="Realizar una busqueda..."
              className="w-full outline-none rounded-xl px-2"
            />
            {IconoLupa}
          </div>

          {/* Icono de herramientas */}
          <div className="flex justify-between my-auto gap-4 text-white lg:text-2xl">
            <Link to="/carrito">{IconoCarrito}</Link>
            <Link to="/favoritos">{IconoCorazon}</Link>
            {isAuthenticated ? (
              <Link to="/perfil">{IconoUsuario}</Link>
            ) : (
              <Link to="/form">
                <button
                  type="button"
                  className="bg-primary hover:bg-orange-700 transition duration-300 ease-in-out rounded-md p-2 mx-2 text-white text-sm"
                >
                  Log In
                </button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center xss:px-1 xss:py-0.5 xs:px-1.5 xs:py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2">
          <div>
            <img
              src={logo}
              alt="papustore"
              className="xss:w-14 xss:h-8 xs:w-12 xs:h-6 sm:w-14 sm:h-8 md:w-16 md:h-8"
            />
          </div>
          {/* Se renderiza para pantallas mayores a 360 pixeles */}
          <div className="flex items-center bg-white rounded-xl font-bold xss:p-1 xss:w-2/3 xss:text-[9px] xs:p-1 xs:w-2/3 xs:text-xs sm:p-1.5 sm:w-2/3 sm:text-sm md:p-2 md:w-3/4 md:text-sm">
            <input
              type="text"
              placeholder="Busqueda"
              className="w-full outline-none rounded-xl xss:px-0.5 xs:px-0.5 sm:px-1 md:px-1.5"
            />
            {IconoLupa}
          </div>

          {/* Icono de herramientas */}
          <div
            className="text-white xss:text-md xs:text-lg sm:text-2xl md:text-2xl"
            onClick={ClicHerramientas}
          >
            {IconoHerramientas}
          </div>
        </div>
      )}

      {/* Herramientas para el usuario */}
      <div>
        {MostrarHerramientas && (
          <div className="flex justify-between items-center text-white xss:px-1 xss:text-xs xs:px-2 xs:text-md sm:px-3 sm:text-lg md:px-4 md:text-lg">
            {Iconos.map((Icono, Indice) => (
              <div
                key={Indice}
                className="cursor-pointer hover:text-yellow-300"
              >
                {Icono.Nombre}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
