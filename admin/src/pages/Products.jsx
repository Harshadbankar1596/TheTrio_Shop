import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../redux/Admin/adminAPI";
import { Plus, Edit, Trash2 } from "lucide-react";

const Products = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: subCategories } = useGetSubCategoriesQuery(selectedCategory, {
    skip: !selectedCategory,
  });
  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      formData.append("price", data.price);
      formData.append("discount", data.discount || 0);
      formData.append("stock", data.stock);
      formData.append("colors", data.colors);
      
      if (data.sizes) {
        const sizesArray = Array.isArray(data.sizes) ? data.sizes : [data.sizes];
        sizesArray.forEach((size) => formData.append("sizes", size));
      }

      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((image) => {
          formData.append("images", image);
        });
      }

      if (editingId) {
        await updateProduct({ productId: editingId, formData }).unwrap();
        toast.success("Product updated successfully");
      } else {
        await createProduct(formData).unwrap();
        toast.success("Product created successfully");
      }
      reset();
      setShowModal(false);
      setEditingId(null);
      setSelectedCategory("");
    } catch (error) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setValue("title", product.title);
    setValue("description", product.description);
    setValue("category", product.category._id || product.category);
    setValue("subCategory", product.subCategory._id || product.subCategory);
    setValue("price", product.price);
    setValue("discount", product.discount);
    setValue("stock", product.stock);
    setValue("colors", product.colors);
    setSelectedCategory(product.category._id || product.category);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error(error?.data?.message || "Delete failed");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => {
            reset();
            setEditingId(null);
            setSelectedCategory("");
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Title</label>
                  <input
                    {...register("title", { required: true })}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block mb-2">Price</label>
                  <input
                    type="number"
                    {...register("price", { required: true })}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  {...register("description", { required: true })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
                  rows="3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Category</label>
                  <select
                    {...register("category", { required: true })}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setValue("category", e.target.value);
                    }}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
                  >
                    <option value="">Select category</option>
                    {categories?.data?.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Sub Category</label>
                  <select
                    {...register("subCategory", { required: true })}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
                    disabled={!selectedCategory}
                  >
                    <option value="">Select subcategory</option>
                    {subCategories?.data?.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2">Discount (%)</label>
                  <input
                    type="number"
                    {...register("discount")}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block mb-2">Stock</label>
                  <input
                    type="number"
                    {...register("stock", { required: true })}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block mb-2">Colors</label>
                  <input
                    {...register("colors")}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
                    placeholder="e.g., Red, Blue"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2">Sizes</label>
                <div className="flex gap-4">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <label key={size} className="flex items-center gap-2 text-white">
                      <input
                        type="checkbox"
                        value={size}
                        {...register("sizes")}
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-2">Images</label>
                <input
                  type="file"
                  multiple
                  {...register("images", { required: !editingId })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
                  accept="image/*"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                >
                  {editingId ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    reset();
                    setEditingId(null);
                    setSelectedCategory("");
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products?.data?.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            >
              {product.images && product.images[0] && (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-400 text-sm mb-2">₹{product.finalPrice}</p>
              <p className="text-gray-400 text-sm mb-4">Stock: {product.stock}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;

