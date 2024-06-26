import React from "react";
import { useEffect, useState, useRef } from "react";
import logo from "../assets/logo-papustore.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@react-hook/media-query";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Swal from "sweetalert2";
import { DropDownInteriorss } from "./DropDownInteriorss";
import { SearchList } from "./Searchlist";

export function Header() {

  const lg = useMediaQuery("(min-width: 1024px)");
  const { isAuthenticated, setIsAuthenticated, userEmail, setUserEmail } = useAuth(); // Usar el contexto de autenticación

  const IconoLupa = <FontAwesomeIcon icon={fas.faSearch} />;
  const IconoHerramientas = <FontAwesomeIcon icon={fas.faGripLines} />;
  const IconoCatego = <FontAwesomeIcon icon={fas.faLayerGroup} />;
  const IconoFlecha = <FontAwesomeIcon icon={fas.faChevronRight} />;
  const IconoTienda = <FontAwesomeIcon icon={fas.faStoreAlt} />;
  const IconoCarrito = <FontAwesomeIcon icon={fas.faCartShopping} />;
  const IconoCorazon = <FontAwesomeIcon icon={fas.faHeart} />;
  const IconoUsuario = <FontAwesomeIcon icon={fas.faUser} />;


  useEffect(() => {
    // Función para recargar la página
    const handleResize = () => {
      window.location.reload();
    };
  
    // Agregar el detector de eventos de resize al montar el componente
    window.addEventListener("resize", handleResize);
  
    // Limpiar el detector de eventos de resize al desmontar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  


  const [MostrarHerramientas, SetMostrarHerramientas] = useState(false);

  const ClicHerramientas = () => {
    SetMostrarHerramientas(!MostrarHerramientas);
  };


  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    localStorage.setItem('isAuthenticated', false); // Asegura que el estado de autenticación sea persistente
    localStorage.setItem('userEmail', ''); // Asegura que el email se vacíe
  };


  const handleChecklogin = () => {
    if (isAuthenticated) {
      window.location.href = '/perfil';
    }
    else {
      Swal.fire({
        icon: "warning",
        title: "You are not logged in",
        text: "Please log in to access your profile",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };
 

  // Referencia al encabezado
  const headerRef = useRef();

  // Estado para guardar todos los productos
  const [productos, setProductos] = React.useState([]);

  useEffect(() => {
    // Función para obtener datos del servidor y convertirlos a JSON
    const fetchData = async () => {
      try // Intentar obtener los datos del servidor
      {
        // Realizar una solicitud fetch al servidor
        const res = await fetch('/api/index.php',
          {
            // Configurar la solicitud
            method: 'POST',
            headers:
            {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify
              ({
                functionName: 'consultaProductos',
              })
          });

        // Verificar si la solicitud fue exitosa
        if (!res.ok) {
          throw new Error('Error en la solicitud fetch');
        }

        // Manejar la respuesta del servidor
        const data = await res.json(); // Convertir la respuesta a JSON

        // Devolver los datos obtenidos
        return data
      }
      catch (error) // Capturar errores
      {
        console.error('Error:', error);
      }
    };

    // Funcion para llamar a la funcion fetchData y procesar los datos obtenidos
    const getData = async () => {
      try // Intentar obtener los datos de fetchData
      {
        // Llamar a la función fetchData
        const res = await fetchData();

        // Verificar si res es un array
        if (!Array.isArray(res)) {
          throw new Error("La respuesta no es un array");
        }
        else {
          setProductos(res);
        }
      }
      catch (error) // Capturar errores
      {
        console.error("Error al obtener los datos:", error);
      }
    };

    // Llamar a la función getData
    getData();
  }, []); // Dependencia vacía para que el efecto se ejecute solo una vez


  // Estado para guardar las categorias
  const [categorias, setCategorias] = React.useState([]);

  useEffect(() => {

    const categoriasUnicas = [...new Set(productos.map(producto => producto.category))];

    setCategorias(categoriasUnicas);
  }, [productos]);


  // Definir las categorias a mostrar
  const [MostrarCategorias, SetMostrarCategorias] = useState(false);

  const ClicCategorias = (event) => {
    event.stopPropagation();
    SetMostrarCategorias(!MostrarCategorias);
  };

  // Definir las categorias
  const [CategoriaSeleccionada, SetCategoriaSeleccionada] = useState("");


  // Funciones para el selector de categorias
  const SeleccionarCategoria = (Categoria, event) => {
    SetCategoriaSeleccionada(Categoria);
  };

  // Definicion  onMouseEnter -> En el selector
  const [ElementoSobre, SetElementoSobre] = useState(null);

  const SobreSelector = (Categoria) => {
    SetElementoSobre(Categoria);
  };

  const FueraSelector = () => {
    SetElementoSobre(CategoriaSeleccionada);
  };

  useEffect(() => {
    // Función para manejar el clic fuera del dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (event.target.id !== 'dropdownOpener') {
          SetMostrarCategorias(false);
        }
        if (event.target.id !== 'dropdownOpenerP') {
          SetMostrarCategorias(true);
        }
      }
    };

    // Agregar el listener al montar el componente
    document.addEventListener("mouseup", handleClickOutside);

    // Limpiar el listener al desmontar el componente
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);



  const dropdownRef = useRef(null);

  useEffect(() => {
    if (MostrarCategorias) {
      const dropdownWidth = dropdownRef.current?.offsetWidth;
      const longestCategory = categorias.reduce((a, b) => a.length > b.length ? a : b, "");

      const longestCategoryWidth = Math.ceil(longestCategory.length * 7); // Aproximadamente 7px por caracter

      if (longestCategoryWidth > dropdownWidth) {
        dropdownRef.current.style.width = `${longestCategoryWidth}px`;
      }
    }
  }, [MostrarCategorias, categorias]);



  /* PARA EL MANEJO DE LA BARRA DE BUSQUEDAS */

  // Estado para la consulta de búsqueda
  const [searchQuery, setSearchQuery] = useState("");

  // Estado para los productos filtrados
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Filtrar los productos basándose en la consulta de búsqueda
    const results = productos.filter(producto =>
      producto.title ? producto.title.toLowerCase().includes(searchQuery.toLowerCase()) : false
    );

    // Filtrar por precio basandose en la consulta de busqueda
    const resultsPrice = productos.filter(producto =>
      producto.price ? producto.price.toString().includes(searchQuery) : false
    );

    // Filtrar por categoria basandose en la consulta de busqueda
    const resultsCategory = productos.filter(producto =>
      producto.category ? producto.category.toLowerCase().includes(searchQuery.toLowerCase()) : false
    );

    // Combinar los resultados
    const combinedResults = [...results, ...resultsPrice, ...resultsCategory];

    // Eliminar duplicados
    const uniqueResults = [...new Set(combinedResults)];

    // Guardar los resultados únicos
    setFilteredProducts(uniqueResults);

  }, [searchQuery, productos]);

  // Estado para controlar si la lista de búsqueda debe mostrarse
  const [showSearchList, setShowSearchList] = useState(false);

  // Referencia a la barra de búsqueda
  const searchRef = useRef();

  // Función para manejar el clic en la barra de búsqueda
  const handleSearchClick = () => {
    if (!showSearchList) {
      setShowSearchList(!showSearchList);
    }
  };

  // Función para manejar el clic fuera de la barra de búsqueda
  const handleClickOutside = event => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearchList(false);
    }
  };

  // Agregar el detector de eventos de clic al montar el componente
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el detector de eventos de clic al desmontar
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  
  

  return (
    <header ref={headerRef} className="flex top-0 left-0 fixed w-full z-50 mb-14 flex-col bg-black">
      {lg ? (
        <div className="flex justify-between items-center lg:px-12 lg:py-2">
          <div>
            <Link to="/">
              <img src={logo} alt="papustore" className="lg:w-20 lg:h-10" />
            </Link>
          </div>


          <div className="relative">
            <div className="justify-center bg-white px-5 py-2 rounded-xl cursor-pointer" onClick={ClicCategorias}>
              <span id='dropdownOpener' onClick={ClicCategorias}>
                Categories
              </span>
            </div>

            {/* Selector de categorias */}
            {MostrarCategorias && (
              <div ref={dropdownRef} className="flex flex-col bg-white p-1 absolute gap-1 mt-1.5 rounded-md">
                {categorias.map((Categoria, Indice) => (
                  <div className="relative" key={Indice}>
                    <div
                      className="flex justify-between bg-white border border-solid border-black rounded-md p-1 items-center mt-1 px-1 text-xs cursor-pointer hover:bg-yellow-500 hover:font-bold"
                      onClick={(event) => SeleccionarCategoria(Categoria, event)}
                      onMouseEnter={() => SobreSelector(Categoria)}
                      onMouseLeave={FueraSelector}
                    >
                      <span className={`${ElementoSobre === Categoria ? "highlighted" : ""}`}>
                        {Categoria}
                      </span>
                      {ElementoSobre === Categoria && IconoFlecha}
                    </div>
                    {CategoriaSeleccionada === Categoria && MostrarCategorias === true && (
                      <div
                        className="absolute w-96 mt-2 ml-4"
                        style={{ top: 0, left: '100%' }}
                      >
                        <DropDownInteriorss Categoria={CategoriaSeleccionada} Productos={productos} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative w-2/5" ref={searchRef}>
            <div className="flex items-center bg-white rounded-xl font-bold p-2 text-sm" onClick={handleSearchClick}>
              <input
                type="text"
                placeholder="Search..."
                className="w-full outline-none rounded-xl px-2"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {IconoLupa}
            </div>

            {showSearchList && (
              <div className="absolute w-full">
                <SearchList filteredProducts={filteredProducts} />
              </div>
            )}
          </div>

          <div className="flex justify-between my-auto gap-4 text-white lg:text-2xl">
            <Link to="/tienda">{IconoTienda}</Link>
            <Link to="/carrito">{IconoCarrito}</Link>
            <Link to="/favoritos">{IconoCorazon}</Link>
            {isAuthenticated ? (
              <>
                <Link to="/perfil">{IconoUsuario}</Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 transition duration-300 ease-in-out rounded-md p-2 mx-2 text-white text-sm"
                >
                  Logout
                </button>
              </>
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
            <Link to="/">
              <img
                src={logo}
                alt="papustore"
                className="xss:w-14 xss:h-8 xs:w-12 xs:h-6 sm:w-14 sm:h-8 md:w-16 md:h-8"
              />
            </Link>
          </div>

          <div className="relative xss:w-2/3 xs:w-2/3 sm:w-2/3 md:w-3/4" ref={searchRef}>
            <div className="flex items-center bg-white rounded-xl font-bold xss:p-1 xss:text-[9px] xs:p-1  xs:text-xs sm:p-1.5  sm:text-sm md:p-2 md:text-sm" onClick={handleSearchClick}>
              <input
                type="text"
                placeholder="Search..."
                className="w-full outline-none rounded-xl px-2"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {IconoLupa}
            </div>

            {showSearchList && (
              <div className="absolute w-full">
                <SearchList filteredProducts={filteredProducts} />
              </div>
            )}
          </div>




          {isAuthenticated ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 transition duration-300 ease-in-out rounded-md p-1 mx-2 text-white text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/form">
              <button
                type="button"
                className="bg-primary hover:bg-orange-700 transition duration-300 ease-in-out rounded-md p-1 mx-2 text-white text-sm"
              >
                Log In
              </button>
            </Link>
          )}

          <div
            className="text-white xss:text-md xs:text-lg sm:text-2xl md:text-2xl"
            onClick={ClicHerramientas}
          >
            {IconoHerramientas}
          </div>
        </div>
      )}

      <div>
        {MostrarHerramientas && (
          <div className="flex justify-between items-center text-white xss:px-1 xss:text-xs xs:px-2 xs:text-md sm:px-3 sm:text-lg md:px-4 md:text-lg">

            <div className="relative text-black">
              <div className="justify-center cursor-pointer" onClick={(event) => ClicCategorias(event)}>
                <span className="text-white" id='dropdownOpenerP' onClick={ClicCategorias}>
                  {IconoCatego}
                </span>
              </div>

              {/* Selector de categorias */}
              {MostrarCategorias && (
                <div ref={dropdownRef} className="flex flex-col bg-white p-1 absolute gap-1 mt-1.5 rounded-md">
                  {categorias.map((Categoria, Indice) => (
                    <div className="relative" key={Indice}>
                      <div
                        className="flex justify-between bg-white border border-solid border-black rounded-md p-1 items-center mt-1 px-1 text-xs cursor-pointer hover:bg-yellow-500 hover:font-bold"
                        onClick={(event) => SeleccionarCategoria(Categoria, event)}
                        onMouseEnter={() => SobreSelector(Categoria)}
                        onMouseLeave={FueraSelector}
                      >
                        <span className={`${ElementoSobre === Categoria ? "highlighted" : ""}`}>
                          {Categoria}
                        </span>
                        {ElementoSobre === Categoria && IconoFlecha}
                      </div>
                      {CategoriaSeleccionada === Categoria && MostrarCategorias === true && (
                        <div
                          className="absolute w-96 mt-2 ml-4"
                          style={{ top: 0, left: '100%' }}
                        >
                          <DropDownInteriorss Categoria={CategoriaSeleccionada} Productos={productos} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="cursor-pointer hover:text-yellow-300" onClick={() => window.location.href = `/tienda`}>{IconoTienda}</div>
            <div className="cursor-pointer hover:text-yellow-300" onClick={() => window.location.href = `/carrito`}>{IconoCarrito}</div>
            <div className="cursor-pointer hover:text-yellow-300" onClick={() => window.location.href = `/favoritos`}>{IconoCorazon}</div>
            <div className="cursor-pointer hover:text-yellow-300" onClick={handleChecklogin}>{IconoUsuario}</div>
          </div>
        )}
      </div>
    </header>
  );
}