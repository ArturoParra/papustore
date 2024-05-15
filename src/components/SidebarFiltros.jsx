import React, { createContext, useContext, useState } from "react";
import ReactSlider from 'react-slider'
import "../styles/Slider.css";

const SidebarContext = createContext();

export const SidebarFiltros = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const [precioSlider, setPrecioSlider] = useState(200);

  const handleChange = (value, index) => {
    const [minvalue, maxvalue] = value
    console.log(`Nuevo valor en el índice ${index}: ${minvalue}, ${maxvalue}`);
    // Aquí puedes hacer lo que quieras con el valor y el índice
  };

  return (
    <aside className="z-100 relative h-full">
      <nav className="flex flex-col bg-white border-r shadow-sm h-full">
        <div className="p-4 pb-2 flex justify-between items-center">
          <button
            className="p-2 rounded-lg bg-gray-400 hover:bg-gray-800"
            onClick={() => setExpanded((curr) => !curr)}
          >
            =
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul
            className={`absolute h-screen z-40 flex-1 px-3 w-1/3 transform transition duration-500 ${
              expanded ? "bg-slate-200 translate-x-0" : "bg-none -translate-x-full"
            }`}
          >
            <div className="my-2 flex justify-between">
              <h4 className="font-semibold text-xl">Filtros</h4>
              <button
                className=" p-2 rounded-lg bg-gray-400 hover:bg-gray-800"
                onClick={() => setExpanded((curr) => !curr)}
              >
                cerrar
              </button>
            </div>
            {children}

            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[0, 100]}
              ariaLabel={["Middle thumb", "Rightmost thumb"]}
              renderThumb={(props, state) => (
                <div {...props}>${state.valueNow}</div>
              )}
              pearling
              minDistance={0}
              withTracks={true}
              onChange={handleChange}
            /> 

            <div class="flex justify-between">
              <span>0</span>
              <span>100</span>
            </div>
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

export const SidebarItem = ({ texto }) => {
  const { expanded } = useContext(SidebarContext);
  return (
    <li className={`relative flex items-center py-2 px-3 my-1 w-52 ml-3`}>
      <span className={` overflow-hidden transition-all `}>
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          className={` w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 `}
        />
        <label
          className={` ms-2 text-sm font-medium text-gray-900`}
        >
          {texto}
        </label>
      </span>

      {expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6"></div>
      )}
    </li>
  );
};
