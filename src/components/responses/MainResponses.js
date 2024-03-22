import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Drawer, Form, Input, Row, Select, Table, Tag, Typography } from 'antd'
import { getData } from '../../Services/NetworkService';
import { Pie } from '@ant-design/plots';

const StatsDrawer = ({open, onClose}) => {
  const config = {
    data: [
      { type: 'Used for building web applications', value: 13 },
      { type: 'Building Operating System', value: 17 },
      { type: 'Used for building native mobile applications', value: 10 },
      { type: 'Used for hacking systems', value: 20 },
      { type: 'Used for building native', value: 12 },
      { type: 'Used for', value: 28 }
    ],
    angleField: 'value',
    colorField: 'type',
    // paddingRight: 140,
    // paddingLeft: 150,
    paddingTop: 50,
    innerRadius: 0.4, //set inner radius of chart
    radius: 0.7, //set radius(size) of chart
    label: {
      text: 'value', //label text
      // position: 'spider', //use to show labels with pointed lines
      style: {
        fontWeight: 'bold',
      },
    },
    legend: /*false,*/ //legends are the color indicator of labels, if false then will not be shown
    {
      color: {
        title: false,
        position: 'right',
        rowPadding: 1,
      },
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: 'Answer\nStats',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 25,
          // fontStyle: 'bold',
        },
      },
    ],
  };

  return(
    <Drawer
      title='Stats'
      width={720}
      onClose={onClose}
      open={open}
      // styles={{
      //   body: {
      //     paddingBottom: 80,
      //   },
      // }}
    >
      <Pie {...config} />
    </Drawer>
  )
}

const Responses = () => {
  const [form] = Form.useForm();
  const [statsDrawerVisibility, setStatsDrawerVisibility] = useState(false)
  const [projectList, setProjectList] = useState(null)
  const [project, setProject] = useState(null)
  const [employeeList, setEmployeeList] = useState(null)
  const [tableData, setTableData] = useState([
    {
      key: '1',
      question: 'What is flutter?',
      employeeName: 'M Hasnain',
      type: 'MULTIPLE',
      options: [{id: 1, option: 'Used for building web applications'}, {id: 2, option: 'Building Operating System'}, {id: 3, option: 'Used for building native mobile applications'}],
      answers: [{id: 3, answer: 'Used for building native mobile applications'}],
    },
    {
      key: '2',
      question: 'Why you choose to become a backend developer?',
      employeeName: 'Nayyar Abbas',
      type: 'MULTIPLE',
      options: [],
      answers: [{id: 6, answer: 'I love to working with databases, APIs, and server-side technologies to handle data storage, processing, and retrieval'}],
    },
    {
      key: '3',
      question: 'What is flutter?',
      employeeName: 'M Umer Hayat',
      type: 'MULTIPLE',
      options: [{id: 1, option: 'Used for building web applications'}, {id: 2, option: 'Building Operating System'}, {id: 3, option: 'Used for building native mobile applications'}],
      answers: [{id: 3, answer: 'Used for building native mobile applications'}],
    },
    {
      key: '4',
      question: 'Why Javascript is used?',
      employeeName: 'Waqar Wicky',
      type: 'MULTIPLE',
      options: [{id: 1, option: 'Used for building web applications'}, {id: 2, option: 'Building Operating System'}, {id: 3, option: 'Used for building native mobile applications'}],
      answers: [{id: 1, answer: 'Used for building web applications'}, {id: 3, answer: 'Used for building native mobile applications'}],
    },
    {
      key: '5',
      question: 'What is flutter?',
      employeeName: 'M Azeem',
      type: 'MULTIPLE',
      options: [{id: 1, option: 'Used for building web applications'}, {id: 2, option: 'Building Operating System'}, {id: 3, option: 'Used for building native mobile applications'}],
      answers: [{id: 1, answer: 'Used for building web applications'}, {id: 3, answer: 'Used for building native mobile applications'}],
    },
    {
      key: '6',
      question: 'Are you a Java developer?',
      employeeName: 'Abdur Rahman Sami',
      type: 'BINARY',
      options: [{id: 4, option: 'Yes'}, {id: 5, option: 'No'}],
      answers: [{id: 5, answer: 'No'}],
    },
  ])

  // const tagColor = {
  //   text: 'processing',
  //   multiple: 'cyan',
  //   binary: 'magenta',
  //   default: 'default'
  // }

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'employeeName',
      key: 'employeeName',
      // width: '12%',
      width: 'auto',
      render: text => <div style={{lineHeight: 1}}><text style={{fontSize: 11, color: '#505050'}}>{text}</text></div>,
      // ...getColumnSearchProps('name'),
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      // width: '23%',
      width: 'auto',
      render: text => <div style={{lineHeight: 1}}><text style={{fontSize: 11, color: '#505050'}}>{text}</text></div>,
      // ...getColumnSearchProps('age'),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      // width: '10%',
      width: 'auto',
      render: text => <Tag style={{fontSize: 9, color: '#505050', background: '#fff'}}>{text}</Tag>
    },
    {
      title: 'Options',
      dataIndex: 'options',
      key: 'options',
      width: '22%',
      render: (array,obj) => <div>{
        obj?.type === 'BINARY' ?
        <text style={{fontSize: 11, color: '#505050', fontStyle: 'italic'}}>{'( Yes / No )'}</text>
        :
        array?.map(item=>
        <div key={item?.id} style={{marginBottom: 7, padding: '0 5px 5px', background: '#f0f0f0', borderRadius: 3, lineHeight: 1}}>
          <text style={{fontSize: 11, color: '#505050', fontStyle: 'italic'}}>{item?.option}</text>
        </div>
      )}</div>
    },
    {
      title: 'Answers',
      dataIndex: 'answers',
      key: 'answers',
      width: '27%',
      render: array => <div>{array?.map(item=>
        <div key={item?.id} onClick={()=>setStatsDrawerVisibility(true)}
          style={{margin: 5, padding: '5px 10px 10px', background: '#c5d8e8', borderRadius: 3, lineHeight: 1, cursor: 'pointer'}}>
          <text style={{fontSize: 11, color: '#505050'}}>{item?.answer}</text>
        </div>
      )}</div>
      // ...getColumnSearchProps('address'),
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ['descend', 'ascend'],
    },
  ];
  
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
              <Col span={2}><Button size='middle' type='primary' htmlType='submit'>Search</Button></Col>
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
                <Table columns={columns} dataSource={tableData} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Responses
