import React from 'react'
import { Form } from 'semantic-ui-react'

import { MULTIPLE_CHOICE, FREE_ANSWER,MULTIMEDIA_TASK, LOCATION_TASK } from '../constants/taskTypes'
import TaskTypesHelper from '../helpers/taskTypesHelper'
import { PENDING, UNSET } from '../constants/status'
import intl from 'react-intl-universal'

const TaskCreationForm = ({status, task, setField, setType, validationError}) => (
  <Form loading={status === PENDING}>
    <Form.Input
      name='name'
      required
      label={intl.get('TASK_FIELD_TITLE')}
      placeholder={intl.get('TASK_FIELD_TITLE')}
      value={(task.name === UNSET) ? '' : task.name}
      error={(validationError && task.name === '') ? {content:intl.get('EMPTY_FIELD_ERROR')} : undefined}
      onChange={(event, { value, name }) => setField(name,value)}
    />
    <Form.Input
      required
      name='description'
      label={intl.get('TASK_FIELD_DESCRIPTION')}
      placeholder={intl.get('TASK_FIELD_DESCRIPTION')}
      error={(validationError && task.description === '') ? {content:intl.get('EMPTY_FIELD_ERROR')} : undefined}
      value={(task.description === UNSET) ? '' : task.description}
      onChange={(event, { value, name }) => setField(name,value)}
    />
    <Form.Select
      name='type'
      required
      label={intl.get('TASK_TYPE_SELECT_LABEL')}
      placeholder={intl.get('TASK_TYPE_SELECT_LABEL')}
      error={(validationError && task.type === UNSET) ? {content:intl.get('EMPTY_FIELD_ERROR')} : undefined}
      onChange={(event, { value }) => setType(value,TaskTypesHelper[value].defaultPayload)}
      options={[
        { text:intl.get('TASK_TYPE_MC'), value:MULTIPLE_CHOICE },
        { text:intl.get('TASK_TYPE_FA'), value:FREE_ANSWER },
        { text:intl.get('TASK_TYPE_MT'), value:MULTIMEDIA_TASK },
        { text:intl.get('TASK_TYPE_LT'), value:LOCATION_TASK },
      ]}
    />
  </Form>
)

export default TaskCreationForm