// Importacion para iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export function Producto() {

  // Definicion de los iconos
  const IconoEstrella = <FontAwesomeIcon className="my-auto bg-white" icon={fas.faStar} />

  return (
    <div className="flex flex-col border border-solid border-gray-200 p-2 mt-2 md:mt-0 md:h-full md:ml-2">
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/37ce99e990ee6ce2f19d86c5161bab2fff4a66346289f3f77389d547b21c21cd?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/37ce99e990ee6ce2f19d86c5161bab2fff4a66346289f3f77389d547b21c21cd?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/37ce99e990ee6ce2f19d86c5161bab2fff4a66346289f3f77389d547b21c21cd?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/37ce99e990ee6ce2f19d86c5161bab2fff4a66346289f3f77389d547b21c21cd?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/37ce99e990ee6ce2f19d86c5161bab2fff4a66346289f3f77389d547b21c21cd?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/37ce99e990ee6ce2f19d86c5161bab2fff4a66346289f3f77389d547b21c21cd?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/37ce99e990ee6ce2f19d86c5161bab2fff4a66346289f3f77389d547b21c21cd?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/37ce99e990ee6ce2f19d86c5161bab2fff4a66346289f3f77389d547b21c21cd?apiKey=1a2f25590aec488b8dd6a75e7dd5b9e1&"
        className="w-full aspect-[1.5] md:h-full px-2.5 py-3.5"
      />

      
      <div className="flex text-yellow-700 gap-1 justify-center text-sm sm:text-base md:text-xs lg:text-sm xl:text-base full:text-lg">
        <div>{IconoEstrella}</div>
        <div>{IconoEstrella}</div>
        <div>{IconoEstrella}</div>
        <div>{IconoEstrella}</div>
        <div>{IconoEstrella}</div>
        <div className="text-black">(738)</div>
      </div>
      

      <div className="mt-2 leading-5 text-zinc-900 text-center text-sm sm:text-lg md:text-[10px] md:leading-normal lg:text-xs xl:text-base full:text-lg">
        Simple Mobile 4G LTE Prepaid Smartphone
      </div>
      
      <div className="mt-2 font-semibold text-sky-400 text-center text-base sm:text-lg md:text-xs lg:text-sm xl:text-base full:text-lg">$220</div>
    </div>
  );
}
