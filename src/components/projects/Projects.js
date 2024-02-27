import { Col, Row, Typography, Card } from 'antd'
// import Card from 'antd/es/card/Card'
import React from 'react'

const Projects = () => {
  return (
    <div>
      <Typography.Title level={4} style={{color: '#3C4B64'}}>Projects</Typography.Title>
      <Row justify='space-between' align='middle' gutter={[24,24]}>
        {Array.from({ length: 12 }, (_, index) => (
          <Col key={index} span={6}>
            <Card size='small'>
              <Typography.Text style={{fontSize: 16, fontWeight: 500, color: '#3C4B64'}}>Project {index+1}</Typography.Text>
              <Typography.Paragraph>
                <Typography.Text>Description</Typography.Text>
              </Typography.Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Projects
