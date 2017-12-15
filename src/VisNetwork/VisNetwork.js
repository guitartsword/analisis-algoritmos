import React, { Component } from 'react';
import vis from 'vis';

class VisNetwork extends Component {
	render() {
		return (
			<div id="network">
			</div>
		);
	}
	componentDidMount() {
		const container = document.getElementById('network');
		this.props.data.network = new vis.Network(container, this.props.data, this.props.options);
	}
	static getScaleFreeNetwork(nodeCount) {
		let nodes = [];
		let edges = [];
		let connectionCount = [];
	
		// randomly create some nodes and edges
		for (let i = 0; i < nodeCount; i++) {
			nodes.push({
				id: i,
				label: String(i)
			});
	
			connectionCount[i] = 0;
	
			// create edges in a scale-free-network way
			if (i === 1) {
				let from = i;
				let to = 0;
				edges.push({
					from: from,
					to: to
				});
				connectionCount[from]++;
				connectionCount[to]++;
			}
			else if (i > 1) {
				let conn = edges.length * 2;
				let rand = Math.floor(Math.random() * conn);
				let cum = 0;
				let j = 0;
				while (j < connectionCount.length && cum < rand) {
					cum += connectionCount[j];
					j++;
				}
	
	
				let from = i;
				let to = j;
				edges.push({
					from: from,
					to: to
				});
				connectionCount[from]++;
				connectionCount[to]++;
			}
		}
	
		return {nodes:nodes, edges:edges};
	}
	static getScaleFreeNetworkSeeded(nodeCount, seed=Math.ceil(Math.random()*1000)) {
		let randomSeed = parseInt(seed, 10) || seed;
		let nodes = [];
		let edges = [];
		let connectionCount = [];
		let edgesId = 0;
		let seededRandom = () => Math.floor(Math.sin(randomSeed++) * 10000);
		// randomly create some nodes and edges
		for (let i = 0; i < nodeCount; i++) {
			nodes.push({
				id: i,
				label: String(i)
			});
	
			connectionCount[i] = 0;
	
			// create edges in a scale-free-network way
			if (i === 1) {
				let from = i;
				let to = 0;
				edges.push({
					id: edgesId++,
					from: from,
					to: to
				});
				connectionCount[from]++;
				connectionCount[to]++;
			}
			else if (i > 1) {
				let conn = edges.length * 2;
				let rand = seededRandom() * conn;
				let cum = 0;
				let j = 0;
				while (j < connectionCount.length && cum < rand) {
					cum += connectionCount[j];
					j++;
				}
	
	
				let from = i;
				let to = j;
				edges.push({
					id: edgesId++,
					from: from,
					to: to
				});
				connectionCount[from]++;
				connectionCount[to]++;
			}
		}
	
		return {nodes:nodes, edges:edges};
	}
}

export default VisNetwork;
