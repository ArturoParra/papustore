import React, { useEffect, useState } from "react";
import { SidebarFiltros, SidebarItem } from "../components/SidebarFiltros";
import { Producto } from "../components/Producto";
//TODO: Cambiar la lógica del producto, esto tiene que venir la de BD
import { products } from "../data/db.json";

export const Shop = () => {
  const [filter, setFilter] = useState([]);
  //TODO: Cambiar la lógica del producto, esto tiene que venir la de BD
  //TODO: borrar el JSON del proyecto
  const [data, setData] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18; // Adjust as needed

  const handleFilterChange = (newFilter) => {
    if (filter.includes(newFilter)) {
      setFilter(filter.filter((item) => item !== newFilter));
    } else {
      setFilter([...filter, newFilter]);
    }
  };

  useEffect(() => {
    // Filter logic can go here if needed
    console.log(filter);
  }, [filter]);

  const onSliderChange = (value) => {
    const [maxval, minval] = value;
    console.log(`valor minimo ${minval}`)
    console.log(`valor maximo ${maxval}`)
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate the items for the current page
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIdx, startIdx + itemsPerPage)
  const totalPages = Math.ceil(data.length / itemsPerPage)

  return (
    <>
      <div className="lg:p-2">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="min-h-24 rounded-lg hidden lg:inline lg:col-span-1"></div>
          <div className="min-h-24 rounded-lg lg:col-span-2  lg:inline">
            <SidebarFiltros
              onFilterChange={handleFilterChange}
              onSliderChange={onSliderChange}
            >
              <SidebarItem texto="Filtro 1" />
              <SidebarItem texto="Filtro 2" />
              <SidebarItem texto="Filtro 3" />
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
    </>
  );
};
