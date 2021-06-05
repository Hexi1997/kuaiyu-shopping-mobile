import React, { useCallback, useEffect, useState } from "react";
import { TabBar, Stepper, Toast } from "antd-mobile";
import {
  HomeOutlined,
  AppstoreOutlined,
  AccountBookOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { selectedColor, theme_color, unselectColor } from "../config";
import { useIntl } from "react-intl";
import { TabsType } from "../types";
import WarpDiv from "./style";
import TopNav from "../../components/TopNav";
import { useMount } from "ahooks";
import {
  changeCartGoodsCount,
  changeCheckedCart,
  getCartList,
  removeGoodFromCart,
} from "../../service/cart";
import unchecked from "../../assets/check_normal.png";
import checked from "../../assets/check_press.png";

const Car = (props: any) => {
  const { history } = props;
  const [selectedTab, setSelectedTab] = useState<TabsType>("Car");
  const intl = useIntl();
  const [list, setList] =
    useState<
      {
        id: number;
        user_id: number;
        goods_id: number;
        num: number;
        is_checked: number;
        goods: {
          id: number;
          title: string;
          price: number;
          cover_url: string;
        };
      }[]
    >();
  //选中的购物车id列表
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  //是否全选
  const [selectAll, setSelectAll] = useState<boolean>(false);
  useMount(async () => {
    try {
      const res: any = await getCartList();
      console.log(res.data);
      setList(res.data);
      //设置选中的ids
      const ids: number[] = [];
      res.data.forEach((item: any) => {
        if (item.is_checked === 1) {
          ids.push(item.id);
        }
      });
      setCheckedIds(ids);
    } catch (e) {
      console.error(e);
    }
  });

  //只要checkIds变化，list中的is_checked字段和全选状态selectAll也要相应变化
  useEffect(() => {
    //更新list
    setList((list) => {
      return list?.map((listItem) => {
        const newItem = { ...listItem };
        if (checkedIds.includes(listItem.id)) {
          newItem.is_checked = 1;
        } else {
          newItem.is_checked = 0;
        }
        return newItem;
      });
    });
  }, [checkedIds, setList]);

  useEffect(() => {
    //更新全选状态
    if (!list) {
      return;
    }
    if (list.length === 0 || list.length !== checkedIds.length) {
      setSelectAll(false);
    } else {
      setSelectAll(true);
    }
  }, [list, setSelectAll, checkedIds.length]);

  const getTotalPrice = useCallback(() => {
    if (list) {
      return list.reduce((total: number, item, index: number) => {
        return (total += item.is_checked ? item.num * item.goods.price : 0);
      }, 0);
    }
  }, [list]);

  //跳转到订单预览界面
  const handleJumpToOrderPriview = useCallback(() => {
    //首先判断是否有商品被选中，有被选中才跳转到订单预览界面
    if (checkedIds.length === 0) {
      Toast.info("未选择任何商品", 1);
      return;
    }
    history.push("/orders/preview");
  }, [checkedIds, history]);
  return (
    <WarpDiv>
      <TabBar tabBarPosition="bottom" tintColor={theme_color}>
        <TabBar.Item
          title={intl.formatMessage({
            id: "menu.home",
            defaultMessage: "home",
          })}
          key="Home"
          icon={<HomeOutlined style={{ color: unselectColor }} />}
          selectedIcon={<HomeOutlined style={{ color: selectedColor }} />}
          selected={selectedTab === "Home"}
          onPress={() => {
            history.push("/home");
          }}
        ></TabBar.Item>

        <TabBar.Item
          title={intl.formatMessage({
            id: "menu.category",
            defaultMessage: "category",
          })}
          key="Category"
          icon={<AppstoreOutlined twoToneColor={unselectColor} />}
          selectedIcon={<AppstoreOutlined twoToneColor={selectedColor} />}
          selected={selectedTab === "Category"}
          onPress={() => {
            history.push("/category");
          }}
        ></TabBar.Item>

        <TabBar.Item
          title={intl.formatMessage({
            id: "menu.car",
            defaultMessage: "cart",
          })}
          key="Car"
          icon={<AccountBookOutlined twoToneColor={unselectColor} />}
          selectedIcon={<AccountBookOutlined twoToneColor={selectedColor} />}
          selected={selectedTab === "Car"}
          onPress={() => {
            setSelectedTab("Car");
          }}
        >
          <TopNav title="购物车" />
          {list &&
            list.map((item) => {
              return (
                <div className="list-container" key={item.id}>
                  <div className="check-div">
                    <img
                      alt={item.goods.title}
                      src={checkedIds.includes(item.id) ? checked : unchecked}
                      className="check-img"
                      onClick={async () => {
                        let newIds: number[] = [];
                        if (checkedIds.includes(item.id)) {
                          //移除指定id
                          newIds = checkedIds.filter((id) => item.id !== id);
                        } else {
                          //添加指定id
                          newIds = [...checkedIds, item.id];
                        }
                        try {
                          //更新到服务器
                          await changeCheckedCart(newIds);
                          //页面内容刷新
                          setCheckedIds(newIds);
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                    />
                  </div>
                  <img
                    alt={item.goods.title}
                    src={item.goods.cover_url}
                    className="list-img"
                    onClick={() => {
                      history.push({
                        pathname: "/good",
                        search: String(item.goods.id),
                      });
                    }}
                  />
                  <div className="text-area">
                    <div className="top-text">
                      <div className="title">
                        {item.goods.title.replace("《", "").replace("》", "")}
                      </div>
                      <div className="price">售价:{item.goods.price}元</div>
                    </div>
                    <div className="bottom-text">
                      <Stepper
                        className="stepper"
                        showNumber
                        min={1}
                        defaultValue={item.num}
                        onChange={async (val: number) => {
                          try {
                            //更新到服务器中
                            await changeCartGoodsCount(item.id, val);
                            //更新到内存
                            const newList = list.map((citem) => {
                              const newItem = { ...citem };
                              if (newItem.id === item.id) {
                                newItem.num = val;
                              }
                              return newItem;
                            });
                            setList(newList);
                          } catch (e) {
                            console.error(e);
                          }
                        }}
                        value={item.num}
                      />
                      <div className="delete-btn">
                        <DeleteOutlined
                          onClick={async () => {
                            try {
                              await removeGoodFromCart(item.id);
                              //更新选中状态
                              setCheckedIds((ids) => {
                                return ids.filter((id) => id !== item.id);
                              });
                              //list列表中删除
                              if (list) {
                                setList(
                                  list.filter((vitem) => vitem.id !== item.id)
                                );
                              }

                              Toast.success("删除成功", 1);
                            } catch (e) {
                              console.error(e);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          <div style={{ height: "5rem" }}></div>
          <div className="bottom-container">
            <div className="select-all-container">
              <img
                src={selectAll ? checked : unchecked}
                alt="全选图标"
                className="select-all-img"
                onClick={async () => {
                  if (list) {
                    let newIds: number[] = [];
                    if (selectAll) {
                      newIds = [];
                      setSelectAll(false);
                    } else {
                      newIds = list.map((item) => item.id);
                      setSelectAll(true);
                    }
                    try {
                      //更新到服务器
                      await changeCheckedCart(newIds);
                      //设置界面显示
                      setCheckedIds(newIds);
                    } catch (e) {
                      console.error(e);
                    }
                  }
                }}
              />
              <span>全选</span>
            </div>
            <div className="right-container">
              <span>合计</span>
              <span className="total-price">{getTotalPrice()}元</span>
              <div className="btn-calc" onClick={handleJumpToOrderPriview}>
                结算
              </div>
            </div>
          </div>
        </TabBar.Item>

        <TabBar.Item
          title={intl.formatMessage({
            id: "menu.my",
            defaultMessage: "mine",
          })}
          key="My"
          icon={<InfoCircleOutlined twoToneColor={unselectColor} />}
          selectedIcon={<InfoCircleOutlined twoToneColor={selectedColor} />}
          selected={selectedTab === "My"}
          onPress={() => {
            history.push("/my");
          }}
        ></TabBar.Item>
      </TabBar>
    </WarpDiv>
  );
};

export default Car;
