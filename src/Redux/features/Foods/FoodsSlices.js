import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const foodsApi = createApi({
  reducerPath: "foodsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://www.themealdb.com/api/json/v1/1/`,
  }),
  endpoints: (builder) => ({
    getFoodsByName: builder.query({
      //   query: (name) => `${name}`,
      query: (name) => {
        return `/search.php?s=${name}`;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetFoodsByNameQuery } = foodsApi;
