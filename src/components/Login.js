import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const url = process.env.REACT_APP_SERVER_URL + "login";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    try {
      
      const response = await axios.post(url, {
        username: values.username,
        password: values.password,
      });
      const token = response.data.token;
      localStorage.setItem("jwtToken", token);
      navigate('/home')
    } catch (error) {
      console.log("Invalid Username and Password!");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h2 style={{marginLeft:350}}>Login</h2>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
