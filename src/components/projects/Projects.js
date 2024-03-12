import React, { useEffect, useState } from 'react'
import { Col, Row, Typography, Card, Space, Button, Dropdown, Modal, notification } from 'antd'
import { AppstoreAddOutlined, MoreOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { deleteData, getData, postData,putData } from '../../Services/NetworkService'
import MainDrawer from '../MainDrawer'
import OptionsDropdown from '../others/OptionsDropdown'
import axios from 'axios'
import { optionsModal } from '../../functions/optionsModal'
import { openNotification } from '../../functions/openNotification'


const Projects = () => {
  const navigate = useNavigate();
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [editForm, setEditForm] = useState({visibility: false, data: null})
  const [projectData, setProjectData] = useState(null)
  console.log('projectData', projectData)

  const getProjectsApi = () => {
    getData('projects')
     .then((res) => {
        setProjectData(res?.data?.data)
        console.log('project-res', res?.data?.data);
     }).catch(e=>{
        console.log('project-error', e);
     })
  }

  useEffect(()=>{
    getProjectsApi()
  },[])

  return (
    <div>
      <MainDrawer open={drawerVisibility} formType='Add' title='Project'
        onClose={(resetFields)=>{
          resetFields()
          setDrawerVisibility(false)
        }}
        submitFunction={(fields, resetFields)=>{
          postData('projects', JSON.stringify(fields))
          .then(res=>{
            console.log('projectAdd-res', res)
            getData('projects')
            .then((res) => {
                setProjectData(res?.data?.data)
                console.log('project-res', res?.data?.data);
            }).catch(e=>{
                console.log('project-error', e);
            })
            resetFields()
            setDrawerVisibility(false)
          })
          .catch(e=>console.log('projectAdd-error',e))
        }}
      />

      {editForm.data && <MainDrawer open={editForm.visibility} data={editForm.data} title='Project' formType='Edit'
        onClose={(resetFields)=>{
          resetFields();
          setEditForm(prev=>({...prev, visibility: false, data: null}));
        }}
        submitFunction={(fields, resetFields)=>{
          putData(`projects/${editForm?.data?.id}`, JSON.stringify({...fields, id: editForm?.data?.id}))
          .then(res=>{
            console.log('projectAdd-res', res)
            getData('projects')
            .then((res) => {
                setProjectData(res?.data?.data)
                console.log('project-res', res?.data?.data);
            }).catch(e=>{
                console.log('project-error', e);
            })
            resetFields()
            setEditForm(prev=>({...prev, visibility: false, data: null}));
          })
          .catch(e=>console.log('project-error',e))
        }}
      />}

      <Row gutter={[0,24]} style={{marginTop: 30, marginBottom: 20}}>
        <Col span={24}><Typography.Title level={3} style={{color: '#3C4B64',margin: 0}}>Projects</Typography.Title></Col>
        <Col span={24}><Button icon={<AppstoreAddOutlined />} onClick={()=>setDrawerVisibility(true)}>Add Project</Button></Col>
      </Row>
      <Row gutter={[12,12]}>
        {projectData?.map((item, index) => (
          <Col key={index} span={6}>
            <Card size='small' style={{border: '.5px solid #e0e0e0', height: 110}} hoverable onClick={()=>navigate(`/project/${item.id}`)}>
              <Row>
                <Col span={22}>
                  <Typography.Text ellipsis={true} style={{fontSize: 16, fontWeight: 500, color: '#3C4B64'}}>{item.name}</Typography.Text>
                </Col>
                <Col span={2}>
                  <OptionsDropdown
                    onEdit={()=>setEditForm(prev=>({...prev, visibility: true, data: item}))}
                    onDelete={()=>optionsModal(
                      'Confirmation',
                      'Are you sure you want to delete this project?',
                      () => {
                        console.log('onOk');
                        deleteData(`projects/${item.id}`)
                        .then(res=>{
                          console.log('ProjectDelete-Res', res);
                          if(res?.response?.status === 500){
                            openNotification('Error', 'This Project can not be deleted as it contains Tasks.')
                          } else {
                            getProjectsApi();
                          }
                        })
                        .catch(e=>console.log('ProjectDelete-Error', e))
                      },
                      () => {},
                      'Yes',
                      'No'
                    )}
                    onDuplicate={()=>optionsModal(
                      'Confirmation',
                      'This action will a copy of this project. Do you want to procees?',
                      () => {console.log('onOk');},
                      () => {console.log('onCencel');},
                      'Yes',
                      'No'
                    )}
                  />
                </Col>
                <Col>
                  <Typography.Paragraph ellipsis={{ rows: 2 }}>
                    <Typography.Text style={{fontSize: 10}}>{item.description}</Typography.Text>
                  </Typography.Paragraph>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Projects
