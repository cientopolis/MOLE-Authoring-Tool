import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getActivities,
  deleteActivity,
  saveActivity,
  setField,
  resetGet,
} from '../actions/activities'

import { OUTDATED, SUCCESS } from '../constants/status'
import { ACTIVITY } from '../constants/helpers'
import ListItem from '../components/ListItem'
import StatusList from '../components/StatusList'
import CreationModal from '../components/CreationModal'
import logo from '../assets/resuelvo_explorando_logo.png'
import '../styles/Home.css'
import '../styles/General.css'

class HomeContainer extends Component {

  constructor(props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)
    this.state = {
      creatingActivity: false,
      validationError: false,
    }
  }

  componentDidMount() {
    const {
      getActivities,
      resetGet,
    } = this.props.actions
    
    getActivities()
    resetGet()
  }

  componentDidUpdate(prevProps) {
    this.checkIndexStatus()
    this.checkActivityJustSaved(prevProps)
  }

  checkIndexStatus() {
    const {
      status,
      actions: {
        getActivities,
      }
    } = this.props

    if (status===OUTDATED) getActivities()
  }

  checkActivityJustSaved(prevProps) {
    const {
      saveStatus,
      savedActivity,
      history,
    } = this.props

    if (prevProps.saveStatus !== saveStatus && saveStatus === SUCCESS) {
      history.push(`/Activity/${savedActivity.id}`)
    }
  }

  toggleModal = () => this.setState(state => ({creatingActivity: !state.creatingActivity}))

  render() {

    const {
      history,
      activities,
      status,
      saveStatus,
      newActivity: {
        title,
        description,
      },
      actions: {
        deleteActivity,
        saveActivity,
        setField,
      }
    } = this.props

    return (
      <div id="Home" className="background">
        <header className="header">
          <Header>
            Bienvenido a la herramienta de configuración de Resuelvo Explorando.
          </Header>
        </header>
        <img src={logo} className="logo" alt="logo" />
        <StatusList status={status} items={activities} render_item={
          activity => (
            <ListItem
              name={activity.title}
              key={activity.id}
              del={() => deleteActivity(activity.id)}
              load={() => history.push(`/Activity/${activity.id}`)}
            />
          )
        }/>
        <Button primary onClick={this.toggleModal}>Crear Nueva Actividad</Button>
        <CreationModal
            open={this.state.creatingActivity}
            toggle={this.toggleModal}
            status={saveStatus}
            item={this.props.newActivity}
            validationError={this.state.validationError}
            itemType={ACTIVITY}
            actions={({
              setField:setField,
              save:() => {
                if(title !== '' && description !== '') {
                  saveActivity({title, description})
                } else {
                  this.setState(() => ({validationError:true}))
                }
              }
            })}
        />
      </div>  
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      getActivities,
      deleteActivity,
      saveActivity,
      setField,
      resetGet,
    }, dispatch)
  }
}

function mapStateToProps({activities}) {
  const {
    index:{
      activities: index,
      status,
    },
    save:{
      status: saveStatus,
      last: savedActivity
    },
    get:{
      activity: newActivity,
    },
  } = activities
  return {
    activities: index,
    status,
    newActivity,
    saveStatus,
    savedActivity,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HomeContainer))