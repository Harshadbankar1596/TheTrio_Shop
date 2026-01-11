import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, User, Mail, Phone, Lock , EyeOff , Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { useUserRegisterMutation } from "../../redux/Admin/userAPI";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Admin/userSlice";
import { toast } from "react-toastify";


const RegisterModal = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useUserRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data).unwrap();
      if (res?.user) dispatch(setUser(res));
      toast.success("Login Success");
      onClose();
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        "Error in Register";
      toast.error(errorMsg);
      console.log(err);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* MODAL BOX */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_35px_rgba(99,102,241,0.25)] p-8 glass"
      >
        {/* CLOSE */}
        <button
          className="absolute top-4 right-4 text-white/60 hover:text-white transition"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-semibold text-white mb-6 tracking-wide">
          Create Account
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* NAME */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-white/40" size={18} />

            <input
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" }
              })}
              placeholder="Full Name"
              className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-indigo-400 transition"
            />

            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/40" size={18} />

            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Email Address"
              className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-indigo-400 transition"
            />

            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* PHONE */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-white/40" size={18} />

            <input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit Indian phone number",
                },
              })}
              placeholder="Phone Number"
              className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-indigo-400 transition"
            />

            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* PASSWORD */}
          {/* PASSWORD */}
          <div className="relative">
            {/* Lock Icon */}
            <Lock className="absolute left-3 top-3 text-white/40" size={18} />

            {/* Password Input */}
            <input
              {...register("password", {
                required: "Password is required",
                validate: (value) => {
                  if (value.length < 8) return "Password must be at least 8 characters";
                  if (!/[A-Z]/.test(value)) return "Must contain at least 1 uppercase letter";
                  if (!/[a-z]/.test(value)) return "Must contain at least 1 lowercase letter";
                  if (!/[0-9]/.test(value)) return "Must contain at least 1 number";
                  if (!/[!@#$%^&*]/.test(value)) return "Must contain at least 1 symbol";
                  return true;
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-12 text-white focus:border-indigo-400 transition"
            />

            {/* Eye Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-white/40 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {/* Error */}
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>


          {/* SUBMIT */}
          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 25px rgba(99,102,241,0.5)",
            }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-indigo-500 rounded-xl text-black font-semibold tracking-wide"
          >
            {isLoading ? "Creating..." : "Register"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default RegisterModal;
