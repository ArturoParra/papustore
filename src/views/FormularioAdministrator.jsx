import React, { useEffect } from 'react';
import JustValidate from 'just-validate';
import Swal from "sweetalert2"; 
import { Header } from '../components/Header';  
import { Footer } from '../components/Footer';  
import { useNavigate } from 'react-router-dom';  
import { useAuth } from '../components/AuthProvider';  

export const FormularioAdministrator = () => {
  const navigate = useNavigate();  
  const { setIsAuthenticated } = useAuth();  

  const verificarAdministrador = async (adminuser, password) => {
    try {
      const response = await fetch('/api/index.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ functionName: 'consultaAdministradores', adminuser, password }),
      });
      const result = await response.json();
      if (result.success) {
        setIsAuthenticated(true);  
        navigate('/administrador');
      } else {
        Swal.fire({
          icon: "error",
          title: "Incorrect email or password",
          text: "Try again",
          showConfirmButton: false,
          timer: 2500
        });
      }
    } catch (error) {
      console.error('Error al verificar el administrador:', error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

    useEffect(() => {
      const validator = new JustValidate('#login-form');

    validator
      .addField('#adminuser', [
        {
          rule: 'required',
          errorMessage: 'El usuario administrador es requerido',
        },
        {
          rule: 'minLength',
          value: 3,
          errorMessage: 'El usuario administrador debe tener al menos 3 caracteres',
        },
      ])
      .addField('#password', [
        {
          rule: 'required',
          errorMessage: 'La contraseña es requerida',
        },
        {
          rule: 'minLength',
          value: 8,
          errorMessage: 'La contraseña debe tener al menos 8 caracteres',
        },
      ])
      .onSuccess((event) => {
        event.preventDefault();
        const adminuser = event.target.adminuser.value;
        const password = event.target.password.value;
        verificarAdministrador(adminuser, password);
      });

    return () => {
      validator.destroy();
    };
    }, [])
    

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex justify-center mb-4">
            <div className="cursor-pointer text-orange-500 border-b-2 border-orange-500">
              SIGN IN
            </div>
          </div>

          <form id="login-form" className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adminuser">
                ADMIN USER
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="adminuser"
                type="text"
                name="adminuser"
                placeholder="Admin User"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                SIGN IN
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
