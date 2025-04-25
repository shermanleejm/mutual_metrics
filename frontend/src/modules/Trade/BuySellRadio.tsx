import { Radio } from "antd";

export default function BuySellRadio() {
  return (
    <Radio.Group defaultValue="buy" buttonStyle="solid">
      <Radio.Button value="buy">Buy</Radio.Button>
      <Radio.Button value="sell">Sell</Radio.Button>
    </Radio.Group>
  );
}
