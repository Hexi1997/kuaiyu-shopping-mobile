import React, { useState } from "react";
import { TabBar } from "antd-mobile";
import {
  HomeOutlined,
  AppstoreOutlined,
  AccountBookOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { selectedColor, theme_color, unselectColor } from "../config";
import { useIntl } from "react-intl";
import { TabsType } from "../types";

const Car = (props: any) => {
  const { history } = props;
  const [selectedTab, setSelectedTab] = useState<TabsType>("Car");
  const intl = useIntl();
  return (
    <div style={{ height: "100vh" }}>
      <TabBar tabBarPosition="bottom" tintColor={theme_color}>
        <TabBar.Item
          title={intl.formatMessage({
            id: "menu.home",
            defaultMessage: "home",
          })}
          key="Home"
          icon={<HomeOutlined style={{ color: unselectColor }} />}
          selectedIcon={<HomeOutlined style={{ color: selectedColor }} />}
          selected={selectedTab === "Home"}
          onPress={() => {
            history.push("/home");
          }}
        ></TabBar.Item>

        <TabBar.Item
          title={intl.formatMessage({
            id: "menu.category",
            defaultMessage: "category",
          })}
          key="Category"
          icon={<AppstoreOutlined twoToneColor={unselectColor} />}
          selectedIcon={<AppstoreOutlined twoToneColor={selectedColor} />}
          selected={selectedTab === "Category"}
          onPress={() => {
            history.push("/category");
          }}
        ></TabBar.Item>

        <TabBar.Item
          title={intl.formatMessage({
            id: "menu.car",
            defaultMessage: "cart",
          })}
          key="Car"
          icon={<AccountBookOutlined twoToneColor={unselectColor} />}
          selectedIcon={<AccountBookOutlined twoToneColor={selectedColor} />}
          selected={selectedTab === "Car"}
          onPress={() => {
            setSelectedTab("Car");
          }}
        >
          这是car界面
        </TabBar.Item>

        <TabBar.Item
          title={intl.formatMessage({
            id: "menu.my",
            defaultMessage: "mine",
          })}
          key="My"
          icon={<InfoCircleOutlined twoToneColor={unselectColor} />}
          selectedIcon={<InfoCircleOutlined twoToneColor={selectedColor} />}
          selected={selectedTab === "My"}
          onPress={() => {
            history.push("/my");
          }}
        ></TabBar.Item>
      </TabBar>
    </div>
  );
};

export default Car;
