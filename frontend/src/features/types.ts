export type UserInfo = {
  email: string;
  id: string;
};

export type UserDto = {
  email: string;
  password: string;
};

export type FundDto = {
  id: number;
  ticker: string;
  name: string;
};

export interface FundHistoryDto {
  Date: Date;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
  Dividends: number;
  "Stock Splits": number;
  "Capital Gains": number;
}

export type PositionDto = {
  fund_id: number;
  size: number;
  buy_date: string;
  sell_date: string | null;
};

export type PortfolioDto = {
  fund_id: number;
  fund_name: string;
  category: string;
  region: string;
  units: number;
  price: number;
  currency: string;
};
