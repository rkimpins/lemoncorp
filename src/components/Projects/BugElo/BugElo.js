import React, {Component} from 'react';
import DisplayBug from './DisplayBug/DisplayBug';
import classes from './BugElo.module.css';

const K = 32;
const maxUpdate = 32;



/*
0: Ladybug
1: Centipede
2: Hercules Beetle
3: Stag Beetle
4: American Carrion Beetle
5: Butterfly
*/

class BugElo extends Component {

	constructor(props) {
		super(props);
		const startingElo = 1000;

		this.state = {
			bugs: [
				{ name: "Ladybug", trueElo: 100, currentElo: startingElo },
				{ name: "Centipede", trueElo: 2000, currentElo: startingElo },
				{ name: "Hercules Beetle", trueElo: 1400, currentElo: startingElo },
				{ name: "Stag Beetle", trueElo: 1500, currentElo: startingElo },
				{ name: "American Carrion Beetle", trueElo: 1300, currentElo: startingElo },
				{ name: "Butterfly", trueElo: 500, currentElo: startingElo },
			],
			bugAIndex: 0,
			bugBIndex: 0,
			lastReplaced: 1,

		}
	}

	clickBugHandler = (index) => {
		if (this.state.lastReplaced === 1) {
			this.setState({
				bugAIndex: index,
				lastReplaced: 0,
			});
		} else {
			this.setState({
				bugBIndex: index,
				lastReplaced: 1,
			});
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
		console.log("[BugElo.js] probAWins: ", probAWins)
		var score;
		var randomVal = Math.random();

		if (randomVal < probAWins) {
			score = 1;
		} else {
			score = 0;
		}

		console.log("[BugElo.js] score: ", score)
		
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
				<DisplayBug 
					{...bug}
					onClick={this.clickBugHandler}
					key={index}
					bugIndex={index}
					/>
			);

		}

		return(
			<div>
				<p>BugElo</p>
				<br/>
				<DisplayBug
					{...this.state.bugs[this.state.bugAIndex]}
					onClick={this.clickBugHandler}
					key="A"
				/>
				<DisplayBug
					{...this.state.bugs[this.state.bugBIndex]}
					onClick={this.clickBugHandler}
					key="B"
				/>
				<br/>
				<button onClick={this.chooseBugsHandler}>Choose Fighters</button>
				<button onClick={this.makeBugsFight}>FIGHT!!!</button>
				<div className={classes.container}>
					{bugs}
				</div>
			</div>
		);
	}
}


export default BugElo;