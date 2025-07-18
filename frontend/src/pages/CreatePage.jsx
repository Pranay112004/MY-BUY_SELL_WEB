import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useProductStore from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error("Please fill all fields");
      return;
    }

    setIsLoading(true);
    const { success, message } = await createProduct(newProduct);

    if (success) {
      toast.success("Product created successfully!");
      setNewProduct({ name: "", price: "", image: "" });
      navigate("/");
    } else {
      toast.error(message || "Error creating product");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
              Add New Product
            </span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details to add a new item to your store
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-xl sm:px-10">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Premium Headphones"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price ($)
              </label>
              <div className="mt-1">
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  placeholder="e.g. 99.99"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>
              <div className="mt-1">
                <input
                  id="image"
                  name="image"
                  type="url"
                  required
                  placeholder="https://example.com/image.jpg"
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {newProduct.image && (
              <div className="mt-4">
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Image Preview:
                </p>
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <img
                    src={newProduct.image}
                    alt="Product preview"
                    className="w-full h-48 object-contain bg-gray-100"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=Invalid+URL";
                      e.target.className =
                        "w-full h-48 object-contain bg-gray-100";
                    }}
                  />
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={handleAddProduct}
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Product...
                  </>
                ) : (
                  "Create Product"
                )}
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate("/")}
                className="text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none transition-colors duration-200"
              >
                ← Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
