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
		this.network = new vis.Network(container, this.props.data, this.props.options);
	}
}

export default VisNetwork;
