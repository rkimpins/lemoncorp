import React, { Component } from 'react';
import {AiOutlineQuestionCircle} from 'react-icons/ai';


class IntegerSequences extends Component {
	state = {
		selectedSequence: "test",
		currentlyDisplayedValues: [],
		generatedValues: [],
		showInformation: false,
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

	generateVanEckSequence = () => {
	}
	generateLevineSequence = () => {
	}
	generateNonRepeatingBinarySequence = () => {
		//1 + 0 + 01 + 0110 + 01101001 + 011010011001 + 0110100110010110 + ...
	}
	gejneratePrimeNumbersSequence = () => {
	}
	/*
	https://en.wikipedia.org/wiki/List_of_integer_sequences
	Recamán's sequence, A005132
    The Busy Beaver problem, A060843
    The Catalan numbers, A000108
    The prime numbers, A000040
    The Mersenne primes, A000043 and A000668
    The Fibonacci numbers, A000045
	*/

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
	toggleShowInformation = () => {
		this.setState({
			showInformation: !this.state.showInformation,
		});
	}


	render () {
		var info;
		if (this.state.showInformation) {
			info = "Hello";
		} else {
			info = "";
		}

		return (
			<React.Fragment>
				<button onClick={this.displayAnotherValue}>Next Value</button>
				<button onClick={this.toggleShowInformation}><AiOutlineQuestionCircle/><AiOutlineQuestionCircle/></button>
				<p>{this.state.currentlyDisplayedValues.map(String).join(", ")}</p>
				<p>{this.state.generatedValues.map(String).join(", ")}</p>
				{info}

			</React.Fragment>
		);
	};
}


export default IntegerSequences;