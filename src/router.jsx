import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { IndexPage } from './views/IndexPage'
import { ShoppingCart } from './views/ShoppingCart'
import { UserProfile } from './views/UserProfile'
import { Wishlist } from './views/Wishlist'
import { VistaProducto } from './views/VistaProducto'
import { Shop } from './views/Shop'


export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<IndexPage/>}/>
            <Route path='/carrito' element={<ShoppingCart/>}/>
            <Route path='/tienda' element={<Shop/>}/>
            <Route path='/perfil' element={<UserProfile/>}/>
            <Route path='/favoritos' element={<Wishlist/>}/>
            <Route path='/producto' element={<VistaProducto/>}/>
        </Routes>
    </BrowserRouter>
  )
}
