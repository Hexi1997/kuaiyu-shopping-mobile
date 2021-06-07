import React, { memo, FC, useState, useEffect } from "react";
import { Tabs, Toast } from "antd-mobile";
import { useIntl } from "react-intl";
import { useHistory, useLocation } from "react-router-dom";
import { Sticky, StickyContainer } from "react-sticky";
import Loading from "../../components/Loading";
import TopNav from "../../components/TopNav";
import { getGoodInfo } from "../../service/goods";
import { getDaysFromNow } from "../../utils/dateUtils";
import { GoodInfo } from "../types";
import WarpDiv from "./style";
import { addGoodToCart } from "../../service/cart";
import nocollect from "../../assets/no_collect.png";
import collect from "../../assets/collect_2.png";
import { changeGoodCollect } from "../../service/star";

type PropType = {};

const GoodsInfo: FC<PropType> = memo(() => {
  const [goodData, setGoodData] = useState<GoodInfo>();
  let { search } = useLocation();
  const [bLoading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  const intl = useIntl();

  const getData = async () => {
    if (search) {
      //如果search有值
      try {
        //根据id获取具体的商品详情
        const id = parseInt(search.replace("?", ""));
        const res: any = await getGoodInfo(id);
        //详情的内容来自pc端后台管理系统braft-editor编辑保存的富文本
        //正则替换图片,让每一个图片width都为100%，自适应手机屏幕，让详情中的图片能正常显示
        res.goods.details = res.goods.details.replace(
          /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
          (match: any, reSrc: string) => {
            //reSrc,返回每个匹配的字符串
            return '<img src="' + reSrc + '" alt="" style="width:100%;" />';
          }
        );
        setGoodData(res);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  const tabs = [
    {
      title: intl.formatMessage({ id: "page.goodinfo.detail" }),
      key: "detail",
    },
    {
      title: intl.formatMessage({ id: "page.goodinfo.comment" }),
      key: "comment",
    },
    {
      title: intl.formatMessage({ id: "page.goodinfo.related" }),
      key: "related",
    },
  ];

  const renderTabBar = (props: any) => {
    return (
      <Sticky>
        {({ style }) => (
          <div style={{ ...style, zIndex: 1, borderColor: "#bd4b5a" }}>
            <Tabs.DefaultTabBar {...props} />
          </div>
        )}
      </Sticky>
    );
  };

  if (bLoading || !goodData) {
    return <Loading />;
  }

  return (
    <WarpDiv>
      <TopNav title="商品详情" />
      <div className="cover_container">
        <img
          src={goodData.goods.cover_url}
          alt="商品图片"
          className="cover_url"
        />
        <img
          src={goodData.goods.is_collect === 1 ? collect : nocollect}
          alt="收藏图标"
          className="star"
          onClick={async () => {
            try {
              const { is_collect } = goodData.goods;
              await changeGoodCollect(goodData.goods.id);
              //刷新界面数据
              const newData = { ...goodData };
              newData.goods.is_collect = is_collect === 1 ? 0 : 1;
              setGoodData(newData);

              if (is_collect === 1) {
                Toast.success("取消收藏成功!", 1);
              } else {
                Toast.success("收藏成功!", 1);
              }
            } catch (error) {
              console.error(error);
            }
          }}
        />
      </div>

      <div className="area">
        <div className="title">{goodData.goods.title}</div>
        <div className="category">
          {goodData.goods.description}
          {/* {goodData.goods.caetgory_name} / {goodData.goods.description} */}
        </div>
        <div className="tags">
          {/* 显示推荐标签 */}
          {goodData.goods.is_recommend === 1 && (
            <div className="recommend">推荐</div>
          )}
          {/* 6个月以内显示最新标签 */}
          {getDaysFromNow(goodData.goods.created_at) <= 180 && (
            <div className="new">最新</div>
          )}
        </div>
        <div className="price">￥{goodData.goods.price}</div>
        <div className="btn-groups">
          <div
            className="add-to-cart"
            onClick={async () => {
              try {
                await addGoodToCart({
                  goods_id: String(goodData.goods.id),
                  num: 1,
                });
                Toast.success("添加到购物车成功!", 1);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            加入购物车
          </div>
          <div
            className="buy"
            onClick={async () => {
              try {
                await addGoodToCart({
                  goods_id: String(goodData.goods.id),
                  num: 1,
                });
                history.replace("/car");
              } catch (error) {
                console.error(error);
              }
            }}
          >
            立即购买
          </div>
        </div>
      </div>

      {/* tabs区域 */}
      <StickyContainer>
        <Tabs
          tabs={tabs}
          initialPage={"detail"}
          renderTabBar={renderTabBar}
          swipeable={false}
        >
          <div key="detail">
            <div
              dangerouslySetInnerHTML={{ __html: goodData.goods.details }}
            ></div>
          </div>
          <div key="comment">
            <div className="hot-comment">评论模块开发中...</div>
          </div>
          <div key="related" className="realted-div">
            {goodData.like_goods.map((item) => {
              return (
                <div
                  key={item.id}
                  className="realted-container"
                  onClick={() => {
                    console.log("发送请求");
                    history.replace({
                      pathname: "/good",
                      search: String(item.id),
                    });
                  }}
                >
                  <img
                    src={item.cover_url}
                    alt={item.title}
                    className="realted-img"
                  />
                  <div className="realted-title">
                    {item.title.replace("《", "").replace("》", "")}
                  </div>
                </div>
              );
            })}
          </div>
        </Tabs>
      </StickyContainer>
    </WarpDiv>
  );
});

export default GoodsInfo;
