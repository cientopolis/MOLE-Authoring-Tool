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
  MT_TASK_SLOGAN_SET,
  MT_TASK_MULTIMEDIA_TYPE_SET,
} from '../constants/tasks'

import {
  UNSET,
  PENDING,
  SUCCESS,
  FAILURE,
  OUTDATED,
} from '../constants/status'

const initialState = {
  index:{
    tasks:[],
    status:UNSET,
    error:UNSET,
  },
  get:{
    task:{
      name:'',
      description:'',
      type:UNSET,
      payload:UNSET,
      requiredTasks:[],
    },
    status:UNSET,
    error:UNSET,
  },
  save:{
    status:UNSET,
    error:UNSET,
    last:UNSET,
  },
  update:{
    status:UNSET,
    error:UNSET,
    last:UNSET,
  },
  del:{
    status:UNSET,
    error:UNSET,
    last:UNSET,
  }
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_REQUEST:
      return {
        ...state,
        index:{
          ...state.index,
          status:PENDING,
        }
      }
    case TASKS_SUCCESS:
      return {
        ...state,
        index:{
          status:SUCCESS,
          tasks:action.payload,
        }
      }
    case TASKS_FAILURE:
      return {
        ...state,
        index:{
          ...state.index,
          status:FAILURE,
          error:action.payload,
        }
      }
    case TASK_GET_REQUEST:
      return {
        ...state,
        get:{
          ...state.get,
          status:PENDING,
        }
      }
    case TASK_GET_SUCCESS:
      return {
        ...state,
        get:{
          ...state.get,
          status:SUCCESS,
          task:action.payload,
        }
      }
    case TASK_GET_FAILURE:
      return {
        ...state,
        get:{
          ...state.get,
          status:FAILURE,
          error:action.payload,
        }
      }
    case TASK_GET_RESET:
      return {
        ...state,
        get:initialState.get,
      }
    case TASK_SAVE_REQUEST:
      return {
        ...state,
        save:{
          ...state.save,
          status:PENDING,
        }
      }
    case TASK_SAVE_SUCCESS:
      return {
        ...state,
        index:{
          ...state.index,
          status:OUTDATED,
        },
        save:{
          ...state.save,
          status:SUCCESS,
          last:action.payload,
        }
      }
    case TASK_SAVE_FAILURE:
      return {
        ...state,
        save:{
          ...state.save,
          status:FAILURE,
          error:action.payload,
        }
      }
    case TASK_SAVE_CLEAR:
      return {
        ...state,
        save:{
          ...initialState.save
        }
      }
    case TASK_UPDATE_REQUEST:
      return {
        ...state,
        update:{
          ...state.update,
          status:PENDING,
        }
      }
    case TASK_UPDATE_SUCCESS:
      return {
        ...state,
        index:{
          ...state.index,
          status:OUTDATED,
        },
        update:{
          ...state.update,
          status:SUCCESS,
          last:action.payload,
        }
      }
    case TASK_UPDATE_FAILURE:
      return {
        ...state,
        update:{
          ...state.update,
          status:FAILURE,
          error:action.payload,
        }
      }
    case TASK_DELETE_REQUEST:
      return {
        ...state,
        del:{
          ...state.del,
          status:PENDING,
        }
      }
    case TASK_DELETE_SUCCESS:
      return {
        ...state,
        index:{
          ...state.index,
          status:OUTDATED,
        },
        del:{
          ...state.del,
          status:SUCCESS,
        }
      }
    case TASK_DELETE_FAILURE:
      return {
        ...state,
        del:{
          ...state.del,
          status:FAILURE,
          error:action.payload,
        }
      }
    case CURRENT_TASK_FIELD_SET:
      const {
        payload:{
          field,
          value,
        }
      } = action
      return {
        ...state,
        status:OUTDATED,
        get:{
          ...state.get,
          task:{
            ...state.get.task,
            [field]:value,
            code:(field === "name") ? value : state.get.task.code
          }
        }
      }
    case CURRENT_TASK_TYPE_SET:
      const {
        type,
        taskPayload,
      } = action.payload
      return {
        ...state,
        status:OUTDATED,
        get:{
          ...state.get,
          task:{
            ...state.get.task,
            type:type,
            payload:taskPayload,
          }
        }
      }
    //Case especificos de tareas Multiple Choice
    case MC_TASK_SLOGAN_SET:
      return {
        ...state,
        get: {
          ...state.get,
          status: OUTDATED,
          task: {
            ...state.get.task,
            payload: {
              ...state.get.task.payload,
              slogan:action.payload,
            }
          }
        }
      }
    case MC_TASK_OPTION_ADD:
      return {
        ...state,
        get:{
          ...state.get,
          status:OUTDATED,
          task:{
            ...state.get.task,
            payload:{
              ...state.get.task.payload,
              options:[...state.get.task.payload.options, action.payload],
            }
          }
        },
      }
    case MC_TASK_OPTION_UPDATE:
      return {
        ...state,
        get:{
          ...state.get,
          status:OUTDATED,
          task:{
            ...state.get.task,
            payload:{
              ...state.get.task.payload,
              options:state.get.task.payload.options.map((option,index) => (index===action.payload.index) ? action.payload.option : option),
            },
          }
        }
      }
    case MC_TASK_OPTION_DELETE:
      return {
        ...state,
        get:{
          ...state.get,
          status:OUTDATED,
          task:{
            ...state.get.task,
            payload:{
              ...state.get.task.payload,
              options:state.get.task.payload.options.filter((option,index) => (index!==action.payload)),
            },
          }
        }
      }
    //Case especificos de tareas Free Answer    
    case FA_TASK_ANSWER_SET:
      return {
        ...state,
        get:{
          ...state.get,
          status:OUTDATED,
          task:{
            ...state.get.task,
            payload:{
              ...state.get.task.payload,
              answer:action.payload,
            }
          }
        }
      }
    case FA_TASK_SLOGAN_SET:
      return {
        ...state,
        get:{
          ...state.get,
          status:OUTDATED,
          task:{
            ...state.get.task,
            payload:{
              ...state.get.task.payload,
              slogan:action.payload,
            }
          }
        }
      }
    //Case especificos de tareas Multimedia
    case MT_TASK_SLOGAN_SET:
      return {
        ...state,
        get:{
          ...state.get,
          status:OUTDATED,
          task:{
            ...state.get.task,
            payload:{
              ...state.get.task.payload,
              slogan:action.payload,
            }
          }
        }
      }
    case MT_TASK_MULTIMEDIA_TYPE_SET:
      return {
        ...state,
        get:{
          ...state.get,
          status:OUTDATED,
          task:{
            ...state.get.task,
            payload:{
              ...state.get.task.payload,
              multimedia_type:action.payload,
            }
          }
        }
      }
    default:
      return state 
  }
}

export default taskReducer