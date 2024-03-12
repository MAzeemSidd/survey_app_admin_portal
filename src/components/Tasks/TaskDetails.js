import { AppstoreAddOutlined, AppstoreOutlined, DiffOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Col, Row, Typography, Card, Space, Button, Tabs, ConfigProvider } from 'antd'
import React, { useEffect, useState } from 'react'
import MainDrawer from '../MainDrawer'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getData, postData, putData } from '../../Services/NetworkService'
import SubTasks from './SubTasks'
import Questions from './Questions'

const TaskDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [subTaskForm, setSubTaskForm] = useState(false);
  const [questionForm, setQuestionForm] = useState(false)
  const [subTasks, setSubTasks] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [projectId, setProjectId] = useState(null)
  const [taskId, setTaskId] = useState(null)
  const [subTaskId, setSubTaskId] = useState(null)
  // const [title, setTitle] = useState(null);

  const getSubTasksandQuestions = (_projectId, _taskId) => {
    console.log('getSUbTasksandQuestions', _projectId, taskId)
    getData(`projects/${_projectId}/tasks`).then(res=>{
      console.log('tasks-res-GET',res?.data?.data)
      const { subTasks, questions } = res?.data?.data?.filter(task=>task.id == _taskId)[0]
      setSubTasks(subTasks)
      setQuestions(questions)
    }).catch(e=>{
      console.log('tasks-error', e)
    })
  }
  console.log('SUBTASKS&QUESTIONS', subTasks, questions)

  const getQuestionsOfSubtasks = (_projectId, _taskId, _subTaskId) => {
    console.log('getSUbTasksandQuestions', _projectId, taskId)
    getData(`projects/${_projectId}/tasks`).then(res=>{
      console.log('tasks-res',res?.data?.data)
      const task = res?.data?.data?.filter(task=>task.id == _taskId)[0]
      const questions = task?.subTasks?.filter(task=>task.id == _subTaskId)[0].questions
      setQuestions(questions)
    }).catch(e=>{
      console.log('tasks-error', e)
    })
  }

  // const getQuestions = () => {
  //   getData(`projects/${projectId}/tasks/${taskId}/questions`)
  //   .then(res=>{console.log('question-res'); setQuestions(res?.data?.data);}).catch(e=>console.log('Question-Error'))
  // } 

  useEffect(()=>{
    if(projectId && taskId) {
      if(!subTaskId) {
        getSubTasksandQuestions(projectId, taskId)
      } else {
        getQuestionsOfSubtasks(projectId, taskId, subTaskId)
      }
    }
  },[projectId, taskId, subTaskId])

  console.log('Location.path',location.pathname)
  console.log('Location.state',location.state)
  useEffect(()=>{
    console.log('UseEffect---------')
    if(location.pathname){
      const _route = location.pathname.split('/');
      var _projectId, _taskId, _subTaskId;
      if(_route[_route.length - 2] !== 'subtask') {
        _projectId = parseInt(_route[_route.length - 3])
        _taskId = parseInt(_route[_route.length - 1])
        _subTaskId = null
      } else {
        _projectId = parseInt(_route[_route.length - 5])
        _taskId = parseInt(_route[_route.length - 3])
        _subTaskId = parseInt(_route[_route.length - 1])
      }
      setProjectId(_projectId)
      setTaskId(_taskId)
      setSubTaskId(_subTaskId)
    }
    return ()=>{
      setSubTasks(null)
      setQuestions(null)
      setProjectId(null)
      setTaskId(null)
      setSubTaskId(null)
    }
  },[location.pathname])

  // useEffect(()=>{
  //   // if(!title) setTitle(tabItems[0].label)
  //   if(location.state) {
  //     setSubTasks(location.state?.subTasks)
  //     setQuestions(location.state?.questions)
  //   }
  //   return ()=>{
  //     setSubTasks(null)
  //     setQuestions(null)
  //   }
  // },[location?.state?.subTasks, location?.state?.questions])

  return (<>
    <MainDrawer open={subTaskForm} onClose={()=>setSubTaskForm(false)} title='Sub-Task' formType='Add'
      submitFunction={(fields, resetFields)=>{
        postData(`projects/${projectId}/tasks/${taskId}/subtasks`, JSON.stringify(fields))
        .then(res=>{
          console.log('taskAdd-res', res)
          getSubTasksandQuestions(projectId, taskId)
          setSubTaskForm(false)
          resetFields()
        })
        .catch(e=>console.log('taskAdd-error',e))
      }}
    />
    <MainDrawer open={questionForm} title='Question' formType='Add'
      onClose={(resetFields)=>{
        resetFields();
        setQuestionForm(false)
      }}
      submitFunction={(fields, resetFields)=>{
        let newFields = fields
        fields.type == 'BINARY' ? newFields = {...fields, options: ["Yes", "No"]} : newFields = fields
        console.log('newFields', newFields)
        postData(`projects/${projectId}/tasks/${taskId}/questions`, JSON.stringify(newFields))
        .then(res=>{
          console.log('QuestionAdd-Res', res)
          resetFields()
          setQuestionForm(false)
          getSubTasksandQuestions(projectId, taskId)
        })
        .catch(e=>console.log('QuestionAdd-Error', e))
      }}
    />
    <Row gutter={[0,12]}>
      <Col span={24}>
        <Typography.Title level={3} style={{color: '#3C4B64'}}>
          {subTaskId ? 'Questions' : (subTasks?.length !== 0 ? 'Sub Tasks' : questions?.length != 0 ? 'Questions' : 'Task Detail')}
        </Typography.Title>
      </Col>
      <Col span={24}>
          {/* {
            subTasks?.length != 0 ?
              <SubTasks subTasks={subTasks} setOpen={()=>setSubTaskForm(true)} projectId={projectId} taskId={taskId} />
              :
              questions?.length != 0 ?
                <Questions questions={questions} projectId={projectId} taskId={taskId} getQuestions={()=>getQuestions(projectId, taskId)} />
                :
                subTasks?.length == 0 && questionForm?.length == 0 && <>
                  <Card size='small' type='inner' style={{minHeight: '63vh'}}>
                    <Row gutter={12} style={{margin: '15px 0'}}>
                      <Col><Button icon={<AppstoreAddOutlined />} onClick={()=>setSubTaskForm(true)}>Add Sub-Tasks</Button></Col>
                      <Col><Button icon={<DiffOutlined />} onClick={()=>setQuestionForm(true)}>Add Questions</Button></Col>
                    </Row>
                  </Card>
                </>
              } */}
          {
            subTaskId ?
            <Questions questions={questions} projectId={projectId} taskId={subTaskId} getSubTasksandQuestions={()=>getQuestionsOfSubtasks(projectId, taskId, subTaskId)} />
            :
            (
              subTasks?.length == 0 && questions?.length == 0 ?
              <Card size='small' type='inner' style={{minHeight: '63vh'}}>
                <Row gutter={12} style={{margin: '15px 0'}}>
                  <Col><Button icon={<AppstoreAddOutlined />} onClick={()=>setSubTaskForm(true)}>Add Sub-Tasks</Button></Col>
                  <Col><Button icon={<DiffOutlined />} onClick={()=>setQuestionForm(true)}>Add Questions</Button></Col>
                </Row>
              </Card>
              :
              subTasks?.length != 0 ?
                <SubTasks subTasks={subTasks} setOpen={()=>setSubTaskForm(true)} projectId={projectId} taskId={taskId} getSubTasksandQuestions={()=>getSubTasksandQuestions(projectId, taskId)} />
                :
                <Questions questions={questions} projectId={projectId} taskId={taskId} getSubTasksandQuestions={()=>getSubTasksandQuestions(projectId, taskId)} />
            )  
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

// subtask:[
//   ...
//   questions:[
//     ...
//   ]
// ]