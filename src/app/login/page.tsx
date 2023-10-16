"use client";
import React,{useState} from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import styles from "./login.module.scss";
import Link from "next/link";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation"; 

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const router= useRouter();
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const res = await signIn("credentials", {
      email:values.username,
      password:values.password,
      redirect: false,
    })
    if(res?.error) return setError(res.error);
    router.replace("/")

  };

  return (
    <div className={styles.container}>
      <div className={styles.card_container}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <br />
          Or <Link href="/register">register now!</Link>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default Login;
