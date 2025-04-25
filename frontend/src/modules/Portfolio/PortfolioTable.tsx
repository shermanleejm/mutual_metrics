import { HotTable } from "@handsontable/react-wrapper";
import { usePortfolioTableData } from "./hooks";
import { useSelector } from "react-redux";
import { selectViewingCurrency } from "@/features/slices/app";

export default function PortfolioTable() {
  const data = usePortfolioTableData();
  const viewingCurrency = useSelector(selectViewingCurrency);

  return (
    <HotTable
      className="portfolio-table"
      licenseKey="non-commercial-and-evaluation"
      data={data}
      colHeaders={["Fund Name", "Category", "Region", "Value"]}
      columns={[
        { data: "fund_name", type: "text" },
        { data: "category", type: "text" },
        { data: "region", type: "text" },
        {
          data: "value",
          type: "numeric",
          numericFormat: { pattern: getPattern(), culture: getCulture() },
        },
      ]}
      stretchH="all"
      height="auto"
    />
  );

  function getPattern() {
    switch (viewingCurrency) {
      case "JPY":
        return {
          prefix: "¥",
          mantissa: 2,
          thousandSeparated: true,
        };
      case "SGD":
        return {
          prefix: "S$",
          mantissa: 2,
          thousandSeparated: true,
        };
      case "USD":
        return {
          prefix: "US$",
          mantissa: 2,
          thousandSeparated: true,
        };
      default:
        return "0,0";
    }
  }

  function getCulture() {
    switch (viewingCurrency) {
      case "JPY":
        return "ja-JP";
      case "SGD":
        return "en-SG";
      case "USD":
        return "en-US";
      default:
        return "en-US";
    }
  }
}
