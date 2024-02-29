import { AppstoreAddOutlined } from '@ant-design/icons'
import { Col, Row, Typography, Card, Space, Button } from 'antd'
// import Card from 'antd/es/card/Card'
import React, { useEffect, useState } from 'react'
import MainDrawer from '../MainDrawer'
import { useNavigate } from 'react-router-dom'
import { getData } from '../../Services/NetworkService'
import axios from 'axios'

const Projects = () => {
  const navigate = useNavigate();
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [projectData, setProjectData] = useState(/*[
    {id: 1, name: "Project 1", description: "Description"},
    {id: 2, name: "Project 2", description: "Description"},
    {id: 3, name: "Project 3", description: "Description"},
    {id: 4, name: "Project 4", description: "Description"},
    {id: 5, name: "Project 5", description: "Description"}
  ]*/)
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
      <MainDrawer open={drawerVisibility} onClose={()=>setDrawerVisibility(false)} type='Project' /*submitFunction={(value)=>setProjectData(prev=>([...prev, {...value, id: prev.length+1}]))}*/ />
      <Row gutter={[0,24]} style={{marginTop: 30, marginBottom: 15}}>
        <Col span={24}><Typography.Title level={3} style={{color: '#3C4B64',margin: 0}}>Projects</Typography.Title></Col>
        <Col span={24}><Button icon={<AppstoreAddOutlined />} onClick={()=>setDrawerVisibility(true)}>Add Project</Button></Col>
      </Row>
      <Row gutter={[24,24]}>
        {projectData?.map((item, index) => (
          <Col key={index} span={6}>
            <Card size='small' hoverable onClick={()=>navigate(`project/${item.id}`)}>
              <Typography.Text style={{fontSize: 16, fontWeight: 500, color: '#3C4B64'}}>{item.name}</Typography.Text>
              <Typography.Paragraph>
                <Typography.Text>{item.description}</Typography.Text>
              </Typography.Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Projects
