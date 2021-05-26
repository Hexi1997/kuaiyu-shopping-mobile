import React, { memo } from "react";
import { FormattedMessage } from "react-intl";

export default memo(function Home() {
  return (
    <div>
      Home界面 <FormattedMessage id="start"></FormattedMessage>
    </div>
  );
});
