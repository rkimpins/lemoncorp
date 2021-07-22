import React, { Component } from 'react';


class IntegerSequences extends Component {
	state = {
		selectedSequence: "test",
		currentlyDisplayedValues: [],
		generatedValues: [],
	}

	generateValues = () => {
		this.generateFibonacciSequence();
	}

	displayAnotherValue = () => {
		console.log("[IntegerSeuqences] displayAnotherValues()");
		if (this.state.currentlyDisplayedValues.length === this.state.generatedValues.length) {
			this.generateValues();
		}
		const currentValues = this.state.currentlyDisplayedValues;
		currentValues.push(this.state.generatedValues[currentValues.length]);
		this.setState({
			currentlyDisplayedValues: currentValues,
		});
	}

	generateFibonacciSequence = () => {
		var generatedValues;
		const generationIncrements = 10;
		if (this.state.generatedValues.length === 0) {
			generatedValues = [0, 1];
			for (let i = 2; i < generationIncrements; i++) {
				generatedValues.push(generatedValues[i - 1] + generatedValues[i - 2]);
			}
		} else {
			generatedValues = this.state.generatedValues;
			let maxIndex = this.state.generatedValues.length + generationIncrements;
			for (let i = this.state.generatedValues.length; i < maxIndex; i++) {
				generatedValues.push(generatedValues[i - 1] + generatedValues[i - 2]);
			}
		}
		this.setState({
			generatedValues: generatedValues,
		})
		console.log("[IntegerSequences] generatedValues: ", generatedValues);

	}

	render () {
		return (
			<React.Fragment>
				<p>HI</p>
				<button onClick={this.displayAnotherValue}>Next Value</button>
				<p>Explanation???</p>
				<p>{this.state.currentlyDisplayedValues.map(String).join(", ")}</p>
				<p>{this.state.generatedValues.map(String).join(", ")}</p>
			</React.Fragment>
		);
	};
}


export default IntegerSequences;