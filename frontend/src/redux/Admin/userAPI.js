import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "adminapi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getBannerByname: builder.query({
      query: (name) => ({
        url: `/user/banner/${name}`,
        method: "GET",
      }),
    }),

    userRegister: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
    }),

    userLogin: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),

    getCategory: builder.query({
      query: () => ({
        url: "/user/category",
        method: "GET",
      }),
    }),

    getProductsByCategory: builder.query({
      query: (categoryId) => ({
        url: `/user/products/category/${categoryId}`,
        method: "GET",
      }),
    }),

    getProductById: builder.query({
      query: (productId) => ({
        url: `/user/product/${productId}`,
        method: "GET",
      }),
    }),

    addCartItem: builder.mutation({
      query: (data) => ({
        url: "/user/cart/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),

    getCartItems: builder.query({
      query: (userId) => ({
        url: `/user/cart/${userId}`,
        method: "GET",
      }),
      providesTags: ["cart"],
    }),

    removeCartItem: builder.mutation({
      query: ({ userId, cartId }) => ({
        url: "/user/remove-cartitem",
        method: "PUT",
        body: { userId, cartId },
      }),
      invalidatesTags: ["cart"],
    }),

    createReview: builder.mutation({
      query: ({ user, ProductId, Rating, Description }) => ({
        url: "/user/create-review",
        method: "POST",
        body: { user, ProductId, Rating, Description },
      }),
      invalidatesTags : ["review"]
    }),

    getReview: builder.query({
      query: ({ ProductId }) => ({
        url: `/user/get-product-review/${ProductId}`,
        method: "GET",
      }),
      providesTags : ["review"]
    }),

    getAllAddress : builder.query({
      query : ({userId}) => ({
        url : `/user/get-alladdress/${userId}`,
        method : "GET"
      }),
      providesTags : ["address"]
    }),

    addAddress : builder.mutation({
      query : (data) => ({
        url : "/user/add-address",
        method : "POST",
        body : data
      }),
      invalidatesTags : ["address"]
    })
  }),
});

export const {
  useGetBannerBynameQuery,
  useUserRegisterMutation,
  useUserLoginMutation,
  useGetCategoryQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useAddCartItemMutation,
  useGetCartItemsQuery,
  useRemoveCartItemMutation,
  useCreateReviewMutation,
  useGetReviewQuery,
  useGetAllAddressQuery,
  useAddAddressMutation
} = apiSlice;