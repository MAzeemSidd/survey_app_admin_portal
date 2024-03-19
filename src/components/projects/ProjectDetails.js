import { AppstoreAddOutlined, MoreOutlined } from '@ant-design/icons'
import { Col, Row, Typography, Card, Space, Button, Dropdown } from 'antd'
import React, { useEffect, useState } from 'react'
import MainDrawer from '../MainDrawer'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { deleteData, getData, postData, putData } from '../../Services/NetworkService'
import OptionsDropdown from '../others/OptionsDropdown'
import { optionsModal } from '../../functions/optionsModal'
import { openNotification } from '../../functions/openNotification'

const ProjectDetails = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [editForm, setEditForm] = useState({visibility: false, data: null})
  const [tasks, setTasks] = useState()
  const [projectId, setProjectId] = useState()
  console.log(editForm)
  
  const getTasks = (_projectId) => {
    getData(`projects/${_projectId}/tasks`).then(res=>{
      setTasks(res?.data?.data?.content)
      console.log('tasks-res',res?.data?.data?.content)
    }).catch(e=>{
      console.log('tasks-error', e)
    })
  }

  useEffect(()=>{
    const _route = location.pathname.split('/');
    const _projectId = _route[_route.length - 1]
    console.log(_route)
    console.log('searchparams', _projectId)
    getTasks(_projectId)
    setProjectId(_projectId)
  },[])

  return (
    <div>
      <MainDrawer open={drawerVisibility} projectId={projectId} title='Survey' formType='Add'
        onClose={(resetFields)=>{
          resetFields()
          setDrawerVisibility(false)
        }}
        submitFunction={()=>{
          getTasks(projectId)
          setDrawerVisibility(false)
        }}
      />
      {editForm.data && <MainDrawer open={editForm.visibility} data={editForm.data} projectId={projectId}
        title='Survey' formType='Edit'
        onClose={(resetFields)=>{
          resetFields();
          setEditForm(prev=>({...prev, visibility: false, data: null}));
        }}
        submitFunction={()=>{
          getTasks(projectId)
          setEditForm(prev=>({...prev, visibility: false, data: null}));
        }}
      />}
      <Row gutter={[0,24]} style={{marginTop: 30, marginBottom: 15}}>
        <Col span={24}><Typography.Title level={3} style={{color: '#3C4B64',margin: 0}}>Surveys</Typography.Title></Col>
        <Col span={24}><Button icon={<AppstoreAddOutlined />} onClick={()=>setDrawerVisibility(true)}>Add Survey</Button></Col>
      </Row>
      <Row gutter={[24,24]}>
        {tasks?.map((item, index) => (
          <Col key={index} span={8}>
            <Card size='small' style={{border: '.5px solid #e0e0e0', height: 110}} hoverable onClick={()=>navigate(`/client/${projectId}/survey/${item.id}`/*, {state: {subTasks: item.subTasks, questions: item.questions}}*/)}>
              <Row>
                <Col span={22}>
                  <Typography.Text ellipsis={true} style={{fontSize: 16, fontWeight: 500, color: '#3C4B64'}}>{item.name}</Typography.Text>
                </Col>
                <Col span={2}>
                  {/* <Dropdown
                    menu={{
                      items: [
                        {key: 0, label: <Button type='link' size='small' style={{color: '#000'}}
                          onClick={e=>{e.stopPropagation(); setEditForm(prev=>({...prev, visibility: true, data: item}));}}>Edit Task</Button>},
                        {key: 1, label: <Button type='link' size='small' style={{color: '#f00'}} onClick={e=>{e.stopPropagation();}}>Delete Task</Button>}
                      ]
                    }}
                    // trigger={['click']}
                  >
                    <Button type='text' size='middle' shape='circle' onClick={e=>{e.stopPropagation();}}><MoreOutlined style={{fontSize: 16}} /></Button>
                  </Dropdown> */}
                  <OptionsDropdown
                    onEdit={()=>setEditForm(prev=>({...prev, visibility: true, data: item}))}
                    onDelete={()=>optionsModal(
                      'Confirmation',
                      'Are you sure you want to delete this Survey?',
                      () => {
                        console.log('onOk');
                        deleteData(`tasks/${item.id}`)
                        .then(res=>{
                          console.log('TaskDelete-Res', res);
                          if(res?.response?.status === 500){
                            openNotification('Error', 'This Survey can not be deleted as it contains Employees.')
                          } else {
                            getTasks(projectId);
                          }
                        })
                        .catch(e=>console.log('TaskDelete-Error', e))
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
                        postData(`tasks/${item.id}/duplicate`)
                        .then(res=>{
                          console.log('Duplicate-Res', res)
                          getTasks(projectId);
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
              {/* <Typography.Paragraph ellipsis={{ rows: 2 }}>
                
              </Typography.Paragraph> */}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ProjectDetails

