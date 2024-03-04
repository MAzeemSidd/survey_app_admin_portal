import React, { useMemo, useState } from 'react'
import { Button, Card, Col, Drawer, Form, Input, Row, Select, Space } from 'antd'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'

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

// const AddQuestions = () => {
//   return(<>
//     <Row gutter={16}>
//       <Col span={12}>
//         <Form.Item
//           name="question"
//           label="Question"
//           validateFirst
//           rules={[
//             {
//               required: true,
//               message: `Question is required`,
//             },
//           ]}
//         >
//           <Input placeholder="Enter name" />
//         </Form.Item>
//       </Col>
//       <Col span={12}>
//         <Form.Item name="description" label="Descrition">
//           <Input placeholder="Write description" />
//         </Form.Item>
//       </Col>
//     </Row>
//     <Row>
//       <Col><Button htmlType='submit'>Submit</Button></Col>
//     </Row>
//   </>)
// }

const AddQuestions = () => {
  return (
    <Form.List name="items">
      {(fields, { add, remove }) => (
        <div
          style={{
            display: 'flex',
            rowGap: 16,
            flexDirection: 'column',
          }}
        >
          {fields.map((field) => (
            <Card
              size="small"
              title={`Item ${field.name + 1}`}
              key={field.key}
              extra={
                fields.length > 1 &&
                <CloseOutlined onClick={() => {
                    remove(field.name);
                    console.log(fields.length)
                }}/>
              }
            >
              <Row>
                <Col span={6}>
                  <Form.Item label="Type" name={[field.name, 'type']}>
                    <Select
                      showSearch
                      placeholder="Select a person"
                      optionFilterProp="children"
                      onChange={val=>console.log('onSelect', val)}
                      filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase())}
                      options={[
                        {value: 'NUMBER', label: 'NUMBER'},
                        {value: 'TEXT', label: 'TEXT'},
                        {value: 'BINARY', label: 'BINARY'},
                        {value: 'MULTIPLE', label: 'MULTIPLE'},
                        {value: 'IMAGE', label: 'IMAGE'},
                        {value: 'DATE', label: 'DATE'},
                        {value: 'TIME', label: 'TIME'},
                        {value: 'DATE_TIME', label: 'DATE_TIME'},
                        {value: 'CAMERA', label: 'CAMERA'},
                        {value: 'LOCATION', label: 'LOCATION'},
                        {value: 'LOCATION_CAMERA', label: 'LOCATION_CAMERA'}
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item label="Question" name={[field.name, 'question']}>
                    <Input placeholder="Write a question you want to add" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          ))}

          <Button type="dashed" icon={<PlusOutlined />} onClick={() => add()} block>Add more Questions</Button>
        </div>
      )}
    </Form.List>
  );
}

const MainDrawer = ({open, onClose, title, submitFunction=()=>{}}) => {
  const [form] = Form.useForm();

  const formBody = useMemo(()=>{
    switch (title) {
      case 'Project':
        return <AddNewItemForm />
      case 'Task':
        return <AddNewItemForm />
      case 'Sub Task':
        return <AddNewItemForm />
      case 'Questions': 
        return <AddQuestions />
      default:
        return null;
    }
  },[])

  return (
    <Drawer
      title={`Add a ${title}`}
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
        initialValues={{
          items: [{}],
        }}
        onFinish={(value)=>{
          console.log(value)
          submitFunction(value);
          form.resetFields();
          onClose()
        }}  
      >
        {/* {(type === 'Project' || type === 'Task') && <AddNewItemForm />} */}
        {formBody}
      </Form>
    </Drawer>
  )
}

export default MainDrawer
