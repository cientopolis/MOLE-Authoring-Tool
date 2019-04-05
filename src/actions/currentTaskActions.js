import { 
  CURRENT_TASK_SET,
  CURRENT_TASK_CLEAR,
  CURRENT_TASK_FIELD_SET,
  CURRENT_TASK_TYPE_SET,
  MC_TASK_OPTION_ADD,
  MC_TASK_OPTION_UPDATE,
} from '../constants'

export const setCurrentTask = (task) => ({
  type:CURRENT_TASK_SET,
  payload:task,
})

export const clearCurrentTask = () => ({
  type:CURRENT_TASK_CLEAR,
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
export const addOptionToMCTask = (option) => ({
  type:MC_TASK_OPTION_ADD,
  payload:{
    ...option,
  },
})

export const updateMCTaskOption = (index,option) => ({
  type:MC_TASK_OPTION_UPDATE,
  payload:{
    index,
    option,
  },
})

