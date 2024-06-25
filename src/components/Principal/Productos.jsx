import { Tarjetap } from "./tarjetap";
import { useEffect, useState } from "react";

export function Productos({ productos }) {
    // Estados para los productos ordenados
    const [productosConMejorDescuento, setProductosConMejorDescuento] = useState([]);
    const [productosMasVendidos, setProductosMasVendidos] = useState([]);
    const [productosMejorCalificados, setProductosMejorCalificados] = useState([]);
    const [productosMasBaratos, setProductosMasBaratos] = useState([]);
    
    useEffect(() => {
        // Ordenar los productos por descuento
        const productosOrdenadosPorDescuento = productos.slice().sort((a, b) => b.discountPercentage - a.discountPercentage);
        const productosConMejorDescuento = productosOrdenadosPorDescuento.slice(0, 5);
        setProductosConMejorDescuento(productosConMejorDescuento);


        // Obtener los productos mas vendidos pero que no esten en los productos con mejor descuento
        const productosOrdenadosPorVentas = productos.slice().sort((a, b) => b.ventas - a.ventas); // Suponiendo que 'ventas' es la propiedad que indica las ventas del producto
        const productosMasVendidos = productosOrdenadosPorVentas.filter(producto => !productosConMejorDescuento.includes(producto)).slice(0, 5);
        setProductosMasVendidos(productosMasVendidos);


        // Ordenar los productos por calificacion pero que no esten en los productos con mejor descuento ni en los productos mas vendidos
        const productosOrdenadosPorCalificacion = productos.slice().sort((a, b) => b.rating - a.rating); // Suponiendo que 'rating' es la propiedad que indica la calificación del producto
        const productosMejorCalificados = productosOrdenadosPorCalificacion.filter(producto => !productosConMejorDescuento.includes(producto) && !productosMasVendidos.includes(producto)).slice(0, 5);
        setProductosMejorCalificados(productosMejorCalificados);


        // Ordenar los productos por precio pero que no esten en los productos con mejor descuento, en los productos mas vendidos ni en los productos mejor calificados
        const productosOrdenadosPorPrecio = productos.slice().sort((a, b) => a.priceWithDiscount - b.priceWithDiscount); // Suponiendo que 'priceWithDiscount' es el precio con descuento del producto
        const productosMasBaratos = productosOrdenadosPorPrecio.filter(producto => !productosConMejorDescuento.includes(producto) && !productosMasVendidos.includes(producto) && !productosMejorCalificados.includes(producto)).slice(0, 5);
        setProductosMasBaratos(productosMasBaratos);
        
    }, [productos])

    return (
        <div className="w-9/12 mx-auto m-12">
            <div className="flex justify-center font-semibold text-md">OTHERS</div>

            <div className="flex flex-col mt-5 gap-10 md:flex-row">
                {/* Sección de productos con mejor descuento */}
                <div className="w-full">
                    <div className="font-semibold">BEST DISCOUNTS</div>
                    <div>
                        {productosConMejorDescuento.map((producto, index) => (
                            <div key={index} className="mt-3 border border-solid border-gray-200">
                                <Tarjetap producto={producto} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección de productos más vendidos */}
                <div className="w-full">
                    <div className="font-semibold">BEST SELLERS</div>
                    <div>
                        {productosMasVendidos.map((producto, index) => (
                            <div key={index} className="mt-3 border border-solid border-gray-200">
                                <Tarjetap producto={producto} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección de productos mejor calificados */}
                <div className="w-full">
                    <div className="font-semibold">TOP RATED</div>
                    <div>
                        {productosMejorCalificados.map((producto, index) => (
                            <div key={index} className="mt-3 border border-solid border-gray-200">
                                <Tarjetap producto={producto} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección de productos más baratos */}
                <div className="w-full">
                    <div className="font-semibold">CHEAPER</div>
                    <div>
                        {productosMasBaratos.map((producto, index) => (
                            <div key={index} className="mt-3 border border-solid border-gray-200">
                                <Tarjetap producto={producto} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
