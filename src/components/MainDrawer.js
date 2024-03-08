import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Drawer, Dropdown, Form, Input, Row, Select, Space } from 'antd'
import { CloseOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons'

const ProjectForm = ({data}) => {
  return(<>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="name" label="Name" initialValue={data?.name ?? null} validateFirst
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
        <Form.Item name="description" label="Descrition" initialValue={data?.description ?? null}>
          <Input placeholder="Write description" />
        </Form.Item>
      </Col>
    </Row>
  </>)
}

const TaskForm = ({data}) => {
  const type = [
    {value: 'SURVEY', label: 'SURVEY'},
    {value: 'ATTENDANCE', label: 'ATTENDANCE'}
  ];
  const repeatLevel = [
    {value: 'DAILY', label: 'DAILY'},
    {value: 'WEEKLY', label: 'WEEKLY'},
    {value: 'MONTHLY', label: 'MONTHLY'}
  ]
  console.log('TaskForm-data', data)
  return(<>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="name" label="Name" initialValue={data?.name ?? null} validateFirst
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
        <Form.Item name="description" label="Descrition" initialValue={data?.description ?? null}>
          <Input placeholder="Write description" />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label="Type" name='type' initialValue={data?.type ?? null}>
          <Select
            showSearch
            placeholder='Select a type'
            optionFilterProp="children"
            onChange={val=>console.log('onSelect', val)}
            filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase())}
            options={type}
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label="Repeat Level" name='repeatLevel' initialValue={data?.repeatLevel ?? null}>
          <Select
            showSearch
            placeholder='Set repeat level'
            optionFilterProp="children"
            onChange={val=>console.log('onSelect', val)}
            filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase())}
            options={repeatLevel}
          />
        </Form.Item>
      </Col>
    </Row>
  </>)
}

const SubTaskForm = ({data}) => {
  return(<>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="name" label="Name" initialValue={data?.name ?? null} validateFirst
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
        <Form.Item name="description" label="Descrition" initialValue={data?.description ?? null}>
          <Input placeholder="Write description" />
        </Form.Item>
      </Col>
    </Row>
  </>)
}

const QuestionForm = ({formType, data}) => {
  console.log('Data in QuestionForm', data, formType)
  const options = [
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
  ]
  return (
    <Row style={{marginBottom: 24}}>
      <Col span={24}>
        {formType === 'Edit' && <>
          {data && <Card size="small">
            <Row>
              <Col span={6}>
                <Form.Item label="Type" name='type' initialValue={data.type}>
                  <Select
                    showSearch
                    optionFilterProp="children"
                    onChange={val=>console.log('onSelect', val)}
                    filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase())}
                    options={options}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="Question" name='question' initialValue={data.question}>
                  <Input placeholder="Write a question you want to add" />
                </Form.Item>
              </Col>
            </Row>
          </Card>}
        </>}
          
          {formType === 'Add' &&
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
                      title={`Question ${field.name + 1}`}
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
                              placeholder="Select a type"
                              optionFilterProp="children"
                              onChange={val=>console.log('onSelect', val)}
                              filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase())}
                              options={options}
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
          }
      </Col>
    </Row>
  );
}

const MainDrawer = ({open, data=null, onClose, title, formType, submitFunction=()=>{}}) => {
  const [form] = Form.useForm();
  console.log('Main-FormData', data)
  const FormBody = useMemo(()=>{
    switch (title) {
      case 'Project':
        return <ProjectForm data={data} />
      case 'Task':
        return <TaskForm data={data} />
      case 'Sub-Task':
        return <TaskForm data={data} />
      case 'Question':
        return <QuestionForm formType={formType} data={data} />
      default:
        return null;
    }
  }, [formType, data])

  return (
    <Drawer
      title={`${formType} a ${title}`}
      width={720}
      onClose={()=>onClose(()=>form.resetFields())}
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
          submitFunction(value, ()=>form.resetFields());
        }}  
      >
        {FormBody}
        <Row>
          <Col><Button htmlType='submit'>Submit</Button></Col>
        </Row>
      </Form>
    </Drawer>
  )
}

export default MainDrawer
