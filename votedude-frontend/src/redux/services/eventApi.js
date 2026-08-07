import { api } from "./api";

export const eventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => "/events",
      providesTags: ["Event"],
    }),

    getEventById: builder.query({
      query: (id) => `/events/${id}`,
      providesTags: (result, error, id) => [{ type: "Event", id }],
    }),

    createEvent: builder.mutation({
      query: (body) => ({
        url: "/events",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Event"],
    }),

    rsvpEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}/rsvp`,
        method: "PUT",
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useRsvpEventMutation,
} = eventApi;
