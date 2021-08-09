import React, { Component } from 'react';
import {AiOutlineQuestionCircle} from 'react-icons/ai';

import IntegerHelp from './IntegerHelp/IntegerHelp';

import {DropdownButton, Dropdown} from 'react-bootstrap';

interface State {
	selectedSequence: string;
	generatedValues: Array<number>;
	showInformation: boolean;
	generateValues: () => void;
	numberDisplayedValues: number;
}


class IntegerSequences extends Component<{}, State> {
	constructor(props:any) {
		super(props);
		var emptyFunc = () => {};
		this.state = {
			selectedSequence: "Select a sequence",
			generatedValues: [],
			showInformation: false,
			generateValues: emptyFunc,
			numberDisplayedValues: 0,
		}
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
		console.log("[IntegerSequences] generateVanEckSequence()");
		if (this.state.numberDisplayedValues === 0) {
			this.setState({
				generatedValues: [0, 0],
			});
		} else {
			//if value not previously seen, add zero
			//if value previously seen, find out how many steps ago
			const clone: Array<number> = [...this.state.generatedValues];
			for (let i = clone.length - 2; i >= 0; i--) {
				if (clone[i] === clone[clone.length - 1]) {
					clone.push(clone.length - 1 - i)
					this.setState({
						generatedValues: clone,
					})
					break;
				} else if (i === 0) {
					clone.push(0);
					this.setState({
						generatedValues: clone,
					})
				}
			}
		}

	}

	nextLevineRow = (currentRow: Array<number>) => {
		const nextRow = [];
		// i = index of row entry currently considered
		for (let i = currentRow.length - 1; i >= 0; i--) {
			// j = counter for row entry
			for (let j = 0; j <= currentRow[i] - 1; j++) {
				nextRow.push(currentRow.length - i);
			}
		}
		console.log("nextLevineRow()", nextRow);
		return nextRow;
	}

	generateLevineTriangle = () => {
		if (this.state.numberDisplayedValues === 0) {
			this.setState({
				generatedValues: [2],
			});
		} else {
			const levineTriangle = [[2]];
			const levineSequence = [2];
			var flatLevineTriangle = [2]
			var currentRow = [2];
			var nextRow
			for (let i = 0; i < 10; i++) {
				nextRow = this.nextLevineRow(currentRow);
				levineTriangle.push(nextRow);
				levineSequence.push(nextRow.reduce((a,b) => a + b));
				flatLevineTriangle = [...flatLevineTriangle, ...nextRow];
				currentRow = nextRow;
			}
			console.log(flatLevineTriangle);

			this.setState({
				generatedValues: flatLevineTriangle,
			});
		}
	}

	generateLevineSequence = () => {
		console.log("[IntegerSequences] generateLevineSequence()");
		if (this.state.numberDisplayedValues === 0) {
			this.setState({
				generatedValues: [2],
			});
		} else if (this.state.generatedValues.length >= 11) {
			alert("The Levine Sequence past the 11th term is too computationally intensive. See help section")
			/*
			n 		a(n)
			1		1
			2		2
			3		2
			4		3
			5		4
			6		7
			7		14
			8		42
			9		213
			10		2837
			11		175450
			12		139759600
			13		6837625106787
			14		266437144916648607844
			15		508009471379488821444261986503540
			16		37745517525533091954736701257541238885239740313139682
			17		5347426383812697233786139576220450142250373277499130252554080838158299886992660750432
			*/
		} else {
			const levineTriangle: Array<Array<number>> = [[2]];
			const levineSequence: Array<number> = [2];
			var currentRow: Array<number> = [2];
			var nextRow: Array<number>;
			for (let i = 0; i < this.state.numberDisplayedValues; i++) {
				nextRow = this.nextLevineRow(currentRow);
				levineTriangle.push(nextRow);
				levineSequence.push(nextRow.reduce((a,b) => a + b));
				currentRow = nextRow;
			}
			console.log(levineTriangle);

			this.setState({
				generatedValues: levineSequence,
			});
		}
	}

	generateNonRepeatingBinarySequence = () => {
		//1 + 0 + 01 + 0110 + 01101001 + 011010011001 + 0110100110010110 + ...
		console.log("[IntegerSequences] generateNonRepeatingBinarySequence()");
		var generatedValues: Array<number> = this.state.generatedValues;
		//const generationIncrements = 10;
		if (this.state.generatedValues.length === 0) {
			this.setState({
				generatedValues: [1],
			})
		} else {
			const clone: Array<number> = [...generatedValues]
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

	isPrime = (n: number) => {
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
			const clone: Array<number> = [...this.state.generatedValues]
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
		var generatedValues: Array<number>;
		const generationIncrements: number = 10;
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

	setIntegerSequence = (newSequence: string) => {
		console.log("[IntegerSequences] setIntegerSequence()");
		var newFunction: () => void;
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
			case "levine triangle":
				newFunction = this.generateLevineTriangle;
				break;
			case "van eck":
				newFunction = this.generateVanEckSequence;
				break;
			default:
				console.log("[IntegerSequences.js] setIntegerSequence() invalid newSequence value");
				newFunction = () => {};
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
		var info: any;
		if (this.state.showInformation) {
			info = <IntegerHelp sequence={this.state.selectedSequence} />
		} else {
			info = "";
		}

		/* Integer Sequences
			fibonacci
			non-repeating binary
			prime numbers
			levine
			levine triangle
			van eck
		*/
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
						onClick={() => {this.setIntegerSequence("levine triangle")}}>
						Levine Triangle
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