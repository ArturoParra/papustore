import React, { useState, useEffect } from 'react';

const EditarProductoForm = ({ productId, onClose }) => {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        category: '',
        price: 0,
        discountPercentage: 0,
        priceWithDiscount: 0,
        rating: 0,
        stock: 0,
        brand: '',
        weight: 0,
        width: 0,
        height: 0,
        depth: 0,
        warrantyInformation: '',
        shippingInformation: '',
        availabilityStatus: '',
        returnPolicy: '',
        thumbnail: '',
        total_sales: 0,
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch("/api/index.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        functionName: "getProductById",
                        productId: productId
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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="discountPercentage"
                        value={product.discountPercentage}
                        onChange={handleChange}
                        placeholder="Discount Percentage"
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        placeholder="Stock"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        placeholder="Brand"
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="weight"
                        value={product.weight}
                        onChange={handleChange}
                        placeholder="Weight"
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="width"
                        value={product.width}
                        onChange={handleChange}
                        placeholder="Width"
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="height"
                        value={product.height}
                        onChange={handleChange}
                        placeholder="Height"
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="depth"
                        value={product.depth}
                        onChange={handleChange}
                        placeholder="Depth"
                        className="border p-2 rounded"
                    />
                    <textarea
                        name="warrantyInformation"
                        value={product.warrantyInformation}
                        onChange={handleChange}
                        placeholder="Warranty Information"
                        className="border p-2 rounded"
                    />
                    <textarea
                        name="shippingInformation"
                        value={product.shippingInformation}
                        onChange={handleChange}
                        placeholder="Shipping Information"
                        className="border p-2 rounded"
                    />
                    <textarea
                        name="returnPolicy"
                        value={product.returnPolicy}
                        onChange={handleChange}
                        placeholder="Return Policy"
                        className="border p-2 rounded"
                    />
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="availabilityStatus"
                        value={product.availabilityStatus}
                        onChange={handleChange}
                        placeholder="Availability Status"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="thumbnail"
                        value={product.thumbnail}
                        onChange={handleChange}
                        placeholder="Thumbnail URL"
                        className="border p-2 rounded"
                    />
                </div>
                <div className="mt-4">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                        Save
                    </button>
                    <button type="button" onClick={onClose} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditarProductoForm;
