import React, { useState, useEffect } from 'react'
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Card, Col, Collapse, Form, Row, Select, Tag, Typography } from 'antd'
import { getData } from '../../Services/NetworkService'
import { useLocation } from 'react-router-dom'


const Answers = () => {
  const [employees, setEmployees] = useState(null)

  const getEmployees = () => {
    getData('tasks/employees')
    .then(res=>{
      let _employee = res?.data?.data?.map(item=>({value: item.name, label: item.name}))
      console.log('Employee-Res',_employee, res);
      setEmployees(_employee)
    })
    .catch(e=>{console.log('Employee-Error',e);})
  }

  useEffect(()=>{
    getEmployees()
  },[])

  return (<>
    <Row style={{marginTop: 30, marginBottom: 15}}>
      <Col span={6}><Typography.Title level={3} style={{color: '#3C4B64',margin: 0}}>Answers</Typography.Title></Col>
    </Row>
    <Row gutter={24}>
      <Col span={8}>
        <Row>
          <Col span={24}>
            <Typography.Text>Employee List</Typography.Text>
          </Col>
          <Col span={24}>
            <Select
              showSearch
              placeholder="Select an Employee"
              optionFilterProp="children"
              onChange={val=>console.log(val)}
              filterOption={(input, option) => (option?.label.toUpperCase() ?? '').includes(input.toUpperCase())}
              options={employees ?? []}
            />
          </Col>
        </Row>
      </Col>
      <Col span={8}>
        <Form.Item label='Project' name='project'>
          <Select
            showSearch
            placeholder="Select an Project"
            optionFilterProp="children"
            onChange={val=>console.log(val)}
            filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase())}
            options={[
              {value: 'USER1', label: 'USER1'},
              {value: 'USER2', label: 'USER2'},
              {value: 'USER3', label: 'USER3'}
            ]}
          />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={[24,12]}>
      <Col span={6}></Col>
    </Row>
  </>)
}

export default Answers
