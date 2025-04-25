import {
  useGetPortfolioQuery
} from "@/features/apis/positions";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function PortfolioAllocation() {
  const { data } = useGetPortfolioQuery();

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Portfolio Allocation",
    },
    tooltip: {
      pointFormat: "<b>{point.percentage:.1f}%</b> ({point.y} USD)",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Fund Value",
        data: data.map((item) => ({
          name: item.fund_name,
          y: item.units * item.price,
        })),
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
