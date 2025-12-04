import React from "react";
import { motion } from "framer-motion";
import { X, MapPin, Building2, Landmark, MapPinned, Hash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAddAddressMutation } from "../../redux/Admin/userAPI";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddAddressModal = ({ onClose }) => {
  const userId = useSelector((state) => state.user.id);
  const [addAddress, { isLoading }] = useAddAddressMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const onSubmit = async (formData) => {
    if (!userId) {
      toast.error("Please login to add address");
      return;
    }

    try {
      await addAddress({
        userId,
        AddressData: {
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
        },
      }).unwrap();

      toast.success("Address added successfully");
      onClose();
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || "Failed to add address");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md bg-black/60 border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(99,102,241,0.35)] p-7"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center">
            <MapPin size={18} className="text-indigo-300" />
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold tracking-wide">
              Add Delivery Address
            </h2>
            <p className="text-xs text-white/60">
              Used for shipping your TheTrio orders.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
          {/* Address Line 1 */}
          <div className="space-y-1">
            <label className="text-xs text-white/60 flex items-center gap-1">
              <Building2 size={14} />
              Address Line 1
            </label>
            <input
              {...register("addressLine1", {
                required: "Address Line 1 is required",
                minLength: {
                  value: 5,
                  message: "Please enter a valid street address",
                },
              })}
              placeholder="Flat / House No, Street"
              className="w-full bg-black/40 border border-white/15 rounded-xl py-2.5 px-3 text-white text-sm outline-none focus:border-indigo-400 transition"
            />
            {errors.addressLine1 && (
              <p className="text-xs text-red-400 mt-0.5">
                {errors.addressLine1.message}
              </p>
            )}
          </div>

          {/* Address Line 2 */}
          <div className="space-y-1">
            <label className="text-xs text-white/60 flex items-center gap-1">
              <Landmark size={14} />
              Address Line 2 (Optional)
            </label>
            <input
              {...register("addressLine2")}
              placeholder="Landmark, Area"
              className="w-full bg-black/40 border border-white/15 rounded-xl py-2.5 px-3 text-white text-sm outline-none focus:border-indigo-400 transition"
            />
          </div>

          {/* City + State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-white/60 flex items-center gap-1">
                <MapPinned size={14} />
                City
              </label>
              <input
                {...register("city", {
                  required: "City is required",
                })}
                placeholder="City"
                className="w-full bg-black/40 border border-white/15 rounded-xl py-2.5 px-3 text-white text-sm outline-none focus:border-indigo-400 transition"
              />
              {errors.city && (
                <p className="text-xs text-red-400 mt-0.5">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/60 flex items-center gap-1">
                <MapPin size={14} />
                State
              </label>
              <input
                {...register("state", {
                  required: "State is required",
                })}
                placeholder="State"
                className="w-full bg-black/40 border border-white/15 rounded-xl py-2.5 px-3 text-white text-sm outline-none focus:border-indigo-400 transition"
              />
              {errors.state && (
                <p className="text-xs text-red-400 mt-0.5">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          {/* Postal Code */}
          <div className="space-y-1">
            <label className="text-xs text-white/60 flex items-center gap-1">
              <Hash size={14} />
              Pincode
            </label>
            <input
              {...register("postalCode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[1-9][0-9]{5}$/,
                  message: "Enter a valid 6-digit Indian pincode",
                },
              })}
              placeholder="400001"
              className="w-full bg-black/40 border border-white/15 rounded-xl py-2.5 px-3 text-white text-sm outline-none focus:border-indigo-400 transition"
            />
            {errors.postalCode && (
              <p className="text-xs text-red-400 mt-0.5">
                {errors.postalCode.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs md:text-sm rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition"
            >
              Cancel
            </button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 text-xs md:text-sm rounded-full bg-indigo-500 text-black font-semibold shadow-[0_0_25px_rgba(99,102,241,0.6)] disabled:opacity-60"
            >
              {isLoading ? "Saving..." : "Save Address"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddAddressModal;