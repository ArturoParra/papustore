import React, { useEffect, useState, useRef } from 'react';
import JustValidate from 'just-validate'; 
import { Header } from '../components/Header';  
import { Footer } from '../components/Footer';  
import { useNavigate } from 'react-router-dom';  
import { useAuth } from '../components/AuthProvider';  // Asegúrate de ajustar la ruta


export const FormularioInicio = () => {
  const [isSignUp, setIsSignUp] = useState(false);  
  const signupValidator = useRef(null);
  const navigate = useNavigate();  
  const { setIsAuthenticated } = useAuth();  // Usar el contexto de autenticación

  useEffect(() => {
    if (isSignUp && !signupValidator.current) {
      signupValidator.current = new JustValidate('#signup-form');

      signupValidator.current
        .addField('#name', [
          {
            rule: 'required',
            errorMessage: 'El nombre es requerido',
          },
        ])
        .addField('#lastname', [
          {
            rule: 'required',
            errorMessage: 'El apellido es requerido',
          },
        ])
        .addField('#email', [
          {
            rule: 'required',
            errorMessage: 'El correo electrónico es requerido',
          },
          {
            rule: 'email',
            errorMessage: 'Correo electrónico inválido',
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
        .addField('#confirm-password', [
          {
            rule: 'required',
            errorMessage: 'La confirmación de la contraseña es requerida',
          },
          {
            validator: (value, fields) => {
              return value === fields['#password'].elem.value;
            },
            errorMessage: 'Las contraseñas no coinciden',
          },
        ])
        .addField('#terms', [
          {
            rule: 'required',
            errorMessage: 'Debes aceptar los términos y condiciones',
          },
        ])
        .onSuccess((event) => {
          event.preventDefault();
          const form = event.target;
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          registrarUsuario(data);
          form.reset();
        });
    }

    return () => {
      if (signupValidator.current) {
        signupValidator.current.destroy();
        signupValidator.current = null;
      }
    };
  }, [isSignUp]);

  const registrarUsuario = async (data) => {
    try {
      const response = await fetch('/api/index.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ functionName: 'registro', data }),
      });
      const result = await response.json();
      if (result.success) {
        alert('Usuario registrado con éxito');
      } else {
        alert('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  const verificarUsuario = async (email, password) => {
    try {
      console.log('Enviando datos:', { email, password }); 
      const response = await fetch('/api/index.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ functionName: 'consultaUsuarios', email, password }),
      });
      const result = await response.json();
      console.log('Respuesta del servidor:', result); 
      if (result.success) {
        setIsAuthenticated(true);  // Actualizar el estado de autenticación
        navigate('/tienda');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al verificar el usuario:', error);
    }
  };

  const handleTabChange = (isSignUpTab) => {
    setIsSignUp(isSignUpTab);
    document.getElementById('signup-form')?.reset();
    document.getElementById('login-form')?.reset();
    document.querySelectorAll('.just-validate-error-label').forEach(label => label.remove());
    document.querySelectorAll('.is-invalid').forEach(input => input.classList.remove('is-invalid'));
  };

  useEffect(() => {
    const validator = new JustValidate('#login-form');

    validator
      .addField('#email', [
        {
          rule: 'required',
          errorMessage: 'El correo electrónico es requerido',
        },
        {
          rule: 'email',
          errorMessage: 'Correo electrónico inválido',
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
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        alert(JSON.stringify(data, null, 2));
      });
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          
          <div className="flex justify-center mb-4">
            <div
              className={`cursor-pointer ${!isSignUp ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
              onClick={() => handleTabChange(false)}  
            >
              SIGN IN
            </div>
            <div
              className={`ml-8 cursor-pointer ${isSignUp ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
              onClick={() => handleTabChange(true)}  
            >
              SIGN UP
            </div>
          </div>

          {isSignUp ? (
            <form id="signup-form" className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  NAME
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="first_name"
                  placeholder="Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                  LASTNAME
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastname"
                  type="text"
                  name="last_name"
                  placeholder="Lastname"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  EMAIL ADDRESS
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
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
                  placeholder="8+ Characters"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                  CONFIRM PASSWORD
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>

              <div className="flex items-center">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  id="terms"
                />
                <label className="text-sm text-gray-600" htmlFor="terms">
                  YOU AGREE WITH THE <a href="#" className="text-orange-500">TERMS AND CONDITIONS</a> AND <a href="#" className="text-orange-500">PRIVACY POLICY</a>.
                </label>
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                >
                  SIGN UP
                </button>
              </div>
            </form>
          ) : (
            <form id="login-form" className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value;
              const password = e.target.password.value;
              verificarUsuario(email, password);  // Pasar el email y password
            }}>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  EMAIL ADDRESS
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
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
                <div className="text-right mt-2">
                  <a href="#" className="text-sm text-orange-500">FORGOT PASSWORD</a>  
                </div>
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
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
