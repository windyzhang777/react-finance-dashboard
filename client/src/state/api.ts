import { Kpi } from "@/model/kpi";
import { Product } from "@/model/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "main",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Kpis", "Products"],
  endpoints: (builder) => ({
    getKpis: builder.query<Kpi[], void>({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),
    getProducts: builder.query<Product[], void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery } = api;
