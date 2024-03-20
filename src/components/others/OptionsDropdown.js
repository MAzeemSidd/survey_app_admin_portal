import React, { useState } from 'react'
import { Button, Col, Dropdown, Row } from 'antd';
import { CopyOutlined, DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import Typography from 'antd/es/typography/Typography';

const OptionsDropdown = ({onEdit, onDelete, onDuplicate, hideDuplicate=false}) => {
    const [open, setOpen] = useState(false)
    console.log(open)

    const Label = ({title, onClickFunc, color='#555', Icon}) => (
      <a target="_blank" style={{color: color}}
        onClick={e=>{e.stopPropagation(); setOpen(false); onClickFunc();}}>
        <Icon style={{color: color, size: 10, marginRight: 5}} />
        {title}
      </a>
    )

    const duplicateOption = hideDuplicate ?
    ''
    :
    [{type: 'divider'},
    {key: 2, label: <Label title='Duplicate' Icon={CopyOutlined} onClickFunc={onDuplicate} />}]

    return(
      <Dropdown
        menu={{
          items: [
            {key: 0, label: <Label title='Edit' Icon={EditOutlined} onClickFunc={onEdit} />, onClick: (e)=>{console.log('item-onclick', e);}},
            {key: 1, label: <Label title='Delete' Icon={DeleteOutlined} onClickFunc={onDelete} color='#f00' />},
            ...duplicateOption,
          ]
        }}
        open={open}
        onOpenChange={()=>setOpen(prev=>!prev)}
        // trigger={['click']}
      >
        <Button type='text' size='middle' shape='circle' onClick={e=>{e.stopPropagation(); setOpen(prev=>!prev)}}><MoreOutlined style={{fontSize: 16}} /></Button>
      </Dropdown>
    )
  }

export default OptionsDropdown
