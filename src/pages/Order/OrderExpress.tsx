import { useMount } from "ahooks";
import { Toast } from "antd-mobile";
import copy from "copy-to-clipboard";
import React, { memo, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import TopNav from "../../components/TopNav";
import { getOrderExpressInfo } from "../../service/order";
import { theme_color } from "../config";

type Trace = {
  AcceptTime: string;
  AcceptStation: string;
  Remark: any;
};

type ExpressType = "SF" | "YD" | "YTO";

type ExpressInfoType = {
  EBusinessID: string;
  OrderCode: string;
  ShipperCode: ExpressType;
  LogisticCode: string;
  Success: boolean;
  State: string;
  Reason?: any;
  Traces: Trace[];
};

const WarpDiv = styled.div`
  background-color: white;
  .express-line {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    font-size: 1.4rem;
    border-bottom: 1px solid #ddd;
    align-items: center;
    .express-type {
      color: ${theme_color};
    }
    .express-no {
      flex: 1;
      text-align: left;
    }
    .btn-copy {
      padding: 0.6rem 0.8rem;
      border: 1px solid #aaa;
      border-radius: 0.5rem;
    }
  }
`;
const OrderExpress = memo(() => {
  const [data, setData] = useState<ExpressInfoType>();
  const history = useHistory();

  useMount(async () => {
    try {
      if (!history.location.search) {
        return;
      }
      const id = parseInt(history.location.search.replace("?", ""));
      const res: any = await getOrderExpressInfo(id);
      console.log(res);
      setData(res);

      //物流接口有限制，而且接口的数据也不是真实的，这里直接使用mock的数据
      const data = {
        EBusinessID: "test1371565",
        OrderCode: "",
        ShipperCode: "SF" as ExpressType,
        LogisticCode: "SF2021060615230407",
        Success: true,
        State: "3",
        Reason: null,
        Traces: [
          {
            AcceptTime: "2020-12-24 17:23:28",
            AcceptStation: "快件已经签收，签收人：张启明[武汉市]",
            Remark: "已经签收",
          },
          {
            AcceptTime: "2020-12-21 17:23:28",
            AcceptStation: "快件到达武汉市武昌区徐东大街1号网点[武汉市]",
            Remark: "到达目的城市",
          },
          {
            AcceptTime: "2020-12-20 17:23:28",
            AcceptStation: "快件在离开深圳集散中心，发往武汉市[深圳市]",
            Remark: "离开发件城市",
          },
          {
            AcceptTime: "2020-12-19 17:23:28",
            AcceptStation: "快件已经到达深圳集散中心[深圳市]",
            Remark: null,
          },
          {
            AcceptTime: "2020-12-18 17:23:28",
            AcceptStation: "深圳福田保税区网点已揽件[深圳市]",
            Remark: "已揽件",
          },
        ],
      };
      //   setData(data);
      //   console.log(data);
    } catch (e) {
      console.error(e);
    }
  });
  if (!history.location.search) {
    Toast.fail("请勿在浏览器地址栏直接输入地址访问当前页面");
    return <Error />;
  }
  if (!data) {
    return <Loading />;
  }
  return (
    <WarpDiv>
      <TopNav title="物流信息(Mock)" />
      {/* 显示物流信息 */}
      <div className="express-line">
        <span className="express-type">
          {data.ShipperCode === "SF"
            ? "顺丰快递"
            : data.ShipperCode === "YD"
            ? "韵达快递"
            : "圆通快递"}
        </span>
        <span className="express-no">：{data.LogisticCode}</span>
        <div
          className="btn-copy"
          onClick={() => {
            const bSus = copy(data.LogisticCode);
            console.log(bSus);
            bSus ? Toast.success("复制成功!", 1) : Toast.fail("复制失败!", 1);
          }}
        >
          复制
        </div>
      </div>
      <VerticalTimeline animate={true} layout="1-column">
        {data.Traces.map((item, index: number) => {
          if (index === 0) {
            //第一个
            return (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgb(33, 150, 243)",
                  color: "#fff",
                  marginLeft: "3.6rem",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  rgb(33, 150, 243)",
                }}
                date={data.Traces[0].AcceptTime}
                iconStyle={{
                  background: "rgb(33, 150, 243)",
                  color: "#fff",
                  width: "1.8rem",
                  height: "1.8rem",
                  marginTop: "1.4rem",
                }}
              >
                <h3 className="vertical-timeline-element-title">
                  {data.Traces[0].Remark}
                </h3>
                <p>{data.Traces[0].AcceptStation}</p>
              </VerticalTimelineElement>
            );
          } else {
            return (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  color: "black",
                  marginLeft: "3.6rem",
                }}
                contentArrowStyle={{ borderRight: "7px solid #fff" }}
                date={data.Traces[index].AcceptTime}
                iconStyle={{
                  width: "1.8rem",
                  height: "1.8rem",
                  marginTop: "1.4rem",
                }}
              >
                <h3 className="vertical-timeline-element-title">
                  {data.Traces[index].Remark}
                </h3>
                <p>{data.Traces[index].AcceptStation}</p>
              </VerticalTimelineElement>
            );
          }
        })}
      </VerticalTimeline>
    </WarpDiv>
  );
});

export default OrderExpress;
