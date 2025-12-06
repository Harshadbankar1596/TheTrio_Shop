

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

    // SUBMIT FUNCTION
    const onSubmit = async (values) => {
      try {
        await createReview({
          user: values.User,
          ProductId,
          Rating: Number(values.Rating),
          Description: values.Description,
        }).unwrap();

        reset();
        setIsOpen(false);
        toast.success("Review submitted!");
      } catch (err) {
        console.error(err);
        toast.error("Error submitting review!");
      }
    };

    return (
      <>
        {/* MAIN REVIEW SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="
            bg-white/5 
            border border-white/10 
            rounded-3xl 
            p-8 
            backdrop-blur-xl 
            shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          ">
            
            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Testimonials
                </p>
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                  Customer Reviews
                </h2>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="
                  px-5 py-2.5 
                  rounded-full 
                  bg-green-400 
                  text-black 
                  font-semibold 
                  flex items-center gap-2
                  shadow-md shadow-green-500/30
                "
              >
                <Plus size={18} /> Write a Review
              </motion.button>
            </div>

            {/* REVIEWS LIST */}
            {isLoading ? (
              <p className="text-white/60">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p className="text-white/60">No reviews yet — be the first to write!</p>
            ) : (
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 custom-scroll">
                {reviews.map((rev) => (
                  <motion.div
                    key={rev._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
                      bg-white/5 
                      border border-white/10 
                      p-5 
                      rounded-2xl
                      shadow-md
                    "
                  >
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < rev.Rating ? "text-yellow-400" : "text-white/20"}
                          fill={i < rev.Rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-white/80 text-sm leading-relaxed">
                      {rev.Description}
                    </p>

                    {/* User */}
                    <p className="text-xs text-white/40 mt-2 font-light">
                      — {rev.User}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.section>

        {/* REVIEW MODAL */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed inset-0 z-50 
                flex items-center justify-center 
                bg-black/70 backdrop-blur-xl
                px-4
              "
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="
                  bg-white/10 
                  border border-white/20 
                  rounded-3xl 
                  p-8 
                  w-full max-w-lg
                  shadow-[0_25px_90px_rgba(0,0,0,0.5)]
                  relative
                "
              >
                {/* CLOSE BUTTON */}
                <button
                  className="
                    absolute right-4 top-4 
                    text-white/60 hover:text-white 
                    transition
                  "
                  onClick={() => setIsOpen(false)}
                >
                  <X size={22} />
                </button>

                <h3 className="text-2xl text-white font-semibold mb-6">
                  Write a Review
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* USER NAME */}
                  <div>
                    <label className="text-sm text-white/60">Your Name</label>
                    <input
                      {...register("User", { required: "Your name is required" })}
                      className="
                        w-full mt-1 
                        bg-white/10 
                        border border-white/20 
                        rounded-xl 
                        text-white 
                        p-3 outline-none
                        placeholder-white/40
                      "
                      placeholder="Enter your name"
                    />
                    {errors.User && (
                      <p className="text-red-400 text-xs mt-1">{errors.User.message}</p>
                    )}
                  </div>

                  {/* RATING STARS */}
                  <div>
                    <label className="text-sm text-white/60">Your Rating</label>
                    <div className="flex items-center gap-3 mt-2">
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
                            size={34}
                            className={
                              i < rating
                                ? "text-indigo-400"
                                : "text-white/20"
                            }
                            fill={i < rating ? "currentColor" : "none"}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <label className="text-sm text-white/60">Your Review</label>
                    <textarea
                      {...register("Description", {
                        required: "Review cannot be empty",
                      })}
                      rows={4}
                      className="
                        w-full mt-1 
                        bg-white/10 
                        border border-white/20 
                        rounded-xl 
                        text-white 
                        p-3 outline-none 
                        placeholder-white/40
                      "
                      placeholder="Share your experience..."
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="
                      w-full py-3 
                      bg-yellow-400 
                      text-black 
                      font-semibold 
                      rounded-full
                      shadow-md shadow-yellow-500/40
                    "
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
