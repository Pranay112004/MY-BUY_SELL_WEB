import React, { useState } from 'react';
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useProductStore from '../store/product';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isEditing, setIsEditing] = useState(false);
  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      toast.success('Product deleted successfully!');
    } else {
      toast.error(message || 'Error deleting product');
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (success) {
      setIsEditing(false);
      toast.success('Product updated successfully!');
    } else {
      toast.error(message || 'Error updating product');
    }
  };

  return (
    <div className="card animate-fade-in group">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200"
            >
              <FiEdit size={16} />
            </button>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-200"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <input
            placeholder="Product Name"
            name="name"
            value={updatedProduct.name}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
            className="input-field"
          />
          <input
            placeholder="Price"
            name="price"
            type="number"
            value={updatedProduct.price}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
            className="input-field"
          />
          <input
            placeholder="Image URL"
            name="image"
            value={updatedProduct.image}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
            className="input-field"
          />
          <div className="flex space-x-2">
            <button
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors duration-200"
            >
              <FiCheck size={16} />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setUpdatedProduct(product);
              }}
              className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors duration-200"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-2xl font-semibold text-blue-600">${product.price}</p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
