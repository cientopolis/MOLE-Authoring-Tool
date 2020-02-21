import React, {Component} from 'react'
import { GraphView } from 'react-digraph'
import { SECUENTIAL, CUSTOMIZED, FREE } from '../constants/workflows'
import intl from 'react-intl-universal'

const NODE_KEY = "id"

const GraphConfig = {
	NodeTypes: {
    empty: { // required to show empty nodes
      typeText: intl.get('WORKFLOW_TASK') ,
			shapeId: "#empty", // relates to the type property of a node
			shape: (
				<symbol viewBox="0 0 100 100" id="empty" key="0">
					<circle cx="50" cy="50" r="30"></circle>
				</symbol>
			)
		},
	},
	NodeSubtypes: {},
	EdgeTypes: {
		emptyEdge: {  // required to show empty edges
			shapeId: "#emptyEdge",
			shape: (
				<symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
				</symbol>
			)
		}
	}
}

class Workflow extends Component {
  
  convertTasksToNodes = tasks => {
    const nodes = []
    var cont = 0
    tasks.forEach(task => {
      var xValue = cont * 150
      nodes.push({
        id: task.id,
        title: task.name,
        x: xValue,
        y: 0,
        type: "empty"
      })
      cont += 1
    });
    return nodes
  }

  edgesSecuencial = (nodes) => {
		const numberOfNodes = nodes.length
		var edges = []
		for (var i = 0; i < numberOfNodes - 1; i++) {
			edges.push({
        source: nodes[i].id,
				target: nodes[i + 1].id,
				type: "emptyEdge",
			})
		}
		return edges
  }
  
  onCreateEdge = order => (source, target) => {
    if (order === CUSTOMIZED) {
      this.props.setEdges(
        [
          ...this.props.edges,
          {
            source: source.id,
            target: target.id,
            type: "emptyEdge"
          }
        ]
      )
    }
  }
  
  constructor(props) {
    super(props)
    this.state = ({
      nodes:this.convertTasksToNodes(props.tasks),
    })
  }

  shouldComponentUpdate(nextProps) {
    
    const {
      order,
      setEdges,
    } = this.props

    if(order !== nextProps.order) {
      switch (nextProps.order) {
        case SECUENTIAL:
          setEdges(this.edgesSecuencial(this.state.nodes))
          break
        case FREE:
          setEdges([])
          break
        default:
          break
      }
    }
    return true
  }

  onDeleteEdge = order => (selectedEdge, edges) => {
    if (order === CUSTOMIZED) {
      console.log(edges)
      console.log(selectedEdge)
      // this.props.setEdges(
      //   // [
      //   //   ...this.props.edges,
      //   //   {
      //   //     source: source.id,
      //   //     target: target.id,
      //   //     type: "emptyEdge"
      //   //   }
      //   // ]
      // )
    }
  }

  render() {

    const {
      selected,
      nodes,
    } = this.state

    const {
      edges,
    } = this.props

    return (
      <div>
        <GraphView
          zoomDur={400}
          zoomDelay={100}
          nodeSize={100}
          nodeKey={NODE_KEY}
          nodes={nodes}
          edges={edges}
          selected={selected}
          nodeTypes={GraphConfig.NodeTypes}
          nodeSubtypes={GraphConfig.NodeSubtypes}
          edgeTypes={GraphConfig.EdgeTypes}
          onSelectNode={() => null}
          onCreateNode={() => null}
          onUpdateNode={() => null}
          onDeleteNode={() => console.log("NODO")}
          onSelectEdge={() => null}
          onCreateEdge={this.onCreateEdge.bind(this)(this.props.order)}
          onSwapEdge={() => null}
          onDeleteEdge={() => console.log("ACA")}
          // this.onDeleteEdge.bind(this)(this.props.order)
        />
      </div>
    )
  }
}

export default Workflow