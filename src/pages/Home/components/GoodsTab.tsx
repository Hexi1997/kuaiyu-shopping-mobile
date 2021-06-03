import { memo, FC } from "react";
import styled from "styled-components";
import { getSNRPageData } from "../../../service/home";
import { Result } from "./GoodsTabs";
import { useRequest } from "ahooks";
import { useHistory } from "react-router-dom";

const WarpDiv = styled.div`
  .nomore,
  .more {
    font-size: 1rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
  }
  .item-container {
    width: 50%;
    display: inline-block;
    margin-bottom: 1rem;
    .img {
      width: 100%;
    }
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }
  }
`;

type PropType = {
  type: "new" | "sale" | "recommend";
};
const NewGoodTab: FC<PropType> = memo(({ type }) => {
  const history = useHistory();
  const { data, loadMore, noMore } = useRequest(
    (d: Result | undefined) => {
      if (d?.next) {
        //返回下一页的api地址
        return getSNRPageData(d.current + 1, type);
      } else {
        //默认获取第一页的api地址
        return getSNRPageData(1, type);
      }
    },
    {
      //是否分页
      loadMore: true,
      //格式化返回的结果，因为分页要求结果中必须包括list数组和current
      formatResult: (response: any) => {
        console.log(response);
        return {
          list: response.goods.data,
          current: response.goods.current_page,
          next: response.goods.next_page_url,
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

  if (!data) {
    return <></>;
  }
  return (
    <WarpDiv>
      {data.list.map((item) => {
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
            <img
              alt={item.title}
              key={item.id}
              src={item.cover_url}
              className="img"
            />
            <div className="title">{item.title}</div>
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
      {/* {data && data.list && data.list.length > 0 && (
        <ListView
          dataSource={data.list}
          renderHeader={() => <span>header</span>}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: "center" }}>
              {"Loading..."}
            </div>
          )}
          renderRow={(item) => {
            console.log(item);
            return (
              <div key={item.id} className="item-container">
                <img
                  alt={item.title}
                  key={item.id}
                  src={item.cover_url}
                  className="img"
                />
                <div className="title">{item.title}</div>
              </div>
            );
          }}
          // renderSeparator={separator}
          className="am-list"
          pageSize={4}
          useBodyScroll
          onScroll={() => {
            console.log("scroll");
          }}
          scrollRenderAheadDistance={500}
          // onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      )} */}
    </WarpDiv>
  );
});

export default NewGoodTab;
