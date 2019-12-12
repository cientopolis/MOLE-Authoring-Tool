import React, { Component } from 'react'
import { Button, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import {
	PENDING,
	SUCCESS,
	OUTDATED,
	UNSET,
} from '../constants/status'
import {
	FREE,
	SECUENTIAL,
	CUSTOMIZED,
} from '../constants/workflows'
import {
	getTasks,
} from '../actions/tasks'
import {
	setWorkflow,
} from '../actions/activities'
import Workflow from '../components/Workflow'


class ActivitySummaryContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			order: FREE,
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

	componentDidUpdate(prevProps, prevState) {
		const {
			index,
			status,
		} = this.props

		if(prevProps.status != status && status !== PENDING) {
			const edges = index.reduce(
				((edges, task) => [...edges, ...task.requiredTasks.map(source => ({source, target:task.id, type:"emptyEdge"}))]),
				[]
			)
			if (JSON.stringify(edges) !== JSON.stringify(this.state.edges)) {
				this.setState(() => ({
					edges,
					order: (edges !== []) ? CUSTOMIZED : FREE,
				}))			
			}
		}
	}

	changeDropdownValue = (e,{value}) => this.setState(() => ({order:value}))

	setEdges = (edges) => {
		this.setState(() => ({edges}))
	}

	render() {

		const {
			history,
			status,
			index,
			actions: {
				setWorkflow,
			}
		} = this.props

		const orderOptions = [
			{ key: 0, value: FREE, text: 'Libre' },
			{ key: 1, value: SECUENTIAL, text: 'Secuencial' },
			{ key: 2, value: CUSTOMIZED, text: 'Personalizada' }
		]

    if(status === OUTDATED || status === UNSET) getTasks(this.props.match.params.id)

		return status === SUCCESS ? (
			<div className="background">
				<div className="container">
					<header>Ordenando actividad title : description</header>
					<p>Sellecione el orden de las tareas:</p>
					<Dropdown
						selection
						placeholder=''
						value={this.state.order}
						options={orderOptions}
						onChange={this.changeDropdownValue.bind(this)}
					/>
					<div id='graph' style={{ margin: 30 }}>
						<Workflow tasks={index} order={this.state.order} edges={this.state.edges} setEdges={this.setEdges.bind(this)}/>
					</div>
					<Button onClick={() => {
						setWorkflow(this.state.edges, index)
						history.push('/Activity/' + this.props.match.params.id)
					}}>Finalizar</Button>
					<Button onClick={() => history.push('/Activity/' + this.props.match.params.id)}>Volver</Button>
				</div>
			</div>
		) : null
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ActivitySummaryContainer))