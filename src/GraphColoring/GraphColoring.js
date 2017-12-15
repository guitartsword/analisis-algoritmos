import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import vis from 'vis';
import VisNetwork from '../VisNetwork/VisNetwork';
import swal from 'sweetalert';

class GraphColoring extends Component {
	constructor(props){
		super(props);
		const nodesArray = [];
		const edgesArray = [];
		this.data = {
			nodes: new vis.DataSet(nodesArray),
			edges: new vis.DataSet(edgesArray)
		};
		this.options = {
			edges: {
				color:{
					highlight:'grey'
				},
				smooth: false
			},
			physics: {
				barnesHut: {
					gravitationalConstant: -7000,
					centralGravity: 0.1,
					springLength: 100,
					springConstant: 0.07,
					avoidOverlap: 0.18
				},
				minVelocity: 0.75
			}
		};
		window.GColor = this;
		this.handleClick = this.handleClick.bind(this);
	}
	render(){

		return (
			<div>
				<Button
					bsStyle="primary"
					name="addMultipleNodes"
					onClick={this.handleClick}
				>
						Agregar Nodos
				</Button>
				<VisNetwork data={this.data} options={this.options}/>
				<Button
					bsStyle="success"
					name="calculateDSatur"
					onClick={this.handleClick}
				>
					Calculate con DSatur Algorithm
				</Button>
			</div>);
	}
	handleClick(event){
		const clickEvents = {
			addMultipleNodes: () => {
				swal('Ingrese la cantidad de nodos a agregar',{
					content: 'input'
				}).then((cantidad)=>{
					cantidad = parseInt(cantidad, 10) || 0;
					if(!cantidad){
						swal('No se agregaron nodos', 'Ingrese un numero valido', 'info');
						return;
					}
					this.data.nodes.clear();
					this.data.edges.clear();

					let newData = VisNetwork.getScaleFreeNetwork(cantidad);
					this.data.nodes.add(newData.nodes);
					this.data.edges.add(newData.edges);
					//this.data.network.stabilize();
				});
			},
			calculateDSatur: () => {
				swal('In progress', 'wait until finish', 'info');
			}
		};
		clickEvents[event.target.name]();
	}
}

export default GraphColoring;