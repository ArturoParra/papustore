import React, { createContext, useContext, useState } from "react";  // Importaciones necesarias de React
import ReactSlider from "react-slider";  // Importación del componente ReactSlider
import "../styles/Slider.css";  // Importación del archivo de estilos CSS

const SidebarContext = createContext();  // Creación del contexto para manejar el estado del sidebar

// Componente principal SidebarFiltros
export const SidebarFiltros = ({ children, onFilterChange, onSliderChange, maxValue, minValue }) => {
  // Estado local para manejar la expansión del sidebar y los filtros seleccionados
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState([]);

  // Función para manejar cambios en el slider
  const handleChange = (value, index) => {
    onSliderChange(value);  // Llama a la función onSliderChange pasada como prop
  };

  // Función para manejar cambios en los checkboxes
  const handleCheckboxChange = (event) => {
    const newFilter = event.target.value;  // Captura el valor del checkbox seleccionado
    setFilter(newFilter);  // Actualiza el estado local de filtros
    onFilterChange(newFilter);  // Llama a la función onFilterChange pasada como prop
  };

  return (
    // Contenedor principal del sidebar
    <aside className="z-100 relative h-full inline max-w-max max-h-max">
      <nav className="flex flex-col mt-8 xs:mt-9 sm:mt-10 md:mt-11 lg:mt-14 border-r shadow-sm h-full">
        <div className="p-4 pb-2 flex justify-between items-center lg:hidden">
          <button
            className="p-2 rounded-lg bg-gray-400 hover:bg-gray-800"
            onClick={() => setExpanded((curr) => !curr)}  // Alterna el estado de expansión del sidebar
          >
            =
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, handleCheckboxChange }}>
          <ul
            className={`overflow-y-auto fixed max-h-screen lg:max-h-max z-40 flex-1 px-3 max-w-max transform transition duration-500 lg:static lg:translate-x-0 lg:justify-normal lg:px-3 lg:bg-slate-200 lg:rounded-lg ${
              expanded
                ? "bg-slate-200 translate-x-0"
                : "bg-none -translate-x-full"
            }`}
          >
            <div className="my-2 flex justify-between">
              <h4 className="font-semibold text-xl">Filtros</h4>
              <button
                className=" p-2 rounded-lg bg-gray-400 hover:bg-gray-800 lg:hidden"
                onClick={() => setExpanded((curr) => !curr)}  // Alterna el estado de expansión del sidebar
              >
                cerrar
              </button>
            </div>
            {React.Children.map(children, (child) => 
              React.cloneElement(child, { handleCheckboxChange })  // Pasa la función handleCheckboxChange a cada hijo
            )}

            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[minValue, maxValue]}  // Valores iniciales del slider
              min={minValue}  // Valor mínimo del slider
              max={maxValue}  // Valor máximo del slider
              ariaLabel={["Middle thumb", "Rightmost thumb"]}  // Etiquetas de accesibilidad para los thumbs
              renderThumb={(props, state) => (
                <div {...props}>||</div>
              )}
              pearling
              minDistance={0}
              withTracks={true}
              onChange={handleChange}  // Manejador de cambios del slider
            />

            <div className="flex justify-between my-3">
              <span>$ {minValue}</span>
              <span>$ {maxValue}</span>
            </div>
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

// Componente SidebarItem para representar cada filtro individual
export const SidebarItem = ({ value, texto, handleCheckboxChange }) => {
  const { expanded } = useContext(SidebarContext);  // Utiliza el contexto SidebarContext para acceder al estado de expansión
  return (
    <li className={`relative flex items-center py-2 px-3 my-1 ml-3`}>
      <span className={` overflow-hidden transition-all `}>
        <input
          id="default-checkbox"
          type="checkbox"
          value={value}
          className={` appearance-none w-4 h-4 border border-gray-300 rounded bg-gray-100 checked:bg-primary checked:border-primary focus:outline-none `}
          onChange={handleCheckboxChange}  // Manejador de cambios para el checkbox
        />
        <style jsx>{`
          input[type="checkbox"] {
            position: relative;
          }
          input[type="checkbox"]:checked::after {
            content: "\\2713"; /* Unicode para el checkmark */
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white; /* Color del checkmark */
            font-size: 0.75rem; /* Tamaño del checkmark */
            line-height: 1; /* Asegura que la altura de línea no afecte la alineación */
          }
        `}</style>
        <label className={` ms-2 text-sm font-medium text-gray-900`}>
          {texto}  {/* Texto del label */}
        </label>
      </span>

      {expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6"></div>
      )}
    </li>
  );
};
