import { useMount } from "ahooks";
import React, { memo, FC, useState } from "react";
import { useLocation } from "react-router-dom";
import TopNav from "../../components/TopNav";
import { getGoodInfo } from "../../service/goods";
import { GoodInfo } from "../types";
import WarpDiv from "./style";

type PropType = {};

const GoodsInfo: FC<PropType> = memo(() => {
  const [goodData, setGoodData] = useState<GoodInfo>();
  const { search } = useLocation();
  useMount(async () => {
    if (search) {
      //如果search有值
      try {
        //根据id获取具体的商品详情
        const id = parseInt(search.replace("?", ""));
        const res: any = await getGoodInfo(id);
        console.log(res);
        setGoodData(res);
      } catch (e) {
        console.error(e);
      }
    }
  });
  return (
    <WarpDiv>
      <TopNav title="商品详情" />
    </WarpDiv>
  );
});

export default GoodsInfo;
