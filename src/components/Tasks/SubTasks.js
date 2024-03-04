import React, { useState } from 'react'
import { Button, Card, Col, Row, Typography } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
import MainDrawer from '../MainDrawer'

const SubTasks = ({subTasks}) => {
  console.log('--------Sub Tasks--------')
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  return (<>
    <MainDrawer open={drawerVisibility} onClose={()=>setDrawerVisibility(false)} title='Sub Task' />
    <Card size='small' type='inner' style={{minHeight: '55vh'}}>
      <Row style={{margin: '15px 0'}}>
        <Col span={24}><Button icon={<AppstoreAddOutlined />} onClick={()=>setDrawerVisibility(true)}>Add Sub Tasks</Button></Col>
      </Row>
      <Row gutter={[24,24]}>
        {subTasks?.map((item, index) => (
          <Col key={index} span={6}>
            <Card size='small' style={{border: '.5px solid #e0e0e0'}} hoverable onClick={()=>{}}>
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
