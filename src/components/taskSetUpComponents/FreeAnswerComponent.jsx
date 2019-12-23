import React, { Component } from 'react'
import { Form, TextArea} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import intl from 'react-intl-universal'
import {
  faActions,
} from '../../actions/tasks'

class FreeAnswerComponent extends Component {

  render() {

    const {
      payload:{
        slogan,
        answer,
      },
      actions:{
        setSlogan,
        setAnswer,
      }
    } = this.props

    return(
      <Form>
        <br/>
        <Form.Input label={intl.get("FREE_ANSWER_OBJECTIVE")} placeholder={intl.get("FREE_ANSWER_OBJECTIVE")} onChange={(e,{value}) => setSlogan(value)} value={slogan} />
        <h5>{intl.get("FREE_ANSWER_ANSWER_EXPECTED")}</h5>
        <TextArea placeholder={intl.get("FREE_ANSWER_ANSWER_EXPECTED")} onChange={(e,{value}) => setAnswer(value)} value={answer} />
      </Form>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setSlogan:faActions.setSlogan,
      setAnswer:faActions.setAnswer,
    }, dispatch)
  }
}

export default connect(null,mapDispatchToProps)(FreeAnswerComponent)