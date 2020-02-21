import React from 'react'

import List from './List'
import {
  LoadingMessage,
  ErrorMessage,
} from './Messages'
import {
  PENDING,
  SUCCESS,
  OUTDATED,
  FAILURE,
} from '../constants/status'
import intl from 'react-intl-universal'

//Wrapper para renderizar una lista en funcion el estado de la request a la API

const StatusList = ({ status, items, render_item }) => 
  status === PENDING ? <LoadingMessage title={intl.get('API_ERROR_MESSAGE_TITLE')} description={intl.get('API_ERROR_MESSAGE')} />
    : status === SUCCESS || status === OUTDATED ? <List items={items} render_item={render_item} />
      : status === FAILURE ? <ErrorMessage title={intl.get('API_LOAD_MESSAGE_TITLE')} errors={[intl.get('API_LOAD_MESSAGE')]} />
        : null

export default StatusList