import React, { Component } from 'react'
import { Form, TextArea} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import intl from 'react-intl-universal'
import {
  ltActions,
} from '../../actions/tasks'

class LocationTaskComponent extends Component {

  render() {

    const {
      payload:{
        slogan,
        description,
      },
      actions:{
        setSlogan,
        setDescription,
      }
    } = this.props

    return(
      <Form>
        <br/>
        <Form.Input label={intl.get("LOCATION_OBJECTIVE")} placeholder={intl.get("LOCATION_OBJECTIVE")} onChange={(e,{value}) => setSlogan(value)} value={slogan} />
        <h5>{intl.get("LOCATION_DESCRIPTION")}</h5>
        <TextArea placeholder={intl.get("LOCATION_DESCRIPTION")} onChange={(e,{value}) => setDescription(value)} value={description} />
      </Form>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setSlogan:ltActions.setSlogan,
      setDescription:ltActions.setDescription,
    }, dispatch)
  }
}

export default connect(null,mapDispatchToProps)(LocationTaskComponent)