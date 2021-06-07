import { EditOutlined } from "@ant-design/icons";
import { useMount } from "ahooks";
import { Button } from "antd-mobile";
import React, { memo, FC, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import TopNav from "../../components/TopNav";
import { AddressInfoType, getAddressList } from "../../service/address";
import WarpDiv from "./style";

type PropType = {} & RouteComponentProps;
const Address: FC<PropType> = memo(({ history }) => {
  const [addressList, setAddressList] = useState<AddressInfoType[]>();
  useMount(async () => {
    try {
      const res: any = await getAddressList();
      console.log(res.data);
      setAddressList(res.data);
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <WarpDiv>
      <TopNav title="地址管理" />
      {addressList &&
        addressList.map((item) => {
          return (
            <div className="address-container" key={item.id}>
              <div className="text-container">
                <div className="part1">
                  {item.name + " " + item.phone}
                  {item.is_default === 1 && (
                    <span className="default">默认</span>
                  )}
                </div>
                <div className="part2">
                  {item.province +
                    " " +
                    item.city +
                    " " +
                    item.county +
                    " " +
                    item.address}
                </div>
              </div>
              <EditOutlined
                className="editor"
                onClick={() => {
                  history.push("/my/address/change", {
                    data: item,
                    type: "update",
                  });
                }}
              />
            </div>
          );
        })}
      <Button
        className="add-btn"
        type="primary"
        onClick={() => {
          history.push("/my/address/change", { type: "add" });
        }}
      >
        新增收货地址
      </Button>
    </WarpDiv>
  );
});

export default Address;
