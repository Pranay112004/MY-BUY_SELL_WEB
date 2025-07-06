import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useProductStore from '../store/product';

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
    setIsLoading(true);
    const { success, message } = await createProduct(newProduct);
    
    if (success) {
      toast.success('Product created successfully!');
      setNewProduct({ name: "", price: "", image: "" });
      navigate('/');
    } else {
      toast.error(message || 'Error creating product');
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Product</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              placeholder="Enter product name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              placeholder="Enter price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              placeholder="Enter image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              className="input-field"
            />
          </div>
          
          {newProduct.image && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <img
                src={newProduct.image}
                alt="Product preview"
                className="w-full h-48 object-cover rounded-lg border"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
          
          <button
            onClick={handleAddProduct}
            disabled={isLoading}
            className={`w-full btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
