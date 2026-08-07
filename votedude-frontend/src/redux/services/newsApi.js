import { api } from "./api";

export const newsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => "/news",
      providesTags: ["News"],
    }),

    getNewsById: builder.query({
      query: (id) => `/news/${id}`,
      providesTags: (result, error, id) => [{ type: "News", id }],
    }),

    createNews: builder.mutation({
      query: (body) => ({
        url: "/news",
        method: "POST",
        body,
      }),
      invalidatesTags: ["News"],
    }),

    toggleNewsLike: builder.mutation({
      query: (id) => ({
        url: `/news/${id}/like`,
        method: "PUT",
      }),
      invalidatesTags: ["News"],
    }),

    addNewsComment: builder.mutation({
      query: ({ id, text }) => ({
        url: `/news/${id}/comment`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetNewsByIdQuery,
  useCreateNewsMutation,
  useToggleNewsLikeMutation,
  useAddNewsCommentMutation,
} = newsApi;
