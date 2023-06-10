import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `authentication`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
