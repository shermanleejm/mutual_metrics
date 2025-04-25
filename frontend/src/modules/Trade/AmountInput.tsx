import appSlice, { TradeUnitsType } from "@/features/slices/app";
import { InputNumber, Select } from "antd";
import { useDispatch } from "react-redux";

const { Option } = Select;

export default function AmountInput() {
  const dispatch = useDispatch();

  return (
    <InputNumber
      style={{ width: "100%" }}
      stringMode
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as unknown as number}
      onChange={(value) =>
        dispatch(appSlice.actions.setAmountToTrade(value as number))
      }
      addonAfter={
        <Select
          defaultValue={"quantity"}
          onChange={(value) =>
            dispatch(
              appSlice.actions.setAmountToTradeUnits(value as TradeUnitsType)
            )
          }
          disabled
        >
          <Option value="JPY">¥</Option>
          <Option value="SGD">$</Option>
          <Option value="quantity">units</Option>
        </Select>
      }
    />
  );
}
