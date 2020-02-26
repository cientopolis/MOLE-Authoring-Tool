import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  Home,
  Activity,
  Task,
  Workflow,
  QR,
} from '../containers'

class AppRoutes extends Component {
    render() {
      return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/activity/:id/task/:fk' component={Task}/>
            <Route path='/activity/:id/qr' component={QR}/>
            <Route path='/activity/:id/workflow' component={Workflow}/>
            <Route path='/activity/:id' component={Activity}/>
        </Switch>
      )
    }
  }
  
  export default AppRoutes