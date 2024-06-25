export function Tarjetap( { producto } ) {
    return (
        // Sección de las mejores ventas
        <div className="flex gap-3 w-full">
            <img
                loading="lazy"
                src={producto.thumbnail}
                className="hover:cursor-pointer shrink-0 w-20 aspect-square"
                onClick={() => { window.location.href = `/producto/${producto.id}`; }}
            />
            <div className="flex flex-col my-auto">
                <div className="leading-5 text-zinc-900">{producto.title}</div>
                <div className="mt-2 font-semibold text-sky-400 leading-[143%]">
                    ${producto.price}
                </div>
            </div>
        </div>
    );
}
