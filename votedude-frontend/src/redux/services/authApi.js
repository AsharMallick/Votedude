import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST", // was GET — must be POST
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    googleLogin: builder.mutation({
      query: (token) => ({
        url: "/google",
        method: "POST",
        body: { token },
      }),
      invalidatesTags: ["User"],
    }),

    getMe: builder.query({
      query: () => "/me",
      providesTags: ["User"],
    }),

    getProfile: builder.query({
      query: (id) => `/user/${id}/profile`,
      providesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useGetMeQuery,
  useGetProfileQuery,
  useLogoutMutation,
} = authApi;
