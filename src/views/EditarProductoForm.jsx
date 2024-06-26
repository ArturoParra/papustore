import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const EditarProductoForm = ({ productId, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const IconoFlecha = <FontAwesomeIcon icon={fas.faArrowLeft} />;
  const { isAuthenticatedadmin } = useAuth();
  const [flag, setflag] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    discountPercentage: 0,
    priceWithDiscount: 0,
    rating: 0,
    stock: 0,
    brand: "",
    weight: 0,
    width: 0,
    height: 0,
    depth: 0,
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    returnPolicy: "",
    thumbnail: "",
    total_sales: 0,
  });

  useEffect(() => {
    if (!isAuthenticatedadmin) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/index.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            functionName: "consultaProductoIndividual",
            id: id,
            flag: flag,
          }),
        });

        if (!res.ok) {
          throw new Error("Error en la solicitud fetch");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/index.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          functionName: "updateProduct",
          product: product,
        }),
      });

      if (!res.ok) {
        throw new Error("Error en la solicitud fetch");
      }

      const data = await res.json();
      if (data.success) {
        onClose();
      } else {
        console.error("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 mt-10">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl mb-8">
          <Link to="/adminproductos">
            <button className="flex font-semibold text-sm text-black items-center sm:justify-start w-full sm:w-auto mb-4">
              <span>{IconoFlecha} BACK TO PRODUCT LIST</span>
            </button>
          </Link>
          <form id="edit-profile-form" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                <h2 className="text-xl font-bold mb-4">ACCOUNT INFORMATION</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      TITLE
                    </label>
                    <input
                      type="title"
                      name="title"
                      value={product.title}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      DESCRIPTION
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CATEGORY
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      PRICE
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      DISCOUNT PERCENTAGE
                    </label>
                    <input
                      type="number"
                      id="discountPercentage"
                      name="discountPercentage"
                      value={product.discountPercentage}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      STOCK
                    </label>
                    <input
                      type="number"
                      name="stock"
                      id="stock"
                      value={product.stock}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      BRAND
                    </label>
                    <input
                      type="text"
                      name="brand"
                      id="brand"
                      value={product.brand}
                      className="mt-1 block w-full p-2 bg-gray-100"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      WEIGHT
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={product.weight}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      WIDTH
                    </label>
                    <input
                      type="number"
                      id="width"
                      name="width"
                      value={product.width}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      HEIGHT
                    </label>
                    <input
                      type="number"
                      id="HEIGHT"
                      name="HEIGHT"
                      value={product.height}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      DEPTH
                    </label>
                    <input
                      type="number"
                      id="DEPTH"
                      name="DEPTH"
                      value={product.depth}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      WARRANTY INFORMATION
                    </label>
                    <input
                      type="text"
                      id="warranty"
                      name="warranty"
                      value={product.warrantyInformation}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      SHIPPING INFORMATION
                    </label>
                    <input
                      type="text"
                      id="shipping"
                      name="shipping"
                      value={product.shippingInformation}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      RETURN POLICY
                    </label>
                    <input
                      type="text"
                      id="return"
                      name="return"
                      value={product.returnPolicy}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 bg-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      THUMBNAIL
                    </label>
                    <input
                      type="text"
                      id="thumbnail"
                      name="thumbnail"
                      value={product.thumbnail}
                      onChange={handleChange}
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

export default EditarProductoForm;
