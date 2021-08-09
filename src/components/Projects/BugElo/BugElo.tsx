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

type Bug = {name:string, trueElo:number, currentElo:number};

interface State {
	bugs: Array<Bug>;
	bugAIndex: number;
	bugBIndex: number;
	lastReplaced: number;
}


class BugElo extends Component<{}, State> {

	constructor(props:any) {
		super(props);
		const startingElo: number = 1000;

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

	clickBugHandler = (index: number) => {
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

	calculate_new_rating = (score: number, ratingA: number, ratingB: number) => {
		var newRatingA: number;
		newRatingA = ratingA + K * (score - this.calculate_expected_score(ratingA, ratingB))
		if (newRatingA - ratingA > maxUpdate) {
			newRatingA = ratingA + maxUpdate;
		}
		if (ratingA - newRatingA > maxUpdate) {
			newRatingA = ratingA - maxUpdate;
		}

		return newRatingA;
	}

	calculate_expected_score = (ratingA: number, ratingB: number) => {
		return 1 / (1 + 10**((ratingB - ratingA)/400))
	}

	chooseBugsHandler = () => {
		var bugAIndex: number = Math.floor(Math.random()*this.state.bugs.length);
		var bugBIndex: number;
		do {
			bugBIndex = Math.floor(Math.random()*this.state.bugs.length);
		} while (bugAIndex === bugBIndex)

		this.setState({
			bugAIndex: bugAIndex,
			bugBIndex: bugBIndex,
		})
	}

	makeBugsFight = () => {
		var probAWins: number = this.calculate_expected_score(
			this.state.bugs[this.state.bugAIndex].trueElo,
			this.state.bugs[this.state.bugBIndex].trueElo)
		console.log("[BugElo.js] probAWins: ", probAWins)
		var score: number;
		var randomVal: number = Math.random();

		if (randomVal < probAWins) {
			score = 1;
		} else {
			score = 0;
		}

		console.log("[BugElo.js] score: ", score)
		
		var newRatingA: number = this.calculate_new_rating(
			score,
			this.state.bugs[this.state.bugAIndex].currentElo,
			this.state.bugs[this.state.bugBIndex].currentElo,
		);
		var newRatingB: number = this.calculate_new_rating(
			1 - score,
			this.state.bugs[this.state.bugBIndex].currentElo,
			this.state.bugs[this.state.bugAIndex].currentElo,
		);

		//Update new elo rating
		let tempBugs:Array<Bug> = [...this.state.bugs]
		tempBugs[this.state.bugAIndex].currentElo = newRatingA;
		tempBugs[this.state.bugBIndex].currentElo = newRatingB;
		this.setState({
			bugs: tempBugs,
		})
	}


	render() {

		var bugs = [];
		var bug: Bug;
		for (let index: number = 0; index < this.state.bugs.length; index++) {
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
					bugIndex={this.state.bugAIndex}
					key="A"
				/>
				<DisplayBug
					{...this.state.bugs[this.state.bugBIndex]}
					onClick={this.clickBugHandler}
					bugIndex={this.state.bugBIndex}
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