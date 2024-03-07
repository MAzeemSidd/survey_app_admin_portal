import { AppstoreAddOutlined, MoreOutlined } from '@ant-design/icons'
import { Col, Row, Typography, Card, Space, Button, Dropdown } from 'antd'
// import Card from 'antd/es/card/Card'
import React, { useEffect, useState } from 'react'
import MainDrawer from '../MainDrawer'
import { useNavigate } from 'react-router-dom'
import { getData, postData, putData } from '../../Services/NetworkService'
import axios from 'axios'

const Projects = () => {
  const navigate = useNavigate();
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [editForm, setEditForm] = useState({visibility: false, data: null})
  const [projectData, setProjectData] = useState(null)
  console.log('projectData', projectData)

  useEffect(()=>{
    // axios.get(process.env.REACT_APP_SERVER_URL+'users',
    //  {
    //    headers: {
    //     'Content-Type':'application/json',
    //     'Authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c21hbiIsImV4cCI6MTcwOTEzNTkxMSwiaWF0IjoxNzA5MTE3OTExfQ.Oms1CLc-Cq8L-MiConQt7xd8gnQZB4dy4picdl2czS7Z3sO59qJ7WQE3R-qg9ty108-eT9huAt5fA5Xih6sCtw',
    //    }
    //  })
    getData('projects')
     .then((res) => {
        setProjectData(res?.data?.data)
        console.log('project-res', res?.data?.data);
     }).catch(e=>{
        console.log('project-error', e);
     })
  },[])

  return (
    <div>
      <MainDrawer open={drawerVisibility} formType='Add' onClose={()=>setDrawerVisibility(false)} title='Project' submitFunction={(fields, resetFields)=>{
        postData('projects', JSON.stringify(fields))
        .then(res=>{
          console.log('projectAdd-res', res)
          getData('projects')
          .then((res) => {
              setProjectData(res?.data?.data)
              console.log('project-res', res?.data?.data);
          }).catch(e=>{
              console.log('project-error', e);
          })
          resetFields()
          setDrawerVisibility(false)
        })
        .catch(e=>console.log('projectAdd-error',e))
      }} />

      {editForm.data && <MainDrawer open={editForm.visibility} data={editForm.data} title='Project' formType='Edit'
        onClose={(resetFields)=>{
          resetFields();
          setEditForm(prev=>({...prev, visibility: false, data: null}));
        }}
        submitFunction={(fields, resetFields)=>{
          putData(`projects/${editForm?.data?.id}`, JSON.stringify({...fields, id: editForm?.data?.id}))
          .then(res=>{
            console.log('projectAdd-res', res)
            getData('projects')
            .then((res) => {
                setProjectData(res?.data?.data)
                console.log('project-res', res?.data?.data);
            }).catch(e=>{
                console.log('project-error', e);
            })
            resetFields()
            setEditForm(prev=>({...prev, visibility: false, data: null}));
          })
          .catch(e=>console.log('project-error',e))
        }}
      />}

      <Row gutter={[0,24]} style={{marginTop: 30, marginBottom: 20}}>
        <Col span={24}><Typography.Title level={3} style={{color: '#3C4B64',margin: 0}}>Projects</Typography.Title></Col>
        <Col span={24}><Button icon={<AppstoreAddOutlined />} onClick={()=>setDrawerVisibility(true)}>Add Project</Button></Col>
      </Row>
      <Row gutter={[12,12]}>
        {projectData?.map((item, index) => (
          <Col key={index} span={6}>
            <Card size='small' style={{border: '.5px solid #e0e0e0', height: 110}} hoverable onClick={()=>navigate(`/project/${item.id}`)}>
              <Row>
                <Col span={22}>
                  <Typography.Text ellipsis={true} style={{fontSize: 16, fontWeight: 500, color: '#3C4B64'}}>{item.name}</Typography.Text>
                </Col>
                <Col span={2}>
                  <Dropdown
                    menu={{
                      items: [
                        {key: 0, label: <Button type='link' size='small' style={{color: '#000'}}
                          onClick={e=>{e.stopPropagation(); setEditForm(prev=>({...prev, visibility: true, data: item}));}}>Edit Project</Button>},
                        {key: 1, label: <Button type='link' size='small' style={{color: '#f00'}} onClick={e=>{e.stopPropagation();}}>Delete Project`</Button>}
                      ]
                    }}
                    // trigger={['click']}
                  >
                    <Button type='text' size='middle' shape='circle' onClick={e=>{e.stopPropagation();}}><MoreOutlined style={{fontSize: 16}} /></Button>
                  </Dropdown>
                </Col>
                <Col>
                  <Typography.Paragraph ellipsis={{ rows: 2 }}>
                    <Typography.Text style={{fontSize: 10}}>{item.description}</Typography.Text>
                  </Typography.Paragraph>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Projects
