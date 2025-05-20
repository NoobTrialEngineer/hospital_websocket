import React from "react";
import { Layout, Menu } from "antd";
import { useState } from "react";

const Sider = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { items } = props;
  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Layout.Sider>
  );
};

export default Sider;