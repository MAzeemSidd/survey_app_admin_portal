import React, { useState } from 'react'
import { Button, Card, Col, Collapse, Row, Tag, Typography } from 'antd'
import { DeleteOutlined, DiffOutlined, EditOutlined } from '@ant-design/icons'
import MainDrawer from '../MainDrawer'

const Questions = ({questions}) => {
  console.log('--------Questions--------')
  const [addFormVisibility, setAddFormVisibility] = useState(false)
  const [editForm, setEditForm] = useState({visibility: false, data: null})

  const handleEditBtnClick = (e, item) => {
    console.log(item)
    setEditForm(prev=>({...prev, visibility: true, data: item}))
    e.stopPropagation();
  }
  const handleDeleteBtnClick = (e, item) => {
    e.stopPropagation();
  }
  return (<>
    <MainDrawer open={addFormVisibility} onClose={()=>setAddFormVisibility(false)} title='Question' formType='Add' />
    <MainDrawer open={editForm.visibility} data={editForm.data} onClose={()=>setEditForm(prev=>({...prev, visibility: false, data: null}))} title='Question' formType='Edit' />
    <Card size='small' type='inner' style={{minHeight: '63vh'}}>
      <Row style={{margin: '15px 0'}}>
        <Col span={24}><Button icon={<DiffOutlined />} onClick={()=>setAddFormVisibility(true)}>Add Questions</Button></Col>
      </Row>
      <Row gutter={[24,24]}>
        {questions?.map((item, index) => (
          <Col key={index} span={24}>
            <Collapse
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
                  children: <p>Details</p>,
                  extra: (
                    <Row gutter={6}>
                      <Col><Button type='text' size='small' onClick={e=>handleEditBtnClick(e, item)}><EditOutlined /></Button></Col>
                      <Col><Button type='text' size='small' onClick={e=>handleDeleteBtnClick(e, item)}><DeleteOutlined /></Button></Col>
                    </Row>
                  )
                },
              ]}
            />
          </Col>
        ))}
      </Row>
    </Card>
  </>)
}

export default Questions
