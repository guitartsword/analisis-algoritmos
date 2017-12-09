import React, { Component } from 'react';
import  {Navbar, Nav, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import TravelSalesPerson from './TravelSalesPerson/TravelSalesPerson';
import Knapsack from './Knapsack/knapsack';
import './App.css';

class App extends Component {
	render() {
		const navbarInstance = (
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/analisis-algoritmos">Analisis de algoritmos</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<LinkContainer to="/knapsack">
							<NavItem>Knapsack</NavItem>
						</LinkContainer>
						<LinkContainer to="/tsp">
							<NavItem>Travel Sales Person</NavItem>
						</LinkContainer>
						{/*
						<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
							<MenuItem eventKey={3.1}>Action</MenuItem>
							<MenuItem eventKey={3.2}>Another action</MenuItem>
							<MenuItem eventKey={3.3}>Something else here</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={3.3}>Separated link</MenuItem>
						</NavDropdown>
					</Nav>
					<Nav pullRight>
						<NavItem eventKey={1} href="#">Link Right</NavItem>
						<NavItem eventKey={2} href="#">Link Right</NavItem>
					*/}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
		let Home = () => (
			<ul className="big-font">
				<li><Link to="/knapsack">Knapsack</Link></li>
				<li><Link to="/tsp">TravelSalesPerson</Link></li>
			</ul>
		);
		return (
			<Router >
				<div className="App">
					{navbarInstance}
					<Route exact path="/analisis-algoritmos" component={Home}></Route>
					<Route path="/" render={() => <Redirect to="/analisis-algoritmos"/>}></Route>
					<Route path="/knapsack" component={Knapsack}></Route>
					<Route path="/tsp" component={TravelSalesPerson}></Route>
				</div>
			</Router>
		);
	}
};

export default App;
