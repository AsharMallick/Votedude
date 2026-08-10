import { api } from "./api";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPending: builder.query({
      query: () => "/admin/pending",
      providesTags: ["Admin"],
    }),
    getAnalytics: builder.query({
      query: () => "/admin/analytics",
      providesTags: ["Admin"],
    }),

    approveNews: builder.mutation({
      query: (id) => ({ url: `/admin/news/${id}/approve`, method: "PUT" }),
      invalidatesTags: ["Admin", "News"],
    }),
    approveEvent: builder.mutation({
      query: (id) => ({ url: `/admin/events/${id}/approve`, method: "PUT" }),
      invalidatesTags: ["Admin", "Event"],
    }),
    approvePost: builder.mutation({
      query: (id) => ({ url: `/admin/posts/${id}/approve`, method: "PUT" }),
      invalidatesTags: ["Admin", "Discuss"],
    }),
    approvePetition: builder.mutation({
      query: (id) => ({
        url: `/admin/petitions/${id}/approve`,
        method: "PUT",
      }),
      invalidatesTags: ["Admin", "Petition"],
    }),

    deleteNews: builder.mutation({
      query: (id) => ({ url: `/admin/news/${id}`, method: "DELETE" }),
      invalidatesTags: ["Admin", "News"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({ url: `/admin/events/${id}`, method: "DELETE" }),
      invalidatesTags: ["Admin", "Event"],
    }),
    removePost: builder.mutation({
      query: (id) => ({ url: `/admin/posts/${id}`, method: "DELETE" }),
      invalidatesTags: ["Admin", "Discuss"],
    }),
    deletePetition: builder.mutation({
      query: (id) => ({ url: `/admin/petitions/${id}`, method: "DELETE" }),
      invalidatesTags: ["Admin", "Petition"],
    }),
    deleteLaw: builder.mutation({
      query: (id) => ({ url: `/admin/laws/${id}`, method: "DELETE" }),
      invalidatesTags: ["Admin", "Law"],
    }),
    deletePoll: builder.mutation({
      query: (id) => ({ url: `/admin/polls/${id}`, method: "DELETE" }),
      invalidatesTags: ["Admin", "Poll"],
    }),
    deleteCandidate: builder.mutation({
      query: (id) => ({ url: `/admin/candidates/${id}`, method: "DELETE" }),
      invalidatesTags: ["Admin", "Candidate"],
    }),
  }),
});

export const {
  useGetPendingQuery,
  useGetAnalyticsQuery,
  useApproveNewsMutation,
  useApproveEventMutation,
  useApprovePostMutation,
  useApprovePetitionMutation,
  useDeleteNewsMutation,
  useDeleteEventMutation,
  useRemovePostMutation,
  useDeletePetitionMutation,
  useDeleteLawMutation,
  useDeletePollMutation,
  useDeleteCandidateMutation,
} = adminApi;
