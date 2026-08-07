import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    credentials: "include",
  }),

  tagTypes: [
    "User",
    "News",
    "Event",
    "Sport",
    "Poll",
    "Petition",
    "Candidate",
    "Discuss",
    "Issue",
    "Law",
  ],

  endpoints: () => ({}),
});
