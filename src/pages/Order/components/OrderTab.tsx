import React, { memo, FC, useCallback } from "react";
import { useMount, useRequest } from "ahooks";
import { getOrderList } from "../../../service/order";
import styled from "styled-components";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";

type PropType = {
  type: "all" | "tobepaid" | "paid" | "delivered" | "finish" | "overdue";
};

type Result = {
  list: {
    /**
     * 收货地址id
     */
    address_id: number;
    /**
     * 总价
     */
    amount: number;
    /**
     * 添加时间
     */
    created_at: string;
    /**
     * 快递号
     */
    express_no: string;
    /**
     * 快递类型
     */
    express_type: string;
    /**
     * 订单附带的商品信息，一个订单可以有多个商品
     */
    goods: {
      data: {
        category_id: number;
        cover: string;
        cover_url: string;
        created_at: string;
        description: string;
        details: string;
        id: number;
        is_on: 0 | 1;
        is_recommend: 0 | 1;
        price: number;
        sales: number;
        stock: number;
        title: string;
        updated_at: string;
        user_id: number;
      }[];
    };
    /**
     * 自增长主键ID
     */
    id: number;
    orderDetails: {
      data: {
        created_at: string;
        goods_id: number;
        id: number;
        num: number;
        order_id: number;
        price: number;
        updated_at: string;
      }[];
    };
    /**
     * 单号
     */
    order_no: string;
    /**
     * 支付时间
     */
    pay_time: string;
    /**
     * 支付类型
     */
    pay_type: string;
    /**
     * 订单状态， 1:待付款 2:已支付 3:已发货 4:交易完成 5:过期
     */
    status: 1 | 2 | 3 | 4 | 5;
    /**
     * 支付流水号
     */
    trade_no: string;
    /**
     * 修改时间
     */
    updated_at: string;
    /**
     * 订单创建者的用户信息
     */
    user: {
      avatar: string;
      avatar_url: string;
      created_at: string;
      email: string;
      id: number;
      is_locked: 0 | 1;
      name: string;
      openid: any;
      phone: any;
      updated_at: string;
    };
    /**
     * 订单创建者
     */
    user_id: number;
  }[];
  current: number;
  next: string;
};

const getStatusFromType = (type: string) => {
  switch (type) {
    case "tobepaid":
      return 1;
    case "paid":
      return 2;
    case "delivered":
      return 3;
    case "finish":
      return 4;
    case "overdue":
      return 5;
    default:
      break;
  }
};

const WarpDiv = styled.div`
  background-color: #fff;
  .nomore,
  .more {
    font-size: 1rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
  }
  .container {
    border-top: 1rem solid #f4f4f4;

    .header {
      padding: 1rem;
      color: red;
      font-size: 1.4rem;
      display: flex;
      justify-content: space-between;
      span:first-child {
        color: black;
      }
    }
    .content-area {
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid #ddd;
      .cover {
        width: 10rem;
        height: 10rem;
      }
      font-size: 1.4rem;
      .text-area {
        flex: 1;
        padding: 1rem;
        padding-left: 0;
        .title {
          font-size: 1.6rem;
          margin-bottom: 1rem;
        }
        .desc {
          font-size: 1.4rem;
          color: #6f6f6f;
        }
      }
      .price-area {
        width: 6rem;
        padding: 1rem;

        .price {
          text-align: right;
          font-size: 1.6rem;
          margin-bottom: 1rem;
        }
        .num {
          text-align: right;
          font-size: 1.3rem;
          color: #6f6f6f;
          font-style: italic;
        }
      }
    }
    .btns-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 5rem;
      align-items: center;
      .amount {
        font-size: 1.4rem;
        padding-left: 1rem;
      }
      .btns {
        display: flex;
        .btn {
          padding: 0.5rem 0.7rem;
          border: 1px solid #ddd;
          font-size: 1.4rem;
          margin-right: 1rem;
          border-radius: 0.5rem;
        }
      }
    }
  }
`;

const OrderTab: FC<PropType> = memo(({ type }) => {
  const { data, run, noMore, loadMore, loading, error } = useRequest(
    (d: Result | undefined) => {
      if (d?.next) {
        const params: Record<string, any> = {
          page: d.current + 1,
          include: "goods,user,orderDetails",
        };
        if (type !== "all") {
          params.status = getStatusFromType(type);
        }
        return getOrderList(params);
      } else {
        const params: Record<string, any> = {
          page: 1,
          include: "goods,user,orderDetails",
        };
        if (type !== "all") {
          params.status = getStatusFromType(type);
        }
        return getOrderList(params);
      }
    },
    {
      //是否分页
      loadMore: true,
      //手动执行
      manual: true,
      //格式化返回的结果，因为分页要求结果中必须包括list数组和current
      formatResult: (response: any) => {
        console.log(response);
        return {
          list: response.data,
          current: response.meta.pagination.current_page,
          next: response.meta.pagination.links?.next,
        };
      },
      //是否没有下一页了
      isNoMore: (d) => {
        if (!d) {
          return true;
        } else {
          if (d.next) {
            return false;
          } else {
            return true;
          }
        }
      },
    }
  );

  useMount(() => {
    //初次加载数据
    run(undefined);
  });

  const getStatusText = useCallback((num: number) => {
    switch (num) {
      case 1:
        return "待付款";
      case 2:
        return "待发货";
      case 3:
        return "待收获";
      case 4:
        return "已交易";
      case 5:
        return "已过期";

      default:
        return "";
    }
  }, []);

  const renderBtns = useCallback((status: number, total: number) => {
    switch (status) {
      case 1:
        return (
          <div className="btns-container">
            <span className="amount">总价：￥{total}</span>
            <div className="btns">
              <div className="btn">去支付</div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="btns-container">
            <span className="amount">总价：￥{total}</span>
          </div>
        );
      case 3:
        return (
          <div className="btns-container">
            <span className="amount">总价：￥{total}</span>
            <div className="btns">
              <div className="btn">查看物流</div>
              <div className="btn">确认收获</div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="btns-container">
            <span className="amount">总价：￥{total}</span>
            <div className="btns">
              <div className="btn">去评价</div>
            </div>
          </div>
        );
      case 5:
        // return (
        //   <div className="btns-container">
        //     <span className="amount">总价：￥{total}</span>
        //     <div className="btns">
        //       <div className="btn">去支付</div>
        //       <div className="btn">取消</div>
        //     </div>
        //   </div>
        // );
        return (
          <div className="btns-container">
            <span className="amount">总价：￥{total}</span>
          </div>
        );

      default:
        return (
          <div className="btns-container">
            <span className="amount">总价：￥{total}</span>
          </div>
        );
    }
  }, []);

  if (loading || !data) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <WarpDiv>
      {data.list.map((item) => {
        if (
          !item.goods ||
          item.goods.data.length === 0 ||
          !item.orderDetails ||
          item.orderDetails.data.length === 0
        ) {
          return <></>;
        }
        return (
          <div key={item.id} className="container">
            <div className="header">
              <span>创建时间：{item.created_at}</span>
              <span>{getStatusText(item.status)}</span>
            </div>
            {item.orderDetails.data.map((citem) => {
              //根据citem.goods_id去寻找商品信息
              const good = item.goods.data.find(
                (vitem) => vitem.id === citem.goods_id
              );
              if (!good) {
                return <></>;
              }
              return (
                <div className="content-area" key={citem.id}>
                  <img
                    src={good.cover_url}
                    alt={good.title}
                    className="cover"
                  />
                  <div className="text-area">
                    <div className="title">{good.title}</div>
                    <div className="desc">{good.description}</div>
                  </div>
                  <div className="price-area">
                    <div className="price">￥{good.price}</div>
                    <div className="num">X {citem.num}</div>
                  </div>
                </div>
              );
            })}
            {/* 渲染按钮组 */}
            {renderBtns(item.status, item.amount)}
          </div>
        );
      })}
      {noMore ? (
        <div className="nomore">已经到底啦</div>
      ) : (
        <div
          className="more"
          onClick={() => {
            loadMore();
          }}
        >
          加载更多
        </div>
      )}
    </WarpDiv>
  );
});

export default OrderTab;
