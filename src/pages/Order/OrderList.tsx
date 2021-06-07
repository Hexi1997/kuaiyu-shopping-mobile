import { Tabs } from "antd-mobile";
import { inject, observer } from "mobx-react";
import React, { memo, FC, useState } from "react";
import { useIntl } from "react-intl";
import { Sticky, StickyContainer } from "react-sticky";
import styled from "styled-components";
import TopNav from "../../components/TopNav";
import OrderTab from "./components/OrderTab";

const WarpDiv = styled.div``;

type PropType = {};

const getActiveTabName = (tabName: string) => {
  console.log("进入获取index", tabName);
  switch (tabName) {
    case "all":
      return 0;
    case "tobepaid":
      return 1;
    case "paid":
      return 2;
    case "delivered":
      return 3;
    case "finish":
      return 4;
    case "overdue":
      return 5;

    default:
      return 0;
  }
};

const OrderList: FC<PropType> = ({ GlobalStore }: any) => {
  const intl = useIntl();
  const { orderTabName, changeOrderTabName } = GlobalStore;
  console.log(orderTabName);
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
            <Tabs.DefaultTabBar
              {...props}
              page={6}
              activeTab={getActiveTabName(orderTabName)}
              onTabClick={(tab, index) => {
                console.log("点击tab", index);
                switch (index) {
                  case 0:
                    changeOrderTabName("all");
                    break;
                  case 1:
                    changeOrderTabName("tobepaid");
                    break;
                  case 2:
                    changeOrderTabName("paid");
                    break;
                  case 3:
                    changeOrderTabName("delivered");
                    break;
                  case 4:
                    changeOrderTabName("finish");
                    break;
                  case 5:
                    changeOrderTabName("overdue");
                    break;

                  default:
                    break;
                }
              }}
            />
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
          page={orderTabName}
          initialPage={orderTabName}
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
};

//函数组件注入mobx，并且设置为观察者模式
export default inject("GlobalStore")(observer(OrderList));
