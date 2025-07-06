import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import useProductStore from '../store/product';

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
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-white mb-6">Product Store</h1>
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">🛍️ Product Store</h1>
        <p className="text-white/80 text-lg">Discover amazing products at great prices</p>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-white mb-2">No products yet</h3>
            <p className="text-white/70 mb-6">Start building your product catalog by adding your first product.</p>
            <Link
              to="/create"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Add Your First Product
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-white/90">
              {products.length} {products.length === 1 ? 'product' : 'products'} available
            </p>
            <Link
              to="/create"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Add New Product
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
