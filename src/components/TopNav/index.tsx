import React, { memo } from "react";
import { NavBar, Icon } from "antd-mobile";
import { useHistory } from "react-router";
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
      mode="light"
      icon={<Icon type="left" />}
      onLeftClick={() => {
        if (onLeftClick) {
          onLeftClick();
        } else {
          history.goBack();
        }
      }}
      // rightContent={
      //   <HomeOutlined
      //     onClick={() => {
      //       history.push("/home");
      //     }}
      //   />
      // }
    >
      {title ? title : "title"}
    </NavBar>
  );
});

export default TopNav;
