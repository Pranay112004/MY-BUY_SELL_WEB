import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import useProductStore from "../store/product";

const Home = () => {
  const { products, fetchProducts } = useProductStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      await fetchProducts();
      setIsLoading(false);
    };
    loadProducts();
  }, [fetchProducts]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Product Store
          </h1>
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center py-8">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
              Modern Product Store
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover curated products with exceptional quality and value
          </p>
        </div>

        {products.length === 0 ? (
          <div className="flex justify-center items-center py-16">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full transform transition-all hover:scale-[1.02] duration-300">
              <div className="flex justify-center text-6xl mb-6 text-gray-300">
                📦
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-3">
                Your store is empty
              </h3>
              <p className="text-gray-500 text-center mb-6">
                Begin your journey by adding your first product to the catalog
              </p>
              <div className="flex justify-center">
                <Link
                  to="/create"
                  className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Create First Product
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Products Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Our Collection
                </h2>
                <p className="text-gray-500">
                  {products.length} {products.length === 1 ? "item" : "items"}{" "}
                  available
                </p>
              </div>
              <Link
                to="/create"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300 whitespace-nowrap"
              >
                + Add New Product
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Floating Action Button for Mobile */}
            <div className="fixed bottom-6 right-6 sm:hidden">
              <Link
                to="/create"
                className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
              >
                <span className="text-2xl">+</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
