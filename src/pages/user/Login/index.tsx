import React, { memo } from "react";
import { FormattedMessage } from "react-intl";

export default memo(function Login() {
  return (
    <div>
      登录界面<FormattedMessage id="switch"></FormattedMessage>
    </div>
  );
});
