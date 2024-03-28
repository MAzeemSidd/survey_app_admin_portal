import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Collapse, Row, Skeleton, Spin, Tag, Typography } from 'antd'
import { CopyOutlined, DeleteOutlined, DiffOutlined, EditOutlined } from '@ant-design/icons'
import MainDrawer from '../MainDrawer'
import { deleteData, getData, postData, putData } from '../../Services/NetworkService'
import { optionsModal } from '../../functions/optionsModal'
import { type } from '@testing-library/user-event/dist/type'

const TaskCollapse = ({item, projectId, taskId, subTaskId, handleEditBtnClick, handleDeleteBtnClick, /*handleDuplicateBtnClick*/}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [answer, setAnswer] = useState(null)
  const [loading, setLoading] = useState(false)

  console.log('answer', answer)

  useEffect(()=>{
    if(isOpen) {
      console.log('UseEffect--TaskCollapse',item)
      setLoading(true);
      getData(`projects/${projectId}/tasks/${taskId}/subTasks/${subTaskId}/questions/${item.id}/answers`)
      // getData(`projects/${projectId}/questions/${item.id}/answers`)
      .then(res=>{
        console.log('Answer-Res',res?.data?.data?.content);
        if(item?.type == 'MULTIPLE') {
          let options = res?.data?.data?.content?.length != 0 ? res?.data?.data?.content?.map(item=>item.answer) : null
          setAnswer(options)
        }
        else setAnswer(res?.data?.data?.content[0]?.answer);
        setLoading(false)
      })
      .catch(e=>{console.log(e); setLoading(false)})
    }
  },[isOpen])

  return(
    <Collapse
      onChange={()=>{setIsOpen(prev=>!prev);console.log('Collapse', item);}}
      items={[
        {
          key: '1',
          label: (
            <Row>
              <Col>
                <Typography.Text ellipsis='true' style={{width: 500}}>{item.question}</Typography.Text>
              </Col>
              <Col><Tag style={{color: '#808080', fontSize: 10}}>{item.type}</Tag></Col>
            </Row>
          ),
          children: (
            <Row gutter={[0,12]}>
              {answer && <Col span={24}><Typography.Text style={{color: '#808080', fontSize: 11}}>Answer</Typography.Text></Col>}
              {
                answer ? 
                <Col>
                  <Spin spinning={loading}>
                    {
                      item?.type == 'MULTIPLE' ?
                        answer?.map((item,i)=>(
                          <Card size='small'>
                            <Typography.Text style={{width: 500, marginLeft: 10}}>{item}</Typography.Text>
                            {i !== answer.length-1 && ','}
                          </Card>
                        ))
                        :
                        <Card size='small'>
                          <Typography.Text style={{width: 500}}>{answer}</Typography.Text>
                        </Card>
                    }
                  </Spin>
                </Col>
                :
                <Col span={24}>
                  <Row justify='center'>
                    <Col>
                      <Typography.Text style={{width: 500, color: '#ccc', fontSize: 12, fontWeight: 500}}>--No Answer--</Typography.Text>
                    </Col>
                  </Row>
                </Col>
              }
            </Row>
          ),
          extra: (
            <Row gutter={3}>
              <Col><Button type='text' size='small' onClick={e=>handleEditBtnClick(e, item)}><EditOutlined /></Button></Col>
              <Col><Button type='text' size='small' onClick={e=>handleDeleteBtnClick(e, item)}><DeleteOutlined /></Button></Col>
              {/* <Col><Button type='text' size='small' onClick={e=>handleDuplicateBtnClick(e, item)}><CopyOutlined /></Button></Col> */}
            </Row>
          )
        },
      ]}
    />
  )
}

const Questions = ({questions, projectId, taskId, subTaskId, getQuestions}) => {
  console.log('--------Questions--------')
  const [Questions, setQuestions] = useState(null)
  const [addFormVisibility, setAddFormVisibility] = useState(false)
  const [editForm, setEditForm] = useState({visibility: false, data: null})

  useEffect(()=>{
    console.log(questions, Questions)
    if(questions){
      setQuestions(questions)
    }
    return () => setQuestions(null)
  },[questions])

  const handleEditBtnClick = (e, item) => {
    console.log(item)
    setEditForm(prev=>({...prev, visibility: true, data: item}))
    e.stopPropagation();
  }
  const handleDeleteBtnClick = (e, item) => {
    e.stopPropagation();
    optionsModal(
      'Confirmation',
      'Are you sure you want to delete this Question?',
      () => {
        console.log('onOk');
        deleteData(`questions/${item.id}`)
        .then(res=>{
          console.log('QuestionDelete-Res', res);
          getQuestions();
        })
        .catch(e=>console.log('SubTaskDelete-Error', e))
      },
      () => {},
      'Yes',
      'No'
    )
  }
  return (<>
    <MainDrawer open={addFormVisibility}
      projectId={projectId} taskId={taskId}
      title='Question' formType='Add'
      onClose={(resetFields)=>{
        resetFields();
        setAddFormVisibility(false)
      }}
      submitFunction={()=>{
        setAddFormVisibility(false)
        getQuestions(projectId, taskId)
      }}
    />
    {editForm.data && <MainDrawer open={editForm.visibility} data={editForm.data}
      projectId={projectId} taskId={taskId}
      title='Question' formType='Edit'
      onClose={(resetFields)=>{
        resetFields();
        setEditForm(prev=>({...prev, visibility: false, data: null}))
      }}
      submitFunction={()=>{
        getQuestions();
        setEditForm(prev=>({...prev, visibility: false, data: null}))
      }}
    />}
    <Card size='small' type='inner' style={{minHeight: '63vh'}}>
      <Row style={{margin: '15px 0'}}>
        <Col span={24}><Button icon={<DiffOutlined />} onClick={()=>setAddFormVisibility(true)}>Add Questions</Button></Col>
      </Row>
      <Row gutter={[24,24]}>
        {Questions?./*sort((a, b) => a.id - b.id).*/map(item => (
          <Col key={item.id} span={24}>
            <TaskCollapse item={item} projectId={projectId} taskId={taskId} subTaskId={subTaskId} handleEditBtnClick={handleEditBtnClick} handleDeleteBtnClick={handleDeleteBtnClick} />
          </Col>
        ))}
      </Row>
    </Card>
  </>)
}

export default Questions


{/* <Col span={24}>
  <Collapse
    onChange={(e, _)=>console.log('Collapse', e, _)}
    items={Questions?.map((item, index) =>(
      {
        key: item?.id,
        label: (
          <Row>
            <Col>
              <Typography.Text ellipsis='true' style={{width: 500}}>{item.question}</Typography.Text>
            </Col>
            <Col><Tag style={{color: '#808080', fontSize: 10}}>{item.type}</Tag></Col>
          </Row>
        ),
        children: (
          <Row>
            <Col>
              <Typography.Text style={{width: 500}}>{item.question}</Typography.Text>
            </Col>
            <Col>
              <Row>
                
              </Row>
            </Col>
          </Row>
        ),
        extra: (
          <Row gutter={6}>
            <Col><Button type='text' size='small' onClick={e=>handleEditBtnClick(e, item)}><EditOutlined /></Button></Col>
            <Col><Button type='text' size='small' onClick={e=>handleDeleteBtnClick(e, item)}><DeleteOutlined /></Button></Col>
          </Row>
        )
      }
    ))}
  />
</Col> */}