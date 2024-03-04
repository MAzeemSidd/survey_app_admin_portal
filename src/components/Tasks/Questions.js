import React, { useState } from 'react'
import { Button, Card, Col, Collapse, Row, Tag, Typography } from 'antd'
import { DiffOutlined } from '@ant-design/icons'
import MainDrawer from '../MainDrawer'

const Questions = ({questions}) => {
  console.log('--------Questions--------')
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  return (<>
    <MainDrawer open={drawerVisibility} onClose={()=>setDrawerVisibility(false)} title='Questions' />
    <Card size='small' type='inner' style={{minHeight: '55vh'}}>
      <Row style={{margin: '15px 0'}}>
        <Col span={24}><Button icon={<DiffOutlined />} onClick={()=>setDrawerVisibility(true)}>Add Questions</Button></Col>
      </Row>
      <Row gutter={[24,24]}>
        {questions?.map((item, index) => (
          <Col key={index} span={24}>
            <Collapse
              // defaultActiveKey={['1']}
              items={[
                {
                key: '1',
                label: (
                  <Row justify='space-between'>
                    <Col>
                      <Typography.Text ellipsis='true' style={{width: 700}}>{item.question}</Typography.Text>
                    </Col>
                    <Col>
                      <Tag style={{color: '#808080'}}>{item.type}</Tag>
                    </Col>
                  </Row>
                ),
                children: <p>Details</p>,
                },
              ]}
            />
          </Col>)
        )}
        
        {/* {questions?.map((item, index) => (
          <Col key={index} span={6}>
            <Card size='small' hoverable onClick={()=>{}}>
              <Typography.Text style={{fontSize: 16, fontWeight: 500, color: '#3C4B64'}}>{item.question}</Typography.Text>
              <Typography.Paragraph>
                <Typography.Text>{item.type}</Typography.Text>
              </Typography.Paragraph>
            </Card>
          </Col>
        ))} */}
      </Row>
    </Card>
  </>)
}

export default Questions
