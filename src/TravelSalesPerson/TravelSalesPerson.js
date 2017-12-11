import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import vis from 'vis';
import VisNetwork from '../VisNetwork/VisNetwork';
import swal from 'sweetalert';
class TravelSalesPerson extends Component{
	constructor(props){
		super(props);
		const nodesArray = [];
		const edgesArray = [];
		this.data = {
			nodes: new vis.DataSet(nodesArray),
			edges: new vis.DataSet(edgesArray)
		};
		this.options = {
			nodes: {
				shape: 'dot',
				size: 16
			},
			edges: {
				color: {
					color:'white',
					highlight:'lightgray',
				}
			},
			physics: {
				forceAtlas2Based: {
					gravitationalConstant: -50,
					centralGravity: 0.005,
					springLength: 250,
					springConstant: 0.1
				},
				maxVelocity: 146,
				solver: 'forceAtlas2Based',
				timestep: 0.35,
				stabilization: {iterations: 150}
			}
		};
		this.state = ({
			city:''
		});
		this.cityList = {};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	render(){
		return (
			<div>
				<Button
					bsStyle="primary"
					name="addCity"
					onClick={this.handleClick}
				>
					AgregarCiudad
				</Button>
				<Button
					bsStyle="primary"
					name="addRandomCities"
					onClick={this.handleClick}
				>
					Agrgar Muchas Ciudades
				</Button>
				<VisNetwork data={this.data} options={this.options}/>
				<Button
					bsStyle="success"
					name="calculateGreedy"
					onClick={this.handleClick}
				>
					Calculate with Greedy Algorithm
				</Button>
			</div>
		);
	}
	handleInputChange(event){
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	handleClick(event){
		const clickEvents={
			addCity: ()=>{
				swal('Ingrese nombre para la ciudad', 'El nombre no se puede repetir', 'info',{
					content: 'input',
					buttons: {
						cancel: 'Cancelar',
						confirm: 'Agregar Ciudad'
					}
				}).then( (name) => {
					if(!name) return;
					if(!name.trim()) return;
					try {
						//Agregar nodo a vis
						this.data.nodes.add({
							id:name,
							label:name
						});
						//guardar una lista de nodo
						this.cityList[name] = [];
					} catch (error) {
						//cuando vis falla al agregar nodo
						swal('Ciudad ya existe', name, 'info');
					}
					try{
						//Agregar edge a vis
						this.data.nodes.forEach((city)=>{
							if(city.id !== name){
								let id = this.data.edges.add({
									from:name,
									to: city.id,
									label: Math.ceil(Math.random()*100) + 'km'
								});
								this.cityList[name].push(id);
								this.cityList[city.id].push(id);
							}
						});
					} catch (error) {
						//cuando vis falla al agregar una arista
						swal('Problema','Parece que no se crearon bien las aristas','error');
					}
				});
			},
			addRandomCities: ()=>{
				swal('Ingrese la cantidad de ciudades a agregar',{
					content: 'input'
				}).then((cantidad)=>{
					cantidad = parseInt(cantidad, 10) || 0;
					if(!cantidad){
						swal('No se agregaron ciudades', 'Ingrese un numero valido', 'info');
						return;
					}
					this.data.nodes.clear();
					this.data.edges.clear();
					const startTime = performance.now();
					for(let i=1; i<=cantidad; i++){
						try {
							//Agregar nodo a vis
							this.data.nodes.add({
								id:i,
								label:`Ciudad #${i}`
							});
							//guardar una lista de nodo
							this.cityList[i] = [];
						} catch (error) {
							//cuando vis falla al agregar nodo
							swal('Ciudad ya existe', i, 'info');
						}
						try {
							this.data.nodes.forEach((city)=>{
								if(city.id !== i){
									let id = this.data.edges.add({
										from:i,
										to: city.id,
										label: Math.ceil(Math.random()*100) + 'km'
									});
									this.cityList[i].push(id);
									this.cityList[city.id].push(id);
								}
							});
						} catch (error) {
							//cuando vis falla al agregar nodo
							swal('Ciudad ya existe', i, 'info');
						}
					}
					const endTime = performance.now();
					swal(
						`Tiempo para creaer ${cantidad} nodos`,
						`Se crearon ${cantidad} nodos y ${cantidad*(cantidad-1)} aristas en ${endTime - startTime} milisegundos`,
						'info'
					);
				});
			},
			calculateGreedy: () => {
				const startTime = performance.now();
				let cityVisit = {};
				let edgePath = [];
				let cityIds = this.data.nodes.getIds();
				let current, startCity;
				current = startCity = cityIds[0];
				let searchCurrent = (elem)=> elem == current;
				cityIds.splice(cityIds.findIndex(searchCurrent,1));
				while(current){
					let min, minEdge;
					const currentEdges = this.data.edges.get(this.cityList[current]);
					for (let path of currentEdges){
						if (!path) continue;
						cityVisit[current] = true;
						if(cityVisit[path.from] && cityVisit[path.to]) continue;
				
						let distance = parseInt(path.label.slice(0,-2), 10);
						if(!min){
							min = distance;
							minEdge = path;
						}else if(distance < min){
							min = distance;
							minEdge = path;
						}
					}
					if(!min)
						break;
					let from, to;
					from = minEdge.from == current ? minEdge.from : minEdge.to;
					to = minEdge.from == current ? minEdge.to : minEdge.from;
					current = minEdge.from == current ? minEdge.to : minEdge.from;
				
					minEdge.color = {color:'red', highlight:'red'};
					minEdge.arrows = 'to';
					minEdge.from = from;
					minEdge.to = to;
					edgePath.push(minEdge);
					cityIds.splice(cityIds.findIndex(searchCurrent),1);
				}
				let finalEdges = this.data.edges.get(cityIds[current]);
				for (let edge of finalEdges){
					if(edge.to == startCity || edge.from == startCity){
						edge.color = {color: 'red', highlight: 'red'};
						edge.arrows = 'to';
						edge.from = current;
						edge.to = startCity;
						edgePath.push(edge);
						break;
					}
				}
				this.data.edges.update(edgePath);
				const endTime = performance.now();
				let distance = 0;
				edgePath.forEach((edge)=>{
					distance += parseInt(edge.label.slice(0,-2), 10);
				});
				swal(
					`Tiempo para ruta mas corta con Greedy Algorithm es de ${distance} km`,
					`Se encontró la ruta mas corta en ${endTime - startTime} milisegundos`,
					'info'
				);
			}
		};
		clickEvents[event.target.name]();
	}
}

export default TravelSalesPerson;