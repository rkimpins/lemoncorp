import React, {Component} from 'react';

const K = 32;
const maxUpdate = 32;

class BugElo extends Component {

	constructor(props) {
		super(props);
		const startingElo = 1000;

		this.state = {
			bugs: [
				{ name: "Ladybug", trueElo: 100, currentElo: startingElo },
				{ name:"Centipede", trueElo: 2000, currentElo: startingElo },
				{ name:"Hercules Beetle", trueElo: 1400, currentElo: startingElo },
				{ name:"Stag Beetle", trueElo: 1500, currentElo: startingElo },
				{ name:"American Carrion Beetle", trueElo: 1300, currentElo: startingElo },
				{ name:"Butterfly", trueElo: 500, currentElo: startingElo },
			],
			bugAIndex: 0,
			bugBIndex: 0,

		}
	}

	calculate_new_rating = (score, ratingA, ratingB) => {
		var newRatingA;
		newRatingA = ratingA + K * (score - this.calculate_expected_score(ratingA, ratingB))
		if (newRatingA - ratingA > maxUpdate) {
			newRatingA = ratingA + maxUpdate;
		}
		if (ratingA - newRatingA > maxUpdate) {
			newRatingA = ratingA - maxUpdate;
		}

		return newRatingA;
	}

	calculate_expected_score = (ratingA, ratingB) => {
		return 1 / (1 + 10**((ratingB - ratingA)/400))
	}

	chooseBugsHandler = () => {
		var bugAIndex = Math.floor(Math.random()*this.state.bugs.length);
		var bugBIndex;
		do {
			bugBIndex = Math.floor(Math.random()*this.state.bugs.length);
		} while (bugAIndex === bugBIndex)

		this.setState({
			bugAIndex: bugAIndex,
			bugBIndex: bugBIndex,
		})
	}

	makeBugsFight = () => {
		var probAWins = this.calculate_expected_score(
			this.state.bugs[this.state.bugAIndex].trueElo,
			this.state.bugs[this.state.bugBIndex].trueElo)
		console.log("probAWins", probAWins)
		var score;
		var randomVal = Math.random();

		if (randomVal < probAWins) {
			score = 1;
		} else {
			score = 0;
		}

		console.log("score", score)
		
		var newRatingA = this.calculate_new_rating(
			score,
			this.state.bugs[this.state.bugAIndex].currentElo,
			this.state.bugs[this.state.bugBIndex].currentElo,
		);
		var newRatingB = this.calculate_new_rating(
			1 - score,
			this.state.bugs[this.state.bugBIndex].currentElo,
			this.state.bugs[this.state.bugAIndex].currentElo,
		);

		//Update new elo rating
		let tempBugs = [...this.state.bugs]
		tempBugs[this.state.bugAIndex].currentElo = newRatingA;
		tempBugs[this.state.bugBIndex].currentElo = newRatingB;
		this.setState({
			bugs: tempBugs,
		})
	}


	render() {

		var bugs = [];
		var index;
		var bug;
		for (index in this.state.bugs) {
			bug = this.state.bugs[index];
			bugs.push(
				<li key={index}>
					<p>{bug.name}</p>
					<p>{bug.trueElo}</p>
					<p>{bug.currentElo}</p>
				</li>
			)

		}

		return(
			<div>
				<p>BugElo</p>
				<br/>
				<li>
					<p>{this.state.bugs[this.state.bugAIndex].name}</p>
					<p>{this.state.bugs[this.state.bugAIndex].trueElo}</p>
					<p>{this.state.bugs[this.state.bugAIndex].currentElo}</p>
				</li>
				<li>
					<p>{this.state.bugs[this.state.bugBIndex].name}</p>
					<p>{this.state.bugs[this.state.bugBIndex].trueElo}</p>
					<p>{this.state.bugs[this.state.bugBIndex].currentElo}</p>
				</li>
				<br/>
				<button onClick={this.chooseBugsHandler}>Choose Fighters</button>
				<button onClick={this.makeBugsFight}>FIGHT!!!</button>
				{bugs}
			</div>
		);
	}
}


export default BugElo;