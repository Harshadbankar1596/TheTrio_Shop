import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../redux/Admin/adminAPI";
import { Edit, Trash2 } from "lucide-react";

const Users = () => {
  const { data, isLoading } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmit = async (data) => {
    try {
      await updateUser({ userId: editingId, data }).unwrap();
      toast.success("User updated successfully");
      reset();
      setShowModal(false);
      setEditingId(null);
    } catch (error) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error(error?.data?.message || "Delete failed");
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-2">Name</label>
                <input
                  {...register("name", { required: true })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2">Phone</label>
                <input
                  {...register("phone")}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                >
                  Update
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
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800 rounded-lg">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Joined</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((user) => (
                <tr key={user._id} className="border-b border-gray-700">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone || "N/A"}</td>
                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded-lg flex items-center gap-1"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg flex items-center gap-1"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;


