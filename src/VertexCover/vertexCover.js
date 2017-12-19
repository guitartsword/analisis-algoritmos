import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import vis from 'vis';
import VisNetwork from '../VisNetwork/VisNetwork';
import swal from 'sweetalert';

let answer = "";
let starTime = 0.0;
let endTime = 0.0;

class VertexCover extends Component {
  constructor(){
    super();
    const nodesArray = [];
    const edgesArray = [];
    this.data = {
      nodes: new vis.DataSet(nodesArray),
      edges: new vis.DataSet(edgesArray)
    };
    this.options = {
      edges: {
        color:{
          highlight:'grey'
        },
        smooth: false
      },
      physics: {
        barnesHut: {
          gravitationalConstant: -7000,
          centralGravity: 0.1,
          springLength: 100,
          springConstant: 0.07,
          avoidOverlap: 0.18
        },
        minVelocity: 0.75
      },
      manipulation: {
        enabled: true,
        initiallyActive: true
      }
    };
    window.vc = this;
    this.handleClick = this.handleClick.bind(this);
  }
  render(){
    return(
      <div>
      <header className="App-header">
      <h1 className="App-title">Vertex Cover</h1>
      </header>
      <VisNetwork data={this.data} options={this.options}/>

      <Button
      bsStyle = "primary"
      name = "addMultipleNodes"
      onClick = {this.handleClick}>
      Agregar Grafo
      </Button>

      <Button
      bsStyle = "success"
      name = "VertexCover"
      onClick = {this.handleClick}>
      Algoritmo de Aproximacion
      </Button>
      </div>
    );
  }

  handleClick(event){
    const clickEvents = {
      addMultipleNodes: () => {
        swal('Ingrese la cantidad de nodos a agregar',{
          content: 'input'
        }).then((cantidad)=>{
          cantidad = parseInt(cantidad, 10) || 0;
          if(!cantidad){
            swal('No se agregaron nodos', 'Ingrese un numero valido', 'info');
            return;
          }
          this.data.nodes.clear();
          this.data.edges.clear();

          let newData = VisNetwork.getScaleFreeNetwork(cantidad);
          this.data.nodes.add(newData.nodes);
          this.data.edges.add(newData.edges);
        });
      },
      VertexCover: () => {
        var visited = [];
        for(var i = 0; i< this.data.nodes.length; i++){
          visited[i] = false;
        }
        starTime = performance.now();
        var a;
        for(var u = 0; u < this.data.nodes.length; ++u){
          if(visited[u] === false){
            var adj = this.data.network.getConnectedNodes(u);
            for(a = adj[0]; a !== adj[adj.length-1]; a++ ){
              var v = adj[adj.length-1] - adj[0];
              if(visited[v] === false){
                visited[v] = true;
                visited[u] = true;
                break;
              }
            }
          }
        }
        endTime = performance.now();
        for(var j = 0; j<this.data.nodes.length-1; j++){
          if(visited[j]===true){
            answer+=j+","
            let updateNode = this.data.nodes.get(j);
            updateNode.color = {background: "green"};
            this.data.nodes.update(updateNode);
          }
        }
        swal(
          "Solucion",`Se encontraron los siguientes nodos a cubrir: ${answer}, con un tiempo de espera de: ${endTime-starTime}milisegundos`,"success"
        );
      },
    }
    clickEvents[event.target.name]();
  }

}

export default VertexCover
