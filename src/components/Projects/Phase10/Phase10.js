import { React, Component} from 'react';

import Hand from './Hand/Hand';


class Phase10 extends Component {

	constructor(props) {
		super(props);
		const numPlayers = 4;
		const playerHands = [];
		const playersOut = [];
		const playerNames = [];
		const playerScores = [];
		const playerSkipped = [];
		const playerPreviouslySkipped = [];
		for (let i = 0; i < numPlayers; i++) {
			playerHands.push([]);
			playersOut.push(false);
			playerNames.push("Player " + (i + 1));
			playerScores.push(0);
			playerSkipped.push(false);
			playerPreviouslySkipped.push(false);
		}
		this.state = {
			numPlayers: numPlayers,
			playerHands: playerHands,
			playerNames: playerNames,
			playerScores: playerScores,
			phase: 0,
			gameOver: false,
			roundOver: false,
			playersOut: playersOut,
			cardsOut: [],
			playerSkipped: playerSkipped,
			playerPreviouslySkipped: playerPreviouslySkipped,
			deck: this.newDeck(),
			discard: [],
			currentTurn: 0,
		}
	}

	newDeck = () => {
		/*
			colors: red, yellow, blue, green
			numbers: 1-12, 2 sets for each color
			skips: 4
			wilds: 8, 2 for each color
		*/
		const colors = ["yellow", "green", "red", "blue"];
		var deck = [];
		// Add Skips
		for (let counter = 0; counter < 4; counter++) {
			deck.push({color: "blue", number: "skip", id:counter});
		}
		// Add wild cards
		for (let j = 0; j < 4; j++) {
			for (let counter = 0; counter < 2; counter++) {
				deck.push({color: colors[j], number: "wild", id:counter});
			}
		}
		for (let i = 1; i <= 12; i++) {
			for (let j = 0; j < 4; j++) {
				for (let counter = 0; counter < 2; counter++) {
					deck.push({color: colors[j], number: i, id: counter});
				}
			}
		}
		this.shuffleLocalDeck(deck);
		return deck;
	}

	shuffleLocalDeck = (deck) => {
		deck.sort(() => Math.random() - 0.5);
	}

	shuffleDeck = () => {
		var deck = this.state.deck;
		deck.sort(() => Math.random() - 0.5);
		this.setState({
			deck: deck,
		});
	}

	resetRound = () => {
	}

	dealCards = () => {
		//Deals 10 cards to each player
		if (this.state.deck.length < this.state.numPlayers * 10) {
			alert("Not enough cards to deal 10 cards to each player")
			return
		}
		var deck = this.state.deck;
		var hands = this.state.playerHands;
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < this.state.numPlayers; j++) {
				hands[j].push({...deck.pop()});
			}
		}
		this.setState({
			deck: deck,
			playerHands: hands,
		});
	}

	scoreHand = (hand) => {
		var score = 0;
		for (let i = 0; i < hand.length; i++) {
			if (hand[i].number === "skip") {
				score += 15;
			} else if (hand[i].number === "wild") {
				score += 25;
			} else if (hand[i].number <= 9) {
				score += 5;
			} else if (hand[i].number >= 10) {
				score += 10;
			}
		}
		return score;
	}

	render() {
		var hands = [];
		for (let i = 0; i < this.state.numPlayers; i++) {
			hands.push(
				<div key={i} className="player-hand">
					<h3>{this.state.playerNames[i]}</h3>
					<Hand cards={this.state.playerHands[i]}/>
				</div>
			);
		}
		console.log(this.state.playerHands[0])
		//console.log(this.state.playerHands[0][0].name)

	return (
	  <div className="Phase10">
		<h1>Phase 10</h1>
		<button onClick={this.dealCards}>Deal cards</button>
		<button onClick={this.shuffleDeck}>Shuffle Deck</button>
		<button onClick={this.resetRound}>NextRound</button>
		{hands}
		<h3>Deck</h3>
		<Hand cards={this.state.deck}/>
		<h3>Discard</h3>
		<Hand cards={this.state.discard}/>
	  </div>
	);
  }
}

export default Phase10;