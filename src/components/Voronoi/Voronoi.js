import React, {Component} from 'react';
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
		console.log(this.distance_function);
		let offset = this.get_offset();
		var point = {x: Math.round(event.clientX-offset.left), y: Math.round(event.clientY-offset.top)}
		console.log(point.x.toString() + " " + point.y.toString());

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

				this.context.fillStyle='#ff0000';
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

	n1_euclidean_distance = (point1, point2) => {
		return Math.abs(point2.x - point1.x) + Math.abs(point2.y - point1.y);
	}

	manhattan_distance = (point1, point2) => {
		return Math.abs(point2.x - point1.x) + Math.abs(point2.y - point1.y);
	}

	chessboard_distance = (point1, point2) => {
		return 0;
	}

	np_euclidean_distance = (point1, point2) => {
		return 0;
	}

	change_distance = (distance_name) => {
		console.log("Distance changed to:", distance_name);
		switch(distance_name) {
			case "n1":
				this.distance_function = this.n1_euclidean_distance;
				break;
			case "n2":
				this.distance_function = this.n2_euclidean_distance;
				break;
			case "manhattan":
				this.distance_function = this.manhattan_distance;
				break;
			case "chessboard":
				//TODO change this
				this.distance_function = this.chessboard_distance;
				break;
			case "np":
				//TODO change this
				this.distance_function = this.np_euclidean_distance;
				break;
			default:
				this.distance_function = this.n2_euclidean_distance;
				break;
		}
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
				<button onClick={this.clear_canvas()}>Clear Screen</button>
				<button onClick={() => {this.change_distance("n2")}}>Use Euclidean Distance (2-Norm)</button>
				<button onClick={() => {this.change_distance("manhattan")}}>Use Manhattan Distance</button>
				<button onClick={() => {this.change_distance("n1")}}>Use 1-Norm Distance</button>
				<button onClick={() => {this.change_distance("np")}}>Use p-Norm Distance</button>
				<button onClick={() => {this.change_distance("chessboard")}}>Use Chessboard Distance</button>
			</div>
		);
	}
};

export default Voronoi;