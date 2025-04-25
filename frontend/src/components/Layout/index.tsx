import logoDark from "@/assets/logo_dark.png";
import { clearToken, selectToken } from "@/features/slices/app";
import { Button, ConfigProvider, Layout, theme } from "antd";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import SiderMenu from "./SiderMenu";
import { usePrefersDarkMode } from "./hooks";

const { Content, Sider, Header } = Layout;

export default function CustomLayout({ children }: { children: ReactNode }) {
  const isDark = usePrefersDarkMode();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ height: "100vh" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={logoDark} alt="Logo" style={{ width: "150px" }} />
          {token !== null && (
            <Button onClick={handleLogout} className="logout-button">
              Logout
            </Button>
          )}
        </Header>
        <Layout>
          <Sider collapsible={true}>
            <SiderMenu />
          </Sider>
          <Content style={{ padding: "0 48px" }}>{children}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );

  function handleLogout() {
    dispatch(clearToken());
  }
}
