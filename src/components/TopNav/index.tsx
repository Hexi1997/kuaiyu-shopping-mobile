import React, { memo } from "react";
import { NavBar, Icon } from "antd-mobile";
import { useHistory } from "react-router";
import { theme_color } from "../../pages/config";
type PropType = {
  /**
   * 默认title
   */
  title?: string;
  /**
   * 可选，默认执行history.goBack方法
   */
  onLeftClick?: Function;
};
const TopNav: React.FC<PropType> = memo(({ title, onLeftClick }) => {
  const history = useHistory();
  return (
    <NavBar
      style={{ backgroundColor: theme_color, color: "white" }}
      mode="light"
      icon={<Icon type="left" style={{ width: "4rem" }} />}
      onLeftClick={() => {
        if (onLeftClick) {
          onLeftClick();
        } else {
          history.goBack();
        }
      }}
    >
      <span style={{ color: "white", fontSize: "1.5rem" }}>
        {title ? title : "title"}
      </span>
    </NavBar>
  );
});

export default TopNav;
