import React, {Component} from 'react';
//import classes from './RandomColors.module.css';

class RandomColors extends Component {

	constructor(props) {
		super(props);
		this.state = {
			points: [],
		}
		this.iteration = 0;
	}

	generateColorsGridMethod = (iteration) => {
		let oldPoints = [...this.state.points];
		let newPoints = [];
		let size = 256;
		let divisions = 2 ** iteration;
		for (let i = 0; i <= size; i += size/divisions) {
			for (let j = 0; j <= size; j += size/divisions) {
				for (let k = 0; k <= size; k += size/divisions) {
					console.log(i.toString() + " " + j.toString() + " " + k.toString())
					if (!this.arrayIsInArrays([i, j, k], oldPoints)) {
						newPoints.push([i, j, k]);
					}
				}
			}
		}
		this.iteration += 1;
		this.setState({
			points: oldPoints.concat(newPoints)
		});
	}

	arrayIsEqual = (a, b) => {
		if (a.length !== b.length) {return false;}
		for (let i = 0; i < a.length; i++) {
			if (a[i] !== b[i]) {return false;}
		}
		return true;
	}

	arrayIsInArrays = (arr, arrays) => {
		for (let i = 0; i < arrays.length; i++) {
			if (this.arrayIsEqual(arr, arrays[i])) {return true;}
		}
		return false;
	}

	convertPointToColor = (point) => {
		let color = '#';
		for (let i = 0; i < 3; i++) {
			if (point[i] === 16) {
				color += (point[i] - 1).toString(16);
			} else {
				color += point[i].toString(16);
			}
		}
		return color;
	}

	pointsToString = () => {
		let str = "";
		for (let i = 0; i < this.state.points.length; i++) {
			str += "[" + this.state.points[i][0].toString() + ", "
			+ this.state.points[i][1].toString() + ", "
			+ this.state.points[i][2].toString() + "] ";
		}
		console.log(str);
		return str;
	}

	pointsToColors = () => {
		let colors = [];
		for (let i = 0; i < this.state.points.length; i++) {
			colors.push(this.convertPointToColor(this.state.points[i]));
		}
		return colors;
	}

	colorsToDivs = () => {
		let colors = this.pointsToColors();
		let divs = [];
		for (let i = 0; i < colors.length; i++) {
			divs.push(
			<div key={colors[i]} style={{backgroundColor: colors[i], height: '10px'}}></div>);
		}
		return divs;
	}


	pointDistance = (point1, point2) => {
		var distance = 0;
		for (let i = 0; i < 3; i++) {
			distance += Math.pow(point1[i] - point2[i], 2);
		}
		return Math.sqrt(distance);
	}

	randomIntegerInRange = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	pointToCloseToPoints = (point, points, min_allowed_distance) => {
		for (let i = 0; i < points.length; i++) {
			if (this.pointDistance(point, points[i]) < min_allowed_distance) {
				return true;
			}
		}
		return false;
	}

	generateColorsRandomMethod = (num_colors, min_allowed_distance) => {
		let max_failed_attempts = 20; //arbitrary
		let points = [];
		let failed_attempts = 0;
		while (points.length < num_colors) {
			if (failed_attempts > max_failed_attempts) {
				console.log("Failed to generate color within %d attempts", max_failed_attempts);
				window.alert("Failed to generate color within " + max_failed_attempts + " attempts");
				return;
			}

			// Create random point
			let point = [];
			for (let i = 0; i < 3; i++) {
				point.push(this.randomIntegerInRange(0, 255));
			}
			// Add point to points if not too close to other points
			if (!this.pointToCloseToPoints(point, this.state.points, min_allowed_distance)) {
				this.setState({
					points: [...this.state.points, point],
				})
				points.push(points);
				failed_attempts = 0;
			} else {
				failed_attempts += 1;
			}
		}
	}

	render() {
		return (
			<div>
				<button onClick={() => this.generateColorsRandomMethod(10, 1)}>
					Generate Colors
				</button>
				<p>{this.pointsToString()}</p>
				{this.colorsToDivs()}
			</div>
		);
	}
};

export default RandomColors;