import React, { useState } from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_SERVER_URL + "login";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [rememberMe,setRememberMe] = useState(false);

  const handleCheckbox = (e) => {
    setRememberMe(!rememberMe);
    if(e.target.checked === false){
      localStorage.removeItem("remember");
      localStorage.removeItem("password");
      localStorage.removeItem("username");
    }
  }
  const onFinish = async (values) => {
    try {
      const response = await axios.post(url, {
        username: values.username,
        password: values.password,
      });
      console.log(values);
      const {token} = response.data;
      localStorage.setItem("jwtToken", token);
      if(rememberMe){
        localStorage.setItem("remember",values.remember);
        localStorage.setItem("username",values.username);
        localStorage.setItem("password",values.password);
      }
      notification.success({
        message: 'Login Success',
        description: 'You have successfully logged in.',
        placement:'top',
      });
      navigate('/home', { replace:true });
    } catch (error) {
      console.log("Invalid Username and Password!");
      setError("Invalid username or password. Please try again.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 500,
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
        }}
        initialValues={{
          remember: localStorage.getItem("remember") === "true" ? true : false,
          username:localStorage.getItem("username") || "",
          password:localStorage.getItem("password") || "",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>
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
          <Input/>
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
          <Input.Password/>
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox onChange={(e)=>handleCheckbox(e)}>Remember me</Checkbox>
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
    </div>
  );
}
