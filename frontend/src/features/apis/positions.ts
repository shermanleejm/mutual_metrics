import { RootState } from "@/features/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectToken } from "../slices/app";
import { PortfolioDto, PositionDto } from "../types";

const positionsApi = createApi({
  reducerPath: "positionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000", // change if needed
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState() as RootState);
      if (token) {
        headers.set("token", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPositions: builder.query<any[], void>({
      query: () => `/positions`,
    }),
    insertPosition: builder.mutation<{ message: string }, PositionDto>({
      query: (body) => ({
        url: `/positions`,
        method: "PUT",
        body,
      }),
    }),
    updatePosition: builder.mutation<
      { message: string },
      { positionId: number; data: PositionDto }
    >({
      query: ({ positionId, data }) => ({
        url: `/positions/${positionId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deletePosition: builder.mutation<{ message: string }, number>({
      query: (positionId) => ({
        url: `/positions/${positionId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPositionsQuery,
  useInsertPositionMutation,
  useUpdatePositionMutation,
  useDeletePositionMutation,
} = positionsApi;

export default positionsApi;

// Mocked data for demonstration purposes
export function useGetPortfolioQuery(): { data: PortfolioDto[] } {
  return {
    data: [
      {
        fund_id: 1,
        fund_name: "Nikko AM Global Umbrella Trust",
        category: "Global High Yield Bond",
        region: "jp",
        units: 1000,
        price: 1434,
        currency: "JPY",
      },
      {
        fund_id: 2,
        fund_name: "KBC Eq Fd Asia Pacific Instl B Cap",
        category: "Asia-Pacific Equity",
        region: "sg",
        units: 2514,
        price: 5.24,
        currency: "SGD",
      },
      {
        fund_id: 3,
        fund_name: "DWS Invest Nomura Japan Growth JPY FC",
        category: "Japan Large-Cap Equity",
        region: "jp",
        units: 6473,
        price: 1523,
        currency: "JPY",
      },
      {
        fund_id: 4,
        fund_name: "Fidelity Nikko Glbl Sel Japan AdvtgA Inc",
        category: "Japan Large-Cap Equity",
        region: "jp",
        units: 3456,
        price: 642,
        currency: "JPY",
      },
    ],
  };
}

export function useGetCurrencyConversionQuery(): {
  data: { [key: string]: { [key: string]: number } };
} {
  return {
    data: {
      SGD: { JPY: 109.26, USD: 0.76, SGD: 1 },
      JPY: { SGD: 0.0091, USD: 0.0069, JPY: 1 },
      USD: { SGD: 1.31, JPY: 143.96, USD: 1 },
    },
  };
}
