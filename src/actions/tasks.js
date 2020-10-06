import {
  TASKS_REQUEST,
  TASKS_SUCCESS,
  TASKS_FAILURE,
  TASK_GET_REQUEST,
  TASK_GET_SUCCESS,
  TASK_GET_FAILURE,
  TASK_GET_RESET,
  TASK_SAVE_REQUEST,
  TASK_SAVE_SUCCESS,
  TASK_SAVE_FAILURE,
  TASK_SAVE_CLEAR,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAILURE,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAILURE,
  CURRENT_TASK_FIELD_SET,
  CURRENT_TASK_TYPE_SET,
  MC_TASK_SLOGAN_SET,
  MC_TASK_OPTION_ADD,
  MC_TASK_OPTION_UPDATE,
  MC_TASK_OPTION_DELETE,
  FA_TASK_ANSWER_SET,
  FA_TASK_SLOGAN_SET,
  MT_TASK_MULTIMEDIA_TYPE_SET,
  MT_TASK_SLOGAN_SET,
  LT_TASK_DESCRIPTION_SET,
  LT_TASK_SLOGAN_SET
} from '../constants/tasks'

import {
  getTasks as index,
  getTask as get,
  saveTask as save,
  updateTask as update,
  deleteTask as del,
} from '../backend/tasks'

import { 
} from '../backend/tasks'

export const getTasks = id => dispatch => {
  dispatch({type: TASKS_REQUEST})
  index(id).then(
    tasks => dispatch({
      type: TASKS_SUCCESS,
      payload: tasks,
    })
  ).catch(
    error => dispatch({
      type: TASKS_FAILURE,
      payload: error,
    })
  )
}

export const getTask = (id,fk) => dispatch => {
  dispatch({type: TASK_GET_REQUEST})
  get(id,fk).then(
    task => dispatch({
      type: TASK_GET_SUCCESS,
      payload: task,
    })
  ).catch(
    error => dispatch({
      type: TASK_GET_FAILURE,
      payload: error,
    })
  )
}

export const resetGet = () => ({
  type: TASK_GET_RESET,
})

export const saveTask = (id,task) => dispatch => {
  dispatch({type: TASK_SAVE_REQUEST})
  save(id,task).then(
    task => dispatch({
      type: TASK_SAVE_SUCCESS,
      payload: task,
    })
  ).catch(
    error => dispatch({
      type: TASK_SAVE_FAILURE,
      payload: error,
    })
  )
}

export const updateTask = (id,fk,task) => dispatch => {
  dispatch({type: TASK_UPDATE_REQUEST})
  update(id,fk,task).then(
    task => dispatch({
      type: TASK_UPDATE_SUCCESS,
      payload: task,
    })
  ).catch(
    error => dispatch({
      type: TASK_UPDATE_FAILURE,
      payload: error,
    })
  )
}

export const deleteTask = (id,fk) => dispatch => {
  dispatch({type: TASK_DELETE_REQUEST})
  del(id,fk).then(
    ({count}) => dispatch({
      type: TASK_DELETE_SUCCESS,
      payload: count,
    })
  ).catch(
    error => dispatch({
      type: TASK_DELETE_FAILURE,
      payload: error,
    })
  )
}

export const clearSaveTask = () => ({
  type:TASK_SAVE_CLEAR,
})

export const setCurrentTaskField = (field,value) => ({
  type:CURRENT_TASK_FIELD_SET,
  payload:{
    field,
    value,
  },
})

//Se usa una especifica para el tipo porque se debe cambiar tambien el payload por default
export const setCurrentTaskType = (type, defaultPayload) => ({
  type:CURRENT_TASK_TYPE_SET,
  payload:{
    type,
    taskPayload:defaultPayload
  },
})

//Actions especificas para tarea de tipo Multiple-Choice
export const mcActions = {
  setSlogan: slogan => ({
    type: MC_TASK_SLOGAN_SET,
    payload: slogan
  }),
  addOption: option => ({
    type:MC_TASK_OPTION_ADD,
    payload:{
      ...option,
    },
  }),
  updateOption: (index, option) => ({
    type:MC_TASK_OPTION_UPDATE,
    payload:{
      index,
      option,
    },
  }),
  deleteOption: index => ({
    type:MC_TASK_OPTION_DELETE,
    payload:index,
  })
}

//Actions especificas para tarea de tipo Free Answer
export const faActions = {
  setSlogan: slogan => ({
    type:FA_TASK_SLOGAN_SET,
    payload:slogan,
  }),
  setAnswer: answer => ({
    type:FA_TASK_ANSWER_SET,
    payload:answer,
  })
}

//Actions especificas para tarea de tipo Location
export const ltActions = {
  setSlogan: slogan => ({
    type:LT_TASK_SLOGAN_SET,
    payload:slogan,
  }),
  setDescription: description => ({
    type:LT_TASK_DESCRIPTION_SET,
    payload:description,
  })
}

//Actions especificas para tarea de tipo Multimedia
export const mtActions = {
  setSlogan: slogan => ({
    type:MT_TASK_SLOGAN_SET,
    payload:slogan,
  }),
  setMultimediaType: multimedia_type => ({
    type:MT_TASK_MULTIMEDIA_TYPE_SET,
    payload:multimedia_type,
  })
}