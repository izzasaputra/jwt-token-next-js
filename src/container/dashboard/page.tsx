"use client";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [getUserSuccess, setGetUserSuccess] = useState(false);
  const [getUserData, setGetUserData] = useState({ name: "", email: "" });
  const [viewForm, setViewForm] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (getUserData.name != "" && getUserData.email != "") setViewForm(true);
  }, [getUserSuccess]);

  const handleSubmitUpdateProfile = async (value: any) => {
    try {
      await axios.post("http://localhost:3000/api/updatename", value);
      setGetUserData({ ...getUserData, name: value.name });
    } catch (error) {
      console.error("failed", error);
    }
  };

  const handleUpdatePassword = async (value: any) => {
    try {
      await axios.post("http://localhost:3000/api/updatepassword", value);
    } catch (error) {
      console.error("failed", error);
    }
  };

  const getUser = async () => {
    try {
      const user = await axios.get("http://localhost:3000/api/user");
      setGetUserData(user.data.user);
      setGetUserSuccess(true);
    } catch (error) {
      console.error("get user failed", error);
    }
  };

  const onFinishProfile = (values: any) => {
    const payload = {
      name: values.username,
      email: values.email,
    };
    handleSubmitUpdateProfile(payload);
  };

  const onChangePassword = (values: any) => {
    handleUpdatePassword(values)
  };

  return (
    <div>
      {viewForm && (
        <>
          <h1>halo {getUserData.name}</h1>
          <h3>Ganti Profile</h3>
          <Form
            name="wrap"
            labelCol={{ flex: "110px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}
            onFinish={onFinishProfile}
          >
            <Form.Item
              label="nama"
              name="username"
              initialValue={getUserData.name}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="email"
              name="email"
              initialValue={getUserData.email}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item label=" ">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <h3>Ganti Password</h3>
          <Form
            name="wrap"
            labelCol={{ flex: "110px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}
            onFinish={onChangePassword}
          >
            <Form.Item
              label="password lama"
              name="oldpassword"
            >
              <Input.Password type="password"/>
            </Form.Item>

            <Form.Item
              label="password baru"
              name="newpassword"
            >
              <Input.Password type="password"/>
            </Form.Item>
            <Form.Item label=" ">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <br/>
          <h3 onClick={() => signOut()} style={{ color: "red" }}>
            sign out
          </h3>
          <br/>
        </>
      )}
    </div>
  );
}
