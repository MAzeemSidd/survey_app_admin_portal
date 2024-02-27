import React from 'react'
import { useLocation } from 'react-router-dom'
import { Typography } from 'antd';

const ProjectDetails = () => {
  const location = useLocation();
  console.log(location?.state)
  return (
    <div>
      <Typography.Title level={4} style={{color: '#3C4B64'}}>Tasks</Typography.Title>
    </div>
  )
}

export default ProjectDetails
