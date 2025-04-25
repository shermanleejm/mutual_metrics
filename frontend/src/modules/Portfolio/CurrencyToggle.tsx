import { appSlice } from "@/features/slices";
import { selectViewingCurrency } from "@/features/slices/app";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

export default function CurrencyToggle() {
  const dispatch = useDispatch();
  const viewingCurrency = useSelector(selectViewingCurrency);

  return (
    <Select
      value={viewingCurrency}
      style={{ width: "100%" }}
      onChange={(value) => dispatch(appSlice.actions.setViewingCurrency(value))}
      options={[
        { value: "JPY", label: "¥", className: "JPY" },
        { value: "SGD", label: "S$", className: "SGD" },
        { value: "USD", label: "US$", className: "USD" },
        { value: "quantity", label: "units", className: "quantity" },
      ]}
      className="currency-toggle"
    />
  );
}
