import React, { Component } from 'react';
import TravelSalesPerson from './TravelSalesPerson/TravelSalesPerson'
import VertexCover from './VertexCover/vertexCover.js'
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
		this.cityList = [];
	}
	render() {
		return (
			<div className="App">
				<VertexCover/>
				<TravelSalesPerson data={this.data}/>
				<div id="network"></div>
			</div>
		);
	}
	componentDidMount() {
		const container = document.getElementById('network');
		this.network = new vis.Network(container, this.data, this.options);
	}
}

export default App;
