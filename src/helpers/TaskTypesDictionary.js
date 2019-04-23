import React from 'react'

import { MULTIPLE_CHOICE } from '../constants'
import { MultipleChoice } from '../components/taskSetUpComponents'

const taskTypesDictionary = {
  [MULTIPLE_CHOICE]:{
    name:'Multiple Choice',
    defaultPayload:{
      options:[],
    },
    componentToRender:(<MultipleChoice/>)
  }
}

export default taskTypesDictionary