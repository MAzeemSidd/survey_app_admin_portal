import { AppstoreAddOutlined } from '@ant-design/icons'
import { Col, Row, Typography, Card, Space, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import MainDrawer from '../MainDrawer'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getData } from '../../Services/NetworkService'

const Tasks = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [tasks, setTasks] = useState()
  const [projectId, setProjectId] = useState()

  // useEffect(()=>{
  //   const _route = location.pathname.split('/');
  //   const id = _route[_route.length - 1]
  //   console.log(_route)
  //   console.log('searchparams', id)
  // },[])

  useEffect(()=>{
    const _route = location.pathname.split('/');
    const _projectId = _route[_route.length - 1]
    console.log(_route)
    console.log('searchparams', _projectId)
    getData(`projects/${_projectId}/tasks`).then(res=>{
      setTasks(res?.data?.data)
      setProjectId(_projectId)
      console.log('tasks-res',res?.data?.data)
    }).catch(e=>{
      console.log('tasks-error', e)
    })
  },[])

  return (
    <div>
      <MainDrawer open={drawerVisibility} onClose={()=>setDrawerVisibility(false)} type='Task' /*submitFunction={(value)=>setTaskData(prev=>([...prev, {...value, id: prev.length+1}]))}*/ />
      <Row gutter={[0,24]} style={{marginTop: 30, marginBottom: 15}}>
        <Col span={24}><Typography.Title level={3} style={{color: '#3C4B64',margin: 0}}>Tasks</Typography.Title></Col>
        <Col span={24}><Button icon={<AppstoreAddOutlined />} onClick={()=>setDrawerVisibility(true)}>Add Tasks</Button></Col>
      </Row>
      <Row gutter={[24,24]}>
        {tasks?.map((item, index) => (
          <Col key={index} span={6}>
            <Card size='small' hoverable onClick={()=>navigate(`/project-task-detail/${projectId}/${item.id}`, {state: {subTasks: item.subTasks, questions: item.questions}})}>
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

export default Tasks

