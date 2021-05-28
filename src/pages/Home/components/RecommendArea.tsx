import React, { memo, FC } from "react";

type PropType = {
  goods: {
    id: number;
    title: string;
    price: number;
    stock: number;
    sales: number;
    cover: string;
    description: string;
    collects_count: number;
    cover_url: string;
  }[];
};
const RecommendArea: FC<PropType> = memo(({ goods }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: "10px",
      }}
    >
      {goods &&
        goods.slice(0, 4).map((item) => {
          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "20%",
              }}
            >
              <img
                alt={item.title}
                src={item.cover_url}
                style={{
                  width: "100%",
                }}
              />
              <div
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  /*当文本溢出包含元素时，以省略号表示超出的文本*/
                  textOverflow: "ellipsis",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {item.title.replace("《", "").replace("》", "")}
              </div>
            </div>
          );
        })}
    </div>
  );
});

export default RecommendArea;
