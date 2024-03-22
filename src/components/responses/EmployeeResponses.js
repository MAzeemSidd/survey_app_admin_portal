import React, { useState, useEffect } from 'react'
import { AppstoreAddOutlined, CaretRightOutlined, DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Card, Col, Collapse, Form, Row, Select, Tag, Typography , Space, Table} from 'antd'
import { getData } from '../../Services/NetworkService'
import { useLocation } from 'react-router-dom'
import generatePDF, { Margin, Resolution } from 'react-to-pdf'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import dayjs from 'dayjs'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const AnswerTable = ({employeeData, surveyName, data}) => {
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
      dataIndex: 'answers',
      key: 'answers',
      width: '50%',
      render: (array) => <div>{array?.map(item=>
        <a key={item?.id} style={{color: '#000'}}>{item.answer}</a>
      )}</div>,
    },
  ];

  const pdfTableBody = data?.map(item=>(
  [ item?.question, item?.answers?.map((item,i,arr)=>item?.answer + (i == arr.length-1 ? '' : ',\n') )/*item?.answers?.map(item=>`${item?.answer}, `*/ ]
  ))

  return(<>
    <Row justify='end' style={{marginBottom: 10}}>
      <Col span={2}>
        <Button icon={<DownloadOutlined />} type='primary'
          onClick={()=>{
            const docDefinition = {
              content: [
                {
                  text: surveyName,
                  style: 'mainHeader'
                },
                {
                  style: "table",
                  table: {
                    widths: [180, 180, 200, 200],
                    heights: [5, 5, 5, 5],
                    body: [
                      [
                        {
                          border: [false, false, false, false],
                          style: 'subHeadingDiv',
                          text: [
                            { bold: false, text: "" },
                            { text: "Employee: ", style: 'subHeading'},
                            { text: employeeData.name, style: 'subHeadingEntry' }
                          ],
                        },
                        {
                          border: [false, false, false, false],
                          text: " ",
                        },
                        {
                          border: [false, false, false, false],
                          style: 'subHeadingDiv',
                          text: [
                            { bold: false, text: "" },
                            { text: "Date: ", style: 'subHeading' },
                            { text: dayjs(employeeData.createdOn).format('MMM DD, YYYY'), style: 'subHeadingEntry' }
                            // '\n',
                            // {text: "End Date: ", style: 'date'}
                          ],
                        },
                      ],
                    ],
                  },
                },
                {
                  layout: 'lightHorizontalLines',
                  table: {
                    headerRows: 1,
                    widths: [ '*', '*' ],
            
                    body: [
                      [ {text: 'Questions', style: 'cell'}, {text: 'Answers', style: 'cell'} ],
                      ...pdfTableBody
                    ]
                  }
                }
              ],
              styles: {
                mainHeader: {
                  fontSize: 30,
                  bold: true,
                  alignment: 'center',
                  marginBottom: 10
                },
                subHeadingDiv: {
                  marginTop: 20,
                  marginBottom: 10
                },
                subHeading: {
                  fontSize: 10
                },
                subHeadingEntry: {
                  bold: true,
                },
                table: {
                  marginBottom: 20
                },
                cell: {
                  alignment: 'center'
                }
              },
              defaultStyle: {
                color: '#303030'
              }
            }
            pdfMake.createPdf(docDefinition).open()
          }}>
            PDF
          </Button>
      </Col>
    </Row>
    <Table loading={data ? false : true} id='container' pagination={false} columns={columns} dataSource={data} size='small' />
  </>)
}

const EmployeeResponses = () => {
  const [project, setProject] = useState(null)
  const [projectList, setProjectList] = useState(null)
  const [employeeData, setEmployeeData] = useState(null)
  const [employeeList, setEmployeeList] = useState(null)
  const [employeeListDisabled, setEmployeeListDisabled] = useState(true)

  const getEmployeesApi = () => {
    getData(`projects/${project.id}/subtasks`)
    .then(res=>{
      console.log('EmployeeList-Res', res?.data?.data?.content);
      let _employee = res?.data?.data?.content?.map(item=>({...item, value: item.name, label: item.name}))
      setEmployeeList(_employee)
    })
    .catch(e=>{console.log('EmployeeList-Error',e);})
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

  const getEmployeeData = (id) => {
    getData(`subtasks/${id}`)
    .then(res=>{
      console.log('EmployeeData-Res',res?.data?.data?.content[0])
      setEmployeeData(res?.data?.data?.content[0])
    })
    .catch(e=>console.log('EmployeeData-Error',e))

  }

  useEffect(()=>{
    getProjectsApi()
  }, [])

  useEffect(()=>{
    if(project){
      // setEmployees([
      //   {value: 'Nayyar', label: 'Nayyar'},
      //   {value: 'Hasnain', label: 'Hasnain'},
      //   {value: 'Azeem', label: 'Azeem'},
      //   {value: 'Abdur Rahman', label: 'Abdur Rahman'},
      //   {value: 'Hamiz', label: 'Hamiz'},
      //   {value: 'Huzaifa', label: 'Huzaifa'}
      // ])
      getEmployeesApi()
      setEmployeeListDisabled(false)
    }
    return () => {setEmployeeList(null);}
  },[project])

  return (<>
    <Row style={{marginTop: 30, marginBottom: 15}}>
      <Col span={6}><Typography.Title level={3} style={{color: '#3C4B64',margin: 0}}>Employee Responses</Typography.Title></Col>
    </Row>

    <Row gutter={24}>
      <Col span={8}>
        <Form.Item label='Project' name='project'>
          <Select
            showSearch
            disabled={!projectList ? true : false}
            placeholder="Select a Project"
            optionFilterProp="children"
            onChange={(_, item)=>setProject(item)}
            filterOption={(input, option) => (option?.label.toUpperCase() ?? '').includes(input.toUpperCase())}
            options={/*[
              {value: 'VIRTUOSOFT', label: 'VIRTUOSOFT'},
              {value: '10 PEARLS', label: '10 PEARLS'},
              {value: 'NETSOL', label: 'NETSOL'}
            ]*/ projectList}
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
            onChange={(_, item)=>{console.log(item); getEmployeeData(item.id);}}
            filterOption={(input, option) => (option?.label.toUpperCase() ?? '').includes(input.toUpperCase())}
            options={employeeList ?? []}
          />
        </Form.Item>
      </Col>
    </Row>

    <Row>
      <Col span={24}>
        { employeeData &&
          <Row gutter={[0,24]}>
            <Col span={24}>
              <Card type='inner'>
                <Row>
                  <Col span={3}>Fullname:</Col>
                  <Col>{employeeData.name}</Col>
                </Row>
                <Row>
                  <Col span={3}>Age:</Col>
                  <Col>{employeeData.age}</Col>
                </Row>
                <Row>
                  <Col span={3}>Designation:</Col>
                  <Col>React front-end Developer</Col>
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
                    <Typography.Title style={{fontSize: 18}}>{project?.name}</Typography.Title>
                  </Col>

                  <Col span={24}>
                    <Row gutter={[0,24]}>
                      {
                        employeeData?.tasks?.map(item=>(
                          <Col span={24}>
                            <Card size='small' hoverable style={{border: '1px solid #e0e0e0'}}>
                              <Collapse
                                bordered={false}
                                defaultActiveKey={['1']}
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                // style={{
                                //   background: token.colorBgContainer,
                                // }}
                                items={[
                                  {
                                    key: '1',
                                    label: <Typography.Title style={{margin: 0, padding: 0, fontSize: 16}}>{item.name}</Typography.Title>,
                                    children: <AnswerTable employeeData={employeeData} surveyName={item?.name} data={item?.questions} />,
                                    style: {background: '#fff'},
                                  }
                                ]}
                              />
                            </Card>
                          </Col>
                        ))
                      }
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        }
      </Col>
    </Row>
  </>)
}

export default EmployeeResponses
