export function Footer() {
    return (
      /* Diseño en columnas adaptables */
      <div className="flex flex-col justify-center">
        
        {/* Contenedor del pie de pagina */}
        <div className="flex justify-center items-center px-16 py-20 w-full text-white bg-zinc-900 max-md:px-5 max-md:max-w-full">
          
          {/* Definicion de columnas y espacios entre columnas */}
          <div className="flex flex-row gap-28 justify-between items-start max-md:flex-wrap">
  
            {/* Diseño en filas adaptable */}
            <div className="flex flex-col text-center">
  
              {/* Nombre de la pagina */}
              <div className="justify-center text-3xl font-bold tracking-tighter whitespace-nowrap">
                <div className="my-auto">PAPUSTORE</div>
              </div>
  
              {/* Telefonos de contacto */}
              <div className="mt-6 text-sm leading-5 text-slate-500">
                Telefono de contacto:
              </div>
              <div className="mt-1 text-lg font-medium leading-6">
                <p className="pb-1">55-66-26-58-18</p>
                <p className="pb-1">55-33-18-86-06</p>
                <p className="pb-1">55-66-99-12-29</p>
              </div>
              
              {/* Correo electronico: */}
              <div className="mt-6 text-sm leading-5 text-slate-500">
                Correo electronico:
              </div>
              <div className="mt-3 text-base font-medium leading-6">
              corporationcdm@cdm.com
              </div>
            </div>
  
            <div className="flex flex-col self-stretch text-sm font-medium leading-5 text-gray-400  text-center">
              <div className="text-base leading-6 text-white uppercase">
                CATEGORIAS TOP
              </div>
              <div className="mt-3">Computadoras</div>
              <div className="mt-3">Laptops</div>
              <div className="mt-3">Celulares</div>
              <div className="mt-3">Audifonos</div>
              <div className="mt-3">Accesorios</div>
              <div className="mt-3">Camaras</div>
              <div className="mt-3">Televisiones</div>
              <div className="flex gap-2 py-1.5 pr-1.5 mt-1.5 text-yellow-400 bg-zinc-900">
                <div>Ver todos los productos</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/636cfcf25cb7b5247df40dfd25211469e924ee05555e20c7e7a80af8a16ae5c2?"
                  className="shrink-0 w-5 aspect-square"
                />
              </div>
            </div>
            <div className="flex flex-col self-stretch pb-1.5 text-sm font-medium leading-5 text-gray-400 text-center">
              <div className="text-base leading-6 text-white uppercase">
                ACCESOS RAPIDOS
              </div>
              <div className="mt-5">Comprar productos</div>
              <div className="mt-3">Carrito de compra</div>
              <div className="mt-3">Lista de favoritos</div>
              <div className="mt-3">Informacion de pedido</div>
              <div className="mt-3">Ayuda al cliente</div>
              <div className="mt-3">Sobre nosotros</div>
            </div>
            
  
            <div className="flex flex-col text-sm font-medium leading-5 items-center">
              
              <div className="text-base leading-6 uppercase">ETIQUETAS POPULARES</div>
              <div className="flex gap-2 mt-5">
                <div className="justify-center px-3 py-1.5 whitespace-nowrap rounded-sm border border-solid border-neutral-700">
                  Juegos
                </div>
                <div className="justify-center px-3 py-1.5 whitespace-nowrap rounded-sm border border-solid border-neutral-700">
                  iPhone
                </div>
                <div className="justify-center px-3 py-1.5 whitespace-nowrap rounded-sm border border-solid border-neutral-700">
                  TV
                </div>
                <div className="justify-center px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
                  Asus
                </div>
              </div>
              <div className="flex gap-2 pr-10 mt-2 max-md:pr-5">
                <div className="justify-center px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
                  Macbook
                </div>
                <div className="justify-center px-3 py-1.5 whitespace-nowrap rounded-sm border border-solid border-neutral-700">
                  SSD
                </div>
                <div className="justify-center px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
                  Tarjeta grafica
                </div>
              </div>
              <div className="flex gap-2 pr-7 mt-2 max-md:pr-5">
                <div className="justify-center px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
                  Power Bank
                </div>
                <div className="justify-center px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
                  Smart TV
                </div>
                <div className="justify-center px-3 py-1.5 whitespace-nowrap rounded-sm border border-solid border-neutral-700">
                  Bocina
                </div>
              </div>
              <div className="flex gap-2 pr-12 mt-2 whitespace-nowrap max-md:pr-5">
                <div className="justify-center px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
                  Tableta
                </div>
                <div className="justify-center px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
                  Microondas
                </div>
                <div className="justify-center px-3 py-1.5 rounded-sm border border-solid border-neutral-700">
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