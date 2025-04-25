import { appSlice } from "@/features/slices";
import { DatePicker } from "antd";
import { useDispatch } from "react-redux";

export default function TradeDatePicker() {
  const dispatch = useDispatch();

  return (
    <DatePicker
      style={{ width: "100%" }}
      onChange={(val) =>
        dispatch(appSlice.actions.setDateToTrade(val.format("YYYY-MM-DD")))
      }
    />
  );
}
