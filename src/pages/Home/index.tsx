import { useState } from "react";
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
import { useRequest } from "ahooks";
import { getHomeUrl } from "../../service/home";
import RecommendArea from "./components/RecommendArea";
import GoodsTabs from "./components/GoodsTabs";
import { useDebounceWindowScroll } from "../../utils/hooks";
import WarpDiv from "./style";

const Home = (props: any) => {
  const { history } = props;
  const [selectedTab] = useState<TabsType>("Home");
  const intl = useIntl();
  const { data, error, loading } = useRequest(getHomeUrl());
  const [showReturnBtn, setShowReturnBtn] = useState(false);
  const [top] = useDebounceWindowScroll();
  if (top > 400) {
    if (showReturnBtn === false) {
      console.log("应该让返回按钮显示");
      setShowReturnBtn(true);
    }
  } else {
    if (showReturnBtn === true) {
      console.log("应该让返回按钮隐藏");
      setShowReturnBtn(false);
    }
  }

  // const handleClick = useCallback(() => {
  //   //滚动到顶部
  //   console.log("滚动到顶部");
  //   document.getElementsByClassName("am-tab-bar")[0].scrollTo(0, 0);
  // }, []);

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
    <WarpDiv showReturnBtn={showReturnBtn}>
      {/* <div className="img-home" onClick={handleClick}>
        <Icon className="icon-home" type="up" />
      </div> */}
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
    </WarpDiv>
  );
};

export default Home;
