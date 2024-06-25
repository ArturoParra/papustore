import { Producto } from "./producto";
import { Categoria } from "./categoria";

// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export function Otrasc( {ventasOtrasCategorias, productos} )
{
    // Definicion de los iconos
    const ArrowIcon = <FontAwesomeIcon icon={fas.faArrowRight} />;

    // Estado para las categorias con mas ventas promedio
    const [categoriatop, setCategoriatop] = useState([]);

    useEffect(() => {
        // Obtener todos los productos de cada categoria
        const productosporcategoria = productos.reduce((acumulador, producto) => {
            if (!acumulador[producto.category]) {
                acumulador[producto.category] = [];
            }
            acumulador[producto.category].push(producto);
            return acumulador;
        }, {});

        // Calcular las categorias con mas ventas promedio
        const categoriasmasvendidas = Object.keys(productosporcategoria).map((categoria) => {
            const productos = productosporcategoria[categoria];
            const totalventas = productos.reduce((acumulador, producto) => acumulador + producto.total_sales, 0);
            const promedioventas = totalventas / productos.length;
            return { categoria, totalventas, promedioventas };
        });

        // Ordenar las categorias por ventas promedio
        const categoriasmasvendidasordenadas = categoriasmasvendidas.sort((a, b) => b.promedioventas - a.promedioventas);

        // Obtener las otras 5 categorias con mas ventas promedio
        const topcategorias = categoriasmasvendidasordenadas.slice(5, 11);

        // Guardar las categorias unicas en el estado
        setCategoriatop(topcategorias);
    }, [productos]);


    // Estado para la categoria seleccionada
    const [seleccionCategoria, setSeleccionCategoria] = useState(null);

    // Estado para los productos filtrados por categoria
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    // Función para manejar la selección de categoría
    const handleSeleccionCategoria = (categoria) => {
        if (categoria === 'featured products') {
            setSeleccionCategoria(null); // Reinicia a los productos destacados
        } else {
            setSeleccionCategoria(categoria); // Filtra productos por la categoría seleccionada
        }
    };

    // Filtrar productos según la categoría seleccionada
    useEffect(() =>
    {
        // Excluir el primer producto de ventas destacadas y excluir los productos sin stock
        const productosrestantes = productos.filter((producto) => producto.id !== ventasOtrasCategorias[0]?.id && producto.stock > 0);
        

        if (seleccionCategoria)
        {
            const productosFiltrados = productosrestantes.filter((producto) => producto.category === seleccionCategoria);
            setProductosFiltrados(productosFiltrados);
        } 
        else
        {
            setProductosFiltrados(ventasOtrasCategorias); // Mostrar productos destacados por defecto
        }
    }, [seleccionCategoria, ventasOtrasCategorias, productos]);

    const handleAll = () =>
    {
        window.location.href = "/tienda";
    }

    const handleBestSale = () =>
    {
        window.location.href = `/producto/${ventasOtrasCategorias[0]?.id}`;
    }

    const handleCategoryDevelopment = () =>
    {
        window.location.href = `/tienda/${categoriatop[5]?.categoria}`;
    }


    return (
        // Seccion de accesorio de computadoras
        <div className="w-10/12 mx-auto m-12">
            <div className="flex flex-col-reverse mt-4 md:flex-row gap-2">
                <div className="flex flex-col md:w-3/4">
                    <div className="flex flex-col items-center mt-6 md:flex-row md:justify-between md:mt-0">
                        {/* Left */}
                        <div
                            className={`font-semibold text-blue-500 text-xl xs:text-2xl sm:text-sm md:text-[8px] lg:text-[9px] xl:text-[13px] xxl:text-xl full:text-2xl ${
                                seleccionCategoria === null ? 'border-b-2 border-blue-500' : ''
                            } hover:cursor-pointer hover:text-blue-500`}
                            onClick={() => handleSeleccionCategoria('featured products')}
                        >
                            OTHER FEATURED PRODUCTS
                        </div>

                        <div className="flex flex-col items-center mt-2 text-center  text-base xs:text-lg md:flex-row sm:gap-2 sm:text-xs md:mt-0 md:text-[8px] lg:text-[9px] lg:gap-3 xl:text-[13px] xl:gap-3 xxl:text-xl xxl:gap-6 full:text-2xl">
                            {/* Mapear las categorias */}
                            
                            {categoriatop.map((categoria, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSeleccionCategoria(categoria.categoria)}
                                    className={`hover:cursor-pointer text-blue-500 ${seleccionCategoria === categoria.categoria ? 'border-b-2 border-blue-500' : ''}`}
                                >
                                    {categoria.categoria}
                                </div>
                            ))}

                            {/* View all */}
                            <div className="flex items-center text-blue-500 hover:text-blue-900 hover:cursor-pointer text-base xs:text-lg sm:text-sm md:text-[8px] lg:text-[9px] xl:text-[13px] xxl:text-xl full:text-2xl" onClick={handleAll}>
                                <div>View all</div>
                                <div className=" ml-2 mt-0 text-xs">{ArrowIcon}</div>
                            </div>
                        </div>
                    </div>

                    {/* Products network container */}
                    <div className="grid gap-x-2 -ml-2  mt-2 xs:grid-cols-2 md:flex md:flex-col md:flex-grow  md:gap-2">
                        {/* Row one */}
                        <div className="md:flex md:flex-grow">
                            {seleccionCategoria === null ? (
                                // Mostrar los productos originales
                                <>
                                    {productosFiltrados.slice(1, 5).map((producto, index) => (
                                        <div key={index} className="md:w-1/4">
                                            <Producto producto={producto} />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                // Mostrar productos filtrados por categoría
                                <>
                                    {productosFiltrados.slice(0, 4).map((producto, index) => (
                                        <div key={index} className="md:w-1/4">
                                            <Producto producto={producto} />
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        {/* Row two */}
                        <div className="md:flex md:flex-grow mt-4 md:mt-0">
                            {seleccionCategoria === null ? (
                                // Mostrar los productos originales
                                <>
                                    {productosFiltrados.slice(5, 9).map((producto, index) => (
                                        <div key={index} className="md:w-1/4">
                                            <Producto producto={producto} />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                // Mostrar productos filtrados por categoría
                                <>
                                    {productosFiltrados.slice(4, 8).map((producto, index) => (
                                        <div key={index} className="md:w-1/4">
                                            <Producto producto={producto} />
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>



                </div>

                <div className="flex flex-col w-full md:w-1/4">
                    <div className="bg-amber-200 rounded-md px-2">
                        <img
                            loading="lazy"
                            srcSet={ventasOtrasCategorias[0]?.thumbnail}
                            className="w-full mx-auto aspect-square max-w-[108px] mt-6"
                        />

                        <div className="flex mt-2 text-orange-700 uppercase font-semibold justify-center md:text-xs">
                            {ventasOtrasCategorias[0]?.title}
                        </div>

                        <div className="flex my-2 text-gray-600 text-sm text-center md:text-xs">
                            {ventasOtrasCategorias[0]?.description}
                        </div>

                        <div className="flex justify-center items-end text-base gap-4 mt-2 md:text-xs">
                            <div>
                                Only for:
                            </div>

                            <div className="bg-white font-semibold px-1 rounded-md">
                                ${ventasOtrasCategorias[0]?.price}
                            </div>
                        </div>

                        <button className="flex w-9/12 mx-auto text-white bg-orange-400 justify-center rounded-xl font-bold uppercase p-1.5 m-6 md:text-[10px] md:my-4" onClick={handleBestSale}>
                            BUY NOW<div className="ml-2">{ArrowIcon}</div>
                        </button>
                    </div>

                    {/* Anuncio inferior */}
                    <div className="flex flex-col mt-6 rounded-md bg-cyan-900 p-8 md:p-4 md:mt-2 md:flex-grow md:justify-center md:text-center">
                        <div className="mx-auto bg-cyan-800 rounded-md text-white font-semibold p-1.5 md:text-xs">
                            CATEGORY IN DEVELOPMENT
                            
                        </div>

                        <div className="mt-4 text-white font-bold text-xl text-center md:text-xs">
                            SUPPORT NOW
                        </div>

                        <div className="mt-4 text-yellow-300 font-semibold text-center md:text-xs">
                            {categoriatop[5]?.categoria}
                        </div>

                        <button className="flex w-9/12 mx-auto text-white text-xs bg-sky-400 justify-center rounded-xl font-bold uppercase p-1.5 mt-5 md:text-[6px] xl:text-xs" onClick={handleCategoryDevelopment}>
                            GO NOW<div className="ml-2">{ArrowIcon}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}