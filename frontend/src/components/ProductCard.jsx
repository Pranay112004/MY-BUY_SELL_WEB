import React, { useState } from "react";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import useProductStore from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isEditing, setIsEditing] = useState(false);
  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const { success, message } = await deleteProduct(pid);
      if (success) {
        toast.success("Product deleted successfully!");
      } else {
        toast.error(message || "Error deleting product");
      }
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    if (
      !updatedProduct.name ||
      !updatedProduct.price ||
      !updatedProduct.image
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const { success, message } = await updateProduct(pid, updatedProduct);
    if (success) {
      setIsEditing(false);
      toast.success("Product updated successfully!");
    } else {
      toast.error(message || "Error updating product");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x200?text=Product+Image";
            e.target.className = "w-full h-full object-contain bg-gray-100 p-4";
          }}
        />

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
            aria-label="Edit product"
          >
            <FiEdit size={16} />
          </button>
          <button
            onClick={() => handleDeleteProduct(product._id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
            aria-label="Delete product"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setUpdatedProduct(product);
                }}
                className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors duration-200"
              >
                <FiX className="mr-1" /> Cancel
              </button>
              <button
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
              >
                <FiCheck className="mr-1" /> Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
              {product.name}
            </h3>
            <p className="text-2xl font-semibold text-blue-600">
              ${parseFloat(product.price).toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
