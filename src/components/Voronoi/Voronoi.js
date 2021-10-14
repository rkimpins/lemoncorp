import React, {Component} from 'react';
//import classes from './Voronoi.module.css';

class Voronoi extends Component {

	constructor(props) {
		super(props);
		this.state = {
			points: [{x:10, y: 20}, {x:45, y:100}],
			canvasRef: null
		}
	}

	draw_on_canvas = () => {

	}

	get_offset = () => {
		let canvasElem = document.querySelector("canvas");
		let rect = canvasElem.getBoundingClientRect();
		console.log(rect.left.toString() + " " + rect.top.toString());
		return rect
	}

	handleClick = (event) => {
		//window.alert("You clicked the canvas");
		console.log(event.clientX.toString() + " " + event.clientY.toString());
		let offset = this.get_offset();

		var point = {x: event.clientX-offset.left, y: event.clientY-offset.top}

		this.context.fillStyle="red";
		this.context.fillRect(point.x-2, point.y-2, 2, 2)
		this.context.beginPath();
		this.context.arc(point.x, point.y, 40, 0, 2*Math.PI);
		this.context.fillStyle="red";
		//this.context.fill()
		//Add these to give our circle a border
		this.context.lineWidth = 5;
		this.context.strokeStyle = "#003300";
		this.context.stroke();
	}

	componentDidMount() {
		this.context.fillStyle='#000000';
		this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	}

	componentDidUpdate() {
		this.context.fillStyle='#00ff00';
		this.context.fillRect(0, 0, this.context.canvas.width/2, this.context.canvas.height/2);
	}

	render() {
		return (
			<div>
				<canvas width="500" height="300" id="voronoi_canvas"
				ref={r => this.context = r.getContext('2d')} 
				onClick={(event) => this.handleClick(event)}
				style={{border:"1px solid #000000"}}>
					Interactive Voronoi diagram
				</canvas>
			</div>
		);
	}
};

export default Voronoi;