import { api } from "./api";

export const discussApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/discuss",
      providesTags: ["Discuss"],
    }),

    createPost: builder.mutation({
      query: (body) => ({
        url: "/discuss",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Discuss"],
    }),

    toggleLike: builder.mutation({
      query: (id) => ({
        url: `/discuss/${id}/like`,
        method: "PUT",
      }),
      invalidatesTags: ["Discuss"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useToggleLikeMutation,
} = discussApi;
