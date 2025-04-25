import { RootState } from "@/features/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectToken } from "../slices/app";
import { FundDto, FundHistoryDto } from "../types";
import dayjs from "dayjs";

const fundsApi = createApi({
  reducerPath: "fundsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/funds",
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState() as RootState);
      if (token) {
        headers.set("token", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFunds: builder.query<
      FundDto[],
      { limit: number; offset: number; search: string }
    >({
      query: ({ limit, offset, search }) =>
        `?limit=${limit}&offset=${offset}&search=${encodeURIComponent(search)}`,
    }),
    getFundHistory: builder.query<any[][], string | undefined>({
      query: (fundTicker) => `/history/${fundTicker}`,
      transformResponse: (response: FundHistoryDto[]) => {
        return response.map((item) => [
          dayjs(item.Date).unix() * 1000,
          item.Close,
        ]);
      },
    }),
  }),
});

export const { useGetFundsQuery, useGetFundHistoryQuery } = fundsApi;

export default fundsApi;
