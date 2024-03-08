import React, { useState, useEffect } from 'react'
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Card, Col, Collapse, Row, Tag, Typography } from 'antd'
import { getData } from '../../Services/NetworkService'
import { useLocation } from 'react-router-dom'

const Tasks = () => {
  const location = useLocation()
  const [tasks, setTasks] = useState()
  const [projectId, setProjectId] = useState();
  
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

  return (<>
    <Row gutter={[0,24]} style={{marginTop: 30, marginBottom: 15}}>
      <Col span={24}><Typography.Title level={3} style={{color: '#3C4B64',margin: 0}}>Tasks</Typography.Title></Col>
    </Row>
    <Card size='small' type='inner' style={{minHeight: '63vh'}}>
      <Row gutter={[24,24]}>
        <Col span={24}><Button icon={<AppstoreAddOutlined />} onClick={()=>{}}>Add Tasks</Button></Col>
        <Col span={24}>
          {tasks?.map((item, index) => (
            <Collapse
                items={[
                {
                    key: index,
                    label: (
                    <Row>
                        <Col>
                        <Typography.Text ellipsis='true' style={{width: 500}}>{item.name}</Typography.Text>
                        </Col>
                    </Row>
                    ),
                    children: <p>Details</p>,
                    extra: (
                    <Row gutter={6}>
                        <Col><Button type='text' size='small' onClick={e=>{}}><EditOutlined /></Button></Col>
                        <Col><Button type='text' size='small' onClick={e=>{}}><DeleteOutlined /></Button></Col>
                    </Row>
                    )
                },
                ]}
            />
          ))}
        </Col>
      </Row>
    </Card>
  </>)
}

export default Tasks
