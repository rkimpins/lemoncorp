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
		this.points = [
				//{x:45, y:100},
				//{x:100, y:200},
				//{x: 89, y: 62},
				//{x: 410, y:17},
				//{x:101, y:85},
				//{x:298, y:245},
				//{x:345, y:198}
			];
	}

	draw_canvas = () => {
		this.draw_distances(this.n2_euclidean_distance);
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

		//this.context.fillStyle="red";
		//this.context.fillRect(point.x-2, point.y-2, 2, 2)
		/*
		this.context.beginPath();
		this.context.arc(point.x, point.y, 40, 0, 2*Math.PI);
		this.context.fillStyle="red";
		//this.context.fill()
		//Add these to give our circle a border
		this.context.lineWidth = 5;
		this.context.strokeStyle = "#003300";
		this.context.stroke();
		*/
	}

	get_offset = () => {
		let canvasElem = document.querySelector("canvas");
		let rect = canvasElem.getBoundingClientRect();
		console.log(rect.left.toString() + " " + rect.top.toString());
		return rect
	}

	handleClick = (event) => {
		//Calculate and format the clicked point
		console.log(event.clientX.toString() + " " + event.clientY.toString());
		let offset = this.get_offset();
		var point = {x: event.clientX-offset.left, y: event.clientY-offset.top}

		// Add click to list of points
		this.points = [...this.points, point];
		

		// State Version (broken)
		//this.setState({
		//	points: [
		//		...this.state.points, point
		//	],
		//})

		this.context.fillStyle="red";
		this.context.fillRect(point.x-2, point.y-2, 2, 2)

		this.draw_canvas()

		//this.draw_distances(this.n2_euclidean_distance);
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
		//console.log("closest_index: %d", closest_index);
		//console.log("closest_distance: %d", closest_distance);
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

	componentDidMount() {
		this.context.fillStyle='#000000';
		this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	}

	componentDidUpdate() {
		//this.context.fillStyle='#00ff00';
		//this.context.fillRect(0, 0, this.context.canvas.width/2, this.context.canvas.height/2);
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