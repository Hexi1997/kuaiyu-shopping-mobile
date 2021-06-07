import React, { memo, FC, useCallback, useState, useEffect } from "react";
import { useRequest } from "ahooks";
import { getOrderList, orderConfirm } from "../../../service/order";
import styled from "styled-components";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import { useHistory } from "react-router";
import { Modal, Toast } from "antd-mobile";
import { getPayStatus, getQrCode } from "../../../service/pay";

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
  const history = useHistory();
  const { data, run, noMore, loadMore, loading, error, reload } = useRequest(
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

  //二维码modal
  const [codeModalVisibile, setCodeModalVisibile] = useState<boolean>(false);
  //二维码图片地址
  const [qrImgUrl, setQrImgUrl] = useState<string>("");
  //轮询获取状态的定时器id
  const [intervalId, setIntervalId] = useState<any>();
  console.log("刷新");

  useEffect(() => {
    run(undefined);
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, []);

  const getStatusText = useCallback((num: number) => {
    switch (num) {
      case 1:
        return "待付款";
      case 2:
        return "待发货";
      case 3:
        return "待收货";
      case 4:
        return "已交易";
      case 5:
        return "已过期";

      default:
        return "";
    }
  }, []);

  const renderBtns = useCallback(
    (status: number, total: number, id: number) => {
      switch (status) {
        case 1:
          return (
            <div className="btns-container">
              <span className="amount">总价：￥{total}</span>
              <div className="btns">
                <div
                  className="btn"
                  onClick={async () => {
                    try {
                      //获取支付宝和微信二维码图片地址
                      const res2: any = await getQrCode(id);
                      console.log(res2);
                      //显示支付二维码
                      setCodeModalVisibile(true);
                      setQrImgUrl(res2.qr_code_url);
                      //开启轮询获取支付状态，如果支付成功，则replace到支付成功界面
                      const intervalId = setInterval(async () => {
                        const res3: any = await getPayStatus(id);
                        console.log("轮询中...", res3);
                        if (String(res3) === "2") {
                          //清除轮询
                          clearInterval(intervalId);
                          Toast.success("支付成功", 2);
                          setCodeModalVisibile(false);
                          setTimeout(() => {
                            //成功则刷新
                            reload();
                          }, 2000);
                        }
                      }, 2000);
                      setIntervalId(intervalId);
                    } catch (error) {
                      console.error(error);
                      intervalId && clearInterval(intervalId);
                    }
                  }}
                >
                  去支付
                </div>
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
                <div
                  className="btn"
                  onClick={() => {
                    history.push({
                      pathname: "/orders/express",
                      search: String(id),
                    });
                  }}
                >
                  查看物流
                </div>
                <div
                  className="btn"
                  onClick={async () => {
                    try {
                      await orderConfirm(id);
                      Toast.success("确认收货成功!", 1);
                      setTimeout(() => {
                        //页面刷新
                        reload();
                      }, 1000);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  确认收货
                </div>
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
    },
    [history, intervalId, reload]
  );

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
            {renderBtns(item.status, item.amount, item.id)}
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
      {type === "tobepaid" && (
        <Modal
          visible={codeModalVisibile}
          onClose={() => {
            //设置modal关闭
            setCodeModalVisibile(false);
            //清除轮询定时器
            intervalId && clearInterval(intervalId);
          }}
          animationType="slide-up"
          title="使用支付宝沙箱扫描二维码"
          style={{
            zIndex: 9999999,
            width: "90%",
            height: "20rem",
          }}
        >
          <img src={qrImgUrl} width="40%" alt="支付二维码" className="qr-img" />
        </Modal>
      )}
    </WarpDiv>
  );
});

export default OrderTab;
