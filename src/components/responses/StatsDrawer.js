import { Card, Col, Drawer, Progress, Row, Segmented, Typography } from "antd";
import { useState } from "react";

const OtherStats = ({mainHeading='', strokeColor}) => {

  const CustomProgressValue = ({value, size}) => (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <text style={{fontSize: size, fontWeight: 500}}>{value + '%'}</text>
    </div>
  )

  return(
    <>
      <Typography.Text style={{fontSize: 10, fontWeight: 700}}>{mainHeading}</Typography.Text>
      <Row justify='center'>
        <Col span={22}>
          <Row>
            <Col span={8}><text ellipsis={true} style={{fontSize: 8, fontWeight: 500}}>Option1</text></Col>
            <Col span={16}><Progress strokeColor={strokeColor} percent={70} size={['100%', 4]} format={(perc)=>(<CustomProgressValue value={perc} size={10} />)} /></Col>
          </Row>
        </Col>
        <Col span={22}>
          <Row>
            <Col span={8}><text ellipsis={true} style={{fontSize: 8, fontWeight: 500}}>Option2</text></Col>
            <Col span={16}><Progress strokeColor={strokeColor} percent={18} size={['100%', 4]} format={(perc)=>(<CustomProgressValue value={perc} size={10} />)} /></Col>
          </Row>
        </Col>
        <Col span={22}>
          <Row>
            <Col span={8}><text ellipsis={true} style={{fontSize: 8, fontWeight: 500}}>Option3</text></Col>
            <Col span={16}><Progress strokeColor={strokeColor} percent={7} size={['100%', 4]} format={(perc)=>(<CustomProgressValue value={perc} size={10} />)} /></Col>
          </Row>
        </Col>
        <Col span={22}>
          <Row>
            <Col span={8}><text ellipsis={true} style={{fontSize: 8, fontWeight: 500}}>Option4</text></Col>
            <Col span={16}><Progress strokeColor={strokeColor} percent={5} size={['100%', 4]} format={(perc)=>(<CustomProgressValue value={perc} size={10} />)} /></Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

const StatsDrawer = ({open, onClose}) => {
  const [selectedSurvey, setSelectedSurvey] = useState('Mental Health Survey')
    // const config = {
    //   data: [
    //     { type: 'Used for building web applications', value: 13 },
    //     { type: 'Building Operating System', value: 17 },
    //     { type: 'Used for building native mobile applications', value: 10 },
    //     { type: 'Used for hacking systems', value: 20 },
    //     { type: 'Used for building native', value: 12 },
    //     { type: 'Used for', value: 28 }
    //   ],
    //   angleField: 'value',
    //   colorField: 'type',
    //   // paddingRight: 140,
    //   // paddingLeft: 150,
    //   paddingTop: 50,
    //   innerRadius: 0.4, //set inner radius of chart
    //   radius: 0.7, //set radius(size) of chart
    //   label: {
    //     text: 'value', //label text
    //     // position: 'spider', //use to show labels with pointed lines
    //     style: {
    //       fontWeight: 'bold',
    //     },
    //   },
    //   legend: /*false,*/ //legends are the color indicator of labels, if false then will not be shown
    //   {
    //     color: {
    //       title: false,
    //       position: 'right',
    //       rowPadding: 1,
    //     },
    //   },
    //   annotations: [
    //     {
    //       type: 'text',
    //       style: {
    //         text: 'Answer\nStats',
    //         x: '50%',
    //         y: '50%',
    //         textAlign: 'center',
    //         fontSize: 25,
    //         // fontStyle: 'bold',
    //       },
    //     },
    //   ],
    // };
    
    const strokeColor = {
      '0%': '#9cbfd6',
      '40%': '#6a8aa0',
      '90%': '#36454f',
    }
  
    return(
      <Drawer
        title='Stats'
        width={720}
        onClose={onClose}
        open={open}
      >
        {/* <Pie {...config} /> */}
        <Row gutter={[0,30]} style={{overflowX: 'hidden'}}>
  
          <Col span={24}>
            <Typography.Text color='primary' style={{padding: 0, margin: 0, fontSize: 20, fontWeight: 400}}>How would you rate your overall mental health?</Typography.Text>
          </Col>
          
          <Col span={24}>
            <Row>
              <Col span={24} style={{overflowX: 'scroll', padding: '10px 0', cursor: 'pointer'}}>
                <Segmented options={['Mental Health Survey', 'Performance Evaluation Survey', 'Leadership Effectiveness Survey', 'Teamwork and Collaboration Survey', 'Employee Career Development Survey', 'Organizational Performance Survey']} value={selectedSurvey} onChange={setSelectedSurvey} />
              </Col>
            </Row>
            <Row gutter={[24,48]}>
              <Col span={24}>
                <Card size='small'>
                  <Row>
                    <Col span={24}>
                      <Row style={{margin: '5px 0'}}>
                        <Col span={8}><Typography.Text ellipsis={true} style={{fontWeight: 400}}>Option1</Typography.Text></Col>
                        <Col span={16}><Progress strokeColor={strokeColor} percent={75} size={['100%', 15]} status="active" /*size="small"*/ /></Col>
                      </Row>
                      <Row style={{margin: '5px 0'}}>
                        <Col span={8}><Typography.Text ellipsis={true} style={{fontWeight: 400}}>Option2</Typography.Text></Col>
                        <Col span={16}><Progress strokeColor={strokeColor} percent={17} size={['100%', 15]} status="active" /*size="small"*/ /></Col>
                      </Row>
                      <Row style={{margin: '5px 0'}}>
                        <Col span={8}><Typography.Text ellipsis={true} style={{fontWeight: 400}}>Option3</Typography.Text></Col>
                        <Col span={16}><Progress strokeColor={strokeColor} percent={7} size={['100%', 15]} status="active" /*size="small"*/ /></Col>
                      </Row>
                      <Row style={{margin: '5px 0'}}>
                        <Col span={8}><Typography.Text ellipsis={true} style={{fontWeight: 400}}>Option4</Typography.Text></Col>
                        <Col span={16}><Progress strokeColor={strokeColor} percent={1} size={['100%', 15]} status="active" /*size="small"*/ /></Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
      
              <Col span={12}>
                <Row gutter={[6,12]}>
                  <Col span={24}><Typography.Text style={{fontSize: 16, fontWeight: 500}}>Gender Based Stats</Typography.Text></Col>
                  <Col span={24}>
                    <Card size='small'>
                      <Row gutter={[0, 18]}>
                        <Col span={24}>
                          <OtherStats mainHeading="Male" strokeColor={strokeColor} />
                        </Col>
                        <Col span={24}>
                          <OtherStats mainHeading="Female" strokeColor={strokeColor} />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Col>
      
              <Col span={12}>
                <Row gutter={[6,12]}>
                  <Col span={24}><Typography.Text style={{fontSize: 16, fontWeight: 500}}>Age Based Stats</Typography.Text></Col>
                  <Col span={24}>
                    <Card size='small'>
                      <Row gutter={[0, 18]}>
                        <Col span={24}>
                          <OtherStats mainHeading="Age 18-40" strokeColor={strokeColor} />
                        </Col>
                        <Col span={24}>
                          <OtherStats mainHeading="Age 40-70" strokeColor={strokeColor} />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Col>
              
            </Row>
          </Col>

  
        </Row>
      </Drawer>
    )
  }

export default StatsDrawer;