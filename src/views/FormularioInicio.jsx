import React, { useEffect, useState, useRef } from 'react';
import JustValidate from 'just-validate';
import Swal from "sweetalert2";
import { Header } from '../components/Header';  
import { Footer } from '../components/Footer';  
import { useNavigate } from 'react-router-dom';  
import { useAuth } from '../components/AuthProvider'; 

export const FormularioInicio = () => {
  const [isSignUp, setIsSignUp] = useState(false);  
  const signupValidator = useRef(null);
  const loginValidator = useRef(null);
  const navigate = useNavigate();  
  const { setIsAuthenticated, setUserEmail } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isSignUp && !signupValidator.current) {
      signupValidator.current = new JustValidate('#signup-form', {
        validateBeforeSubmitting: true,
      });

      signupValidator.current
        .addField('#signup-name', [
          {
            rule: 'required',
            errorMessage: 'El nombre es requerido',
          },
        ])
        .addField('#signup-lastname', [
          {
            rule: 'required',
            errorMessage: 'El apellido es requerido',
          },
        ])
        .addField('#signup-email', [
          {
            rule: 'required',
            errorMessage: 'El correo electrónico es requerido',
          },
          {
            rule: 'email',
            errorMessage: 'Correo electrónico inválido',
          },
        ])
        .addField('#signup-password', [
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
        .addField('#signup-confirm-password', [
          {
            rule: 'required',
            errorMessage: 'La confirmación de la contraseña es requerida',
          },
          {
            validator: (value, fields) => {
              return value === fields['#signup-password'].elem.value;
            },
            errorMessage: 'Las contraseñas no coinciden',
          },
        ])
        .addField('#signup-terms', [
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

    if (!isSignUp && !loginValidator.current) {
      loginValidator.current = new JustValidate('#login-form', {
        validateBeforeSubmitting: true,
      });

      loginValidator.current
        .addField('#login-email', [
          {
            rule: 'required',
            errorMessage: 'El correo electrónico es requerido',
          },
          {
            rule: 'email',
            errorMessage: 'Correo electrónico inválido',
          },
        ])
        .addField('#login-password', [
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
          const email = form.login_email.value;
          const password = form.login_password.value;
          verificarUsuario(email, password);
        });
    }

    return () => {
      if (signupValidator.current) {
        signupValidator.current.destroy();
        signupValidator.current = null;
      }
      if (loginValidator.current) {
        loginValidator.current.destroy();
        loginValidator.current = null;
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
        Swal.fire({
          icon: "success",
          title: "User successfully registered",
          showConfirmButton: false,
          timer: 2500
        });
        setIsSignUp(false)
      } else {
        Swal.fire({
          icon: "error",
          title: "Error trying to register",
          text: "Try again",
          showConfirmButton: false,
          timer: 2500
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error trying to register",
        text: "Try again",
        showConfirmButton: false,
        timer: 2500
      });
    }
  };

  const verificarUsuario = async (email, password) => {
    try {
      const response = await fetch('/api/index.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ functionName: 'consultaUsuarios', email, password }),
      });
      const result = await response.json();
      if (result.success) {
        setIsAuthenticated(true);
        setUserEmail(email); // Guardar el correo electrónico
        navigate('/');
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-name">
                  NAME
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="signup-name"
                  type="text"
                  name="first_name"
                  placeholder="Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-lastname">
                  LASTNAME
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="signup-lastname"
                  type="text"
                  name="last_name"
                  placeholder="Lastname"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-email">
                  EMAIL ADDRESS
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="signup-email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-password">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-confirm-password">
                  CONFIRM PASSWORD
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="signup-confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>

              <div className="flex items-center">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  id="signup-terms"
                />
                <label className="text-sm text-gray-600" htmlFor="signup-terms">
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
            <form id="login-form" className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-email">
                  EMAIL ADDRESS
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="login-email"
                  type="email"
                  name="login_email"
                  placeholder="Email Address"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-password">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    name="login_password"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
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
