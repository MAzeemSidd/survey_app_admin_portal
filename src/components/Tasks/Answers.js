import React, { useState, useEffect } from 'react'
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Card, Col, Collapse, Form, Row, Select, Tag, Typography , Space, Table} from 'antd'
import { getData } from '../../Services/NetworkService'
import { useLocation } from 'react-router-dom'

const AnswerTable = () => {
  const columns = [
    {
      title: 'Questions',
      dataIndex: 'question',
      key: 'question',
      width: '50%',
      render: (text) => <a style={{color: '#000'}}>{text}</a>,
    },
    {
      title: 'Answers',
      dataIndex: 'answer',
      key: 'answer',
      width: '50%',
      render: (text) => <a style={{color: '#808080'}}>{text}</a>,
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size='small'>
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];
  const data = [
    {
      key: '1',
      question: 'What is your name',
      answer: 'Nayyar',
    },
    {
      key: '2',
      question: 'Have you ever been diagnosed with a mental health disorder?',
      answer: 'Yes, last year.',
    },
    {
      key: '3',
      question: 'Are you currently receiving treatment or therapy for any mental health issues?',
      answer: 'Not currently',
    },
    {
      key: '4',
      question: 'Have you ever experienced suicidal thoughts or attempted suicide?',
      answer: 'Once in a weak. I am very depressed now a days',
    },
    {
      key: '5',
      question: 'Do you often experience feelings of sadness, anxiety, or hopelessness?',
      answer: 'Always',
    },
    {
      key: '6',
      question: 'Do you feel supported by friends and family members?',
      answer: 'No, they are very selfish',
    },
  ];
  return(
    <Table pagination={false} columns={columns} dataSource={data} size='small' />
  )
}

const Answers = () => {
  const [project, setProject] = useState(null)
  const [employees, setEmployees] = useState(null)
  const [employeeListDisabled, setEmployeeListDisabled] = useState(true)

  const getEmployees = () => {
    getData('tasks/employees')
    .then(res=>{
      let _employee = res?.data?.data?.map(item=>({value: item.name, label: item.name}))
      console.log('Employee-Res',_employee, res);
      setEmployees(_employee)
    })
    .catch(e=>{console.log('Employee-Error',e);})
  }

  console.log('employees', employees, employeeListDisabled)
  useEffect(()=>{
    if(project){
      setEmployees([
        {value: 'Nayyar', label: 'Nayyar'},
        {value: 'Hasnain', label: 'Hasnain'},
        {value: 'Azeem', label: 'Azeem'},
        {value: 'Abdur Rahman', label: 'Abdur Rahman'},
        {value: 'Hamiz', label: 'Hamiz'},
        {value: 'Huzaifa', label: 'Huzaifa'}
      ])
      setEmployeeListDisabled(false)
    }
    return () => {setEmployees(null);}
  },[project])

  return (<>
    <Row style={{marginTop: 30, marginBottom: 15}}>
      <Col span={6}><Typography.Title level={3} style={{color: '#3C4B64',margin: 0}}>Answers</Typography.Title></Col>
    </Row>

    <Row gutter={24}>
      <Col span={8}>
        <Form.Item label='Project' name='project'>
          <Select
            showSearch
            placeholder="Select an Project"
            optionFilterProp="children"
            onChange={val=>setProject(val)}
            filterOption={(input, option) => (option?.label.toUpperCase() ?? '').includes(input.toUpperCase())}
            options={[
              {value: 'VIRTUOSOFT', label: 'VIRTUOSOFT'},
              {value: '10 PEARLS', label: '10 PEARLS'},
              {value: 'NETSOL', label: 'NETSOL'}
            ]}
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label='Employee' name='employee'>
          <Select
            disabled={employeeListDisabled}
            showSearch
            placeholder="Select an Employee"
            optionFilterProp="children"
            onChange={val=>console.log(val)}
            filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase())}
            options={employees ?? []}
          />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={[0,24]}>
      <Col span={24}>
        <Card type='inner'>
          <Row>
            <Col span={3}>Fullname:</Col>
            <Col>Nayyar Abbas</Col>
          </Row>
          <Row>
            <Col span={3}>Age:</Col>
            <Col>24</Col>
          </Row>
          <Row>
            <Col span={3}>Designation:</Col>
            <Col>Java Backend Developer</Col>
          </Row>
          <Row>
            <Col span={3}>Experience:</Col>
            <Col>1+ year</Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card type='inner'>
          <Row gutter={[0,24]}>
            <Col span={24}>
              <Typography.Title style={{fontSize: 18}}>Project Name</Typography.Title>
            </Col>

            <Col span={24}>
              <Row gutter={[0,24]}>
                <Col span={24}>
                  <Card size='small' hoverable style={{border: '1px solid #e0e0e0'}}>
                    <Collapse
                      bordered={false}
                      defaultActiveKey={['1']}
                      expandIcon={()=><></>}
                      // style={{
                      //   background: token.colorBgContainer,
                      // }}
                      items={[
                        {
                          key: '1',
                          label: <Typography.Title style={{margin: 0, padding: 0, fontSize: 16}}>Survey Name 1</Typography.Title>,
                          children: <AnswerTable/>,
                          style: {background: '#fff'},
                        }
                      ]}
                    />
                  </Card>
                </Col>

                <Col span={24}>
                  <Card size='small' hoverable style={{border: '1px solid #e0e0e0'}}>
                    <Collapse
                      bordered={false}
                      // defaultActiveKey={['1']}
                      expandIcon={()=><></>}
                      // style={{
                      //   background: token.colorBgContainer,
                      // }}
                      items={[
                        {
                          key: '1',
                          label: <Typography.Title level={5} style={{margin: 0, padding: 0, fontSize: 16}}>Survey Name 2</Typography.Title>,
                          children: <AnswerTable/>,
                          style: {background: '#fff'},
                        }
                      ]}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </>)
}

export default Answers
