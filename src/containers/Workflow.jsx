import React, { Component } from 'react'
import { Button, Dropdown, Header, ButtonGroup, Icon, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import intl from 'react-intl-universal'

import {
	PENDING,
	SUCCESS,
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


class ActivityWorkflow extends Component {

	constructor(props) {
		super(props);
		this.state = {
			order: FREE,
			edges: [],
			cyclesWorkflow: false
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

	componentDidUpdate(prevProps) {
		const {
			index,
			status,
		} = this.props

		if (prevProps.status !== status && status !== PENDING) {
			const edges = index.reduce(
				((edges, task) => [...edges, ...task.requiredTasks.map(source => ({ source, target: task.id, type: "emptyEdge" }))]),
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

	changeDropdownValue = (e, { value }) => this.setState(() => ({ order: value }))

	setEdges = (edges) => {
		this.setState(() => ({ edges }))
	}

	isNotAnAcyclicWorkflow() {
		if (this.state.order !== CUSTOMIZED) {
			console.log("NOT COSTUMIZED")
			return true
		}
		let dict = {}
		this.state.edges.forEach((edge) => {
			if (!dict[edge.source]) {
				dict[edge.source] = []
			}
			dict[edge.source].push(edge.target)

		})
		var visited = []
		var nodes = []
		this.props.index.forEach((task) => {
			nodes.push(task.id)
		})
		for (const node in nodes) {
			if (!visited.includes(nodes[node])) {
				visited.push(nodes[node])
				if (dict[nodes[node]]) {
					const res = this.dfs(nodes[node], dict, visited)
					if (!res) { return false }
				}
			}
		}
		return true
	}

	dfs(node, adjacent, visited) {
		for (const pos in adjacent[node]) {
			if (!visited.includes(adjacent[node][pos])) {
				visited.push(adjacent[node][pos])
				if (adjacent[adjacent[node][pos]]) {
					const res = this.dfs(adjacent[adjacent[node][pos]], adjacent, visited)
					if (!res) { return false }
				}
			} else {
				return false
			}
		}
		return true
	}

	deleteAllEdges() {
		this.setState({ ...this.state, edges: [], cyclesWorkflow: false })
	}

	changeCyclesWorkflow() {
		this.setState({ ...this.state, cyclesWorkflow: !this.state.cyclesWorkflow })
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
			{ key: 0, value: FREE, text: intl.get('WORKFLOW_FREE') },
			{ key: 1, value: SECUENTIAL, text: intl.get('WORKFLOW_SECUENTIAL') },
			{ key: 2, value: CUSTOMIZED, text: intl.get('WORKFLOW_CUSTOMIZED') }
		]
		const list = [

		]


		return status === SUCCESS ? (
			<div className="background">
				<div className="container">
					<Header as='h3'>{intl.get('WORKFLOW_TITLE')}</Header>
					<Dropdown
						selection
						placeholder=''
						value={this.state.order}
						options={orderOptions}
						onChange={this.changeDropdownValue.bind(this)}
					/>
					{this.state.order === CUSTOMIZED &&
						<Message header='Como utilizar:' list={[
							intl.get('WORKFLOW_ADD_EDGE'),
							intl.get('WORKFLOW_MOVE_NODE'),
							intl.get('WORKFLOW_DELETE_NODES'),
						]} />
					}
					<div id='graph' style={{ margin: 30 }}>
						<Workflow tasks={index} order={this.state.order} edges={this.state.edges} setEdges={this.setEdges.bind(this)} />
					</div>
					{this.state.cyclesWorkflow &&
						<Message warning
							header="Error, existen ciclos"
							content="No es posible asignar este workflow, existen ciclos entre las tareas"
						/>
					}
					{this.state.order === CUSTOMIZED &&
						<Button basic color='blue' floated='left' onClick={this.deleteAllEdges.bind(this)}><Icon name='undo' />{intl.get("CLEAN_WORKFLOW")}</Button>
					}
					<ButtonGroup floated='right'>
						<Button basic color='grey' floated='right' onClick={() => history.push('/Activity/' + this.props.match.params.id)}><Icon name='arrow left' />{intl.get("DISCARD_ACTIVITY")}</Button>
						<Button basic primary onClick={() => {
							if (this.isNotAnAcyclicWorkflow()) {
								setWorkflow(this.state.edges, index)
								history.push('/Activity/' + this.props.match.params.id)
							} else {
								this.changeCyclesWorkflow()
							}
						}}><Icon name='save' />{intl.get('SAVE')}</Button>
					</ButtonGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ActivityWorkflow))