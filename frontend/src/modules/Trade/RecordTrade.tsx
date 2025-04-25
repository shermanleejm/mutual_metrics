import { errorMsg, successMsg } from "@/components/hooks";
import { positionsApi } from "@/features/apis";
import {
  selectAmountToTrade,
  selectDateToTrade,
  selectFundToTrade,
} from "@/features/slices/app";
import { Button } from "antd";
import { useSelector } from "react-redux";

export default function RecordBuy() {
  const fundToTrade = useSelector(selectFundToTrade);
  const amountToTrade = useSelector(selectAmountToTrade);
  const dateToTrade = useSelector(selectDateToTrade);
  const [insertPosition] = positionsApi.useInsertPositionMutation();

  return (
    <Button style={{ width: "100%" }} onClick={handleRecordTrade}>
      Record Buy
    </Button>
  );

  function handleRecordTrade() {
    const fund_id = fundToTrade?.split("_")[0];
    if (fund_id && amountToTrade && dateToTrade) {
      insertPosition({
        fund_id: parseInt(fund_id),
        size: amountToTrade,
        buy_date: dateToTrade,
        sell_date: null, // because this is a buy
      })
        .unwrap()
        .then(() => {
          successMsg("Success");
        })
        .catch((error) => {
          errorMsg(`Error: ${error}`);
        });
    }
  }
}
