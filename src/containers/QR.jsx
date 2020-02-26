import React, { Component }  from 'react'
import { Button, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import intl from 'react-intl-universal'

import {
	getTasks,
} from '../actions/tasks'
import {
	setWorkflow,
} from '../actions/activities'


class QRContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			edges: [],
		}
	}

	componentDidMount() {
		const {
			actions: {
				getTasks,
			},
			match: {
				params: {
					id,
				}
			},
		} = this.props
		getTasks(id)
	}


	render() {

		const {
			history,
		} = this.props

		
		var QRCode = require('qrcode.react');

		return (
			<div className="background">
				<div className="container">
					<Header as='h3'>{intl.get('WORKFLOW_TITLE')}</Header>
					<QRCode value= {this.props.match.params.id} />
					<Button onClick={() => history.push('/Activity/' + this.props.match.params.id)}>{intl.get('BACK')}</Button>
				</div>
			</div>
		) 
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({
			getTasks,
			setWorkflow,
		}, dispatch)
	}
}

function mapStateToProps({ tasks }) {
	const {
		index: {
			tasks: index,
			status,
		}
	} = tasks
	return {
		index,
		status,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QRContainer))