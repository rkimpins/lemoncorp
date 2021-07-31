import React, { Component } from 'react';
import {AiOutlineQuestionCircle} from 'react-icons/ai';

import {DropdownButton, Dropdown} from 'react-bootstrap';




class IntegerSequences extends Component {
	state = {
		selectedSequence: "Select a sequence",
		generatedValues: [],
		showInformation: false,
		generateValues: null,
		numberDisplayedValues: 0,
	}

	displayAnotherValue = () => {
		console.log("[IntegerSequences] displayAnotherValues()");
		if (this.state.numberDisplayedValues === this.state.generatedValues.length) {
			//this.generateValues();
			this.state.generateValues();
		}
		this.setState({
			numberDisplayedValues: this.state.numberDisplayedValues + 1,
		});
	}

	generateVanEckSequence = () => {
	}
	generateLevineSequence = () => {
	}
	generateNonRepeatingBinarySequence = () => {
		//1 + 0 + 01 + 0110 + 01101001 + 011010011001 + 0110100110010110 + ...
		var generatedValues = this.state.generatedValues;
		const generationIncrements = 10;
		if (this.state.generatedValues.length === 0) {
			this.setState({
				generatedValues: [1],
			})
		} else {
			const clone = [...generatedValues]
			for (let i = 0; i < clone.length; i++) {
				if (clone[i] === 0) {
					clone[i] = 1;
				} else {
					clone[i] = 0;
				}
			}
			this.setState({
				generatedValues: [...generatedValues, ...clone],
			});
		}
	}

	isPrime = (n) => {
		if (n < 2) {
			return false;
		}
		for (let i = 2; i < n; i++) {
			if (n % i === 0) {
				return false;
			}
		}
		return true;
	}

	generatePrimeNumbersSequence = () => {
		if (this.state.generatedValues.length === 0) {
			this.setState({
				generatedValues: [2],
			})
		} else {
			const clone = [...this.state.generatedValues]
			let nextPrime = clone[clone.length - 1] + 1;
			while (!this.isPrime(nextPrime)) {
				nextPrime++;
			}
			this.setState({
				generatedValues: [...clone, nextPrime],
			});
		}
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

	setIntegerSequence = (newSequence) => {
		console.log("[IntegerSequences] setIntegerSequence()");
		var newFunction;
		switch(newSequence) {
			case "fibonacci":
				newFunction = this.generateFibonacciSequence;
				break;
			case "non-repeating binary":
				newFunction = this.generateNonRepeatingBinarySequence;
				break;
			case "prime numbers":
				newFunction = this.generatePrimeNumbersSequence;
				break;
			case "levine":
				newFunction = this.generateLevineSequence;
				break;
			case "van eck":
				newFunction = this.generateVanEckSequence;
				break;
			default:
				console.log("[IntegerSequences.js] setIntegerSequence() invalid newSequence value");
				break;
		}


		this.setState({
			selectedSequence: newSequence,
			generateValues: newFunction,
			numberDisplayedValues: 0,
			generatedValues: [],
			showInformation: false,
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
				<DropdownButton id="dropdown-basic-button" title={this.state.selectedSequence}>
					<Dropdown.Item
						onClick={() => {this.setIntegerSequence("fibonacci")}}>
						Fibonacci Sequence
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => {this.setIntegerSequence("non-repeating binary")}}>
						Non-Repeating Binary Sequence
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => {this.setIntegerSequence("prime numbers")}}>
						Prime Numbers
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => {this.setIntegerSequence("levine")}}>
						Levine Sequence
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => {this.setIntegerSequence("van eck")}}>
						Van Eck Sequence
					</Dropdown.Item>
				</DropdownButton>
				<p>{this.state.generatedValues.slice(0, this.state.numberDisplayedValues).join(", ")}</p>
				<p>{this.state.generatedValues.map(String).join(", ")}</p>

				{info}
				<p>{this.state.selectedSequence}</p>

			</React.Fragment>
		);
	};
}


export default IntegerSequences;