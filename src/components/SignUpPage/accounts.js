import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const actionApi = createApi({
  reducerPath: "actionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  tagTypes: ["account"],
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: () => "/accounts",
      providesTags: ["account"],
    }),
    addAccount: builder.mutation({
      query: (account) => ({
        url: "/accounts",
        method: "POST",
        body: account,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["account"],
    }),
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `/accounts/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["account"],
    }),
  }),
});

export const {
  useGetAccountQuery,
  useAddAccountMutation,
  useDeleteAccountMutation,
} = actionApi;
