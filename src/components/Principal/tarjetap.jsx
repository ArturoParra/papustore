export function Tarjetap() {
    return (
        // Sección de las mejores ventas
        <div className="">
            <div className="flex gap-3 w-full">
                <img
                    loading="lazy"
                    src="https://unavatar.io/google/google.com"
                    className="shrink-0 w-20 aspect-square"
                />
                <div className="flex flex-col my-auto">
                    <div className="leading-5 text-zinc-900">Titulo</div>
                    <div className="mt-2 font-semibold text-sky-400 leading-[143%]">
                        Precio:
                    </div>
                </div>
            </div>
        </div>
    );
}
