import { Col, Divider, Row, Typography } from "antd";
import AmountInput from "./AmountInput";
import FundsDropdown from "./FundsDropdown";
import PriceChart from "./PriceChart";
import RecordBuy from "./RecordTrade";
import TradeDatePicker from "./TradeDatePicker";
import SellSection from "./SellSection";

const { Title } = Typography;

export default function Trade() {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography>
          <Title level={2}>Trade Mutual Funds</Title>
        </Typography>
      </Col>
      <Col span={16}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <FundsDropdown />
          </Col>
          <Col span={24}>
            <PriceChart />
          </Col>
        </Row>
      </Col>
      <Col span={8}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <TradeDatePicker />
          </Col>
          <Col span={24}>
            <AmountInput />
          </Col>
          <Col span={24}>
            <RecordBuy />
          </Col>
          <Divider style={{ margin: "16px 0" }} />
          <Col span={24}>
            <SellSection />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
