import React, { useState } from 'react'
import { Button, Col, Dropdown, Row } from 'antd';
import { CopyOutlined, DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import Typography from 'antd/es/typography/Typography';

const OptionsDropdown = ({onEdit, onDelete, onDuplicate}) => {
    const [open, setOpen] = useState(false)

    const Label = ({title, onClickFunc, color='#555', Icon}) => (
      // <div style={{display: 'flex', justifyContent: 'center'}}>
      //   <Icon style={{color: color, size: 10, marginRight: 5}} />
      //   <Typography.Text style={{color: color, marginLeft: 5}} 
      //     onClick={e=>{e.stopPropagation(); onClickFunc(); setOpen(false)}}>
      //     {title}
      //   </Typography.Text>
      // </div>
      <Button type='link' size='small' style={{color: color}}
        icon={<Icon style={{color: color, size: 10, marginRight: 5}} />}
        onClick={e=>{e.stopPropagation(); onClickFunc(); setOpen(false)}}>
          {title}
      </Button>
    )

    return(
      <Dropdown
        menu={{
          items: [
            {key: 0, label: <Label title='Edit' Icon={EditOutlined} onClickFunc={onEdit} />},
            {key: 1, label: <Label title='Delete' Icon={DeleteOutlined} onClickFunc={onDelete} color='#f00' />},
            {type: 'divider'},
            {key: 2, label: <Label title='Duplicate' Icon={CopyOutlined} onClickFunc={onDuplicate} />},
          ]
        }}
        open={open}
        trigger={['click']}
      >
        <Button type='text' size='middle' shape='circle' onClick={e=>{e.stopPropagation(); setOpen(prev=>!prev)}}><MoreOutlined style={{fontSize: 16}} /></Button>
      </Dropdown>
    )
  }

export default OptionsDropdown
