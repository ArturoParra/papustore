import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor de contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('userEmail') || '';
  });

  const [isAuthenticatedadmin, setIsAuthenticatedadmin] = useState(() => {
    return localStorage.getItem('isAuthenticatedadmin') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('isAuthenticatedadmin', isAuthenticatedadmin);
    localStorage.setItem('userEmail', userEmail);
  }, [isAuthenticated, userEmail, isAuthenticatedadmin]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, setIsAuthenticatedadmin, isAuthenticatedadmin, userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};
