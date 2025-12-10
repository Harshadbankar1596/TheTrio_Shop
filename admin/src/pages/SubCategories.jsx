import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} from "../redux/Admin/adminAPI";
import { Plus, Edit, Trash2 } from "lucide-react";

const SubCategories = () => {
  const { data: categories } = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data, isLoading } = useGetSubCategoriesQuery(selectedCategory, {
    skip: !selectedCategory,
  });
  const [createSubCategory] = useCreateSubCategoryMutation();
  const [updateSubCategory] = useUpdateSubCategoryMutation();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmit = async (formData) => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", selectedCategory);
      if (formData.image && formData.image[0]) {
        data.append("image", formData.image[0]);
      }

      if (editingId) {
        await updateSubCategory({ subCategoryId: editingId, formData: data }).unwrap();
        toast.success("Subcategory updated successfully");
      } else {
        await createSubCategory(data).unwrap();
        toast.success("Subcategory created successfully");
      }
      reset();
      setShowModal(false);
      setEditingId(null);
    } catch (error) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (subCategory) => {
    setEditingId(subCategory._id);
    setValue("name", subCategory.name);
    setSelectedCategory(subCategory.category._id || subCategory.category);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await deleteSubCategory(id).unwrap();
        toast.success("Subcategory deleted successfully");
      } catch (error) {
        toast.error(error?.data?.message || "Delete failed");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sub Categories</h1>
        <button
          onClick={() => {
            reset();
            setEditingId(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add Sub Category
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Select Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-64 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white"
        >
          <option value="">Select a category</option>
          {categories?.data?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingId ? "Edit Sub Category" : "Add Sub Category"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-2">Category</label>
                <select
                  {...register("category", { required: true })}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
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
                <label className="block mb-2">Name</label>
                <input
                  {...register("name", { required: true })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block mb-2">Image</label>
                <input
                  type="file"
                  {...register("image", { required: !editingId })}
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
      ) : selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data?.map((subCategory) => (
            <div
              key={subCategory._id}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            >
              {subCategory.image && (
                <img
                  src={subCategory.image}
                  alt={subCategory.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{subCategory.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(subCategory)}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(subCategory._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          Please select a category to view subcategories
        </div>
      )}
    </div>
  );
};

export default SubCategories;

