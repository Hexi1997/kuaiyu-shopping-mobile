import React, { useCallback, useState } from "react";
import { TabBar, List, Button, Toast, Modal } from "antd-mobile";
import {
  HomeOutlined,
  AppstoreOutlined,
  AccountBookOutlined,
  InfoCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { selectedColor, theme_color, unselectColor } from "../config";
import { useIntl } from "react-intl";
import { TabsType } from "../types";
import WarpDiv from "./style";
import TopNav from "../../components/TopNav";
import { inject, observer } from "mobx-react";
import { useMount } from "ahooks";
import {
  getOss,
  getUserInfo,
  quitLogin,
  updateUserAvatar,
  updateUserName,
  uploadImgToOss,
} from "../../service/user";
import { RemoveToken } from "../../utils/storageUtils";

const Item = List.Item;
const prompt = Modal.prompt;

const My = (props: any) => {
  const { history, GlobalStore } = props;
  const [selectedTab, setSelectedTab] = useState<TabsType>("My");
  const intl = useIntl();
  const { user, changeUser } = GlobalStore;
  useMount(async () => {
    try {
      const res: any = await getUserInfo();
      changeUser(res);
    } catch (e) {
      console.error(e);
    }
  });
  const handleQuit = useCallback(async () => {
    //退出登录
    try {
      await quitLogin();
      //清除localstorage中的token
      RemoveToken();
      Toast.success("退出登录成功", 1.5);
      history.push("/login");
    } catch (e) {
      console.error(e);
    }
  }, [history]);

  const handleChangeName = useCallback(() => {
    //弹出输入modal层
    prompt(
      "修改昵称",
      "",
      [
        { text: "取消" },
        {
          text: "修改",
          onPress: async (value) => {
            //执行修改昵称
            try {
              //发送网络请求更新昵称
              await updateUserName(value);
              //更新mobx
              changeUser({ ...user, name: value });
              Toast.success("更新成功", 1);
            } catch (e) {
              console.error(e);
            }
          },
        },
      ],
      "default",
      user.name
    );
  }, [changeUser, user]);

  const handleUploadImg = useCallback(
    async (e) => {
      //执行图片上传
      try {
        const { files } = e.target;
        if (files.length === 0) {
          Toast.info("请选择图片", 1);
          return;
        }
        //1、首先获取阿里云上传图片配置
        const oss: any = await getOss();
        //2、上传图片到阿里云oss并获取图片地址
        const file = files[0];
        const index = (file.name as string).lastIndexOf(".");
        const fileName = Date.now() + (file.name as string).slice(index);
        const formData = new FormData();
        const { dir, accessid, host, policy, signature } = oss;
        formData.append("key", dir + fileName);
        formData.append("OSSAccessKeyId", accessid);
        formData.append("policy", policy);
        formData.append("Signature", signature);
        formData.append("file", file);
        formData.append("success_action_status", "200"); //成功后返回的操作码
        const fileUrl = host + fileName;
        await uploadImgToOss(host, formData);
        //更新到数据库
        await updateUserAvatar(fileUrl);
        //更新到mobx
        changeUser({ ...user, avatar_url: fileUrl });
      } catch (e) {
        console.log(e);
      }
    },
    [changeUser, user]
  );

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
            history.push("/car");
          }}
        ></TabBar.Item>

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
            setSelectedTab("My");
          }}
        >
          <TopNav title="个人中心" onLeftClick={() => {}} />
          <div className="info-card-container">
            <div className="img-container">
              <img
                src={user.avatar_url}
                alt="用户头像"
                className="avatar"
                onClick={handleUploadImg}
              />
              <input
                type="file"
                accept="image/*"
                className="upload"
                onChange={handleUploadImg}
              ></input>
            </div>

            <div className="info-text">
              <div className="name" onClick={handleChangeName}>
                昵称：{user.name}
                <EditOutlined className="edit" />
              </div>
              <div className="email">登录名：{user.email}</div>
            </div>
          </div>
          <Item arrow="horizontal" onClick={() => {}}>
            我的收藏
          </Item>
          <Item
            arrow="horizontal"
            onClick={() => {
              history.push("/orders");
            }}
          >
            我的订单
          </Item>
          <Item arrow="horizontal" onClick={() => {}}>
            账号管理
          </Item>
          <Item
            arrow="horizontal"
            onClick={() => {
              history.push("/my/address");
            }}
          >
            地址管理
          </Item>
          <Item arrow="horizontal" onClick={() => {}}>
            关于我们
          </Item>
          <Button className="quit-btn" type="primary" onClick={handleQuit}>
            退出登录
          </Button>
        </TabBar.Item>
      </TabBar>
    </WarpDiv>
  );
};
//函数组件注入mobx，并且设置为观察者模式
export default inject("GlobalStore")(observer(My));
