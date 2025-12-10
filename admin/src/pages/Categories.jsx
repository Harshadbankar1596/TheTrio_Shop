import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../redux/Admin/adminAPI";
import { Plus, Edit, Trash2 } from "lucide-react";

const Categories = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      if (editingId) {
        await updateCategory({ categoryId: editingId, formData }).unwrap();
        toast.success("Category updated successfully");
      } else {
        await createCategory(formData).unwrap();
        toast.success("Category created successfully");
      }
      reset();
      setShowModal(false);
      setEditingId(null);
    } catch (error) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setValue("name", category.name);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Category deleted successfully");
      } catch (error) {
        toast.error(error?.data?.message || "Delete failed");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <button
          onClick={() => {
            reset();
            setEditingId(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingId ? "Edit Category" : "Add Category"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data?.map((category) => (
            <div
              key={category._id}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
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

export default Categories;

