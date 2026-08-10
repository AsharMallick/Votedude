import { api } from "./api";

export const sportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSports: builder.query({
      query: () => "/sports",
      providesTags: ["Sport"],
    }),
    getLeagues: builder.query({
      query: () => "/sports/leagues",
      providesTags: ["Sport"],
    }),
    getTeamsByLeague: builder.query({
      query: (id) => `/sports/leagues/${id}/teams`,
      providesTags: ["Sport"],
    }),
    getStandings: builder.query({
      query: (id) => `/sports/leagues/${id}/standings`,
      providesTags: ["Sport"],
    }),
    getSchedule: builder.query({
      query: (id) => `/sports/leagues/${id}/schedule`,
      providesTags: ["Sport"],
    }),
    registerTeam: builder.mutation({
      query: (body) => ({
        url: "/sports/teams",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sport"],
    }),
    joinTeam: builder.mutation({
      query: (id) => ({
        url: `/sports/teams/${id}/join`,
        method: "PUT",
      }),
      invalidatesTags: ["Sport"],
    }),
  }),
});

export const {
  useGetSportsQuery,
  useGetLeaguesQuery,
  useGetTeamsByLeagueQuery,
  useGetStandingsQuery,
  useGetScheduleQuery,
  useRegisterTeamMutation,
  useJoinTeamMutation,
} = sportApi;
