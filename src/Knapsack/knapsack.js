import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import swal from 'sweetalert';

let x = 300;
const y = 100;
let ctx = '';
const backpack = new Image();
const box = new Image();
let x1 = 310;
let item = "";
let starTime = 0.0;
let endTime = 0.0;

class knapsack extends Component{
	constructor(){
		super();
		this.state = ({
			name: '',
			value:'',
			amount:''
		});

		this.weight = 1;
		this.productList = [];
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		swal({
			title: 'Knapsack',
			text: 'Es un problema de complejidad computacional, donde se tiene un arreglo del peso de los objetos y su respectivo valor monetario, pero para ello ocupamos primero que nos de la capacidad de la mochila. La capacidad de la mochila definida por usted es:',
			content: 'input',
		})
			.then((value) => {
				this.weight = value || 1;
				ctx.fillText("Peso de la mochila: "+this.weight, 50, 40 );
			});

		ctx = document.getElementById('canvas').getContext('2d');
		backpack.src = 'http://maxpixel.freegreatpicture.com/static/photo/1x/Trip-Bag-Hiking-Backpack-Travel-Luggage-Outdoors-145841.png';
		backpack.onload = () =>{
			ctx.clearRect(0, 0, 1400, 300); // clear canvas
			ctx.drawImage(backpack, 40, 50, 200, 200);
			ctx.font = "15px Courier"
		};
	}

	render(){
		return(
			<div>
				<header className="App-header">
					<h1 className="App-title">Knapsack</h1>
				</header>

				<canvas id="canvas" width="1300" height="300"></canvas>

				<FormGroup>

					<ControlLabel>Nuevo Producto</ControlLabel>
					{/* Product name */}
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
					Agregar Producto
				</Button>

				<Button
					bsStyle = "success"
					name = "knapsack"
					onClick = {this.onClick}>
					Empezar Algoritmo
				</Button>

				<Button
					bsStyle = "primary"
					name = "clear"
					onClick = {this.handleClick}>
					Limpiar Todo
				</Button>
			</div>
		);
	}
	//eventos que ocupe
	handleInputChange(event){
		this.setState({
			[event.target.name]: event.target.value
		});
	}
  handleClick(event){
		const clickEvents = {
			addProduct: () =>{
				if(!this.state.name.trim() || !this.state.value.trim() || !this.state.amount.trim()){
					alert("Uno de los campos esta vacio!");
					return
				}else{
					this.productList.push({name: this.state.name, value: this.state.value, amount: this.state.amount});

					ctx = document.getElementById('canvas').getContext('2d');
					box.src = 'https://cdn0.iconfinder.com/data/icons/ie_Bright/512/box_wooden.png';
					box.onload = () => {
						ctx.font = "15px Courier"
						ctx.fillText(this.state.name, x1, y);
						ctx.fillText("Valor:"+this.state.value, x1, 210);
						ctx.fillText("Cantidad:"+this.state.amount, x1, 250);
						ctx.drawImage(box,x,y,90,90);
						x+= 120;
						x1+=120;
					}
				}
			},

			clear: ()=>{
				ctx = document.getElementById('canvas').getContext('2d');
				backpack.src = 'http://maxpixel.freegreatpicture.com/static/photo/1x/Trip-Bag-Hiking-Backpack-Travel-Luggage-Outdoors-145841.png';
				backpack.onload = () =>{
					ctx.clearRect(0, 0, 1400, 300); // clear canvas
					ctx.drawImage(backpack, 40, 50, 200, 200);
			}
			this.productList = [];
			item = "";
			ctx.fillText("Peso de la mochila: "+this.weight, 50, 40 );
		}

		};
		clickEvents[event.target.name]();
  }
  //function that returns maximun
  max(a,b){
    return (a>b)? a:b;
  }
	//function Knapsack
  knapsack = () =>{
    var k = [];
    for(var y = 0; y < this.productList.length+1; y++){
      k[y]=[];
      for(var x=0; x < this.weight+1; x++){
        k[y][x]=0;
      }
    }
		starTime = performance.now();
    for(var i = 0; i <= this.productList.length; i++){
      for(var j = 0; j <= this.weight; j++){
        if(i===0 || j===0){
          k[i][j]=0;
        }else if(this.productList[i-1].amount <= j){
          k[i][j] = this.max(parseInt(this.productList[i-1].value) + parseInt(k[i-1][j-this.productList[i-1].amount]), k[i-1][j]);
        }else{
          k[i][j] = k[i-1][j];
          //al parecer aqui es donde funciona y donde debo de guardar
        }
      }
    }
		endTime = performance.now();
    i = this.productList.length;
    var w = this.weight;
    while(i && w > 0 ){
      if(k[i][w] !== k[i-1][w]){
        item += this.productList[i-1].name+",";
        w = w - parseInt(this.productList[i-1].amount);
        i = i - 1;
      }else{
        i = i - 1;
      }
    }
    return k[this.productList.length][this.weight];
  }

  onClick = () => {
    swal("Solucion",`El tiempo que nos tardamos en poder clacular la maxima ganancias es de: ${endTime-starTime} milisegundos.Las ganancias maximas es: `+this.knapsack()+ "LPS, con objectos: "+item, 'success');
		endTime = 0.0;
		starTime = 0.0;
		item = "";

  }

}

export default knapsack;
