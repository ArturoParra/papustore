//import para iconos svg
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo-papustore.png'
import { Link, NavLink } from 'react-router-dom'


export const Header = () => {

    const iconoUser = <FontAwesomeIcon className='text-white' icon={fas.faUser} />
    const iconoCarrito = <FontAwesomeIcon className='text-white' icon={fas.faCartShopping} />
    const iconoLupa = <FontAwesomeIcon className='text-gray-600' icon={fas.faSearch} />

  return (
    <header className='bg-negro'>
        <div className='mx-auto container px-5 py-5'>
            <div className='flex justify-between items-center'>
                <div>
                    <Link to="/"><img className='w-32' src={logo} alt='logotipo'/></Link>
                </div>

                <div className='bg-white px-2 py-2 rounded-md'>
                    {iconoLupa}
                    <input type='text' className='text-gray-600 mx-2 border-none focus:outline-none' placeholder="Buscar productos"/>
                </div>

                <nav className='flex gap-4'>
                    <Link to="/carrito">{iconoCarrito}</Link>
                    <Link to="/perfil">{iconoUser}</Link>
                </nav>
            </div>
        </div>
    </header>
    
  )
}
