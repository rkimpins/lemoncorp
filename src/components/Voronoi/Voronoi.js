import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
//import classes from './Voronoi.module.css';

class Voronoi extends Component {

	constructor(props) {
		super(props);
		this.state = {
			//TODO add better color system
			colors: ["blue", "green", "red", "yellow", "pink", "cyan", "orange", "white"],
			resolution: 1,
		}
		this.points = [ ];

		// Test Points
		//[{x:45, y:100},
		//{x:100, y:200},
		//{x: 89, y: 62},
		//{x: 410, y:17},
		//{x:101, y:85},
		//{x:298, y:245},
		//{x:345, y:198}]

		this.distance_function = this.n2_euclidean_distance;
	}

	draw_canvas = () => {
		this.draw_distances(this.distance_function);
		this.draw_points();
	}

	draw_points = () => {
		for (let i = 0; i < this.points.length; i = i + this.state.resolution) {
			this.draw_point(this.points[i]);
		}
	}

	draw_point = (point) => {
		// Draw a circle where our point is
		this.context.beginPath();
		this.context.arc(point.x, point.y, 3, 0, 2*Math.PI);
		this.context.fillStyle="black";
		this.context.fill()
		this.context.lineWidth = 1;
		this.context.strokeStyle = "black";
		this.context.stroke();
	}

	get_offset = () => {
		let canvasElem = document.querySelector("canvas");
		let rect = canvasElem.getBoundingClientRect();
		return rect
	}

	handleClick = (event) => {
		//Calculate and format the clicked point
		//console.log(this.distance_function);
		let offset = this.get_offset();
		var point = {x: Math.round(event.clientX-offset.left), y: Math.round(event.clientY-offset.top)}
		//console.log(point.x.toString() + " " + point.y.toString());

		// Add click to list of points
		this.points = [...this.points, point];
		
		this.draw_canvas()
	}


	calculate_draw_color = (point, distance_function) => {
		var closest_index;
		var closest_distance = Infinity;
		for (let i = 0; i < this.points.length; i++) {
			let distance = distance_function(point, this.points[i])
			if (distance < closest_distance) {
				closest_index = i;
				closest_distance = distance;
			}
		}
		return this.state.colors[closest_index];
	}

	draw_distances = (distance_function) => {
		for (let i = 0; i < this.context.canvas.width; i++) {
			for (let j = 0; j < this.context.canvas.height; j++) {
				this.context.fillStyle=this.calculate_draw_color({x:i, y:j}, distance_function);
				this.context.fillRect(i, j, 1, 1);
			}
		}
	}

	n2_euclidean_distance = (point1, point2) => {
		return Math.sqrt(
			Math.abs(point2.x - point1.x) ** 2
			+ Math.abs(point2.y - point1.y) ** 2
			)
	}

	manhattan_distance = (point1, point2) => {
		return Math.abs(point2.x - point1.x) + Math.abs(point2.y - point1.y);
	}

	chessboard_distance = (point1, point2) => {
		return Math.max(Math.abs(point2.x - point1.x), Math.abs(point2.y - point1.y));
	}

	min_coord_distance = (point1, point2) => {
		return Math.min(Math.abs(point2.x - point1.x), Math.abs(point2.y - point1.y));
	}

	np_euclidean_distance = (p) => {
		return (point1, point2) => {
			return (Math.abs(point2.x - point1.x) ** p + Math.abs(point2.y - point1.y) ** p) ** (1/p)
		}
	}

	x_distance = (point1, point2) => {
		return Math.abs(point2.x - point1.x);
	}

	y_distance = (point1, point2) => {
		return Math.abs(point2.y - point1.y);
	}

	// Will visually be equivalent to n2_euclidean_distance but will be faster
	squared_euclidean_distance = (point1, point2) => {
		return (point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2;
	}

	//TODO Add information about distance!!
	change_distance = (new_distance_function) => {
		//console.log("Distance changed to:", new_distance_function);
		this.distance_function = new_distance_function;
		this.draw_canvas();
	}

	clear_canvas = () => {
		//this.points = [];
		//this.context.fillStyle='#000000';
		//this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	}

	draw_blank_screen = () => {
		this.context.fillStyle='#000000';
		this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
		this.points = [];
	}

	componentDidMount() {
		this.draw_blank_screen();
	}

	componentDidUpdate() {
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
				<button onClick={this.draw_blank_screen}>Clear Screen</button>
				<button onClick={() => {this.change_distance(this.n2_euclidean_distance)}}>Use Euclidean Distance / 2-Norm</button>
				<button onClick={() => {this.change_distance(this.manhattan_distance)}}>Use Manhattan / 1-Norm Distance</button>
				<button 
					onClick={() => {this.change_distance(this.coord_distance)}}>
					Use Chebyshev / Chessboard / Infinity-Norm Distance
				</button>
				<button 
					onClick={() => {this.change_distance(this.min_chessboard_distance)}}>
					Use Minimum Coordinate Distance
				</button>
				<button onClick={() => {this.change_distance(this.x_distance)}}>Use X-Distance</button>
				<button onClick={() => {this.change_distance(this.y_distance)}}>Use Y-Distance</button>
				<input type="number" id="p_input" />
				<button 
					onClick={() => {
						this.change_distance(this.np_euclidean_distance(parseInt(document.getElementById("p_input").value)))}}>
					{"<< Use p-Norm Distance"}
				</button>
			</div>
		);
	}
};

export default Voronoi;