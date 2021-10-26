import React, {Component} from 'react';
import BarChart from '../../BarChart/BarChart';
//import Card from 'react-playing-card';
import Card from './Card/Card';
import classes from './War.module.css';

import Deck from './Deck';


class War extends Component {

	constructor(props) {
		super(props);

		//let [hand1, hand2] = this.deal_cards();
		const deck = new Deck();
		deck.add_cards();

		let hand1 = [];
		let hand2 = [];
		while (deck.deck.length !== 0) {
			hand1.push(deck.deal());
			hand2.push(deck.deal());
		}

		//console.log("[War.js] constructor() hand1[0]: ", hand1[0]);
		//console.log("[War.js] constructor() hand1: ", hand1);

		let myData = this.set_graph_data_from_hands(hand1, hand2);

		this.state = {
			player1: hand1,
			player2: hand2,
			data: myData,
			current_cards: {
				card1: {
					rank: "",
					suit: "",
				},
				card2: {
					rank: "",
					suit: "",
				}
			}
		}
		//console.log("[War.js] constructor() state: ", this.state)
	}

	deal_cards = () => {
		const deck = new Deck();
		deck.add_cards();
		const hand1 = [];
		const hand2 = [];

		while (deck.deck.length !== 0) {
			hand1.push(deck.deal());
			hand2.push(deck.deal());
		}

		return [hand1, hand2];
	}

	convert_deck_to_graph_data = (hand) => {
		let deck_cards = [...hand];

		const counter = {
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0,
			6: 0,
			7: 0,
			8: 0,
			9: 0,
			10: 0,
			11: 0,
			12: 0,
			13: 0,
		}
		let card;
		let deck = new Deck();
		deck.deck = deck_cards;
		while (deck.deck.length !== 0) {
			card = deck.deal();
			counter[card.value] += 1;
		}
		//console.log(counter)

		const data = []
		for (const key in counter) {
			data.push({x:parseInt(key), y:counter[key]})
		}
		//console.log(data)

		return data;
	}

	set_graph_data_from_hands = (hand1, hand2) => {


		const data = [
			{
				label: 'Player 1',
				data: this.convert_deck_to_graph_data(hand1),
			},
			{
				label: 'Player 2',
				data: this.convert_deck_to_graph_data(hand2),
			},
		];
		return data;
	}

	play_round_of_war = () => {
		//Draw one card from each
		// Compare
			//equal, war
			//otherwise add to deck and shuffle

		let hand1 = new Deck();
		let hand2 = new Deck();
		//hand1.deck = [...this.state.player1];
		//hand2.deck = [...this.state.player2];
		//console.log("[War.js] play_round_of_war() state.player1: ", this.state.player1);
		//console.log("[War.js] play_round_of_war() state.player2: ", this.state.player2);
		hand1.deck = this.state.player1;
		hand2.deck = this.state.player2;
		//console.log("[War.js] play_round_of_war() hand1: ", hand1);
		//console.log("[War.js] play_round_of_war() hand2: ", hand2);

		const card1 = hand1.deal();
		const card2 = hand2.deal();

		//console.log("[War.js] play_round_of_war() card1: ", card1);
		//console.log("[War.js] play_round_of_war() card2: ", card2);

		this.setState({
			current_cards: {
				card1: {
					rank: card1.name,
					suit: card1.suit.substring(0,1),
				},
				card2: {
					rank: card2.name,
					suit: card2.suit.substring(0,1),
				}
			}
		});

		if (card1.value === card2.value) {
			let war1 = card1;
			let war2 = card2;
			const cards = []

			//Run war until cards are different
			while (war1.value === war2.value) {
				//TODO What if my last card is a war card? Edge Case
				var i;
				for (i = 0; i < 3; i++) {
					if (hand1.deck.length !== 1) {
						cards.push(hand1.deal());
					}
					if (hand2.deck.length !== 1) {
						cards.push(hand2.deal());
					}
				}
				cards.push(war1);
				cards.push(war2);
				war1 = hand1.deal();
				war2 = hand2.deal();
				//console.log("[War.js] play_round_of_war() war1 card", war1);
				//console.log("[War.js] play_round_of_war() war2 card", war2);
			}
			if (war1.value > war2.value) {
				for (let card in cards) {
					hand1.draw(cards[card])
				}
				hand1.draw(war1);
				hand1.draw(war2);
			} else if (war1.value < war2.value) {
				for (let card in cards) {
					hand2.draw(cards[card])
				}
				hand2.draw(war1);
				hand2.draw(war2);
			}

		} else if (card1.value > card2.value) {
			hand1.draw(card1);
			hand1.draw(card2);
		} else if (card1.value < card2.value) {
			hand2.draw(card1);
			hand2.draw(card2);
		}

		//TODO add a side hand that only gets shuffled when it is reintroduced
		hand1 = hand1.shuffle();
		hand2 = hand2.shuffle();

		this.setState({
			player1: hand1.deck,
			player2: hand2.deck,
			data: this.set_graph_data_from_hands(hand1.deck, hand2.deck),
		})
	}

	generateWinSymbol = () => {
		var Card1Value = this.state.current_cards.card1.rank;
		switch (this.state.current_cards.card1.rank) {
			case "A":
				Card1Value = 1;
				break;
			case "K":
				Card1Value = 13;
				break;
			case "Q":
				Card1Value = 12;
				break;
			case "J":
				Card1Value = 11;
				break;
			case "T":
				Card1Value = 10;
				break;
			default:
				break;
		}
		var Card2Value = this.state.current_cards.card2.rank;
		switch (this.state.current_cards.card2.rank) {
			case "A":
				Card2Value = 1;
				break;
			case "K":
				Card2Value = 13;
				break;
			case "Q":
				Card2Value = 12;
				break;
			case "J":
				Card2Value = 11;
				break;
			case "T":
				Card2Value = 10;
				break;
			default:
				break;
		}

		var winSymbol = "🤷";
		if (Card1Value > Card2Value) {
			winSymbol = "←";
		} else if (Card1Value < Card2Value) {
			winSymbol = "→";
		}
		return winSymbol;
	}

	render () {
		var gameOver = false;
		var gameOverText = "";
		if (this.state.player1.length === 0) {
			gameOverText = "Player 2 Wins!";
			gameOver = true;
		} else if (this.state.player2.length === 0) {
			gameOverText = "Player 1 Wins!";
			gameOver=true;
		}
		return (
			<React.Fragment>
				<div className={classes.cards}>
					<Card
						rank={this.state.current_cards.card1.rank}
						suit={this.state.current_cards.card1.suit}
					/>
					<div>
						<button className={classes.button} disabled={gameOver} onClick={this.play_round_of_war}>PLAY!</button>
						<div className={classes.winSymbol}>
							{this.generateWinSymbol()}
						</div>
						<div className={classes.gameOver}>
							{gameOverText}
						</div>

					</div>
					<Card
						rank={this.state.current_cards.card2.rank}
						suit={this.state.current_cards.card2.suit}
					/>
				</div>
				<div className={classes.ChartDiv}>
					<BarChart data={this.state.data} />
				</div>
			</React.Fragment>
		)
	}
}

export default War;