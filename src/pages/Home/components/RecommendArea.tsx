import React, { memo, FC } from "react";
import styled from "styled-components";

const WrapDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 1rem;
  .item-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
    .img {
      width: 100%;
    }
    .title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      text-align: center;
    }
  }
`;

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
    <WrapDiv>
      {goods &&
        goods.slice(0, 4).map((item) => {
          return (
            <div key={item.id} className="item-container">
              <img alt={item.title} src={item.cover_url} className="img" />
              <div className="title">
                {item.title.replace("《", "").replace("》", "")}
              </div>
            </div>
          );
        })}
    </WrapDiv>
  );
});

export default RecommendArea;
