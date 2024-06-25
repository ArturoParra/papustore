import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const AdministratorMode = () => {
  const [salesData, setSalesData] = useState({});
  const [salesByCategory, setSalesByCategory] = useState([]);
  const [changeChart, setchangeChart] = useState(true);
  const [totalSales, settotalSales] = useState([]);
  const [totalOrders, settotalOrders] = useState([]);
  const [articles, setArticles] = useState([]);
  const [topDiez, settopDiez] = useState([]);

  const options = {
    responsive: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/index.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            functionName: "consultaVentasPorCategoria",
          }),
        });

        if (!res.ok) {
          throw new Error("Error en la solicitud fetch");
        }

        const data = await res.json();

        if (data && Array.isArray(data)) {
          setSalesByCategory(data);

          const dataGraficos = {
            labels: data.map((item) => item.category),
            datasets: [
              {
                label: "Ventas",
                data: data.map((item) => item.total),
                backgroundColor: "rgba(253, 153, 33, 0.52)",
                borderColor: "rgba(253, 153, 33, 1)",
                borderWidth: 3,
              },
            ],
          };
          setSalesData(dataGraficos);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/index.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            functionName: "consultaVentasTotales",
          }),
        });

        if (!res.ok) {
          throw new Error("Error en la solicitud fetch");
        }

        const data = await res.json();

        settotalSales(data.map((item) => item.total));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/index.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            functionName: "consultaComprasTotales",
          }),
        });

        if (!res.ok) {
          throw new Error("Error en la solicitud fetch");
        }

        const data = await res.json();

        console.log(data);

        settotalOrders(data.map((item) => item.id));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/index.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            functionName: "consultaArticulosVendidos",
          }),
        });

        if (!res.ok) {
          throw new Error("Error en la solicitud fetch");
        }

        const data = await res.json();

        console.log(data);

        setArticles(data.map((item) => item.quantity));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/index.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            functionName: "consultaTopDiez",
          }),
        });

        if (!res.ok) {
          throw new Error("Error en la solicitud fetch");
        }

        const data = await res.json();

        console.log(data);

        settopDiez(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const printReport = () => {
    window.print();
  };

  useEffect(() => {
    if (changeChart) {
      const dataGraficos = {
        labels: salesByCategory.map((item) => item.category),
        datasets: [
          {
            label: "Ventas",
            data: salesByCategory.map((item) => item.total),
            backgroundColor: "rgba(253, 153, 33, 0.52)",
            borderColor: "rgba(253, 153, 33, 1)",
            borderWidth: 3,
          },
        ],
      };
      setSalesData(dataGraficos);
    } else {
      const dataGraficos = {
        labels: salesByCategory.map((item) => item.category),
        datasets: [
          {
            label: "Ventas",
            data: salesByCategory.map((item) => item.quantity),
            backgroundColor: "rgba(253, 153, 33, 0.52)",
            borderColor: "rgba(253, 153, 33, 1)",
            borderWidth: 3,
          },
        ],
      };
      setSalesData(dataGraficos);
    }
  }, [changeChart]);

  useEffect(() => {
    console.log(totalSales);
  }, [totalSales]);

  const handlechangeChart = () => {
    setchangeChart(!changeChart);
  };

  return (
    <div>
      <Header />
      <main className="p-5 flex flex-col items-center gap-5 mt-10">
        <h1 className="text-3xl font-bold mb-5">Perfil del Administrador</h1>
        <section className="bg-white p-5 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">
            Total Revenue: $ {totalSales[0]} USD
          </h2>
          <h2 className="text-2xl font-semibold mb-4">
            Total Orders: {totalOrders[0]}
          </h2>
          <h2 className="text-2xl font-semibold mb-4">
            Total Items Sold: {articles[0]}
          </h2>
        </section>
        <section className="bg-white p-5 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">Sales per category</h2>
          <button
            type="button"
            className="bg-primary hover:bg-orange-700 transition duration-300 ease-in-out rounded-md p-2 mx-2 text-white "
            onClick={handlechangeChart}
          >
            {changeChart ? <p>Display Units Sold</p> : <p>Display Revenue</p>}
          </button>
          <div className="w-full overflow-x-auto">
            {/* El gráfico se renderiza solo si los datasets contienen los datos */}
            {salesData.labels && salesData.datasets && (
              <Bar data={salesData} options={options} />
            )}
          </div>
        </section>
        <section className="bg-white p-5 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">
            {changeChart ? (
              <p>Revenue per category</p>
            ) : (
              <p>Units sold per category</p>
            )}
          </h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">
                  {changeChart ? <p>Revenue</p> : <p>Units sold</p>}
                </th>
              </tr>
            </thead>
            <tbody>
              {salesByCategory.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-center">
                    {item.category}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {changeChart
                      ? `$${item.total.toLocaleString()}`
                      : `${item.quantity.toLocaleString()}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="bg-white p-5 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">Top Sold Products</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {topDiez.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-center">
                    <img
                      src={item.thumbnail}
                      alt={item.thumbnail}
                      className="w-16 h-16 md:w-20 md:h-20"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {item.title}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {item.category}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {item.total_sales}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="bg-white p-5 rounded-lg shadow-md w-full max-w-4xl">
          <button
            onClick={printReport}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-2 hover:bg-blue-700"
          >
            Imprimir Reporte de Ventas
          </button>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-2 hover:bg-blue-700">
            Cerrar Sesión
          </button>
          <Link to = "/adminproductos">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-2 hover:bg-blue-700">
              Editar Productos
            </button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};
