import React, { memo, FC } from "react";
import { Tabs } from "antd-mobile";
import { StickyContainer, Sticky } from "react-sticky";
import { useIntl } from "react-intl";
import GoodsTab from "./GoodsTab";

type PropType = {};

export interface Item {
  id: number;
  title: string;
  price: number;
  stock: number;
  sales: number;
  cover: string;
  description: string;
  collects_count: number;
  cover_url: string;
}

export interface Result {
  list: Item[];
  current: number;
  next: string;
}

const GoodsTabs: FC<PropType> = memo(() => {
  const intl = useIntl();
  const tabs = [
    { title: intl.formatMessage({ id: "page.home.sale" }), key: "sale" },
    { title: intl.formatMessage({ id: "page.home.new" }), key: "new" },
    {
      title: intl.formatMessage({ id: "page.home.recommend" }),
      key: "recommend",
    },
  ];

  function renderTabBar(props: any) {
    return (
      <Sticky>
        {({ style }) => (
          <div style={{ ...style, zIndex: 1 }}>
            <Tabs.DefaultTabBar {...props} />
          </div>
        )}
      </Sticky>
    );
  }

  return (
    <StickyContainer>
      <Tabs
        tabs={tabs}
        initialPage={"sale"}
        renderTabBar={renderTabBar}
        swipeable={false}
      >
        <div
          key="sale"
          style={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          <GoodsTab type="sale" />
        </div>
        <div
          key="new"
          style={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          <GoodsTab type="new" />
        </div>
        <div
          key="recommend"
          style={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          <GoodsTab type="recommend" />
        </div>
      </Tabs>
    </StickyContainer>
  );
});

export default GoodsTabs;
