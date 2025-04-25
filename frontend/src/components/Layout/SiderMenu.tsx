import { ROUTES } from "@/router";
import { Menu, MenuProps } from "antd";
import { Link, useLocation } from "react-router";

type MenuItem = Required<MenuProps>["items"][number];

const menuItems: MenuItem[] = ROUTES.map(({ name, path, icon }) => ({
  key: path,
  label: <Link to={path}>{name}</Link>,
  icon,
}));

export default function SiderMenu() {
  const location = useLocation();

  return (
    <Menu items={menuItems} mode="inline" selectedKeys={[location.pathname]} />
  );
}
