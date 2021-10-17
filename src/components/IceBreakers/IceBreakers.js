import React, {Component} from 'react';

import { iceBreakers } from '../../data/iceBreakers';

class IceBreakers extends Component {

	constructor(props) {
		super(props);
		this.state = {
			iceBreakers: iceBreakers,
			currentIceBreaker: null,
		}
	}

	newIceBreaker = (iceBreakerType) => {
		let index = Math.floor(Math.random() * (this.state.iceBreakers[iceBreakerType].length));
		//console.log(index);
		this.setState({
			currentIceBreaker: this.state.iceBreakers[iceBreakerType][index]
		})
	}


	render() {
		return (
			<div className="ice-breakers">
				<h2>Ice Breakers</h2>
				<button onClick={() => {this.newIceBreaker("Just For Fun")}}>New Just For Fun Ice Breaker</button>
				<button onClick={() => {this.newIceBreaker("Getting To Know Them")}}>New Getting To Know Them Ice Breaker</button>
				<button onClick={() => {this.newIceBreaker("Digging Deep")}}>New Digging Deep Ice Breaker</button>
				<h1>{this.state.currentIceBreaker}</h1>
			</div>
			);
	}
}

export default IceBreakers;