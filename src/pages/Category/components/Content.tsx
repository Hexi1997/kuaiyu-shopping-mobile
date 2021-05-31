import React, { memo, FC, useState } from "react";
import { useRequest } from "ahooks";
import { Accordion, List, Tabs } from "antd-mobile";
import classnames from "classnames";
import { useIntl } from "react-intl";
import { Sticky, StickyContainer } from "react-sticky";
import { getGoodsList } from "../../../service/goods";
import ContentTab from "./ContentTab";
import styled from "styled-components";
const WarpDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 95px);

  .left {
    flex: 1;
    /* background-color: #ddd; */
    overflow: auto;
    .subchildren {
      padding-left: 2.6rem;
    }
    .category_selected {
      &::after {
        display: block;
        content: "";
        width: 0.3rem;
        height: 1.6rem;
        position: absolute;
        top: 50%;
        transform: translateY(-0.8rem);
        left: 1.6rem;
        background-color: #de3253;
      }
    }
  }
  .right {
    flex: 2;
    overflow: auto;
    .tabwrapper {
      width: 100%;
      margin-top: 1rem;
    }
  }
`;

const CategoryContent: FC<{}> = memo(() => {
  const [categoryId, setCategoryId] = useState<number>();

  const intl = useIntl();

  const tabs = [
    { title: intl.formatMessage({ id: "page.category.sales" }), key: "sales" },
    { title: intl.formatMessage({ id: "page.category.price" }), key: "price" },
    {
      title: intl.formatMessage({ id: "page.category.comments_count" }),
      key: "comments_count",
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

  //请求网络数据
  const { data } = useRequest(
    () => {
      return getGoodsList({ page: 1 });
    },
    {
      formatResult: (response: any) => ({
        categories: response.categories,
      }),
    }
  );

  return (
    <WarpDiv>
      <div className="left">
        {data && data.categories && data.categories.length > 0 && (
          <Accordion accordion openAnimation={{}}>
            {data.categories.map((item: any) => {
              return (
                <Accordion.Panel header={item.name} key={item.id}>
                  <List>
                    {item.children &&
                      item.children.map((citem: any) => {
                        return (
                          <List.Item
                            key={citem.id}
                            onClick={() => {
                              setCategoryId(citem.id);
                            }}
                            className={classnames({
                              subchildren: true,
                              category_selected: citem.id === categoryId,
                            })}
                          >
                            {citem.name}
                          </List.Item>
                        );
                      })}
                  </List>
                </Accordion.Panel>
              );
            })}
          </Accordion>
        )}
      </div>
      <div className="right">
        <StickyContainer>
          <Tabs
            tabs={tabs}
            initialPage={"sales"}
            renderTabBar={renderTabBar}
            swipeable={false}
          >
            <div key="sales" className="tabwrapper">
              <ContentTab type="sales" category_id={categoryId} />
            </div>
            <div key="price" className="tabwrapper">
              <ContentTab type="price" category_id={categoryId} />
            </div>
            <div key="comments_count" className="tabwrapper">
              <ContentTab type="comments_count" category_id={categoryId} />
            </div>
          </Tabs>
        </StickyContainer>
      </div>
    </WarpDiv>
  );
});

export default CategoryContent;
