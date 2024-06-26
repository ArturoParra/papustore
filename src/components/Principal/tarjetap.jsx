export function Tarjetap( { producto } ) {
    return (
        // Sección de las mejores ventas
        <div className="flex gap-0 w-1/2 sm:w-full sm:gap-3">
            <img
                loading="lazy"
                src={producto.thumbnail}
                className="hover:cursor-pointer shrink-0 w-20 aspect-square"
                onClick={() => { window.location.href = `/producto/${producto.id}`; }}
            />
            <div className="flex flex-col my-auto ml-1">
                <div className="text-zinc-900 text-[10px] leading-2 sm:text-sm">{producto.title}</div>
                <div className="mt-2 font-semibold text-sky-400 leading-[143%]">
                    ${producto.price}
                </div>
            </div>
        </div>
    );
}
