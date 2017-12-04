import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class knapsack extends Component{
  constructor(){
    super();
    this.state = ({
      name: '',
      value:'',
      amount:''
    });

    this.productList = [];
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    var backpack = new Image();
    function init() {
      backpack.src = 'http://maxpixel.freegreatpicture.com/static/photo/1x/Trip-Bag-Hiking-Backpack-Travel-Luggage-Outdoors-145841.png';
      window.requestAnimationFrame(draw);
    }

    function draw() {
      var ctx = document.getElementById('canvas').getContext('2d');

      ctx.clearRect(0, 0, 1400, 300); // clear canvas
      ctx.drawImage(backpack, 40, 50, 200, 200);

      window.requestAnimationFrame(draw);
    }
    init();
  }

  render(){
    return(
      <div>
        <header className="App-header">
          <h1 className="App-title">Knapsack</h1>
        </header>

        <canvas id="canvas" width="1400" height="300"></canvas>

        <FormGroup>

          <ControlLabel>Nuevo Producto</ControlLabel>
          {/* Product name! */}
          <FormControl
          type = 'text'
          placeholder = "Nombre"
          value = {this.state.name}
          name = 'name'
          onChange = {this.handleInputChange}/>
          {/*product value*/}
          <FormControl
          type = 'number'
          min = "1"
          placeholder = "Precio total"
          value = {this.state.value}
          name = 'value'
          onChange = {this.handleInputChange}/>
          {/*product amount*/}
          <FormControl
          type = 'number'
          min = "1"
          placeholder = "Cantidad del producto"
          value = {this.state.amount}
          name = 'amount'
          onChange = {this.handleInputChange}/>

        </FormGroup>

        <Button
					bsStyle="primary"
					name="addProduct"
					onClick={this.handleClick}>
					AgregarCiudad
				</Button>

      </div>
    )
  }
  //eventos que ocupe
  handleInputChange(event){
		this.setState({
			[event.target.name]: event.target.value
		});
	}
  handleClick(event){
    if(!this.state.name.trim() || !this.state.value.trim() || !this.state.amount.trim()){
      alert("Uno de los campos esta vacio!");
      return
    }else{
      this.productList.push({name: this.state.name, value: this.state.value, amount: this.state.amount});
      alert("productList------------>"+this.productList[0].value);

    }
  }
}

export default knapsack;
