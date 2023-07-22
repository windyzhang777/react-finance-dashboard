import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Kpi } from "../model/kpi";

export const api = createApi({
  reducerPath: "main",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Kpis"],
  endpoints: (builder) => ({
    getKpis: builder.query<Array<Kpi>, void>({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),
  }),
});

export const { useGetKpisQuery } = api;
