import React, { useState } from 'react'
import { Button, Card, Col, Row, Typography } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
import MainDrawer from '../MainDrawer'
import { useNavigate } from 'react-router-dom'
import { deleteData, postData, putData } from '../../Services/NetworkService'
import OptionsDropdown from '../others/OptionsDropdown'
import { optionsModal } from '../../functions/optionsModal'
import { openNotification } from '../../functions/openNotification'

const SubTasks = ({subTasks, projectId, taskId, getSubTasksandQuestions}) => {
  console.log('--------Sub Tasks--------')
  const navigate = useNavigate()
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  const [editForm, setEditForm] = useState({visibility: true, data: null})
  return (<>
    <MainDrawer open={drawerVisibility} title='Employee' formType='Add'
      onClose={(resetFields)=>{
        resetFields()
        setDrawerVisibility(false)
      }}
      submitFunction={(fields, resetFields)=>{
        postData(`projects/${projectId}/tasks/${taskId}/subtasks`, JSON.stringify(fields))
        .then(res=>{
          console.log('SubtaskAdd-res', res)
          getSubTasksandQuestions()
          setDrawerVisibility(false)
          resetFields()
        })
        .catch(e=>console.log('taskAdd-error',e))
      }}
    />
    {editForm.data && <MainDrawer open={editForm.visibility} data={editForm.data} title='Employee' formType='Edit'
        onClose={(resetFields)=>{
          resetFields();
          setEditForm(prev=>({...prev, visibility: false, data: null}));
        }}
        submitFunction={(fields, resetFields)=>{
          putData(`projects/${projectId}/tasks/${editForm?.data?.id}`, JSON.stringify({...fields, id: editForm?.data?.id}))
          .then(res=>{
            console.log('SubtaskAdd-res', res)
            getSubTasksandQuestions()
            resetFields()
            setEditForm(prev=>({...prev, visibility: false, data: null}));
          })
          .catch(e=>console.log('taskAdd-error',e))
        }}
      />}
    <Card size='small' type='inner' style={{minHeight: '63vh'}}>
      <Row style={{margin: '15px 0'}}>
        <Col span={24}><Button icon={<AppstoreAddOutlined />} onClick={()=>setDrawerVisibility(true)}>Add Employee</Button></Col>
      </Row>
      <Row gutter={[24,24]}>
        {subTasks?.sort((a, b) => a.id - b.id).map(item => (
          <Col key={item.id} span={8}>
            <Card size='small' style={{border: '.5px solid #e0e0e0', height: 110}} hoverable onClick={()=>navigate(`/client/${projectId}/survey/${taskId}/employee/${item.id}`/*, {state: {subTasks: item.subTasks, questions: item.questions}}*/)}>
            <Row>
              <Col span={22}>
                <Typography.Text ellipsis={true} style={{fontSize: 16, fontWeight: 500, color: '#3C4B64'}}>{item.name}</Typography.Text>
              </Col>
              <Col span={2}>
                <OptionsDropdown
                  onEdit={()=>setEditForm(prev=>({...prev, visibility: true, data: item}))}
                  onDelete={()=>optionsModal(
                    'Confirmation',
                    'Are you sure you want to delete this Employee?',
                    () => {
                      console.log('onOk');
                      deleteData(`tasks/${item.id}`)
                      .then(res=>{
                        console.log('SubTaskDelete-Res', res);
                        if(res?.response?.status === 500){
                          openNotification('Error', 'This Task can not be deleted as it contains Questions.')
                        } else {
                          getSubTasksandQuestions();
                        }
                      })
                      .catch(e=>console.log('SubTaskDelete-Error', e))
                    },
                    () => {},
                    'Yes',
                    'No'
                  )}
                  onDuplicate={()=>optionsModal(
                    'Confirmation',
                    'Do you want to duplicate this entry?',
                    () => {
                      console.log('onOk');
                      postData('duplicate', JSON.stringify({taskId: item.id, projectId: projectId}))
                      .then(res=>{
                        console.log('Duplicate-Res', res)
                        getSubTasksandQuestions();
                      })
                      .catch(e=>console.log('Duplicate-Error', e))
                    },
                    () => {console.log('onCencel');},
                    'Yes',
                    'No'
                  )}
                />
              </Col>
              <Col span={22}>
                <Typography.Paragraph ellipsis={{ rows: 2 }}>
                  <Typography.Text style={{fontSize: 10}}>{item.description}</Typography.Text>
                </Typography.Paragraph>  
              </Col>
            </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  </>)
}

export default SubTasks
