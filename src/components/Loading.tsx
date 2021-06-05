import { ActivityIndicator } from "antd-mobile";
import React, { memo, FC } from "react";

type PropType = {};
const Loading: FC<PropType> = memo(() => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <ActivityIndicator size="large" />
    </div>
  );
});

export default Loading;
