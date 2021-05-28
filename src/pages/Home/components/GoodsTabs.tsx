import React, { memo, FC } from "react";
import { Tabs, WhiteSpace } from "antd-mobile";
import { StickyContainer, Sticky } from "react-sticky";

type PropType = {};
const GoodsTabs: FC<PropType> = memo(() => {
  const tabs = [
    { title: "First Tab", key: "t1" },
    { title: "Second Tab", key: "t2" },
    { title: "Third Tab", key: "t3" },
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
    <Tabs tabs={tabs} initialPage={2} animated={false} useOnPan={false}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "250px",
          backgroundColor: "#fff",
        }}
      >
        Content of first tab
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "250px",
          backgroundColor: "#fff",
        }}
      >
        Content of second tab
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "250px",
          backgroundColor: "#fff",
        }}
      >
        Content of third tab
      </div>
    </Tabs>
  );
});

export default GoodsTabs;
