import { AppstoreAddOutlined, DiffOutlined } from '@ant-design/icons'
import { Col, Row, Typography, Card, Space, Button, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import MainDrawer from '../MainDrawer'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getData } from '../../Services/NetworkService'
import SubTasks from './SubTasks'
import Questions from './Questions'

const TaskDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [subTasks, setSubTasks] = useState(null)
  const [questions, setQuestions] = useState(null)
  console.log('location', location.state)

  useEffect(()=>{
    if(location.state) {
      setSubTasks(location.state?.subTasks)
      setQuestions(location.state?.questions)
    } else {
      const _route = location.pathname.split('/');
      const _projectId = _route[_route.length - 2]
      const _taskId = _route[_route.length - 1]
      getData(`projects/${_projectId}/tasks`).then(res=>{
        console.log('tasks-res',res?.data?.data)
        const { subTasks, questions } = res?.data?.data?.filter(task=>task.id == _taskId)[0]
        setSubTasks(subTasks)
        setQuestions(questions)
      }).catch(e=>{
        console.log('tasks-error', e)
      })
    }
  },[])

  const tabItems = [
    {
      label: 'Sub Tasks',
      children: <SubTasks subTasks={subTasks} setOpen={()=>setDrawerVisibility(true)} />
    },
    {
      label: 'Questions',
      children: <Questions questions={questions} setOpen={()=>setDrawerVisibility(true)} />
    }
  ]

  return (<>
    <MainDrawer open={drawerVisibility} onClose={()=>setDrawerVisibility(false)} /*type='Task'*/ /*submitFunction={(value)=>setTaskData(prev=>([...prev, {...value, id: prev.length+1}]))}*/ />
    <Row gutter={[0,12]}>
      <Col span={24}><Typography.Title level={3} style={{color: '#3C4B64'}}>Sub Tasks</Typography.Title></Col>
      <Col span={24}>
        <Card size='small' type='inner' style={{background: '#eaeaf0'}}>
          <Tabs
            type="card"
            size='small'
            animated={{ inkBar: true, tabPane: false }}
            items={tabItems.map((item, i) => {
              return {
                label: item.label,
                key: i,
                children: item.children,
              };
            })}
          />
        </Card>
      </Col>
    </Row>
  </>)
}

export default TaskDetails

