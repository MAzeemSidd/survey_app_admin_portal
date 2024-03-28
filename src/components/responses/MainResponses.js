import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Drawer, Form, Input, Progress, Row, Select, Table, Tag, Typography } from 'antd'
import { getData } from '../../Services/NetworkService';
import { Pie } from '@ant-design/plots';
import StatsDrawer from './StatsDrawer';

const Responses = () => {
  const [form] = Form.useForm();
  const [statsDrawerVisibility, setStatsDrawerVisibility] = useState(false)
  const [projectList, setProjectList] = useState(null)
  const [project, setProject] = useState(null)
  const [employeeList, setEmployeeList] = useState(null)
  const [empResponses, setEmpResponses] = useState(null)
  // const [tableData, setTableData] = useState([
  //   {
  //     key: '1',
  //     clientName: 'HBL',
  //     surveyName: 'Organizational Performance Survey',
  //     question: 'What is flutter?',
  //     employeeName: 'M Hasnain',
  //     type: 'MULTIPLE',
  //     options: [{id: 1, option: 'Used for building web applications'}, {id: 2, option: 'Building Operating System'}, {id: 3, option: 'Used for building native mobile applications'}],
  //     answers: [{id: 3, answer: 'Used for building native mobile applications'}],
  //   },
  //   {
  //     key: '2',
  //     clientName: 'HBL',
  //     surveyName: 'Teamwork and Collaboration Survey',
  //     question: 'Why you choose to become a backend developer?',
  //     employeeName: 'Nayyar Abbas',
  //     type: 'TEXT',
  //     options: [],
  //     answers: [{id: 6, answer: 'I love to working with databases, APIs, and server-side technologies to handle data storage, processing, and retrieval'}],
  //   },
  //   {
  //     key: '3',
  //     clientName: '10 Pearls',
  //     surveyName: 'Teamwork and Collaboration Survey',
  //     question: 'What is flutter?',
  //     employeeName: 'M Umer Hayat',
  //     type: 'MULTIPLE',
  //     options: [{id: 1, option: 'Used for building web applications'}, {id: 2, option: 'Building Operating System'}, {id: 3, option: 'Used for building native mobile applications'}],
  //     answers: [{id: 3, answer: 'Used for building native mobile applications'}],
  //   },
  //   {
  //     key: '4',
  //     clientName: 'Virtuosoft',
  //     surveyName: 'Employee Career Development Survey',
  //     question: 'Why Javascript is used?',
  //     employeeName: 'Waqar Wicky',
  //     type: 'MULTIPLE',
  //     options: [{id: 1, option: 'Used for building web applications'}, {id: 2, option: 'Building Operating System'}, {id: 3, option: 'Used for building native mobile applications'}],
  //     answers: [{id: 1, answer: 'Used for building web applications'}, {id: 3, answer: 'Used for building native mobile applications'}],
  //   },
  //   {
  //     key: '5',
  //     clientName: 'Virtuosoft',
  //     surveyName: 'Performance Evaluation Survey',
  //     question: 'What is flutter?',
  //     employeeName: 'M Azeem',
  //     type: 'MULTIPLE',
  //     options: [{id: 1, option: 'Used for building web applications'}, {id: 2, option: 'Building Operating System'}, {id: 3, option: 'Used for building native mobile applications'}],
  //     answers: [{id: 1, answer: 'Used for building web applications'}, {id: 3, answer: 'Used for building native mobile applications'}],
  //   },
  //   {
  //     key: '6',
  //     clientName: 'Virtuosoft',
  //     surveyName: 'Performance Evaluation Survey',
  //     question: 'Are you a Java developer?',
  //     employeeName: 'Abdur Rahman Sami',
  //     type: 'BINARY',
  //     options: [{id: 4, option: 'Yes'}, {id: 5, option: 'No'}],
  //     answers: [{id: 5, answer: 'No'}],
  //   },
  // ])

  // const tagColor = {
  //   text: 'processing',
  //   multiple: 'cyan',
  //   binary: 'magenta',
  //   default: 'default'
  // }

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'employee',
      key: 'employee',
      width: 'auto',
      render: text => <div style={{lineHeight: 1}}><text style={{fontSize: 12, color: '#505050'}}>
          {text}</text>
        </div>,
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      width: 'auto',
      render: text => <div style={{lineHeight: 1}}><text style={{fontSize: 12, color: '#505050'}}>
          {text}</text>
        </div>,
    },
    {
      title: 'Survey',
      dataIndex: 'survey',
      key: 'survey',
      width: 'auto',
      render: text => <div style={{lineHeight: 1}}><text style={{fontSize: 12, color: '#505050'}}>
          {text}</text>
        </div>,
    },
    {
      title: 'Question',
      dataIndex: 'questionName',
      key: 'questionName',
      width: '25%',
      render: text => <div style={{lineHeight: 1}}><text style={{fontSize: 12, color: '#505050'}}>
          {text}</text>
        </div>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '6%',
      render: text => <div style={{fontSize: 9, color: '#505050', background: '#fff', lineHeight: 1.2,
        border: '.5px solid #606060', borderRadius: 3, padding: '.5px 3px 1px', display: 'inline-block'}}>
          {text?.toUpperCase()}
        </div>
    },
    {
      title: 'Options',
      dataIndex: 'options',
      key: 'options',
      width: '20%',
      render: (array,obj) => <td>{
        array ?
          obj?.type.toUpperCase() === 'BINARY' ?
          <text style={{fontSize: 12, color: '#505050', fontStyle: 'italic'}}>{'( Yes / No )'}</text>
          :
          array?.map(item=>
          <div key={item?.id} style={{marginBottom: 7, padding: '0 5px 3px', background: '#f0f0f0', borderRadius: 3, lineHeight: .1}}>
            <Typography.Text style={{fontSize: 12, color: '#505050', fontStyle: 'italic'}}>{item?.name}</Typography.Text>
          </div>)
        :
        <text style={{fontSize: 12, color: '#505050'}}>--</text>
      }</td>
    },
    {
      title: 'Answers',
      dataIndex: 'answer',
      key: 'answer',
      width: '20%',
      render: text => <div style={{lineHeight: 1, cursor: text ? 'pointer' : ''}}
        onClick={()=>{text && setStatsDrawerVisibility(true);}}>
          <Typography.Paragraph style={{fontSize: 12, color: '#505050', lineHeight: 1}}>
            {text ?? 'N/A'}
          </Typography.Paragraph>
        </div>,
      // render: array => <div>{array?.map(item=>
      //   <div key={item?.id} onClick={()=>setStatsDrawerVisibility(true)}
      //     style={{margin: 5, padding: '5px 10px 10px', background: '#c5d8e8', borderRadius: 3, lineHeight: 1, cursor: 'pointer'}}>
      //     <text style={{fontSize: 11, color: '#505050'}}>{item?.answer}</text>
      //   </div>
      // )}</div>
    },
  ];
  
  const getEmpResponsesReq = () => {
    getData('response')
    .then(res=>{console.log('Responses-Res', res?.data?.data?.content); setEmpResponses(res?.data?.data?.content)})
    .catch(e=>console.log('Responses-Err', e))
  }

  const getProjectsApi = () => {
    getData('projects')
     .then((res) => {
        let _projects = res?.data?.data?.content?.map(item=>({...item, value: item.name, label: item.name}))
        setProjectList(_projects)
        console.log('clients-res', res?.data?.data?.content);
     }).catch(e=>{
        console.log('clients-error', e);
     })
  }
  
  const getEmployeesApi = () => {
    getData(`projects/${project?.id}/subtasks`)
    .then(res=>{
      console.log('EmployeeList-Res', res?.data?.data?.content);
      let _employee = res?.data?.data?.content?.map(item=>({...item, value: item.name, label: item.name}))
      setEmployeeList(_employee)
    })
    .catch(e=>{console.log('EmployeeList-Error',e);})
  }


  useEffect(()=>{
    getProjectsApi();
    getEmpResponsesReq();
  }, [])
  
  useEffect(()=>{
    if(project) getEmployeesApi();
  },[project])
  

  const SearchForm = useMemo(() => (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        items: [{}],
      }}
      onFinish={(fields)=>{
        console.log('SearchField', fields)
      }}
    >
      <Row>
        <Col span={24}>
          <Card type='inner'>
            <Row>
              <Col><Typography.Title level={5} style={{color: '#808080', marginTop: 10}}>Search filter</Typography.Title></Col>
            </Row>
            <Row gutter={12}>
              <Col span={5}>
                <Form.Item name='project'>
                  <Select
                    showSearch
                    placeholder="Select a Project"
                    optionFilterProp="children"
                    size='middle'
                    onChange={(_, item)=>{console.log('Project-Selected',item); setProject(item);}}
                    filterOption={(input, option) => (option?.label.toUpperCase() ?? '').includes(input.toUpperCase())}
                    options={projectList ?? []}
                  />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item name='employee'>
                  <Select
                    showSearch
                    placeholder="Select an Employee"
                    optionFilterProp="children"
                    size='middle'
                    // onChange={(_, item)=>console.log(item)}
                    filterOption={(input, option) => (option?.label.toUpperCase() ?? '').includes(input.toUpperCase())}
                    options={employeeList ?? []}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name='question'>
                  <Input size='middle' placeholder='Enter Question' />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name='answer'>
                  <Input size='middle' placeholder='Enter Answer' />
                </Form.Item>
              </Col>
              <Col span={2}><Button type='primary' size='middle' htmlType='submit'>Search</Button></Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Form>
  ), [form, projectList, employeeList])

  return (
    <>
      <StatsDrawer open={statsDrawerVisibility} onClose={()=>setStatsDrawerVisibility(false)} />
      <Row style={{marginTop: 30, marginBottom: 15}}>
        <Col span={6}><Typography.Title level={3} style={{color: '#3C4B64',margin: 0}}>Responses</Typography.Title></Col>
      </Row>
      {SearchForm}
      <Row style={{marginTop: 20}}>
        <Col span={24}>
          <Card>
            <Row>
              <Col span={24}>
                <Table size='middle' columns={columns} dataSource={/*tableData*/empResponses ?? []} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Responses
