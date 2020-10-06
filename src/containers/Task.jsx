import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import intl from 'react-intl-universal'
import { Form, Button, Divider, Segment, Header, ButtonGroup } from 'semantic-ui-react'

import {
  MULTIPLE_CHOICE,
  FREE_ANSWER,
  MULTIMEDIA_TASK,
  LOCATION_TASK,
} from '../constants/taskTypes'
import {
  getTask,
  updateTask,
  setCurrentTaskField,
  setCurrentTaskType,
} from '../actions/tasks'
import TaskTypesHelper from '../helpers/taskTypesHelper'
import TaskBuilder from '../components/taskSetUpComponents/TaskBuilder.jsx'
import '../styles/General.css'
import { SUCCESS, OUTDATED, PENDING } from '../constants/status'

class TaskSetUpContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      validationError: false,
    }
  }

  componentDidMount() {
    const {
      id,
      fk,
    } = this.props.match.params
    this.props.actions.getTask(id,fk)
  }

  componentDidUpdate(prevProps) {
    this.checkTaskJustSaved(prevProps)
  }

  checkTaskJustSaved(prevProps) {
    const {
      updateStatus,
      history,
      match:{
        params:{
          id
        }
      }
    } = this.props

    if (updateStatus !== prevProps.updateStatus && updateStatus === SUCCESS) {
      history.push(`/Activity/${id}`)
    }
  }

  render() {

    const {
      task,
      status,
      updateStatus,
      history,
      actions:{
        setCurrentTaskField,
        setCurrentTaskType,
        updateTask,
      },
      match:{
        params:{
          id:activity_id
        }
      }
    } = this.props

    const {
      validationError
    } = this.state

    return (status === SUCCESS || status === OUTDATED) ? (
      <div className="background">
        <Segment padded='very' className='container'>
          <Header>{intl.get('TASK_TITLE')}</Header>
          <Form loading={updateStatus === PENDING}>
            <Form.Input
              name='name'
              value={task.name}
              label={intl.get('TASK_FIELD_TITLE')}
              placeholder={intl.get('TASK_FIELD_TITLE')}
              onChange={(event, { value, name }) => setCurrentTaskField(name,value)}
              error={
                (validationError && task.name === '') ? 
                  {content:intl.get('EMPTY_FIELD_ERROR')} : 
                  undefined
              }
            />
            <Form.Input
              name='description'
              value={task.description}
              label={intl.get('TASK_FIELD_DESCRIPTION')}
              placeholder={intl.get('TASK_FIELD_DESCRIPTION')}
              onChange={(event, { value, name }) => setCurrentTaskField(name,value)}
              error={
                (validationError && task.description === '') ?
                  {content:intl.get('EMPTY_FIELD_ERROR')} :
                  undefined
              }
            />
            <Form.Select
              name='type'
              value={task.type}
              label={intl.get('TASK_TYPE_SELECT_LABEL')}
              placeholder={intl.get('TASK_TYPE_SELECT_LABEL')}
              onChange={(event, { value }) => setCurrentTaskType(value,TaskTypesHelper[value].defaultPayload)}
              options={[
                { text:intl.get('TASK_TYPE_MC'), value:MULTIPLE_CHOICE },
                { text:intl.get('TASK_TYPE_FA'), value:FREE_ANSWER },
                { text:intl.get('TASK_TYPE_MT'), value:MULTIMEDIA_TASK },
                { text:intl.get('TASK_TYPE_LT'), value:LOCATION_TASK },
              ]}
            />
          </Form>
          <Divider/>
          <TaskBuilder type={task.type} payload={task.payload}/>
          <Divider/>
          <ButtonGroup floated='right'>
            <Button basic color='grey' content={intl.get('CANCEL')} onClick={() => history.push(`/Activity/${activity_id}`)}/>
            <Button basic primary content={intl.get('SAVE')} onClick={() => {
              if(task.name !== '' && task.description !== '') {
                updateTask(activity_id,task.id,task)
              } else {
                this.setState(() => ({validationError:true}))
              }
            }}/>
          </ButtonGroup>
        </Segment>
      </div>
    ) : null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      getTask,
      updateTask,
      setCurrentTaskField,
      setCurrentTaskType,
    }, dispatch)
  }
}

function mapStateToProps({tasks}) {
  const {
    get:{
      task,
      status,
    },
    update:{
      status:updateStatus,
    }
  } = tasks
  return {
    task,
    status,
    updateStatus,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TaskSetUpContainer))
