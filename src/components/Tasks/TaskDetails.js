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
  const [projectId, setProjectId] = useState(null)
  const [taskId, setTaskId] = useState(null)
  const [subTaskId, setSubTaskId] = useState(null)
  // const [title, setTitle] = useState(null);
  console.log('location', location.state)

  useEffect(()=>{
    // if(!title) setTitle(tabItems[0].label)
    if(location.pathname){
      const _route = location.pathname.split('/');
      var _projectId, _taskId, _subTaskId;
      if(_route[_route.length - 2] !== 'subtask') {
        _projectId = _route[_route.length - 3]
        _taskId = _route[_route.length - 1]
      } else {
        _projectId = _route[_route.length - 5]
        _taskId = _route[_route.length - 3]
        _subTaskId = _route[_route.length - 1]
      }
      setProjectId(_projectId)
      setTaskId(_taskId)
      setSubTaskId(_subTaskId)
    }
    if(location.state) {
      setSubTasks(location.state?.subTasks)
      setQuestions(location.state?.questions)
    } else {
      getData(`projects/${_projectId}/tasks`).then(res=>{
        console.log('tasks-res',res?.data?.data)
        const { subTasks, questions } = res?.data?.data?.filter(task=>task.id == _taskId)[0]
        setSubTasks(subTasks)
        setQuestions(questions)
      }).catch(e=>{
        console.log('tasks-error', e)
      })
    }
    return ()=>{
      setSubTasks(null)
      setQuestions(null)
    }
  },[location.state.subTasks, location.state.questions])

  // const tabItems = [
  //   {
  //     label: 'Sub Tasks',
  //     children: <SubTasks subTasks={subTasks} setOpen={()=>setDrawerVisibility(true)} />,
  //     icon: <AppstoreOutlined />,
  //   },
  //   {
  //     label: 'Questions',
  //     children: <Questions questions={questions} setOpen={()=>setDrawerVisibility(true)} />,
  //     icon: <QuestionCircleOutlined />,
  //   }
  // ]

  return (<>
    <Row gutter={[0,12]}>
      <Col span={24}>
        <Typography.Title level={3} style={{color: '#3C4B64'}}>
          {subTasks?.length !== 0 ? 'Sub Tasks' : 'Questions'}
        </Typography.Title>
      </Col>
      <Col span={24}>
          {
            subTasks?.length != 0 ?
              <SubTasks subTasks={subTasks} setOpen={()=>setDrawerVisibility(true)} projectId={projectId} taskId={taskId} />
              :
              <Questions questions={questions} setOpen={()=>setDrawerVisibility(true)} />
          }
          {/* <ConfigProvider
            theme={{
              components: {
                Tabs: {
                 cardBg: '#79869b',
                 itemSelectedColor: '#001529',
                 itemColor: '#c2cad6',
                 itemHoverColor: 'white',
                 itemActiveColor: 'golden'
                },
              },
              token: {
                colorBorderBg: 'black',
              }
            }}
          >
            <Tabs
              type="card"
              size='small'
              tabBarGutter={6}
              destroyInactiveTabPane={true}
              onChange={value=>setTitle(tabItems[value].label)}
              animated={{ inkBar: true, tabPane: true }}
              items={tabItems.map((item, i) => {
                return {
                  key: i,
                  label: item.label,
                  children: item.children,
                  icon: item.icon
                };
              })}
            />
          </ConfigProvider> */}
      </Col>
    </Row>
  </>)
}

export default TaskDetails

