import React, { Component } from 'react'
import { Form} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import intl from 'react-intl-universal'
import {
  mtActions,
} from '../../actions/tasks'
import {
  AUDIO,
  VIDEO,
  IMAGE,
} from '../../constants/taskTypes'

class MultimediaTaskComponent extends Component {

  render() {

    const {
      payload:{
        slogan,
        multimedia_type,
      },
      actions:{
        setSlogan,
        setMultimediaType,
      }
    } = this.props

    return(
      <Form>
        <br/>
        <Form.Input label={intl.get('MULTIMEDIA_TASK_OBJECTIVE')} placeholder={intl.get('MULTIMEDIA_TASK_OBJECTIVE')} onChange={(e,{value}) => setSlogan(value)} value={slogan} />
        <Form.Select
          name='multimedia_type'
          required
          label={intl.get('MULTIMEDIA_TASK_PICK_TYPE_OF_CONTENT')}
          defaultValue={multimedia_type}
          placeholder={intl.get('MULTIMEDIA_TASK_PICK_TYPE_OF_CONTENT')}
          onChange={(event, { value }) => setMultimediaType(value)}
          options={[
            { text:'Audio', value:AUDIO },
            { text:'Foto', value:IMAGE },
            { text:'Video', value:VIDEO },
          ]}
    />
      </Form>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setSlogan:mtActions.setSlogan,
      setMultimediaType:mtActions.setMultimediaType,
    }, dispatch)
  }
}

export default connect(null,mapDispatchToProps)(MultimediaTaskComponent)