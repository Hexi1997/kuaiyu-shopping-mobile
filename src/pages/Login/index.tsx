import React, { memo, useCallback, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import Form, { Field } from "rc-field-form";
import TopNav from "../../components/TopNav";
import WarpDiv from "./style";
import logo from "../../assets/logo_zh.png";
import { Button, InputItem, Toast } from "antd-mobile";
import { login, register } from "../../service/user";
import { SetToken } from "../../utils/storageUtils";
const Login = memo(({ history, location }: RouteComponentProps) => {
  const [type, setType] = useState<"login" | "register">("login");
  const [form] = Form.useForm();
  const handleSubmit = useCallback(async () => {
    let redirectName = location.state;

    console.log(form.getFieldsValue());
    //判断全部不能为空
    const values = form.getFieldsValue();

    //必填项校验
    if (!values.username) {
      Toast.fail(type === "register" ? "用户名不得为空!" : "邮箱不得为空!");
      return;
    }
    if (!values.password) {
      Toast.fail("密码不得为空!");
      return;
    }
    if (values.password.length < 6) {
      Toast.fail("密码至少6位!");
      return;
    }

    if (type === "login") {
      //登录
      try {
        const params = { email: values.username, password: values.password };
        const res = await login(params);
        SetToken((res as any).access_token);
        Toast.success("登录成功", 1);
        if (!redirectName) {
          redirectName = "/home";
        }
        console.log(redirectName);
        history.push(redirectName as string);
      } catch (e) {
        console.error(e);
      }
    } else {
      //注册
      if (!values.password_confirmation) {
        Toast.fail("确认密码不得为空!");
        return;
      }
      if (!values.email) {
        Toast.fail("邮箱不得为空!");
        return;
      }
      if (values.password_confirmation !== values.password) {
        Toast.fail("两次密码不一致!");
        return;
      }

      //邮箱格式校验
      const reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
      if (!reg.test(values.email)) {
        Toast.fail("邮箱格式不正确!");
        return;
      }

      //执行注册
      try {
        const params = {
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
          name: values.username,
        };
        await register(params);
        Toast.success("注册成功，请登录", 1);
        form.resetFields();
        setType("login");
      } catch (e) {
        console.error(e);
      }
    }
  }, [form, type, history, location.state]);

  const handleChangeType = useCallback(() => {
    //清空输入框
    form.resetFields();
    //更改类型
    if (type === "login") {
      setType("register");
    } else {
      setType("login");
    }
  }, [type, setType, form]);
  return (
    <WarpDiv style={{ height: window.innerHeight }}>
      <TopNav
        onLeftClick={() => {}}
        title={type === "login" ? "用户登录" : "用户注册"}
      />
      <img alt="logo图片" src={logo} className="logo" />
      <Form form={form}>
        <Field name="username">
          <InputItem placeholder={type === "login" ? "super@a.com" : "用户名"}>
            {type === "login" ? "邮箱" : "用户名"}
          </InputItem>
        </Field>
        <Field name="password">
          <InputItem
            placeholder={type === "login" ? "123123" : "密码"}
            type="password"
          >
            密码
          </InputItem>
        </Field>

        {type === "register" && (
          <Field name="password_confirmation">
            <InputItem placeholder="确认密码" type="password">
              确认密码
            </InputItem>
          </Field>
        )}
        {type === "register" && (
          <Field name="email">
            <InputItem placeholder="电子邮箱" type="text">
              电子邮箱
            </InputItem>
          </Field>
        )}

        <div onClick={handleChangeType} className="register">
          {type === "login" ? "立即注册" : "已有账号，立即登录"}
        </div>

        <Button
          type="primary"
          className="btn"
          onClick={handleSubmit}
          // disabled={type === "register"}
        >
          {type === "login" ? "登录" : "注册"}
        </Button>
      </Form>
    </WarpDiv>
  );
});

export default Login;
