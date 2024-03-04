import { AppstoreAddOutlined, AppstoreOutlined, DiffOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Col, Row, Typography, Card, Space, Button, Tabs, ConfigProvider } from 'antd'
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
  const [title, setTitle] = useState(null);
  console.log('location', location.state)

  useEffect(()=>{
    if(!title) setTitle(tabItems[0].label)
    if(location.state) {
      setSubTasks(location.state?.subTasks)
      setQuestions(location.state?.questions)
    } else {
      const _route = location.pathname.split('/');
      const _projectId = _route[_route.length - 3]
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
      children: <SubTasks subTasks={subTasks} setOpen={()=>setDrawerVisibility(true)} />,
      icon: <AppstoreOutlined />,
    },
    {
      label: 'Questions',
      children: <Questions questions={questions} setOpen={()=>setDrawerVisibility(true)} />,
      icon: <QuestionCircleOutlined />,
    }
  ]

  return (<>
    <Row gutter={[0,12]}>
      <Col span={24}><Typography.Title level={3} style={{color: '#3C4B64'}}>{title}</Typography.Title></Col>
      <Col span={24}>
        <Card size='small' type='inner' /*style={{background: '#eaeaf0'}}*/>
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                 cardBg: '#3C4B64',
                 itemActiveColor: '#001529',
                 itemColor: 'white',
                 itemSelectedColor: '#001529',
                 itemHoverColor: '#3367D1',
                },
              },
              token: {
                // colorBorder: '#808080'
                colorBorderBg: 'black'
              }
            }}
          >
            <Tabs
              type="card"
              size='small'
              tabBarGutter={12}
              destroyInactiveTabPane={true}
              onChange={value=>setTitle(tabItems[value].label)}
              animated={{ inkBar: true, tabPane: false }}
              items={tabItems.map((item, i) => {
                return {
                  key: i,
                  label: item.label,
                  children: item.children,
                  icon: item.icon
                };
              })}
            />
          </ConfigProvider>
        </Card>
      </Col>
    </Row>
  </>)
}

export default TaskDetails

