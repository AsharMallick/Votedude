import { api } from "./api";

export const petitionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPetitions: builder.query({
      query: () => "/petitions",
      providesTags: ["Petition"],
    }),

    signPetition: builder.mutation({
      query: (id) => ({
        url: `/petitions/${id}/sign`,
        method: "PUT",
      }),
      invalidatesTags: ["Petition"],
    }),
  }),
});

export const { useGetPetitionsQuery, useSignPetitionMutation } = petitionApi;
