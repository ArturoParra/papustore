import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import JustValidate from 'just-validate';
import { useAuth } from '../components/AuthProvider';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";



export const EditProfile = () => {
  const { userEmail, isAuthenticated } = useAuth();
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    email_secondary: '',
    purchases: 0,
    papu_credits: 0.00,
    country: '',
    state: '',
    zip: '',
    company: '',
    address: '',
    region: '',
    city: ''
  });

  const IconoFlecha = <FontAwesomeIcon icon={fas.faArrowLeft}/>

  useEffect(() => {
    if(!isAuthenticated){
      navigate("/")
    }
  }, [])

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/index.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            functionName: 'consultaUsuarioData',
            email: userEmail,
          }),
        });
        const data = await response.json();
        setUserInfo({
          email: data.email || '',
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone: data.phone || '',
          email_secondary: data.email_secondary || '',
          purchases: data.purchases || 0,
          papu_credits: data.papu_credits || 0.00,
          country: data.country || '',
          state: data.state || '',
          zip: data.zip || '',
          company: data.company || '',
          address: data.address || '',
          region: data.region || '',
          city: data.city || ''
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, [userEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('/api/index.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          functionName: 'updateUserData',
          userData: userInfo,
        }),
      });
      const result = await response.json();
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "You information was succesfully updated",
          showConfirmButton: false,
          timer: 2500
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "There was an error trying to update your information",
          text: "Try again",
          showConfirmButton: false,
          timer: 2500
        });
      }
    } catch (error) {
      console.error('Error saving user info:', error);
    }
  };

  useEffect(() => {
    const validator = new JustValidate('#edit-profile-form');

    validator
      .addField('#first_name', [
        {
          rule: 'required',
          errorMessage: 'El nombre es requerido',
        },
      ])
      .addField('#last_name', [
        {
          rule: 'required',
          errorMessage: 'El apellido es requerido',
        },
      ])
      .addField('#phone', [
        {
          rule: 'required',
          errorMessage: 'El teléfono es requerido',
        },
        {
          rule: 'customRegexp',
          value: /^[0-9]{10,15}$/,
          errorMessage: 'El teléfono no es válido',
        },
      ])
      .addField('#email_secondary', [
        {
          rule: 'email',
          errorMessage: 'El correo electrónico no es válido',
        },
      ])
      .addField('#country', [
        {
          rule: 'required',
          errorMessage: 'El país es requerido',
        },
      ])
      .addField('#state', [
        {
          rule: 'required',
          errorMessage: 'El estado es requerido',
        },
      ])
      .addField('#city', [
        {
          rule: 'required',
          errorMessage: 'La ciudad es requerida',
        },
      ])
      .addField('#zip', [
        {
          rule: 'required',
          errorMessage: 'El código postal es requerido',
        },
      ])
      .addField('#address', [
        {
          rule: 'required',
          errorMessage: 'La dirección es requerida',
        },
      ])
      .addField('#region', [
        {
          rule: 'required',
          errorMessage: 'La región es requerida',
        },
      ])
      .onSuccess((event) => {
        event.preventDefault();
        handleSaveChanges();
      });

    return () => {
      validator.destroy();
    };
  }, [userInfo]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 mt-14">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl mb-8">
        <Link to="/perfil">
                <button className="flex font-semibold text-sm text-black items-center sm:justify-start w-full sm:w-auto mb-4">
                  <span>{IconoFlecha} BACK TO PROFILE</span>
                </button>
              </Link>
          <form id="edit-profile-form" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                <h2 className="text-xl font-bold mb-4">ACCOUNT INFORMATION</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">FIRST NAME</label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={userInfo.first_name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">LAST NAME</label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={userInfo.last_name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">PHONE</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">SECONDARY EMAIL</label>
                    <input
                      type="email"
                      id="email_secondary"
                      name="email_secondary"
                      value={userInfo.email_secondary}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">PURCHASES</label>
                    <input
                      type="number"
                      name="purchases"
                      value={userInfo.purchases}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">PAPU CREDITS</label>
                    <input
                      type="number"
                      name="papu_credits"
                      value={userInfo.papu_credits}
                      className="mt-1 block w-full p-2 bg-gray-100"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-xl font-bold mb-4">SHIPPING ADDRESS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">COUNTRY</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={userInfo.country}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">STATE</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={userInfo.state}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CITY</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={userInfo.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP CODE</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={userInfo.zip}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">COMPANY NAME (OPTIONAL)</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={userInfo.company}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">ADDRESS</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={userInfo.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">REGION</label>
                    <input
                      type="text"
                      id="region"
                      name="region"
                      value={userInfo.region}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                SAVE CHANGES
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
