import {
  useGetCurrencyConversionQuery,
  useGetPortfolioQuery,
} from "@/features/apis/positions";
import { selectViewingCurrency } from "@/features/slices/app";
import { useSelector } from "react-redux";

export function usePortfolioTableData() {
  const { data } = useGetPortfolioQuery();
  const { data: currencyData } = useGetCurrencyConversionQuery();
  const viewingCurrency = useSelector(selectViewingCurrency);

  return data.map((item) => {
    const conversionRate = currencyData[item.currency][viewingCurrency];
    console.log("Conversion Rate:", conversionRate);
    console.log("Item:", item);
    return {
      ...item,
      value:
        viewingCurrency === "quantity"
          ? item.units
          : item.units * item.price * conversionRate,
      currency: viewingCurrency,
    };
  });
}
