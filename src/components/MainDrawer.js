import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Drawer, Dropdown, Form, Input, InputNumber, Row, Select, Space } from 'antd'
import { CloseOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons'
import { postData, putData } from '../Services/NetworkService'

const ProjectForm = ({data}) => {
  return(<>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="name" label="Name" initialValue={data?.name ?? null} validateFirst
          rules={[
            {
              required: true,
              message: 'Name is required',
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

const TaskForm = ({data, title}) => {
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
              message: 'Name is required',
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
        <Form.Item name="description" label={title == 'Employee' ? "Designation" : "Description"} initialValue={data?.description ?? null}>
          <Input placeholder="Write description" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Type" name='type' initialValue={data?.type ?? null} validateFirst
          rules={[
            {
              required: true,
              message: 'Type must be selected',
            }
          ]}
        >
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
      <Col span={8}>
        <Form.Item label="Repeat Level" name='repeatLevel' initialValue={data?.repeatLevel ?? null}
          validateFirst
          rules={[
            {
              required: true,
              message: 'Repeat level must be defined',
            }
          ]}
        >
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

const SubTaskForm = ({data, title}) => {
  const gender = [
    {value: 'MALE', label: 'MALE'},
    {value: 'FEMALE', label: 'FEMALE'}
  ];
  console.log('TaskForm-data', data)
  return(<>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="name" label="Name" initialValue={data?.name ?? null} validateFirst
          rules={[
            {
              required: true,
              message: 'Name is required',
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
        <Form.Item name="description" label={title == 'Employee' ? "Designation" : "Description"} initialValue={data?.description ?? null}>
          <Input placeholder="Write description" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Gender" name='gender' initialValue={data?.gender ?? null} validateFirst
          rules={[
            {
              required: true,
              message: 'Please select a gender',
            }
          ]}
        >
          <Select
            showSearch
            placeholder='Select a gender'
            optionFilterProp="children"
            onChange={val=>console.log('onSelect', val)}
            filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase())}
            options={gender}
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Age" name='age' initialValue={data?.age ?? null}>
          <InputNumber min={1} max={100} placeholder='Enter age' />
        </Form.Item>
      </Col>
    </Row>
  </>)
}

const QuestionForm = ({formType, data}) => {
  const [selectedType, setSelectedType] = useState(data?.type ?? null)
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
        <Card size="small">
          <Row>
            <Col span={6}>
              <Form.Item label="Type" name='type' initialValue={data?.type ?? null} validateFirst
                rules={[
                  {
                    required: true,
                    message: 'Type must be selected',
                  }
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a type"
                  optionFilterProp="children"
                  onChange={val=>setSelectedType(val)}
                  filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase())}
                  options={options}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Question" name='question' initialValue={data?.question ?? null}
                validateFirst
                rules={[
                  {
                    required: true,
                    message: 'Question field must not be empty',
                  }
                ]}
              >
                <Input placeholder="Write a question you want to add" />
              </Form.Item>
            </Col>
          </Row>
          {selectedType === 'MULTIPLE' &&
            <Row>
              <Form.List name='options' initialValue={data?.options ?? []}>
                {(subFields, subOpt) => (
                  <Col span={24}>
                    {subFields.map((subField, index) => (
                      <Row gutter={3} align='middle' key={subField.key}>
                        <Col span={20}>
                          <Form.Item name={[subField.name, 'name']} label={`Option: ${index+1}`} initialValue={data?.options[index] ?? null}>
                            <Input placeholder="Write Something" />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <CloseOutlined onClick={() => {subOpt.remove(subField.name);}}/>
                        </Col>
                      </Row>
                    ))}
                    <Button type="dashed" onClick={() => subOpt.add()} block>
                      + Add Sub Item
                    </Button>
                  </Col>
                )}
              </Form.List>
          </Row>}
        </Card>
      </Col>
    </Row>
  );
}


const MainDrawer = ({open, data=null, projectId=null, taskId=null, onClose, title, formType, submitFunction=()=>{}}) => {
  const [form] = Form.useForm();
 
  const FormBody = useMemo(()=>{
    switch (title) {
      case 'Client':
        return <ProjectForm data={data} />
      case 'Survey':
        return <TaskForm data={data} title={title} />
      case 'Employee':
        return <SubTaskForm data={data} title={title} />
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
        onFinish={(fields)=>{
          console.log(fields)
          if(title == 'Question') {
            const options = fields?.options?.map(field => field);
            let newFields = fields.type == 'BINARY' ? 
            {...fields, options: [{name: "Yes"}, {name: "No"}]} 
            : 
            fields.type == 'MULTIPLE' ? {type: fields.type, question: fields.question, options: options}
            :
            fields
            // submitFunction(newFields, ()=>form.resetFields());
            if(newFields) {
              if(formType == 'Add') {
                postData(`projects/${projectId}/tasks/${taskId}/questions`, JSON.stringify(newFields))
                .then(res=>{
                  console.log('QuestionAdd-Res', res)
                  form.resetFields()
                  submitFunction()
                })
                .catch(e=>console.log('QuestionAdd-Error', e))
              }
              else if(formType == 'edit') {
                putData(`projects/${projectId}/tasks/${taskId}/questions/${data?.id}`, JSON.stringify({...data, ...newFields}))
                .then(res=>{
                  console.log('QuestionEdit-Res', res)
                  form.resetFields()
                  submitFunction()
                })
                .catch(e=>console.log('QuestionEdit-Error', e))
              }
            }
          }
          else if(title == 'Client') {

            if(formType == 'Add') {
              postData('projects', JSON.stringify(fields))
              .then(res=>{
                console.log('projectAdd-res', res)
                form.resetFields()
                submitFunction()
              })
              .catch(e=>console.log('projectAdd-error',e))
            }
            else if (formType == 'Edit') {
              putData(`projects/${data?.id}`, JSON.stringify({...fields, id: data?.id}))
              .then(res=>{
                console.log('projectAdd-res', res)
                form.resetFields()
                submitFunction()
              })
              .catch(e=>console.log('project-error',e))
            }

          }
          else if(title == 'Survey') {

            if(formType == 'Add') {
              postData(`projects/${projectId}/tasks`, JSON.stringify(fields))
              .then(res=>{
                console.log('taskAdd-res', res)
                form.resetFields()
                submitFunction()
              })
              .catch(e=>console.log('taskAdd-error',e))
            }
            else if(formType == 'Edit') {
              putData(`projects/${projectId}/tasks/${data?.id}`, JSON.stringify({...fields, id: data?.id}))
              .then(res=>{
                console.log('taskAdd-res', res)
                form.resetFields()
                submitFunction()
              })
              .catch(e=>console.log('taskAdd-error',e))
            }

          }
          else if(title == 'Employee') {

            if(formType == 'Add') {
              postData(`projects/${projectId}/tasks/${taskId}/subTasks`, JSON.stringify(fields))
              .then(res=>{
                console.log('SubtaskAdd-res', res)
                form.resetFields()
                submitFunction()
              })
              .catch(e=>console.log('taskAdd-error',e))
            }
            else if(formType == 'Edit') {
              putData(`subtasks/${data?.id}`, JSON.stringify({...fields, id: data?.id}))
              .then(res=>{
                console.log('SubtaskAdd-res', res)
                form.resetFields()
                submitFunction()
              })
              .catch(e=>console.log('taskAdd-error',e))
            }

          }
          else {
            submitFunction(fields, ()=>form.resetFields());
          }
        }}  
      >
        {FormBody}
        <Row style={{marginTop: 20}}>
          <Col><Button htmlType='submit'>Submit</Button></Col>
        </Row>
      </Form>
    </Drawer>
  )
}

export default MainDrawer
