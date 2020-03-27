import React, { Component } from 'react'
import { Button, Form, Icon, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import intl from 'react-intl-universal'
import {
  mcActions,
} from '../../actions/tasks'

class MultipleChoiceComponent extends Component {

  handleOptionChange(index, option, field, value) {
    this.props.actions.updateOption(index, {
      ...option,
      [field]: value,
    })
  }

  handleCreateSlogan

  render() {

    const {
      payload: {
        options,
        slogan,
      },
      actions: {
        addOption,
        deleteOption,
        setSlogan,
      }
    } = this.props

    return (
      <Form>
        <Form.Input label={intl.get("FREE_ANSWER_OBJECTIVE")} placeholder={intl.get("FREE_ANSWER_OBJECTIVE")} onChange={(e, { value }) => setSlogan(value)} value={slogan} />
        <Segment>
          {options.map((option, index) => (
            <Form.Group key={index}>
              <br />
              <Form.Input
                name='value'
                value={option.value}
                onChange={(event, { value, name }) => this.handleOptionChange(index, option, name, value)}
              />
              <Form.Checkbox
                name='isCorrect'
                label={intl.get("MULTIPLE_CHOICE_IS_RIGHT")}
                checked={option.isCorrect}
                onChange={(event, { value, name }) => this.handleOptionChange(index, option, name, !option.isCorrect)}
              />
              <Button basic color='red' onClick={() => deleteOption(index)}><Icon name='trash' /></Button>
            </Form.Group>))}
          <Button basic primary onClick={() => addOption({ value: '', isCorrect: false })}><Icon name='add' />{intl.get("MULTIPLE_CHOICE_ADD_OPTION")}</Button>
        </Segment>
      </Form>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setSlogan: mcActions.setSlogan,
      addOption: mcActions.addOption,
      updateOption: mcActions.updateOption,
      deleteOption: mcActions.deleteOption,
    }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(MultipleChoiceComponent)