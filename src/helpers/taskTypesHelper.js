import {
  MULTIPLE_CHOICE,
  FREE_ANSWER,
  MULTIMEDIA_TASK,
  LOCATION_TASK,
} from '../constants/taskTypes'

export default {
  [MULTIPLE_CHOICE]:{
    defaultPayload:{
      options:[]
    },
    name:'Multiple Choice'
  },
  [FREE_ANSWER]:{
    defaultPayload:{
      slogan:'',
      answer:'',
    },
    name:'Free answer'
  },
  [MULTIMEDIA_TASK]:{
    defaultPayload:{
      slogan:'',
      multimedia_type:'',
    },
    name:'Multimedia task'
  },
  [LOCATION_TASK]:{
    defaultPayload:{
      slogan:'',
      description:'',
    },
    name:'Location task'
  },

}