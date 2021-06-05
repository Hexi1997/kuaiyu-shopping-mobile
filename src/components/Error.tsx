import React, { memo, FC } from "react";

type PropType = {
  text?: string;
};
const Error: FC<PropType> = memo(({ text }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      {text ? text : "请求数据失败，请刷新月面"}
    </div>
  );
});

export default Error;
