import { useMount } from "ahooks";
import React, { memo, FC, useState, useEffect } from "react";
import Loading from "../../components/Loading";
import styled from "styled-components";
import { generateOrder, getOrderPreview } from "../../service/order";
import TopNav from "../../components/TopNav";
import { List, Modal, Toast } from "antd-mobile";
import { useHistory } from "react-router";
import border from "../../assets/border.png";
import { getPayStatus, getQrCode } from "../../service/pay";

const Item = List.Item;
const Brief = Item.Brief;
type PropType = {};
interface Address {
  id: number;
  name: string;
  province: string;
  city: string;
  county: string;
  address: string;
  phone: string;
  is_default: number;
  created_at: Date;
  updated_at: Date;
}

interface Goods {
  id: number;
  cover: string;
  title: string;
  cover_url: string;
  price: number;
}

interface Cart {
  id: number;
  user_id: number;
  goods_id: number;
  num: number;
  is_checked: number;
  created_at: Date;
  updated_at: Date;
  goods: Goods;
}

interface OrderPreviewDataType {
  address: Address[];
  carts: Cart[];
}

const WarpDiv = styled.div`
  position: relative;
  background-color: #fff;
  .border {
    width: 100%;
    height: 1rem;
    background: url(${border}) repeat-x;
    background-size: 30%;
  }
  .content-container {
    padding-bottom: 6rem;

    .list-container {
      display: flex;
      align-items: center;
      .cover-img {
        width: 8rem;
        height: 8rem;
      }
      .text-container {
        flex: 1;
        height: 8rem;
        display: flex;
        flex-direction: column;
        .title {
          padding-top: 1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 1.6rem;
        }
        .price {
          padding-top: 1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 1.6rem;
          color: red;
        }
      }
      .num {
        height: 8rem;
        padding-top: 1.7rem;
        padding-right: 1rem;
      }
    }
  }
  .bottom-container {
    position: fixed;
    background-color: #fff;
    z-index: 9999;
    border-top: 1px solid #ddd;
    bottom: 0;
    width: 100%;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 6rem;
    font-size: 1.4rem;
    .text-one {
      margin-left: 1rem;
    }
    .text-two {
      flex: 1;
      text-align: right;
    }
    .text-three {
      color: red;
      margin-left: 1rem;
    }
    .total {
      color: red;
      font-size: 1.6rem;
      margin-right: 1rem;
    }
    .btn {
      padding: 1rem 2rem;
      border-radius: 3rem;
      color: white;
      background: linear-gradient(to left, #e91e2a, #f2623b);
      margin-right: 1rem;
    }
  }
`;
const OrderPreview: FC<PropType> = memo(() => {
  const [data, setData] = useState<OrderPreviewDataType>();
  const history = useHistory();
  const [addressId, setAddressId] = useState<number>();
  const [modalVisibile, setModalVisibile] = useState<boolean>(false);
  const [qrImgUrl, setQrImgUrl] = useState<string>("");
  //??????????????????????????????id
  const [intervalId, setIntervalId] = useState<any>();

  useEffect(() => {
    return () => {
      //??????????????????????????????
      intervalId && clearInterval(intervalId);
    };
  }, [intervalId]);

  useMount(async () => {
    try {
      const res: any = await getOrderPreview();
      console.log(res);
      setData(res);
      //?????????????????????
      const defaultAddress = res.address.find(
        (item: any) => item.is_default === 1
      );
      if (defaultAddress) {
        setAddressId(defaultAddress.id);
      }
    } catch (e) {
      console.error(e);
    }
  });

  if (!data) {
    return <Loading />;
  }

  //????????????
  const getTotalPrice = () => {
    return data.carts.reduce((total: number, current) => {
      total += current.num * current.goods.price;
      return total;
    }, 0);
  };

  const getAddressContent = () => {
    if (!addressId) {
      return <div className="tiptext">?????????????????????</div>;
    } else {
      const defaultAddress = data.address.find(
        (item) => item.id === addressId
      ) as Address;
      return (
        <>
          {`${defaultAddress.name} ${defaultAddress.phone}`}
          <Brief>
            {`${defaultAddress.province} ${defaultAddress.city} ${defaultAddress.county} ${defaultAddress.address}`}
          </Brief>
        </>
      );
    }
  };

  return (
    <WarpDiv>
      <TopNav title="????????????" />
      <Item
        onClick={() => {
          //????????????????????????????????????
          history.push("/my/address");
        }}
        arrow="horizontal"
        multipleLine
        platform="android"
      >
        {getAddressContent()}
      </Item>
      <div className="border"></div>
      <div className="content-container">
        {data.carts.map((item) => {
          return (
            <div className="list-container" key={item.id}>
              <img
                src={item.goods.cover_url}
                className="cover-img"
                alt={item.goods.title}
              />
              <div className="text-container">
                <div className="title">{item.goods.title}</div>
                <div className="price">???{item.goods.price}</div>
              </div>
              <div className="num">x {item.num}</div>
            </div>
          );
        })}
      </div>
      {!modalVisibile && (
        <div className="bottom-container">
          <span className="text-one">????????????</span>
          <span className="text-two">??????</span>
          <span className="text-three">???</span>
          <span className="total">{getTotalPrice()}</span>
          <div
            className="btn"
            onClick={async () => {
              if (!addressId) {
                Toast.fail("?????????????????????", 1);
                return;
              }

              try {
                //????????????
                const res: any = await generateOrder(addressId);
                console.log("????????????????????????????????????", res);
                //?????????????????????????????????????????????
                const res2: any = await getQrCode(res.id);
                console.log(res2);
                //?????????????????????
                setModalVisibile(true);
                setQrImgUrl(res2.qr_code_url);
                //?????????????????????????????????????????????????????????replace?????????????????????
                const intervalId = setInterval(async () => {
                  const res3: any = await getPayStatus(res.id);
                  console.log("?????????...", res3);
                  if (String(res3) === "2") {
                    //????????????
                    clearInterval(intervalId);
                    Toast.success("????????????????????????????????????????????????", 2);
                    setModalVisibile(false);

                    setTimeout(() => {
                      //???????????????????????????
                      history.replace("/orders");
                    }, 2000);
                  }
                }, 2000);
                setIntervalId(intervalId);
              } catch (error) {
                console.error(error);
                intervalId && clearInterval(intervalId);
                setModalVisibile(false);
              }
            }}
          >
            ????????????
          </div>
        </div>
      )}
      <Modal
        visible={modalVisibile}
        onClose={() => {
          //??????modal??????
          setModalVisibile(false);
          //?????????????????????
          intervalId && clearInterval(intervalId);
        }}
        animationType="slide-up"
        title="????????????????????????????????????"
        style={{
          zIndex: 9999999,
          width: "90%",
          height: "20rem",
        }}
      >
        <img src={qrImgUrl} width="40%" alt="???????????????" className="qr-img" />
      </Modal>
    </WarpDiv>
  );
});

export default OrderPreview;
