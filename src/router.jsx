import React from 'react'; // Importa React desde la biblioteca 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Importa BrowserRouter, Route y Routes desde 'react-router-dom'
import { IndexPage } from './views/IndexPage'; // Importa el componente IndexPage desde './views/IndexPage'
import { ShoppingCart } from './views/ShoppingCart'; // Importa el componente ShoppingCart desde './views/ShoppingCart'
import { UserProfile } from './views/UserProfile'; // Importa el componente UserProfile desde './views/UserProfile'
import { Wishlist } from './views/Wishlist'; // Importa el componente Wishlist desde './views/Wishlist'
import { VistaProducto } from './views/VistaProducto'; // Importa el componente VistaProducto desde './views/VistaProducto'
import { Shop } from './views/Shop'; // Importa el componente Shop desde './views/Shop'

export const AppRouter = () => {
  // Define el enrutador de la aplicación
  return (
    <BrowserRouter> {/* Utiliza BrowserRouter como el enrutador principal */}
      <Routes> {/* Define las rutas */}
        <Route path='/' element={<IndexPage />} /> {/* Ruta para la página de inicio */}
        <Route path='/carrito' element={<ShoppingCart />} /> {/* Ruta para el carrito de compras */}
        <Route path='/tienda' element={<Shop />} /> {/* Ruta para la tienda */}
        <Route path='/perfil' element={<UserProfile />} /> {/* Ruta para el perfil de usuario */}
        <Route path='/favoritos' element={<Wishlist />} /> {/* Ruta para la lista de deseos */}
        <Route path='/producto' element={<VistaProducto />} /> {/* Ruta para la vista de producto */}
      </Routes>
    </BrowserRouter>
  );
};
