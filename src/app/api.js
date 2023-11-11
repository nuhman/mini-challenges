import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const challengesApi = createApi({
  reducerPath: "challengesApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    searchGithubUsers: builder.query({
      query: (queryText) =>
        `https://api.github.com/search/users?per_page=5&q=${queryText}`,
    }),
  }),
});

export const { useSearchGithubUsersQuery, useLazySearchGithubUsersQuery } = challengesApi;
