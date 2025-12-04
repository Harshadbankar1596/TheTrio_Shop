import React from "react";
import { motion } from "framer-motion";
import { X, Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useUserLoginMutation } from "../../redux/Admin/userAPI";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Admin/userSlice";

const LoginModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useUserLoginMutation();

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
      const res = await loginUser(data).unwrap();

      if (res?.user) {
        dispatch(setUser(res)); // ⭐ save user & token
      }

      onClose();
    } catch (err) {
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
        className="relative w-full max-w-md bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_35px_rgba(99,102,241,0.25)] p-8"
      >
        {/* CLOSE BUTTON */}
        <button
          className="absolute top-4 right-4 text-white/60 hover:text-white transition"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {/* HEADER */}
        <h2 className="text-2xl font-semibold text-white mb-6 tracking-wide">
          Welcome Back
        </h2>

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* EMAIL FIELD */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/40" size={18} />
            <input
              {...register("email", { required: true })}
              placeholder="Email Address"
              className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-indigo-400 outline-none transition"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* PASSWORD FIELD */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-white/40" size={18} />
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-indigo-400 outline-none transition"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">Password is required</p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
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
            {isLoading ? "Logging In..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;