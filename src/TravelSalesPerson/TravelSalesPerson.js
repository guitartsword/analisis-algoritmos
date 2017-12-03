import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

	class TravelSalesPerson extends Component{
	constructor(props){
		super(props);
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
				<header className="App-header">
				<h1 className="App-title">Travel Sales Person</h1>
				</header>
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
			</div>
		)
	}
	handleInputChange(event){
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	handleClick(event){
		//console.log(this.props.data.nodes);
		if(!this.state.city.trim()){
			alert('La ciudad tiene que tener un nombre');
			return
		}
		try {
			//Agregar nodo a vis
			this.props.data.nodes.add({
				id:this.state.city,
				label:this.state.city
			});
			//guardar una lista de nodo
			this.cityList.shift(this.state.city);
		} catch (error) {
			//cuando vis falla al agregar nodo
			alert(`Ciudad con nombre ${this.state.city} no se puede agregar`);
		}
		try{
			//Agregar edge a vis
			this.props.data.nodes.forEach((city)=>{
				if(city.id !== this.state.city)
					this.props.data.edges.add({
						from:this.state.city,
						to: city.id,
						label: Math.ceil(Math.random()*10) + 'km',
						font: {align:'horizontal'}
					});
			});
		} catch (error) {
			//cuando vis falla
			alert(`Ciudad con nombre ${this.state.city} no se puede agregar`);
		}
	}
}

export default TravelSalesPerson;