import { api } from "./api";

export const issueApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getIssues: builder.query({
      query: () => "/issues",
      providesTags: ["Issue"],
    }),

    searchIssues: builder.mutation({
      query: (body) => ({
        url: "/issues/search",
        method: "POST",
        body,
      }),
      providesTags: ["Issue"],
    }),

    getIssueById: builder.query({
      query: (id) => `/issues/${id}`,
      providesTags: (result, error, id) => [{ type: "Issue", id }],
    }),

    followIssue: builder.mutation({
      query: (id) => ({
        url: `/issues/${id}/follow`,
        method: "PUT",
      }),
      invalidatesTags: ["Issue"],
    }),
  }),
});

export const {
  useGetIssuesQuery,
  useSearchIssuesMutation,
  useGetIssueByIdQuery,
  useFollowIssueMutation,
} = issueApi;
