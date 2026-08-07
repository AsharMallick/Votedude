import { api } from "./api";

export const candidateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCandidates: builder.query({
      query: () => "/candidates",
      providesTags: ["Candidate"],
    }),

    searchCandidates: builder.mutation({
      query: (body) => ({
        url: "/candidates/search",
        method: "POST",
        body,
      }),
    }),

    getCandidateById: builder.query({
      query: (id) => `/candidates/${id}`,
      providesTags: (result, error, id) => [{ type: "Candidate", id }],
    }),
  }),
});

export const {
  useGetCandidatesQuery,
  useSearchCandidatesMutation,
  useGetCandidateByIdQuery,
} = candidateApi;
