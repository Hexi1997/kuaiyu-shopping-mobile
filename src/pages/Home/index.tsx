import { useRef, useState } from "react";
import { TabBar, Toast } from "antd-mobile";
import {
  HomeOutlined,
  AppstoreOutlined,
  AccountBookOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { selectedColor, theme_color, unselectColor } from "../config";
import { useIntl } from "react-intl";
import { TabsType } from "../types";
import Swiper from "./components/Swiper";
import { useRequest, useScroll } from "ahooks";
import { getHomeUrl } from "../../service/home";
import RecommendArea from "./components/RecommendArea";
import GoodsTabs from "./components/GoodsTabs";

const Home = (props: any) => {
  const { history } = props;
  const [selectedTab] = useState<TabsType>("Home");
  const intl = useIntl();
  const { data, error, loading } = useRequest(getHomeUrl());
  const ref = useRef<HTMLDivElement>(null);
  const scroll = useScroll(document);

  if (scroll.top > 200) {
    // console.log(scroll);
  }

  if (error) {
    Toast.fail("获取首页数据失败");
    return <></>;
  }
  if (loading) {
    Toast.loading("加载中");
    return <></>;
  }
  if (data) {
    Toast.hide();
  }

  return (
    <div ref={ref} style={{ backgroundColor: "#fff" }}>
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
          onPress={() => {}}
        >
          <Swiper data={data.slides} />
          <RecommendArea goods={data.goods.data} />
          <div
            style={{
              height: "8px",
              backgroundColor: "#efefef",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          ></div>
          <GoodsTabs />
        </TabBar.Item>

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
    </div>
  );
};

export default Home;
