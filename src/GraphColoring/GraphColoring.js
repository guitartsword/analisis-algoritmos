import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import vis from 'vis';
import VisNetwork from '../VisNetwork/VisNetwork';
import swal from 'sweetalert';
const COLORS = {
	1: 'green',
	2: 'orange',
	4: 'red',
	8: 'yellow',
	16: 'magenta',
	32: 'cyan',
	64: 'blue',
	128: 'gray',
	256: 'gold',
	512: 'brown',
	1024: 'purple',
	2048: 'palevioletred',
	4096: 'crimson',
	8192: 'rosybrown'
};
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
					springLength: 300,
					springConstant: 0.02,
					avoidOverlap: 0.18
				},
				minVelocity: 0.75
			},
			manipulation: {
				enabled: true,
				initiallyActive:true
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
				<Button
					bsStyle="primary"
					name="addInterconectedNodes"
					onClick={this.handleClick}
				>
						Agregar Nodos Interconectados
				</Button>
				<VisNetwork data={this.data} options={this.options}/>
				<Button
					bsStyle="success"
					name="calculateDSatur"
					onClick={this.handleClick}
				>
					Calcular con DSatur Algorithm
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
			addInterconectedNodes: () => {
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

					let newData = VisNetwork.createCompleteGraph(cantidad);
					this.data.nodes.add(newData.nodes);
					this.data.edges.add(newData.edges);
					//this.data.network.stabilize();
				});
			},
			calculateDSatur: () => {
				let nodeList = this.data.nodes.getIds();
				let network = this.data.network;

				nodeList.sort((a,b)=>{
					const alength = network.getConnectedNodes(a).length;
					const blength = network.getConnectedNodes(b).length;
					return blength - alength;
				});
				let totalColors = 0;
				const startTime = performance.now();
				nodeList.forEach((node)=>{
					let connectedNodes  = network.getConnectedNodes(node);
					let colorsValue = 0;
					connectedNodes.forEach((connected) => {
						let nodeData = this.data.nodes.get(connected);
						if(nodeData.value !== undefined){
							colorsValue |= nodeData.value;
						}
					});
					let i = 0;
					do{
						let updateNode = this.data.nodes.get(node);
						updateNode.color = {background: COLORS[1 << i]};
						updateNode.value = 1 << i;
						if(i > totalColors){
							totalColors = i;
						}
						this.data.nodes.update(updateNode);
					}while(colorsValue & (1 << i++));
				});
				const endTime = performance.now();
				swal(
					`Cantidad de colores minimo encontrado es: ${totalColors + 1}`,
					`Se tardo ${endTime -startTime} milisegundos en realizar`,
					'info'
				);
			}
		};
		clickEvents[event.target.name]();
	}
}

export default GraphColoring;