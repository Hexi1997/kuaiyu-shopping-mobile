import { memo, FC } from "react";
import styled from "styled-components";
import { getSNRPageData } from "../../../service/home";
import { Result } from "./GoodsTabs";
import { useRequest } from "ahooks";

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
  const { data, loadMore, noMore } = useRequest(
    (d: Result | undefined) => {
      if (d?.next) {
        return getSNRPageData(d.current + 1, type);
      } else {
        return getSNRPageData(1, type);
      }
    },
    {
      loadMore: true,
      throwOnError: true,
      formatResult: (response: any) => {
        console.log(response);
        return {
          list: response.goods.data,
          current: response.goods.current_page,
          next: response.goods.next_page_url,
        };
      },
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

  return (
    <WarpDiv>
      {data &&
        data.list.map((item) => {
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

export default NewGoodTab;
