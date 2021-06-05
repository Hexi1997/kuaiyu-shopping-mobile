import { Tabs } from "antd-mobile";
import React, { memo, FC } from "react";
import { useIntl } from "react-intl";
import { Sticky, StickyContainer } from "react-sticky";
import styled from "styled-components";
import TopNav from "../../components/TopNav";
import OrderTab from "./components/OrderTab";

const WarpDiv = styled.div``;

type PropType = {};
const OrderList: FC<PropType> = memo(() => {
  const intl = useIntl();

  const tabs = [
    {
      title: intl.formatMessage({ id: "page.orderlist.all" }),
      key: "all",
    },
    {
      title: intl.formatMessage({ id: "page.orderlist.tobepaid" }),
      key: "tobepaid",
    },
    {
      title: intl.formatMessage({ id: "page.orderlist.paid" }),
      key: "paid",
    },
    {
      title: intl.formatMessage({ id: "page.orderlist.delivered" }),
      key: "delivered",
    },
    {
      title: intl.formatMessage({ id: "page.orderlist.finish" }),
      key: "finish",
    },
    {
      title: intl.formatMessage({ id: "page.orderlist.overdue" }),
      key: "overdue",
    },
  ];

  const renderTabBar = (props: any) => {
    return (
      <Sticky>
        {({ style }) => (
          <div style={{ ...style, zIndex: 1 }}>
            <Tabs.DefaultTabBar {...props} page={6} />
          </div>
        )}
      </Sticky>
    );
  };

  return (
    <WarpDiv>
      <TopNav title="订单列表" />
      <StickyContainer>
        <Tabs
          tabs={tabs}
          initialPage={"all"}
          renderTabBar={renderTabBar}
          swipeable={false}
        >
          <div key="all">
            <OrderTab type="all" />
          </div>
          <div key="tobepaid">
            <OrderTab type="tobepaid" />
          </div>
          <div key="paid">
            <OrderTab type="paid" />
          </div>
          <div key="delivered">
            <OrderTab type="delivered" />
          </div>
          <div key="finish">
            <OrderTab type="finish" />
          </div>
          <div key="overdue">
            <OrderTab type="overdue" />
          </div>
        </Tabs>
      </StickyContainer>
    </WarpDiv>
  );
});

export default OrderList;
