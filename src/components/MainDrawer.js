import React, { useState } from 'react'
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd'

const AddNewItemForm = () => {
  return(<>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="name"
          label="Name"
          validateFirst
          rules={[
            {
              required: true,
              message: `Name is required`,
            },
            {
              min: 5,
              message: 'At least 5 characters must be used',
            },
          ]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="description" label="Descrition">
          <Input placeholder="Write description" />
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col><Button htmlType='submit'>Submit</Button></Col>
    </Row>
  </>)
}

const MainDrawer = ({open, onClose, type, submitFunction=()=>{}}) => {
  const [form] = Form.useForm();

  return (
    <Drawer
      title={`Add a ${type}`}
      width={720}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(value)=>{
          console.log(value)
          submitFunction(value);
          form.resetFields();
          onClose()
        }}  
      >
        {(type === 'Project' || type === 'Task') && <AddNewItemForm />}
      </Form>
    </Drawer>
  )
}

export default MainDrawer
