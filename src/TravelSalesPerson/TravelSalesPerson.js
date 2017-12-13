import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import vis from 'vis';
import VisNetwork from '../VisNetwork/VisNetwork';
const clickEvents={
	addCity: (component)=>{
		if(!component.state.city.trim()){
			alert('La ciudad tiene que tener un nombre');
			return;
		}
		try {
			//Agregar nodo a vis
			component.data.nodes.add({
				id:component.state.city,
				label:component.state.city
			});
			//guardar una lista de nodo
			component.cityList.shift(component.state.city);
		} catch (error) {
			//cuando vis falla al agregar nodo
			alert(`Ciudad con nombre ${component.state.city} no se puede agregar`);
		}
		try{
			//Agregar edge a vis
			component.data.nodes.forEach((city)=>{
				if(city.id !== component.state.city)
					component.data.edges.add({
						from:component.state.city,
						to: city.id,
						label: Math.ceil(Math.random()*10) + 'km',
						font: {align:'horizontal'}
					});
			});
		} catch (error) {
			//cuando vis falla
			alert(`Ciudad con nombre ${component.state.city} no se puede agregar`);
		}
	}
};
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
			physics: {
				forceAtlas2Based: {
					gravitationalConstant: -26,
					centralGravity: 0.005,
					springLength: 230,
					springConstant: 0.18
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
		this.cityList = [];
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	render(){
		return (
			<div>
				<FormGroup>
					<ControlLabel>Nombre de la ciudad</ControlLabel>
					<FormControl
						type="text"
						placeholder="Tegucigalpa"
						value={this.state.city}
						name='city'
						onChange={this.handleInputChange}/>
				</FormGroup>
				<Button
					bsStyle="primary"
					name="addCity"
					onClick={this.handleClick}
				>
					AgregarCiudad
				</Button>
				<VisNetwork data={this.data} options={this.options}/>
			</div>
		);
	}
	handleInputChange(event){
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	handleClick(event){
		clickEvents[event.target.name](this);
	}
}

export default TravelSalesPerson;