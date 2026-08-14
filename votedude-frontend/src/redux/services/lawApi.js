import { api } from "./api";

export const lawApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLaws: builder.query({
      query: (body = {}) => "/laws",
      providesTags: ["Law"],
    }),

    searchLaws: builder.mutation({
      query: (body) => ({
        url: "/laws/search",
        method: "POST",
        body,
      }),
      providesTags: ["Law"],
    }),

    getLawById: builder.query({
      query: (id) => `/laws/${id}`,
      providesTags: (result, error, id) => [{ type: "Law", id }],
    }),
    ensureLawDiscussion: builder.mutation({
      query: (id) => ({
        url: `/laws/${id}/ensure-discussion`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetLawsQuery,
  useSearchLawsMutation,
  useGetLawByIdQuery,
  useEnsureLawDiscussionMutation,
} = lawApi;
