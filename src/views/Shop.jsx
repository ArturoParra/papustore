import React, { useState } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { SidebarFiltros, SidebarItem } from '../components/SidebarFiltros'
import ReactSlider from 'react-slider'

export const Shop = () => {

  return (
    <>
      <div className='lg:hidden'>
      <SidebarFiltros>
          <SidebarItem texto="Filtro 1"/>
          <SidebarItem texto="Filtro 2"/>
          <SidebarItem texto="Filtro 3"/>
        </SidebarFiltros>
      </div>
      <div className='grid m-4 gap-4 lg:grid-cols-12'>
        
        <div className='min-h-24 rounded-lg bg-slate-800 hidden lg:inline lg:col-span-1'></div>
        <div className='min-h-24 hidden rounded-lg bg-red-700 lg:col-span-3 lg:inline'></div>
        <div className='min-h-24 rounded-lg bg-red-700 lg:col-span-7'></div>
        <div className='min-h-24 rounded-lg bg-blue-700 hidden lg:inline lg:col-span-1'></div>
      </div>
         
    </>
  )
}
