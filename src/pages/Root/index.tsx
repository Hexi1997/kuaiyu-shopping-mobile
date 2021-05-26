import React, { memo } from "react";
import { renderRoutes } from "react-router-config";
import { Button } from "antd-mobile";

export default memo(function Root({ route }: any) {
  return (
    <div>
      <Button type="primary">Start</Button>
      {renderRoutes(route.routes)}
    </div>
  );
});
