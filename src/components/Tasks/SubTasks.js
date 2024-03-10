import React, { useState } from 'react'
import { Button, Card, Col, Row, Typography } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
import MainDrawer from '../MainDrawer'
import { useNavigate } from 'react-router-dom'
import { postData } from '../../Services/NetworkService'

const SubTasks = ({subTasks, projectId, taskId, getSubTasksandQuestions}) => {
  console.log('--------Sub Tasks--------')
  const navigate = useNavigate()
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  return (<>
    <MainDrawer open={drawerVisibility} title='Sub-Task' formType='Add'
      onClose={()=>setDrawerVisibility(false)}
      submitFunction={(fields, resetFields)=>{
        postData(`projects/${projectId}/tasks`, JSON.stringify({...fields, parent: taskId}))
        .then(res=>{
          console.log('taskAdd-res', res)
          getSubTasksandQuestions()
          setDrawerVisibility(false)
          resetFields()
        })
        .catch(e=>console.log('taskAdd-error',e))
      }}
    />
    <Card size='small' type='inner' style={{minHeight: '63vh'}}>
      <Row style={{margin: '15px 0'}}>
        <Col span={24}><Button icon={<AppstoreAddOutlined />} onClick={()=>setDrawerVisibility(true)}>Add Sub Tasks</Button></Col>
      </Row>
      <Row gutter={[24,24]}>
        {subTasks?.sort((a, b) => a.id - b.id).map(item => (
          <Col key={item.id} span={6}>
            <Card size='small' style={{border: '.5px solid #e0e0e0'}} hoverable onClick={()=>navigate(`/project/${projectId}/task/${taskId}/subtask/${item.id}`, {state: {subTasks: item.subTasks, questions: item.questions}})}>
              <Typography.Text style={{fontSize: 16, fontWeight: 500, color: '#3C4B64'}}>{item.name}</Typography.Text>
              <Typography.Paragraph>
                <Typography.Text>{item.description}</Typography.Text>
              </Typography.Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  </>)
}

export default SubTasks
