import React, { memo, FC } from "react";
import { Tabs } from "antd-mobile";
import { StickyContainer, Sticky } from "react-sticky";
import { useIntl } from "react-intl";
import GoodsTab from "./GoodsTab";
import styled from "styled-components";

const WrapDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

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

const GoodsTabs: FC<{}> = memo(() => {
  const intl = useIntl();
  const tabs = [
    { title: intl.formatMessage({ id: "page.home.sale" }), key: "sale" },
    { title: intl.formatMessage({ id: "page.home.new" }), key: "new" },
    {
      title: intl.formatMessage({ id: "page.home.recommend" }),
      key: "recommend",
    },
  ];

  const renderTabBar = (props: any) => {
    return (
      <Sticky>
        {({ style }) => (
          <div style={{ ...style, zIndex: 1 }}>
            <Tabs.DefaultTabBar {...props} />
          </div>
        )}
      </Sticky>
    );
  };

  return (
    <StickyContainer>
      <Tabs
        tabs={tabs}
        initialPage={"sale"}
        renderTabBar={renderTabBar}
        swipeable={false}
      >
        <WrapDiv key="sale">
          <GoodsTab type="sale" />
        </WrapDiv>
        <WrapDiv key="new">
          <GoodsTab type="new" />
        </WrapDiv>
        <WrapDiv key="recommend">
          <GoodsTab type="recommend" />
        </WrapDiv>
      </Tabs>
    </StickyContainer>
  );
});

export default GoodsTabs;
