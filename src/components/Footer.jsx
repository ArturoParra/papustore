export function Footer() {
  return (
    <div className="flex flex-col justify-center">
      {/* Contenedor del pie de página */}
      <div className="flex flex-col items-center px-16 py-20 w-full text-white bg-zinc-900 max-md:px-5 max-md:max-w-full">
        {/* Definición de columnas y espacios entre columnas */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-28 justify-between items-center max-md:flex-wrap">
          {/* Diseño en filas adaptable */}
          <div className="flex flex-col items-center text-center md:w-1/4">
            {/* Nombre de la página */}
            <div className="text-3xl font-bold tracking-tighter whitespace-nowrap">
              PAPUSTORE
            </div>
            {/* Teléfonos de contacto */}
            <div className="mt-6 text-sm leading-5 text-slate-500">Teléfono de contacto:</div>
            <div className="mt-1 text-lg font-medium leading-6">
              <p className="pb-1">55-66-26-58-18</p>
              <p className="pb-1">55-33-18-86-06</p>
              <p className="pb-1">55-66-99-12-29</p>
            </div>
            {/* Correo electrónico */}
            <div className="mt-6 text-sm leading-5 text-slate-500">Correo electrónico:</div>
            <div className="mt-3 text-base font-medium leading-6">
              corporationcdm@cdm.com
            </div>
          </div>
          <div className="flex flex-col items-center text-center md:w-1/4">
            <div className="text-base leading-6 text-white uppercase">CATEGORÍAS TOP</div>
            <div className="mt-3">Computadoras</div>
            <div className="mt-3">Laptops</div>
            <div className="mt-3">Celulares</div>
            <div className="mt-3">Audífonos</div>
            <div className="mt-3">Accesorios</div>
            <div className="mt-3">Cámaras</div>
            <div className="mt-3">Televisiones</div>
            <div className="text-yellow-400 mt-3">Ver todos los productos</div>
          </div>
          <div className="flex flex-col items-center text-center md:w-1/4">
            <div className="text-base leading-6 text-white uppercase">ACCESOS RÁPIDOS</div>
            <div className="mt-5">Comprar productos</div>
            <div className="mt-3">Carrito de compra</div>
            <div className="mt-3">Lista de favoritos</div>
            <div className="mt-3">Información de pedido</div>
            <div className="mt-3">Ayuda al cliente</div>
            <div className="mt-3">Sobre nosotros</div>
          </div>
          <div className="flex flex-col items-center text-center md:w-1/4">
            <div className="text-base leading-6 uppercase">ETIQUETAS POPULARES</div>
            <div className="flex gap-2 mt-5 flex-wrap justify-center">
              <div className="px-3 py-1.5 whitespace-nowrap rounded-sm border border-solid border-neutral-700">
                Juegos
              </div>
              <div className="px-3 py-1.5 whitespace-nowrap rounded-sm border border-solid border-neutral-700">
                iPhone
              </div>
              <div className="px-3 py-1.5 whitespace-nowrap rounded-sm border border-solid border-neutral-700">
                TV
              </div>
              <div className="px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
                Asus
              </div>
              <div className="px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
                Macbook
              </div>
              <div className="px-3 py-1.5 whitespace-nowrap rounded-sm border border-solid border-neutral-700">
                SSD
              </div>
              <div className="px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
                Tarjeta gráfica
              </div>
              <div className="px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
                Power Bank
              </div>
              <div className="px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
                Smart TV
              </div>
              <div className="px-3 py-1.5 whitespace-nowrap rounded-sm border border-solid border-neutral-700">
                Bocina
              </div>
              <div className="px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
                Tableta
              </div>
              <div className="px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
                Microondas
              </div>
              <div className="px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
                Samsung
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-center items-center px-10 py-4 w-full text-sm leading-5 text-center text-gray-400 shadow-sm bg-zinc-900 max-md:px-5 max-md:max-w-full">
        Papustore - Powered By - CDM CORP © - 2024
      </div>
    </div>
  );
}
