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
import WarpDiv from "./style";
import TopNav from "../../components/TopNav";
import CategoryContent from "./components/Content";

const Category = (props: any) => {
  const { history } = props;
  const [selectedTab, setSelectedTab] = useState<TabsType>("Category");
  const intl = useIntl();
  return (
    <WarpDiv className="category">
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
            setSelectedTab("Category");
          }}
        >
          <TopNav title="图书分类" onLeftClick={() => {}} />
          <CategoryContent />
        </TabBar.Item>

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
            history.push("/car");
          }}
        ></TabBar.Item>

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
    </WarpDiv>
  );
};

export default Category;
