import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const salesByCategory = [
  { category: 'Electrónica', totalSales: 15000 },
  { category: 'Ropa', totalSales: 12000 },
  { category: 'Hogar', totalSales: 8000 },
  { category: 'Juguetes', totalSales: 6000 },
  { category: 'Deportes', totalSales: 7000 },
];

const salesData = {
  labels: salesByCategory.map(item => item.category),
  datasets: [
    {
      label: 'Ventas',
      data: salesByCategory.map(item => item.totalSales),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Ventas por Categoría',
    },
  },
};

export const AdministratorMode = () => {
  const printReport = () => {
    window.print();
  };

  return (
    <div>
      <Header />
      <main className="p-5 flex flex-col items-center gap-5">
        <h1 className="text-3xl font-bold mb-5">Perfil del Administrador</h1>
        <section className="bg-white p-5 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">Ventas</h2>
          <p className="mb-4">A continuación se muestra un resumen de las ventas realizadas en la tienda:</p>
          <div className="w-full overflow-x-auto">
            <Bar data={salesData} options={options} />
          </div>
        </section>
        <section className="bg-white p-5 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">Ventas por Categoría</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Categoría</th>
                <th className="py-2 px-4 border-b">Total Ventas</th>
              </tr>
            </thead>
            <tbody>
              {salesByCategory.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-center">{item.category}</td>
                  <td className="py-2 px-4 border-b text-center">{`$${item.totalSales.toLocaleString()}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="bg-white p-5 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">Configuraciones</h2>
          <button onClick={printReport} className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-2 hover:bg-blue-700">Imprimir Reporte de Ventas</button>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-2 hover:bg-blue-700">Cerrar Sesión</button>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-2 hover:bg-blue-700">Editar Productos</button>
        </section>
      </main>
      <Footer />
    </div>
  );
};
