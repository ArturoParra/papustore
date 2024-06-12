import React, { useEffect, useState } from "react";
import { SidebarFiltros, SidebarItem } from "../components/SidebarFiltros";
import { Producto } from "../components/Producto";
//TODO: Cambiar la lógica del producto, esto tiene que venir la de BD
import { products } from "../data/db.json";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "../styles/Radio.css";

// Componente principal de la tienda
export const Shop = () => {
  // Estado para los filtros aplicados
  const [filter, setFilter] = useState([]);
  // Estado para los datos del producto (inicialmente del archivo JSON)
  //TODO: Cambiar la lógica del producto, esto tiene que venir la de BD
  //TODO: borrar el JSON del proyecto
  const [data, setData] = useState(products);
  const [dataFiltrado, setdataFiltrado] = useState([]);
  const [dataOrdenado, setdataOrdenado] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [criterio, setCriterio] = useState("");
  const itemsPerPage = 18; // Número de productos por página
  let filtrado = [];

  // Cálculo de los índices para la paginación
  const startIdx = (currentPage - 1) * itemsPerPage;
  //TODO: hacer pasar data por un filtro y luego por la paginación
  //TODO: condicionar que arreglo se va a mostra (el filtrado o el original) también debería probar esto dentro del useEffect de los filtros
  const paginatedData = dataOrdenado.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(dataOrdenado.length / itemsPerPage);

  // Cálculo del valor máximo y mínimo de los precios
  const values = Object.values(data).map((obj) => obj.price);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  const [maxPrice, setmaxPrice] = useState(maxValue);
  const [minPrice, setminPrice] = useState(minValue);

  // Manejador para cambios en los filtros
  const handleFilterChange = (newFilter) => {
    setFilter((prevFilter) => {
      if (prevFilter.includes(newFilter)) {
        return prevFilter.filter((item) => item !== newFilter);
      } else {
        return [...prevFilter, newFilter];
      }
    });
  };

  // Función para encontrar la intersección entre dos arreglos
  const intersection = (array1, array2) => {
    return array1.filter((value) => array2.includes(value));
  };

  // Función para filtrar los productos según los filtros aplicados
  const FuncionFiltrado = (data, filters) => {
    let res = [];
    let res2 = [];
    let res3 = [];

    // Filtrar productos por precio
    res3 = Object.values(data).filter((item) => {
      const realPrice =
        item.price - item.price * (item.discountPercentage / 100);
      return realPrice >= minPrice && realPrice <= maxPrice;
    });

    if (filters.length === 0) {
      return res3;
    } else {
      // Filtrar productos que coincidan con la categoría o marca seleccionada
      res = Object.values(data).filter(
        (item) =>
          filters.includes(item.category) || filters.includes(item.brand)
      );
      // Filtrar productos que coincidan tanto con la categoría como con la marca
      res2 = Object.values(data).filter(
        (item) =>
          filters.includes(item.category) && filters.includes(item.brand)
      );
      res = res2.length > 0 ? intersection(res, res2) : res;

      // Filtrar los productos sin la propiedad "brand" si "Otras marcas" está activo
      if (filters.includes("")) {
        const sinMarca = Object.values(data).filter(
          (item) => !item.hasOwnProperty("brand")
        );
        // Si solo "Otras marcas" está activo, mostrar todos los productos sin marca
        if (filters.length === 1) {
          res = sinMarca;
        } else {
          // Filtrar productos sin marca que coincidan con las otras categorías seleccionadas
          const categoriaFiltro = filters.filter((f) => f !== "");
          const sinMarcaFiltrado = sinMarca.filter((item) =>
            categoriaFiltro.includes(item.category)
          );
          res = intersection(res, sinMarcaFiltrado);
        }
      }
    }

    // Si no hay coincidencias, devolver un array vacío
    if (res.length === 0) {
      return [];
    }

    res = intersection(res, res3);
    return res;
  };

  // Función para ordenar los productos según un criterio
  const ordenarProductos = (criterio) => {
    setCriterio(criterio);
    let productosOrdenados;
    if (criterio === "asc") {
      productosOrdenados = [...dataFiltrado].sort((a, b) => a.price - b.price);
    } else if (criterio === "desc") {
      productosOrdenados = [...dataFiltrado].sort((a, b) => b.price - a.price);
    } else if (criterio === "destacados") {
      productosOrdenados = [...dataFiltrado].sort((a, b) => b.rating - a.rating);
    } else if (criterio === "non") {
      productosOrdenados = [...dataFiltrado];
    }
    return productosOrdenados;
  };

  // Manejador para cambios en el slider de precios
  const onSliderChange = (value) => {
    const [minval, maxval] = value;
    setmaxPrice(maxval);
    setminPrice(minval);
  };

  // Efecto para filtrar los datos cuando cambian los filtros o los precios
  useEffect(() => {
    filtrado = FuncionFiltrado(data, filter);
    console.log(filter);
    console.log(criterio);
    setdataFiltrado(filtrado);
  }, [filter, maxPrice, minPrice]);

  // Efecto para ordenar los datos filtrados cuando cambian
  useEffect(() => {
    console.log(dataFiltrado);
    const temp = ordenarProductos(criterio);
    temp != undefined ? setdataOrdenado(temp) : console.log("no hay modificaciones");
  }, [dataFiltrado, criterio]);

  // Manejador para el cambio de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Renderización del header */}
      <Header />
      <div className="lg:p-2">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="min-h-24 rounded-lg hidden lg:inline lg:col-span-1"></div>
          <div className="min-h-24 rounded-lg lg:col-span-2 lg:inline">
            {/* SIdebar de filtros */}
            <SidebarFiltros
              onFilterChange={handleFilterChange}
              onSliderChange={onSliderChange}
              maxValue={maxValue}
              minValue={minValue}
            >
              {/* Radio buttons de ordenamiento */}
              <p className="text-base font-light text-primary">Order By</p>
              <div className="p-4">
                <form>
                  <input
                    type="radio"
                    id="pascen"
                    value="non"
                    checked={criterio === 'non'}
                    onChange={() => ordenarProductos("non")}
                  />
                  <label htmlFor="pascen"> Original</label>
                  <br></br>
                  <input
                    type="radio"
                    id="pascen"
                    value="asc"
                    checked={criterio === 'asc'}
                    onChange={() => ordenarProductos("asc")}
                  />
                  <label htmlFor="pascen"> Price: Low to High</label>
                  <br></br>
                  <input
                    type="radio"
                    id="pdesc"
                    value="desc"
                    checked={criterio === 'desc'}
                    onChange={() => ordenarProductos("desc")}
                  />
                  <label htmlFor="pdesc"> Price: High to Low</label>
                  <br></br>
                  <input
                    type="radio"
                    id="destacados"
                    value="destacados"
                    checked={criterio === 'destacados'}
                    onChange={() => ordenarProductos("destacados")}
                  />
                  <label htmlFor="destacados"> Best Reviewed</label>
                  <br></br>
                </form>
              </div>
              {/* Filtros de categorías */}
              <p className="text-base font-light text-primary">Category</p>
              <SidebarItem texto="Laptops" value="laptops" />
              <SidebarItem texto="Beauty" value="beauty" />
              <SidebarItem texto="Fragrances" value="fragrances" />
              <SidebarItem texto="Furniture" value="furniture" />
              <SidebarItem texto="Groceries" value="groceries" />
              <SidebarItem texto="Home Decoration" value="home-decoration" />
              <SidebarItem texto="Kitchen Accessories" value="kitchen-accessories"/>
              <SidebarItem texto="Men's shirts" value="mens-shirts" />
              <SidebarItem texto="Men's shoes" value="mens-shoes" />
              <SidebarItem texto="Men's watches" value="mens-watches" />
              <SidebarItem texto="Mobile accessories" value="mobile-accessories"/>
              {/* Filtros de marcas */}
              <p className="text-base font-light text-primary">Brand</p>
              <SidebarItem texto="Apple" value="Apple" />
              <SidebarItem texto="Essence" value="Essence" />
              <SidebarItem texto="Glamour Beauty" value="Glamour Beauty" />
              <SidebarItem texto="Velvet Touch" value="Velvet Touch" />
              <SidebarItem texto="Chic Cosmetics" value="Chic Cosmetics" />
              <SidebarItem texto="Nail Couture" value="Nail Couture" />
              <SidebarItem texto="Calvin Klein" value="Calvin Klein" />
              <SidebarItem texto="Chanel" value="Chanel" />
              <SidebarItem texto="Dior" value="Dior" />
              <SidebarItem texto="Dolce & Gabbana" value="Dolce & Gabbana" />
              <SidebarItem texto="Gucci" value="Gucci" />
              <SidebarItem texto="Annibale Colombo" value="Annibale Colombo" />
              <SidebarItem texto="Furniture Co." value="Furniture Co." />
              <SidebarItem texto="Knoll" value="Knoll" />
              <SidebarItem texto="Bath Trends" value="Bath Trends" />
              <SidebarItem texto="Asus" value="Asus" />
              <SidebarItem texto="Huawei" value="Huawei" />
              <SidebarItem texto="Lenovo" value="Lenovo" />
              <SidebarItem texto="Dell" value="Dell" />
              <SidebarItem texto="Fashion Trends" value="Fashion Trends" />
              <SidebarItem texto="Gigabyte" value="Gigabyte" />
              <SidebarItem texto="Classic Wear" value="Classic Wear" />
              <SidebarItem texto="Casual Comfort" value="Casual Comfort" />
              <SidebarItem texto="Urban Chic" value="Urban Chic" />
              <SidebarItem texto="Nike" value="Nike" />
              <SidebarItem texto="Puma" value="Puma" />
              <SidebarItem texto="Off White" value="Off White" />
              <SidebarItem texto="Fashion Timepieces" value="Fashion Timepieces"/>
              <SidebarItem texto="Longines" value="Longines" />
              <SidebarItem texto="Rolex" value="Rolex" />
              <SidebarItem texto="Amazon" value="Amazon" />
              <SidebarItem texto="Otras marcas" value="" />
              {/* Campos para desplegar los precios a filtrar */}
              <div className="flex justify-between mb-3">
                <p>Min: $ {minPrice}</p>
                <p>Max: $ {maxPrice}</p>
              </div>
            </SidebarFiltros>
          </div>
          {/* Mapeado de la grid de productos */}
          <div className="min-h-24 mt-12 grid-flow-row-dense content-start rounded-lg lg:col-span-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-2">
            {paginatedData.map((item) => (
              <Producto key={item.id} producto={item} />
            ))}
          </div>
          <div className="min-h-24 rounded-lg hidden lg:inline lg:col-span-1"></div>
        </div>
        {/* Paginación */}
        <div className="flex justify-center m-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-2 py-1 mx-1 ${
                currentPage === i + 1
                  ? "rounded-md bg-primary text-white"
                  : "rounded-md bg-gray-200"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
      {/* Renderización del Footer */}
      <Footer />
    </>
  );
};
