import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Star, MessageCircle, Plus, X } from "lucide-react";
import {
  useGetReviewQuery,
  useCreateReviewMutation,
} from "../../redux/Admin/userAPI";
import { toast } from "react-toastify";

const Review = ({ ProductId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useGetReviewQuery({ ProductId });
  const reviews = data?.review || [];

  const [createReview, { isLoading: isSubmitting }] =
    useCreateReviewMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { Rating: 0, Description: "", User: "" },
  });

  const rating = watch("Rating");

  // ⭐ SUBMIT HANDLER
  const onSubmit = async (values) => {
    try {
      await createReview({
        user: values.User,         // <-- Ab yahan se name jayega
        ProductId,
        Rating: Number(values.Rating),
        Description: values.Description,
      }).unwrap();

      reset({ Rating: 0, Description: "", User: "" });
      setIsOpen(false);
      toast.success("Review Sent")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* MAIN SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
        className="mt-14 max-w-5xl mx-auto"
      >
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Testimonials
              </p>
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-indigo-400" />
                Customer Reviews
              </h2>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 rounded-full bg-indigo-400 text-black font-semibold flex items-center gap-2"
            >
              <Plus size={16} /> Write Review
            </motion.button>
          </div>

          {/* REVIEWS */}
          {isLoading ? (
            <p className="text-white/60">Loading...</p>
          ) : reviews.length === 0 ? (
            <p className="text-white/60">No reviews yet — be the first!</p>
          ) : (
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              {reviews.map((rev) => (
                <motion.div
                  key={rev._id}
                  className="bg-white/5 border border-white/10 p-4 rounded-xl"
                >
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < rev.Rating ? "text-indigo-400" : "text-white/15"
                        }`}
                        fill={i < rev.Rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>

                  <p className="text-white/80 text-sm">{rev.Description}</p>
                  <p className="text-xs text-white/40 mt-1">— {rev.User}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg"
          >
            <motion.div
              className="bg-black/80 border border-white/10 rounded-2xl p-6 w-[90%] max-w-lg shadow-xl relative"
            >
              {/* CLOSE */}
              <button
                className="absolute right-4 top-4 text-white/60 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </button>

              <h3 className="text-xl text-white font-semibold mb-4">
                Write a Review
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                {/* USER NAME */}
                <div>
                  <label className="text-sm text-white/60 mb-1 block">
                    Your Name
                  </label>
                  <input
                    {...register("User", { required: "Name is required" })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white p-3 outline-none"
                    placeholder="Enter your name"
                  />
                  {errors.User && (
                    <p className="text-red-400 text-xs mt-1">{errors.User.message}</p>
                  )}
                </div>

                {/* ⭐ Rating Input */}
                <div>
                  <p className="text-sm text-white/60 mb-1">Your Rating</p>
                  <div className="flex items-center gap-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.button
                        key={i}
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        onClick={() =>
                          setValue("Rating", i + 1, { shouldValidate: true })
                        }
                      >
                        <Star
                          size={32}
                          className={`${
                            i < rating ? "text-indigo-400" : "text-white/20"
                          }`}
                          fill={i < rating ? "currentColor" : "none"}
                        />
                      </motion.button>
                    ))}
                  </div>
                  {errors.Rating && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.Rating.message}
                    </p>
                  )}
                </div>

                {/* DESCRIPTION */}
                <div>
                  <textarea
                    {...register("Description", {
                      required: "Write your review",
                    })}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white p-3 outline-none"
                    placeholder="Write your thoughts..."
                  />
                </div>

                {/* SUBMIT */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  type="submit"
                  className="w-full bg-indigo-400 text-black font-semibold py-2 rounded-full"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Review;
