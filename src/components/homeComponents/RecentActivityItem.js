import React, { Component } from 'react'
import { Button, List } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setActivity } from '../../actions/currentActivityActions'
import { getActivity } from '../../helpers/APIFunctions'

class RecentActivityItemComponent extends Component {

  handleActivityLoad(activityId) {
    getActivity(activityId).then(
      (activity) => {
        this.props.actions.setActivity(activity)
        this.props.history.push('/activityCreation/activitySetUp')
      }
    )
  }

  render() {
    const {
      activity,
    } = this.props

    return (
      <List.Item>
        <List.Content floated='right'>
          <Button onClick={() => this.handleActivityLoad(activity._id)}>Cargar</Button>
        </List.Content>
        <List.Content>{activity.title}</List.Content>
      </List.Item>  
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setActivity,
    }, dispatch)
  }
}

export default connect(null,mapDispatchToProps)(withRouter(RecentActivityItemComponent))
