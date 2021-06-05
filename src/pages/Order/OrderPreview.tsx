import { useMount } from "ahooks";
import React, { memo, FC, useState, useCallback } from "react";
import Loading from "../../components/Loading";
import styled from "styled-components";
import { getOrderPreview } from "../../service/order";
import TopNav from "../../components/TopNav";
import { List } from "antd-mobile";
import { useHistory } from "react-router";
import border from "../../assets/border.png";

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
  useMount(async () => {
    try {
      const res: any = await getOrderPreview();
      console.log(res);
      setData(res);
    } catch (e) {
      console.error(e);
    }
  });

  if (!data) {
    return <Loading />;
  }

  //获取默认的地址
  const defaultAddress = data.address.find(
    (item) => item.is_default === 1
  ) as Address;

  //获取总价
  const getTotalPrice = () => {
    return data.carts.reduce((total: number, current) => {
      total += current.num * current.goods.price;
      return total;
    }, 0);
  };
  return (
    <WarpDiv>
      <TopNav title="生成订单" />
      <Item
        onClick={() => {
          //跳转到地址管理，修改地址
          history.push("/my/address");
        }}
        arrow="horizontal"
        multipleLine
        platform="android"
      >
        {`${defaultAddress.name} ${defaultAddress.phone}`}
        <Brief>
          {`${defaultAddress.province} ${defaultAddress.city} ${defaultAddress.county} ${defaultAddress.address}`}
        </Brief>
      </Item>
      <div className="border"></div>
      <div className="content-container">
        {data.carts.map((item) => {
          return (
            <div className="list-container" key={item.id}>
              <img src={item.goods.cover_url} className="cover-img" />
              <div className="text-container">
                <div className="title">{item.goods.title}</div>
                <div className="price">￥{item.goods.price}</div>
              </div>
              <div className="num">x {item.num}</div>
            </div>
          );
        })}
      </div>
      <div className="bottom-container">
        <span className="text-one">商品金额</span>
        <span className="text-two">合计</span>
        <span className="text-three">￥</span>
        <span className="total">{getTotalPrice()}</span>
        <div className="btn">生成订单</div>
      </div>
    </WarpDiv>
  );
});

export default OrderPreview;
