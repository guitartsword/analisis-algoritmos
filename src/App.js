import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import vis from 'vis';

class App extends Component {
  constructor(props){
    super(props);
    // create an array with nodes
    const nodesArray = [
    ];
    // create an array with edges
    const edgesArray = [
    ];
    //Create a network
    this.data = {
      nodes: new vis.DataSet(nodesArray),
      edges: new vis.DataSet(edgesArray)
    };
    this.options = {};
    this.startNetwork = this.startNetwork.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = ({
      city:''
    });
    this.cityList = [];
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
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
        <div id="network"></div>
        
      </div>
    );
  }
  componentDidMount() {
    this.network = this.startNetwork(document.getElementById('network'));
  }
  handleClick(event){
    if(!this.state.city.trim()){
      alert('La ciudad tiene que tener un nombre');
      return
    }
    try {
      this.data.nodes.add({
        id:this.state.city,
        label:this.state.city
      });
      this.data.nodes.forEach((city)=>{
        if(city.id !== this.state.city)
          this.data.edges.add({
            from:this.state.city,
            to: city.id,
            label: Math.ceil(Math.random()*10) + 'km',
            font: {align:'horizontal'}
          });
      })
      this.cityList.shift(this.state.city);
    } catch (error) {
      alert(`Ciudad con nombre ${this.state.city} no se puede agregar`);
    }
  }
  handleInputChange(event){
		this.setState({
			[event.target.name]:event.target.value
		});
	}
  startNetwork(container) {
    let data = this.data;
    let options = this.options;
    let network = new vis.Network(container, data, options);
    return network;
  }
}

export default App;
