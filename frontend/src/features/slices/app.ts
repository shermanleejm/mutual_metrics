import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export type TradeUnitsType = "JPY" | "SGD" | "quantity" | "USD";

type SliceState = {
  token: string | null;
  fundToTrade?: string;
  amountToTrade?: number;
  amountToTradeUnits?: TradeUnitsType;
  dateToTrade?: string;
  viewingCurrency: TradeUnitsType;
};

const initialState: SliceState = {
  token: null,
  dateToTrade: dayjs().format("YYYY-MM-DD"),
  viewingCurrency: "USD",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setFundToTrade: (state, action: PayloadAction<string>) => {
      state.fundToTrade = action.payload;
    },
    setAmountToTrade: (state, action: PayloadAction<number>) => {
      state.amountToTrade = action.payload;
    },
    setAmountToTradeUnits: (state, action: PayloadAction<TradeUnitsType>) => {
      state.amountToTradeUnits = action.payload;
    },
    setDateToTrade: (state, action: PayloadAction<string>) => {
      state.dateToTrade = action.payload;
    },
    setViewingCurrency: (state, action: PayloadAction<TradeUnitsType>) => {
      state.viewingCurrency = action.payload;
    },
  },
});

export default appSlice;

export const {
  setToken,
  clearToken,
  setFundToTrade,
  setAmountToTrade,
  setDateToTrade,
} = appSlice.actions;

export const selectToken = (state: { app: SliceState }) => state.app.token;
export const selectFundToTrade = (state: { app: SliceState }) =>
  state.app.fundToTrade;
export const selectAmountToTrade = (state: { app: SliceState }) =>
  state.app.amountToTrade;
export const selectDateToTrade = (state: { app: SliceState }) =>
  state.app.dateToTrade;
export const selectViewingCurrency = (state: { app: SliceState }) =>
  state.app.viewingCurrency;
