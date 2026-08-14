import { api } from "./api";

export const candidateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCandidates: builder.query({
      query: () => "/candidates",
      providesTags: ["Candidate"],
    }),
    getCandidateById: builder.query({
      query: (id) => `/candidates/${id}`,
      providesTags: (result, error, id) => [{ type: "Candidate", id }],
    }),
    searchCandidates: builder.mutation({
      query: (body) => ({
        url: "/candidates/search",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetCandidatesQuery,
  useGetCandidateByIdQuery,
  useSearchCandidatesMutation,
} = candidateApi;
