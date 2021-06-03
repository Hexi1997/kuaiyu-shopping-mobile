import React, { memo, useState, useCallback } from "react";
import TopNav from "../../components/TopNav";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button, InputItem, List, Picker, Switch, Toast } from "antd-mobile";
import cityjson from "../../assets/city.json";
import Form, { Field } from "rc-field-form";
import { useMount } from "ahooks";
import {
  addAddress,
  deleteAddress,
  setDefaultAddress,
  updateAddress,
} from "../../service/address";
const WarpDiv = styled.div`
  .btn-save,
  .btn-delete {
    margin: 2rem 1rem;
    border-radius: 3rem;
  }
`;

//将行政区划的json数据转换成我们需要的数据格式
const convertToPickerData = (districtData: any) => {
  let antdDistrict: any[] = [];
  Object.keys(districtData).forEach((index) => {
    let itemLevel1: any = {};
    let itemLevel2: any = {};
    itemLevel1.value = districtData[index].name;
    itemLevel1.label = districtData[index].name;
    itemLevel1.children = [];
    let data = districtData[index].cities;
    Object.keys(data).forEach((index) => {
      itemLevel2.value = data[index].name;
      itemLevel2.label = data[index].name;
      itemLevel2.children = [];
      let data2 = data[index].districts;
      let itemLevel3: any = {};
      itemLevel3.children = [];
      Object.keys(data2).forEach((index) => {
        itemLevel3.value = data2[index];
        itemLevel3.label = data2[index];
        itemLevel2.children.push(itemLevel3);
        itemLevel3 = {};
      });
      itemLevel1.children.push(itemLevel2);
      itemLevel2 = {};
    });
    antdDistrict.push(itemLevel1);
  });
  return antdDistrict;
};

const cityPickerData = convertToPickerData(cityjson);

const AddressAddOrUpdate = memo(() => {
  const history = useHistory();
  const { data, type } = history.location.state as any;
  //行政区划数据
  const [areaData, setAreaData] = useState<number[]>();
  //是否默认地址
  const [defaultChecked, setDefaultChecked] = useState<boolean>();
  const [form] = Form.useForm();

  //保存
  const handleSave = useCallback(async () => {
    const values = form.getFieldsValue();
    const params = {
      name: values.name,
      address: values.address,
      phone: values.phone.replaceAll(" ", ""),
      province: values.area[0],
      city: values.area[1],
      county: values.area[2],
      is_default: values.is_default ? 1 : 0,
    };
    if (type === "update") {
      try {
        await updateAddress(data.id, params);
        try {
          params.is_default === 1 && (await setDefaultAddress(data.id));
        } catch (e) {}

        Toast.success("更新成功!", 2);
        setTimeout(() => {
          history.goBack();
        }, 2000);
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await addAddress(params);
        Toast.success("添加成功!", 2);
        setTimeout(() => {
          history.goBack();
        }, 2000);
      } catch (e) {
        console.error(e);
      }
    }
  }, [form, data, history, type]);

  //删除
  const handleDelete = useCallback(async () => {
    try {
      await deleteAddress(data.id);
      Toast.success("删除成功!", 2);
      setTimeout(() => {
        history.goBack();
      }, 2000);
    } catch (e) {}
  }, [data, history]);

  //设置默认值
  useMount(() => {
    if (type === "update") {
      console.log(data);
      form.setFieldsValue({
        name: data.name,
        phone: data.phone,
        area: [data.province, data.city, data.county],
        address: data.address,
        is_default: data.is_default === 1 ? true : false,
      });
      if (data.is_default === 1) {
        setDefaultChecked(true);
      }
    }
  });

  return (
    <WarpDiv className="address">
      <TopNav title={type === "add" ? "添加地址" : "编辑地址"} />
      <Form form={form}>
        <Field name="name">
          <InputItem
            placeholder="请输入姓名"
            key={`${Math.floor(Math.random() * 1000)}-min`}
            type="text"
          >
            姓名
          </InputItem>
        </Field>
        <Field name="phone">
          <InputItem
            key={`${Math.floor(Math.random() * 1000)}-min`}
            placeholder="请输入电话"
            type="text"
          >
            电话
          </InputItem>
        </Field>
        <Field name="area">
          <Picker
            extra="请选择行政区划"
            data={cityPickerData || []}
            title="请选择行政区划"
            cols={3}
            value={areaData}
            key={`${Math.floor(Math.random() * 1000)}-min`}
            onOk={(e) => {
              setAreaData(e);
              console.log(e);
            }}
          >
            <List.Item arrow="horizontal">行政区划</List.Item>
          </Picker>
        </Field>
        <Field name="address">
          <InputItem
            placeholder="请输入详细地址"
            key={`${Math.floor(Math.random() * 1000)}-min`}
            type="text"
          >
            详细地址
          </InputItem>
        </Field>

        <List.Item
          key={`${Math.floor(Math.random() * 1000)}-min`}
          extra={
            <Field name="is_default">
              <Switch
                checked={defaultChecked}
                key={`${Math.floor(Math.random() * 1000)}-min`}
                onClick={(checked) => {
                  setDefaultChecked(checked);
                }}
              />
            </Field>
          }
        >
          设为默认收货地址
        </List.Item>
      </Form>
      <Button type="primary" className="btn-save" onClick={handleSave}>
        保存
      </Button>
      <Button type="warning" className="btn-delete" onClick={handleDelete}>
        删除
      </Button>
    </WarpDiv>
  );
});

export default AddressAddOrUpdate;
