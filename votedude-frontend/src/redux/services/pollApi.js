import { api } from "./api";

export const pollApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPolls: builder.query({
      query: () => "/polls",
      providesTags: ["Poll"],
    }),
    getFeaturedPoll: builder.query({
      query: () => "/polls/featured",
      providesTags: ["Poll"],
    }),
    votePoll: builder.mutation({
      query: ({ id, optionIndex }) => ({
        url: `/polls/${id}/vote`,
        method: "PUT",
        body: { optionIndex },
      }),
      invalidatesTags: ["Poll"],
    }),
  }),
});

export const {
  useGetPollsQuery,
  useGetFeaturedPollQuery,
  useVotePollMutation,
} = pollApi;
