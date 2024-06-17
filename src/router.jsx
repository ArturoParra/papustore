import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IndexPage } from './views/IndexPage';
import { ShoppingCart } from './views/ShoppingCart';
import { UserProfile } from './views/UserProfile';
import { Wishlist } from './views/Wishlist';
import { VistaProducto } from './views/VistaProducto';
import { Shop } from './views/Shop';
import { AdministratorMode } from './views/AdministratorMode';
import { FormularioAdministrator } from './views/FormularioAdministrator';
import { FormularioInicio } from './views/FormularioInicio';
import { AuthProvider } from './components/AuthProvider'; // Ajusta la ruta según sea necesario
import { ConfirmarCompra } from './views/ConfirmarCompra';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<IndexPage />} />
          <Route path='/carrito' element={<ShoppingCart />} />
          <Route path='/tienda' element={<Shop />} />
          <Route path='/perfil' element={<UserProfile />} />
          <Route path='/favoritos' element={<Wishlist />} />
          <Route path='/producto/:id' element={<VistaProducto />} />
          <Route path='/administrador' element={<AdministratorMode />} />
          <Route path='/form' element={<FormularioInicio />} />
          <Route path='/adminForm' element={<FormularioAdministrator />} />
          <Route path='/pedido' element={<ConfirmarCompra />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

