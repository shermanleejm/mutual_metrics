import { useGetFundHistoryQuery } from "@/features/apis/funds";
import { selectFundToTrade } from "@/features/slices/app";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { useSelector } from "react-redux";

export default function PriceChart() {
  const fundToTrade = useSelector(selectFundToTrade) || "";
  const fundTicker = fundToTrade.split("_")?.[1] || "";
  const { data, isLoading, error } = useGetFundHistoryQuery(fundTicker);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error loading chart</div>;

  const options: Highcharts.Options = {
    title: {
      text: `${fundTicker} Stock Price`,
    },
    series: [
      {
        type: "line", // simple line chart
        name: fundTicker,
        data,
      },
    ],
    rangeSelector: {
      selected: 1,
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: { text: "Price" },
    },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
}
