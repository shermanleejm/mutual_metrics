import Home from "@/modules/Home";
import Portfolio from "@/modules/Portfolio";
import Trade from "@/modules/Trade";
import {
  HomeOutlined,
  PieChartOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import { createBrowserRouter } from "react-router";

export const ROUTES = [
  { path: "/", Component: Home, name: "Home", icon: <HomeOutlined /> },
  {
    path: "/trade",
    Component: Trade,
    name: "Trade",
    icon: <SlidersOutlined />,
  },
  {
    path: "/portfolio",
    Component: Portfolio,
    name: "Portfolio",
    icon: <PieChartOutlined />,
  },
];

const router = createBrowserRouter(ROUTES);

export default router;
