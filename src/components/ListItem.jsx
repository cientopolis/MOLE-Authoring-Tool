import React from 'react'
import { Button, List, Icon, ButtonGroup } from 'semantic-ui-react'

import intl from 'react-intl-universal'

const ListItem = ({name,load,del}) => (
  <List.Item>
    <List.Content floated='right'>
      <ButtonGroup>
        <Button basic primary onClick={load}><Icon name='edit'/>{intl.get('EDIT')}</Button>
        <Button basic primary onClick={del}><Icon name='trash'/>{intl.get('DELETE')}</Button> 
      </ButtonGroup>
    </List.Content>
    <a onClick={load}>{name}</a>
  </List.Item>  
)

export default ListItem
