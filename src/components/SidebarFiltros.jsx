import React, { createContext, useContext, useState } from "react";
import ReactSlider from "react-slider";
import "../styles/Slider.css";

const SidebarContext = createContext();

export const SidebarFiltros = ({ children, onFilterChange, onSliderChange, maxValue, minValue }) => {
  
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState([]);

  const handleChange = (value, index) => {
    
    onSliderChange(value)
    // Aquí puedes hacer lo que quieras con el valor y el índice
  };

  const handleCheckboxChange = (event) => {
    const newFilter = event.target.value; // Captura el texto del label
    setFilter(newFilter); // Actualiza el estado en el hijo
    onFilterChange(newFilter); // Llama a la función del padre para actualizar el estado en el padre
  };

  return (
    <aside className="z-100 relative h-full inline max-w-max max-h-max">
      <nav className="flex flex-col bg-white border-r shadow-sm h-full">
        <div className="p-4 pb-2 flex justify-between items-center lg:hidden">
          <button
            className="p-2 rounded-lg bg-gray-400 hover:bg-gray-800"
            onClick={() => setExpanded((curr) => !curr)}
          >
            =
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, handleCheckboxChange }}>
          <ul
            className={`absolute overflow-y-auto max-h-screen lg:max-h-max z-40 flex-1 px-3 max-w-max transform transition duration-500 lg:static lg:translate-x-0 lg:justify-normal lg:px-3 lg:bg-slate-200 lg:rounded-lg ${
              expanded
                ? "bg-slate-200 translate-x-0"
                : "bg-none -translate-x-full"
            }`}
          >
            <div className="my-2 flex justify-between">
              <h4 className="font-semibold text-xl">Filtros</h4>
              <button
                className=" p-2 rounded-lg bg-gray-400 hover:bg-gray-800 lg:hidden"
                onClick={() => setExpanded((curr) => !curr)}
              >
                cerrar
              </button>
            </div>
            {React.Children.map(children, (child) => 
              React.cloneElement(child, { handleCheckboxChange })
            )}

            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[minValue, maxValue]}
              min={minValue}
              max={maxValue}
              ariaLabel={["Middle thumb", "Rightmost thumb"]}
              renderThumb={(props, state) => (
                <div {...props}>||</div>
              )}
              pearling
              minDistance={0}
              withTracks={true}
              onChange={handleChange}
            />

            <div class="flex justify-between my-3">
              <span>$ {minValue}</span>
              <span>$ {maxValue}</span>
            </div>
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};


export const SidebarItem = ({ value, texto, handleCheckboxChange }) => {
  const { expanded } = useContext(SidebarContext);
  return (
    <li className={`relative flex items-center py-2 px-3 my-1 ml-3`}>
      <span className={` overflow-hidden transition-all `}>
        <input
          id="default-checkbox"
          type="checkbox"
          value={value}
          className={` appearance-none w-4 h-4 border border-gray-300 rounded bg-gray-100 checked:bg-primary checked:border-primary focus:outline-none `}
          onChange={handleCheckboxChange}
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
            color: white; /* Color of the checkmark */
            font-size: 0.75rem; /* Adjust size as needed */
            line-height: 1; /* Ensure line height does not affect alignment */
          }
        `}</style>
        <label className={` ms-2 text-sm font-medium text-gray-900`}>
          {texto}
        </label>
      </span>

      {expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6"></div>
      )}
    </li>
  );
};

