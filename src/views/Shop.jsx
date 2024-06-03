import React, { useEffect, useState } from "react";
import { SidebarFiltros, SidebarItem } from "../components/SidebarFiltros";
import { Producto } from "../components/Producto";
//TODO: Cambiar la lógica del producto, esto tiene que venir la de BD
import { products } from "../data/db.json";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Shop = () => {

  
  const [filter, setFilter] = useState([]);
  //TODO: Cambiar la lógica del producto, esto tiene que venir la de BD
  //TODO: borrar el JSON del proyecto
  const [data, setData] = useState(products);

  const values = Object.values(data).map(obj => obj.price);
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)

  const [dataFiltrado, setdataFiltrado] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPrice, setmaxPrice] = useState(maxValue)
  const [minPrice, setminPrice] = useState(minValue)
  const itemsPerPage = 9; // Adjust as needed
  let filtrado = []

  const handleFilterChange = (newFilter) => {
    setFilter((prevFilter) => {
      if (prevFilter.includes(newFilter)) {
        return prevFilter.filter((item) => item !== newFilter);
      } else {
        return [...prevFilter, newFilter];
      }
    });
  };

  const intersection = (array1, array2) => {
    return array1.filter(value => array2.includes(value));
  };  

  const FuncionFiltrado = (data,filters) => {

    let res = []
    let res2 = []
    let res3 = []

    const pricefilter = onSliderChange
    console.log(pricefilter)

    if (filters.length === 0) {
      return data;
    }else{
      res = Object.values(data).filter(item =>(filters.includes(item.category) || filters.includes(item.brand))||(filters.includes(item.category) && filters.includes(item.brand)))
      res2 = Object.values(data).filter(item =>(filters.includes(item.category) && filters.includes(item.brand)))
      res3 = Object.values(data).filter(item =>(filters.includes(item.category) && filters.includes(item.brand)))
      res = res2.length > 0 ? intersection(res,res2) : res
    }
    return res
  }

  useEffect(() => {

      filtrado = FuncionFiltrado(data,filter)
      setdataFiltrado(filtrado)
      
  }, [filter,data]);

  
  /* data.map((item) => (
    console.log(item.brand)
  )) */

  const onSliderChange = (value) => {
    const [minval, maxval] = value;
    setmaxPrice(maxval)
    setminPrice(minval)
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate the items for the current page
  const startIdx = (currentPage - 1) * itemsPerPage;
  //TODO: hacer pasar data por un filtro y luego por la paginación
  //TODO: condicionar que arreglo se va a mostra (el filtrado o el original) también debería probar esto dentro del useEffect de los filtros
  const paginatedData = dataFiltrado.slice(startIdx, startIdx + itemsPerPage)
  const totalPages = Math.ceil(dataFiltrado.length / itemsPerPage)

  return (
    <>
      <Header/>
      <div className="lg:p-2">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="min-h-24 rounded-lg hidden lg:inline lg:col-span-1"></div>
          <div className="min-h-24 rounded-lg lg:col-span-2  lg:inline">
            <SidebarFiltros
              onFilterChange={handleFilterChange}
              onSliderChange={onSliderChange}
              maxValue={maxValue}
              minValue={minValue}
            >
              <p className="text-base font-light text-primary">Category</p>
              <SidebarItem texto="Laptops" value="laptops" />
              <SidebarItem texto="Beauty" value="beauty" />
              <SidebarItem texto="Fragrances" value="fragrances" />
              <SidebarItem texto="Furniture" value="furniture" />
              <SidebarItem texto="Groceries" value="groceries" />
              <SidebarItem texto="Home Decoration" value="home-decoration" />
              <SidebarItem texto="Kitchen Accessories" value="kitchen-accessories" />
              <SidebarItem texto="Men's shirts" value="mens-shirts" />
              <SidebarItem texto="Men's shoes" value="mens-shoes" />
              <SidebarItem texto="Men's watches" value="mens-watches" />
              <SidebarItem texto="Mobile accessories" value="mobile-accessories" />
              <p className="text-base font-light text-primary">Brand</p>
              <SidebarItem texto="Apple" value="Apple" />

              
            <div className="flex justify-between mb-3">
              <p>Min: $ {minPrice}</p>
              <p>Max: $ {maxPrice}</p>
            </div>
            </SidebarFiltros>
          </div>
          <div className="min-h-24 rounded-lg lg:col-span-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-2">
            {paginatedData.map((item) => (
              <Producto key={item.id} producto={item} />
            ))}
          </div>
          <div className="min-h-24 rounded-lg hidden lg:inline lg:col-span-1"></div>
        </div>
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
                currentPage === i + 1 ? "rounded-md bg-primary text-white" : "rounded-md bg-gray-200"
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
      <Footer/>
    </>
  );
};
