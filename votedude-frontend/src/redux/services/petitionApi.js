import { api } from "./api";

export const petitionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPetitions: builder.query({
      query: () => "/petitions",
      providesTags: ["Petition"],
    }),

    getPetitionById: builder.query({
      query: (id) => `/petitions/${id}`,
      providesTags: (result, error, id) => [{ type: "Petition", id }],
    }),

    createPetition: builder.mutation({
      query: (body) => ({
        url: "/petitions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Petition"],
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

export const {
  useGetPetitionsQuery,
  useGetPetitionByIdQuery,
  useCreatePetitionMutation,
  useSignPetitionMutation,
} = petitionApi;
