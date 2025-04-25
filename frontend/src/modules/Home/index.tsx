import { Typography } from "antd";
import { Link as RouterLink } from "react-router";

const { Title, Paragraph, Link: AntdLink } = Typography;

export default function Home() {
  return (
    <Typography>
      <Title>Welcome to Mutual Metrics</Title>
      <Title level={2}>
        Your one stop page for all your metrics for Mutual Funds.
      </Title>
      <Paragraph>
        This is a simple application to track your mutual funds portfolio. You
        can{" "}
        <RouterLink to="/trade">
          <AntdLink>add, edit, and delete your mutual funds</AntdLink>
        </RouterLink>{" "}
        and{" "}
        <RouterLink to="/portfolio">
          <AntdLink>view their performance over time</AntdLink>
        </RouterLink>
        .
      </Paragraph>
    </Typography>
  );
}
