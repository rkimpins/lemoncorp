import React, {Component} from 'react';
//import classes from './Voronoi.module.css';

class Voronoi extends Component {

	constructor(props) {
		super(props);
		this.state = {
			resolution: 1,
		}

		this.points = [];
		this.colors = [];
		this.version = 2;
		this.distanceFunction = this.n2EuclideanDistance;
	}

	drawCanvas = () => {
		if (this.points.length === 0) {
			this.drawBlankScreen();
		} else {
			this.drawDistances(this.distanceFunction);
			this.drawPoints();
		}
	}

	drawPoints = () => {
		for (let i = 0; i < this.points.length; i = i + this.state.resolution) {
			this.drawPoint(this.points[i]);
		}
	}

	drawPoint = (point) => {
		// Draw a circle where our point is
		this.context.beginPath();
		this.context.arc(point.x, point.y, 3, 0, 2*Math.PI);
		this.context.fillStyle="black";
		this.context.fill()
		this.context.lineWidth = 1;
		this.context.strokeStyle = "black";
		this.context.stroke();
	}

	getOffset = () => {
		let canvasElem = document.querySelector("canvas");
		let rect = canvasElem.getBoundingClientRect();
		return rect
	}

	handleClick = (event) => {
		//Calculate and format the clicked point
		//console.log(this.distance_function);
		let offset = this.getOffset();
		var point = {x: Math.round(event.clientX-offset.left), y: Math.round(event.clientY-offset.top)}
		//console.log(point.x.toString() + " " + point.y.toString());

		// Add click to list of points
		this.points = [...this.points, point];

		this.addRandomColor();
		
		this.drawCanvas()
	}

	addRandomColor = () => {
		if (this.version === 1) {
			// Old version with repeating final color
			// added because a friend requested me to
			this.colors = [
				"blue", "green", "red", "yellow", "pink", "cyan", "orange", "white",
				"red", "red", "red", "red", "red", "red", "red", "red", "red", "red",
				"red", "red", "red", "red", "red", "red", "red", "red", "red", "red",
				"red", "red", "red", "red", "red", "red", "red", "red", "red", "red",
				"red", "red", "red", "red", "red", "red", "red", "red", "red", "red",
				"red", "red", "red", "red", "red", "red", "red", "red", "red", "red",
			];
		} else if (this.version === 2) {
			let newColor = this.randomColor();
			this.colors = [...this.colors, newColor];
		}
	}



	calculateDrawColor = (point, distance_function) => {
		var closest_index;
		var closest_distance = Infinity;
		for (let i = 0; i < this.points.length; i++) {
			let distance = distance_function(point, this.points[i])
			if (distance < closest_distance) {
				closest_index = i;
				closest_distance = distance;
			}
		}
		return this.colors[closest_index];
	}


	randomIntegerInRange = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	randomColor = () => {
		// Create random point
		let point = [];
		for (let i = 0; i < 3; i++) {
			point.push(this.randomIntegerInRange(0, 255));
		}
		let color = '#';
		for (let i = 0; i < 3; i++) {
			if (point[i] === 16) {
				color += (point[i] - 1).toString(16);
			} else {
				let stringInt = point[i].toString(16);
				if (stringInt.length === 1) {
					color += '0' + stringInt;
				} else {
					color += stringInt;
				}
			}
		}
		return color;
    }

	drawDistances = (distance_function) => {
		for (let i = 0; i < this.context.canvas.width; i++) {
			for (let j = 0; j < this.context.canvas.height; j++) {
				this.context.fillStyle=this.calculateDrawColor({x:i, y:j}, distance_function);
				this.context.fillRect(i, j, 1, 1);
			}
		}
	}

	n2EuclideanDistance = (point1, point2) => {
		return Math.sqrt(
			Math.abs(point2.x - point1.x) ** 2
			+ Math.abs(point2.y - point1.y) ** 2
			)
	}

	manhattanDistance = (point1, point2) => {
		return Math.abs(point2.x - point1.x) + Math.abs(point2.y - point1.y);
	}

	chessboardDistance = (point1, point2) => {
		return Math.max(Math.abs(point2.x - point1.x), Math.abs(point2.y - point1.y));
	}

	minCoordDistance = (point1, point2) => {
		return Math.min(Math.abs(point2.x - point1.x), Math.abs(point2.y - point1.y));
	}

	npEuclideanDistance = (p) => {
		return (point1, point2) => {
			return (Math.abs(point2.x - point1.x) ** p + Math.abs(point2.y - point1.y) ** p) ** (1/p)
		}
	}

	xDistance = (point1, point2) => {
		return Math.abs(point2.x - point1.x);
	}

	yDistance = (point1, point2) => {
		return Math.abs(point2.y - point1.y);
	}

	// Will visually be equivalent to n2EuclideanDistance but will be faster
	squaredEuclideanDistance = (point1, point2) => {
		return (point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2;
	}

	closeXYDistance = (point1, point2) => {
		return Math.abs(Math.abs(point2.x - point1.x) - Math.abs(point2.y - point1.y));
	}

	weightedXDistance = (C) => {
		return (point1, point2) => {
			return C * (point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2;
		}
	}

	weightedYDistance = (C) => {
		return (point1, point2) => {
			return (point1.x - point2.x) ** 2 + C * (point1.y - point2.y) ** 2;
		}
	}

	//TODO Add information about distance!!
	changeDistanceFunction = (newDistanceFunction) => {
		this.distanceFunction = newDistanceFunction;
		this.drawCanvas();
	}

	clear_canvas = () => {
	}

	drawBlankScreen = () => {
		this.context.fillStyle="black";
		this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
		this.context.font = "30px Arial";
		this.context.fillStyle="white";
		this.context.fillText("Click Me!", this.context.canvas.width/2 - 60, this.context.canvas.height/2 + 15);
		this.points = [];
	}

	componentDidMount() {
		this.drawBlankScreen();
	}

	componentDidUpdate() {
	}

	render() {
		return (
			<div>
				<canvas width="500" height="300" id="voronoiCanvas"
				ref={r => this.context = r.getContext('2d')} 
				onClick={(event) => this.handleClick(event)}
				style={{border:"1px solid #000000"}}>
					Interactive Voronoi diagram
				</canvas>
				<br/>
				<button onClick={this.drawBlankScreen}>Clear Screen</button>
				<br/>
				<button onClick={() => {this.version = 1;} }>Color Version 1</button>
				<button onClick={() => {this.version = 2;} }>Color version 2</button>
				<br/>
				<button onClick={() => {this.changeDistanceFunction(this.n2EuclideanDistance)}}>Use Euclidean Distance / 2-Norm</button>
				<br/>
				<button onClick={() => {this.changeDistanceFunction(this.manhattanDistance)}}>Use Manhattan / 1-Norm Distance</button>
				<br/>
				<button 
					onClick={() => {this.changeDistanceFunction(this.chessboardDistance)}}>
					Use Chebyshev / Chessboard / Infinity-Norm Distance
				</button>
				<br/>
				<button 
					onClick={() => {this.changeDistanceFunction(this.minCoordDistance)}}>
					Use Minimum Coordinate Distance
				</button>
				<br/>
				<button onClick={() => {this.changeDistanceFunction(this.xDistance)}}>Use X-Distance</button>
				<button onClick={() => {this.changeDistanceFunction(this.yDistance)}}>Use Y-Distance</button>
				<button onClick={() => {this.changeDistanceFunction(this.closeXYDistance)}}>Use Close XY Distance</button>
				<br/>
				<input type="number" id="p_input" />
				<button 
					onClick={() => {
						this.changeDistanceFunction(this.npEuclideanDistance(parseInt(document.getElementById("p_input").value)))}}>
					{"<< Use p-Norm Distance"}
				</button>
				<br/>
				<input type="number" id="cx_input" />
				<button 
					onClick={() => {
						this.changeDistanceFunction(this.weightedXDistance(parseInt(document.getElementById("cx_input").value)))}}>
					{"<< Use Weighted X Distance"}
				</button>
				<br/>
				<input type="number" id="cy_input" />
				<button 
					onClick={() => {
						this.changeDistanceFunction(this.weightedYDistance(parseInt(document.getElementById("cy_input").value)))}}>
					{"<< Use Weighted Y Distance"}
				</button>
			</div>
		);
	}
};

export default Voronoi;