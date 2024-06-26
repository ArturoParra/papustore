import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Order from '../components/Order';
import { useAuth } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export const UserProfile = () => {
  const { userEmail, isAuthenticated } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const navigate = useNavigate(); // Inicializar useNavigate
  const IconoFlecha = <FontAwesomeIcon icon={fas.faArrowLeft}/>

  useEffect(() => {
    if(!isAuthenticated){
      navigate("/")
    }
  }, [])

  useEffect(() => {
    // Fetch user information
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
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    // Fetch recent orders
    const fetchRecentOrders = async () => {
      try {
        const response = await fetch('/api/index.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            functionName: 'consultaPedidosRecientes',
            email: userEmail,
          }),
        });
        const data = await response.json();
        setRecentOrders(data);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      }
    };

    fetchUserInfo();
    fetchRecentOrders();
  }, [userEmail]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 mt-12">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl mb-8">
        <Link to="/tienda">
                <button className="flex font-semibold text-sm text-black items-center sm:justify-start w-full sm:w-auto mb-4">
                  <span>{IconoFlecha} BACK TO SHOP</span>
                </button>
              </Link>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-bold mb-4">ACCOUNT INFORMATION</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">EMAIL</label>
                  <div className="mt-1 block w-full p-2 bg-gray-100">{userInfo.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">FIRST NAME</label>
                  <div className="mt-1 block w-full p-2 bg-gray-100">{userInfo.first_name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">LAST NAME</label>
                  <div className="mt-1 block w-full p-2 bg-gray-100">{userInfo.last_name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">PHONE</label>
                  <div className="mt-1 block w-full p-2 bg-gray-100">{userInfo.phone}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">SECONDARY EMAIL</label>
                  <div className="mt-1 block w-full p-2 bg-gray-100">{userInfo.email_secondary}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">PURCHASES</label>
                  <div className="mt-1 block w-full p-2 bg-gray-100">{userInfo.purchases}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">PAPU CREDITS</label>
                  <div className="mt-1 block w-full p-2 bg-gray-100">${userInfo.papu_credits} USD</div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-bold mb-4">SHIPPING ADDRESS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">COUNTRY</label>
                  <div className="mt-1 block w-full p-2 bg-gray-100">{userInfo.country}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">STATE</label>
                  <div className="mt-1 block w-full p-2 bg-gray-100">{userInfo.state}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CITY</label>
                  <div className="mt-1 block w-full p-2 bg-gray-100">{userInfo.city}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ZIP CODE</label>
                  <div className="mt-1 block w-full p-2 bg-gray-100">{userInfo.zip}</div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">COMPANY NAME (OPTIONAL)</label>
                  <div className="mt-1 block w-full p-2 bg-gray-100">{userInfo.company}</div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">ADDRESS</label>
                  <div className="mt-1 block w-full p-2 bg-gray-100">{userInfo.address}</div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">REGION</label>
                  <div className="mt-1 block w-full p-2 bg-gray-100">{userInfo.region}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => navigate('/edit-profile')} // Usar navigate para redirigir
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              EDIT INFORMATION
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
          <h2 className="text-xl font-bold mb-4">RECENT ORDER</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ORDER ID</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DATE</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">TOTAL</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <Order key={order.id} id={order.id} date={order.date} total={order.total} action={order.action} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
