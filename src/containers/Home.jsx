import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Header, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import intl from 'react-intl-universal'

import {
  getActivities,
  deleteActivity,
  saveActivity,
  setField,
  resetGet,
} from '../actions/activities'

import {
  setLanguage,
} from '../actions/configuration'

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

    if (status === OUTDATED) getActivities()
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

  toggleModal = () => this.setState(state => ({ creatingActivity: !state.creatingActivity }))

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
      lang,
      actions: {
        deleteActivity,
        saveActivity,
        setLanguage,
        setField,
      }
    } = this.props

    const languageOptions = [
      { key: 'es-ES', text: 'Espanol', value: 'es-ES' },
      { key: 'en-US', text: 'English', value: 'en-US' },
    ]

    return (
      <div id="Home" className="background">
        <header className="header">
          <Header>
            {intl.get('WELCOME_TITLE')}
          </Header>
          <Dropdown
            button
            className='icon'
            icon='world'
            options={languageOptions}
            value={lang}
            onChange={(event, data) => setLanguage(data.value)}
          />
          <a href="MOLE-app.apk" target='_blank' download>
            <Button><i aria-hidden="true" class="download icon"></i> {intl.get("DOWNLOAD_APK")}</Button>
          </a>
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
        } />
        <Button basic primary onClick={this.toggleModal}>{intl.get('CREATE_NEW_ACTIVITY')}</Button>
        <CreationModal
          open={this.state.creatingActivity}
          toggle={this.toggleModal}
          status={saveStatus}
          item={this.props.newActivity}
          validationError={this.state.validationError}
          itemType={ACTIVITY}
          actions={({
            setField: setField,
            save: () => {
              if (title !== '' && description !== '') {
                saveActivity({ title, description })
              } else {
                this.setState(() => ({ validationError: true }))
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
    actions: bindActionCreators({
      getActivities,
      deleteActivity,
      saveActivity,
      setField,
      setLanguage,
      resetGet,
    }, dispatch)
  }
}

function mapStateToProps({ activities, configuration }) {
  const {
    index: {
      activities: index,
      status,
    },
    save: {
      status: saveStatus,
      last: savedActivity
    },
    get: {
      activity: newActivity,
    },
  } = activities
  return {
    activities: index,
    status,
    newActivity,
    saveStatus,
    savedActivity,
    lang: configuration.language,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeContainer))