"use client"
import React from "react";
import { Button, Form, Input } from "antd";
import styles from "./register.module.scss";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function RegisterContainer() {
  const router = useRouter();
  const handleSubmit = async (value: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        value
      );
      console.log("Registration successful", response.data);
      router.push("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const onFinish = (values: any) => {
    const payload = {
      name: values.username,
      email: values.email,
      password: values.password,
    };
    handleSubmit(payload);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card_container}>
        <Form
          {...layout}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            label="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            label="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
            <br />
          </Form.Item>
        </Form>
        <div>
          I have an account? <Link href="/login">login</Link>
        </div>
      </div>
    </div>
  );
};
