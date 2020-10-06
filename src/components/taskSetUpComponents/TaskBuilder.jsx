import React from 'react'

import {
  MULTIPLE_CHOICE,
  FREE_ANSWER,
  MULTIMEDIA_TASK,
  LOCATION_TASK,
} from '../../constants/taskTypes'
import MultipleChoice from './MultipleChoiceComponent.jsx'
import FreeAnswerComponent from './FreeAnswerComponent'
import MultimediaTaskComponent from './MultimediaTaskComponent'
import LocationTaskComponent from './LocationTaskComponent'

const TaskBuilder = ({type, payload}) => {
  switch (type) {
    case MULTIPLE_CHOICE:
      return <MultipleChoice type={type} payload={payload} />
    case FREE_ANSWER:
      return <FreeAnswerComponent payload={payload} />
    case MULTIMEDIA_TASK:
      return <MultimediaTaskComponent payload={payload} />
    case LOCATION_TASK:
      return <LocationTaskComponent payload={payload} />
    default:
      return null
  }
}

export default TaskBuilder