import React, { memo, FC, useRef, useEffect } from "react";
import { getSNRPageData } from "../../../service/home";
import { Result } from "./GoodsTabs";
import { useDebounceEffect, useMount, useRequest, useScroll } from "ahooks";

type PropType = {
  type: "new" | "sale" | "recommend";
};
const NewGoodTab: FC<PropType> = memo(({ type }) => {
  const ref = useRef(document);
  const scroll = useScroll(document, ({ top }) => {
    if (
      top + document.documentElement.clientHeight >=
      document.body.scrollHeight
    ) {
      loadMore();
      return true;
    } else {
      return false;
    }
  });
  console.log("页面刷新");
  // useDebounceEffect(() => {
  //   if (
  //     scroll.top + document.documentElement.clientHeight + 10 >
  //     document.body.scrollHeight
  //   ) {
  //     //代表滚动到底部，执行loadmore即可
  //     console.log("加载下一页");
  //     // loadMore();
  //   }
  // }, [scroll]);
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
      ref: ref,
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
    <>
      {data &&
        data.list.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                width: "50%",
                display: "inline-block",
                marginBottom: "10px",
              }}
            >
              <img
                key={item.id}
                src={item.cover_url}
                style={{ width: "100%" }}
              />
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                {item.title}
              </div>
            </div>
          );
        })}
      {noMore && (
        <div
          style={{
            fontSize: "14px",
            height: "40px",
            lineHeight: "40px",
            textAlign: "center",
          }}
        >
          已经到底啦
        </div>
      )}
      <div
        style={{
          fontSize: "14px",
          textAlign: "center",
          height: "40px",
          lineHeight: "40px",
        }}
        onClick={() => {
          loadMore();
        }}
      >
        加载更多
      </div>
    </>
  );
});

export default NewGoodTab;
