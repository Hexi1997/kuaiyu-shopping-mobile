import React, { memo, FC, useRef, useEffect } from "react";
import { useRequest } from "ahooks";
import styled from "styled-components";
import { getGoodsList } from "../../../service/goods";
import { Result } from "../../types";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";

const WarpDiv = styled.div`
  height: calc(100vh - 138.5px - 1rem);
  overflow: auto;
  padding-right: 1rem;
  .nomore,
  .more {
    font-size: 1rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
  }
  .item-container {
    display: flex;
    width: 100%;
    overflow-x: hidden;
    padding-right: 1rem;
    align-items: center;
    border-bottom: 1px solid #ddd;
    font-size: 1.2rem;
    .item-img {
      width: 8rem;
      height: 8rem;
    }
    .text-container {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 8rem;
      flex: 1;
      .top-text {
        width: 100%;
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 1.6rem;
        }
        .time {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 1rem;
          font-style: italic;
        }
      }
      .bottom-text {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;

type PropType = {
  category_id: number | undefined;
  type: "sales" | "price" | "comments_count";
};
const ContentTab: FC<PropType> = memo(({ category_id, type }) => {
  //请求网络数据
  console.log("进入");
  const history = useHistory();
  const { data, run, noMore, loadMore } = useRequest(
    (d: Result | undefined) => {
      if (d?.next) {
        const params: Record<string, any> = {
          page: d.current + 1,
          type,
        };
        if (category_id) {
          params.category_id = category_id;
        }
        return getGoodsList(params);
      } else {
        const params: Record<string, any> = {
          page: 1,
          type,
        };
        if (category_id) {
          params.category_id = category_id;
        }
        return getGoodsList(params);
      }
    },
    {
      //是否分页
      loadMore: true,
      //手动执行
      manual: true,
      //格式化返回的结果，因为分页要求结果中必须包括list数组和current
      formatResult: (response: any) => {
        console.log(response);
        return {
          list: response.goods.data,
          current: response.goods.current_page,
          next: response.goods.next_page_url,
          category: response.categories,
        };
      },
      //是否没有下一页了
      isNoMore: (d) => {
        if (!d) {
          return true;
        } else {
          if (d.next) {
            return false;
          } else {
            return true;
          }
        }
      },
    }
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    run(undefined);
  }, []);

  useEffect(() => {
    run(undefined);
  }, [category_id]);

  useEffect(() => {}, [type]);
  return (
    <WarpDiv ref={ref}>
      {/* {(!data || !data.list || data.list.length === 0) && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          没有数据
        </div>
      )} */}
      {data?.list.map((item) => {
        return (
          <div
            key={item.id}
            className="item-container"
            onClick={() => {
              history.push({
                pathname: "/good",
                search: String(item.id),
              });
            }}
          >
            <img alt={item.title} src={item.cover_url} className="item-img" />
            <div className="text-container">
              <div className="top-text">
                <div className="title">{item.title}</div>
                <div className="time">
                  {dayjs(item.updated_at).format("YYYY/MM/DD")}
                </div>
              </div>
              <div className="bottom-text">
                <span className="price">￥{item.price}</span>
                <span className="sales">销量:{item.sales}</span>
              </div>
            </div>
          </div>
        );
      })}
      {noMore ? (
        <div className="nomore">已经到底啦</div>
      ) : (
        <div
          className="more"
          onClick={() => {
            loadMore();
          }}
        >
          加载更多
        </div>
      )}
    </WarpDiv>
  );
});

export default ContentTab;
