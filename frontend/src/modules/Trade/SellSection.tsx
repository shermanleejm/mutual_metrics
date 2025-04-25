import { useGetPositionsQuery } from "@/features/apis/positions";
import { selectFundToTrade } from "@/features/slices/app";
import { HotTable } from "@handsontable/react-wrapper";
import dayjs from "dayjs";
import { cloneDeep } from "lodash";
import { useSelector } from "react-redux";

export default function SellSection() {
  const fundToTrade = useSelector(selectFundToTrade);
  const fundToTradeId = parseInt(fundToTrade?.split("_")?.[0] || "-1");
  const { data: positions, isLoading } = useGetPositionsQuery();
  const filteredPositions = cloneDeep(positions)
    ?.filter(({ fund_id }) => fund_id === fundToTradeId)
    .map(({ quantity, buy_date, sell_date }) => ({
      quantity,
      buy_date: dayjs(buy_date).format("YYYY-MM-DD"),
      sell_date: dayjs(sell_date).format("YYYY-MM-DD"),
    }));

  console.log(fundToTradeId, filteredPositions, positions);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <HotTable
      licenseKey="non-commercial-and-evaluation"
      allowEmpty
      data={filteredPositions}
      colHeaders={["Qty", "Buy Date", "Sell Date"]}
      height={"auto"}
      stretchH="all"
    />
  );
}
