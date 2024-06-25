import { Link } from "react-router-dom";

export function Categoria( {categorias} ) {

  return (
    <div className="flex-shrink-0 w-52 border border-solid border-gray-200 p-4">
    <Link to={`/tienda/${categorias.category}`}>
      <img
        loading="lazy"
        src={categorias.thumbnail}
        className="w-full h-auto mb-4"
        alt={categorias.category}
      />
      <div className="text-center">{categorias.category}</div>
    </Link>
  </div>
);
}
