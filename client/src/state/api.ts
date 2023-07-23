import { Kpi } from "@/model/kpi";
import { Product } from "@/model/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "main",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Kpis", "Products", "Transactions"],
  endpoints: (builder) => ({
    getKpis: builder.query<Kpi[], void>({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),
    getProducts: builder.query<Product[], void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),
    getTransactions: builder.query<Product[], void>({
      query: () => "transaction/transactions/",
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } =
  api;
