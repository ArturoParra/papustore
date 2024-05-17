import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { IndexPage } from './views/IndexPage'
import { ShoppingCart } from './views/ShoppingCart'
import { UserProfile } from './views/UserProfile'
import { Wishlist } from './views/Wishlist'


export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<IndexPage/>}/>
            <Route path='/carrito' element={<ShoppingCart/>}/>
            <Route path='/perfil' element={<UserProfile/>}/>
            <Route path='/favoritos' element={<Wishlist/>}/>
        </Routes>
    </BrowserRouter>
  )
}
