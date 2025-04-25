import { Col, Row, Typography } from "antd";
import PortfolioAllocation from "./PortfolioAllocation";
import CurrencyToggle from "./CurrencyToggle";
import PortfolioTable from "./PortfolioTable";

export default function Portfolio() {
  return (
    <div>
      <Row align={"middle"}>
        <Col span={18}>
          <Typography.Title level={2}>Portfolio view</Typography.Title>
        </Col>
        <Col span={6}>
          <CurrencyToggle />
        </Col>
        <Col span={24}>
          <PortfolioTable />
        </Col>
        <Col span={24}>
          <PortfolioAllocation />
        </Col>
      </Row>
    </div>
  );
}
