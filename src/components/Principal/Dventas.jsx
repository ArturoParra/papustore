import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Producto } from "./producto";

export function Dventas({ ventasDestacadas, productos }) {
    // Icon definitions
    const ArrowIcon = <FontAwesomeIcon className="my-auto" icon={fas.faArrowRight} />;

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

        // Obtener las 5 categorias con mas ventas promedio
        const topcategorias = categoriasmasvendidasordenadas.slice(0, 5);

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
        const productosrestantes = productos.filter((producto) => producto.id !== ventasDestacadas[0]?.id && producto.stock > 0);
        

        if (seleccionCategoria)
        {
            const productosFiltrados = productosrestantes.filter((producto) => producto.category === seleccionCategoria);
            setProductosFiltrados(productosFiltrados);
        } 
        else
        {
            setProductosFiltrados(ventasDestacadas); // Mostrar productos destacados por defecto
        }
    }, [seleccionCategoria, ventasDestacadas, productos]);

    // Función para manejar la mejor oferta
    const handleBetterFeatured = () =>
    {
        window.location.href = `/producto/${ventasDestacadas[0]?.id}`;
    };

    const handleAll = () =>
    {
        window.location.href = "/tienda";
    }

    return (
        <div className="w-10/12 mx-auto mt-12">
            {/* Products container */}
            <div className="flex flex-col w-full md:flex-row">
                {/* Side offer */}
                <div className="flex flex-col justify-between w-full bg-amber-200 p-2 md:w-1/4">
                    {/* Title */}
                    <div className="flex mt-4 text-orange-700 font-semibold justify-center uppercase text-[14px] xs:text-lg sm:text-2xl md:text-[9px] md:mt-2 md:leading-normal lg:text-xs xl:text-base xxl:text-xl full:text-2xl">
                        {ventasDestacadas[0]?.title}
                    </div>
                    {/* Discount */}
                    <div className="flex mt-2 font-bold justify-center text-xl xs:text-2xl sm:text-3xl md:text-sm md:mt-2 md:leading-normal lg:text-lg xl:text-2xl xxl:text-[28px] full:text-3xl">
                        {ventasDestacadas[0]?.discountPercentage}%
                    </div>
                    {/* Description */}
                    <div className="flex mt-2 text-gray-600 justify-center text-center text-xs xs:text-sm sm:text-base md:text-[10px] md:leading-normal lg:text-[13px] xl:text-base xxl:text-xl full:text-2xl">
                        {ventasDestacadas[0]?.description}
                    </div>
                    {/* Buy now */}
                    <button className="flex w-8/12 mx-auto text-white bg-orange-400  justify-center rounded-xl font-bold uppercase p-1.5 m-6 text-xs xs:text-base sm:text-lg md:text-[8px] md:leading-normal md:mx-auto md:m-4 lg:text-[11px] xl:text-sm xxl:text-base full:text-xl" onClick={handleBetterFeatured}>
                        BUY NOW<div className="ml-2">{ArrowIcon}</div>
                    </button>
                    {/* Offer image */}
                    <img
                        loading="lazy"
                        srcSet={ventasDestacadas[0]?.thumbnail}
                        className="w-full aspect-square"
                    />
                </div>

                <div className="flex flex-col w-full mt-4 md:w-3/4 md:mt-0">
                    {/* Selector container */}
                    <div className="flex flex-col items-center mt-6 md:flex-row md:justify-between md:mt-0 md:ml-2">
                        {/* Left */}
                        <div
                            className={`font-semibold text-blue-500 text-xl xs:text-2xl sm:text-sm md:text-[8px] lg:text-[9px] xl:text-sm xxl:text-xl full:text-2xl ${
                                seleccionCategoria === null ? 'border-b-2 border-blue-500' : ''
                            } hover:cursor-pointer hover:text-blue-500`}
                            onClick={() => handleSeleccionCategoria('featured products')}
                        >
                            FEATURED PRODUCTS
                        </div>

                        <div className="flex flex-col items-center mt-2 text-center  text-base xs:text-lg md:flex-row sm:gap-1 sm:text-xs md:mt-0 md:text-[8px] lg:text-[9px] lg:gap-3 xl:text-sm xl:gap-3 xxl:text-xl xxl:gap-6 full:text-2xl">
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
                            <div className="flex items-center text-blue-500 hover:text-blue-900 hover:cursor-pointer text-base xs:text-lg sm:text-sm md:text-[8px] lg:text-[9px] xl:text-sm xxl:text-xl full:text-2xl" onClick={handleAll}>
                                <div>View all</div>
                                <div className=" ml-2 mt-0 text-xs">{ArrowIcon}</div>
                            </div>
                        </div>
                    </div>

                    {/* Products network container */}
                    <div className="grid gap-x-2 mt-2 xs:grid-cols-2 md:flex md:flex-col  md:gap-2">
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
            </div>
        </div>
    );
}