import React, {Component} from 'react';
import Hand from './Hand/Hand';
import classes from './Chopsticks.module.css';

class Chopsticks extends Component {

	state = {
		hands: [
			[1, 2],
			[3, 4],
		],
		select_hand: null,
		turn: 0,
	}

	hand_clicked_handler = (hand_index) => {
		const hands = this.state.hands;
		// Don't allow player to select hand when game is over
		if (this.game_over() !== 0) {
			return;
		}
		// Don't allow player to select a hand without fingers
		if (hands[hand_index[0]][hand_index[1]] === 0) {
			window.alert("Can't select a hand with no fingers");
			return;
		}

		if (this.state.select_hand === null) {

			if (hand_index[0] !== this.state.turn) {
				window.alert("Please select a hand from player " + (this.state.turn + 1).toString() + " first");
			}
			else {
				this.setState({
					select_hand: hand_index,
				});
			}

		} else {
			if (hand_index[0] === this.state.turn) {
				this.setState({
					select_hand: hand_index
				})
			} else {
				//Update new hand value
				hands[hand_index[0]][hand_index[1]] = (hands[hand_index[0]][hand_index[1]] + hands[this.state.select_hand[0]][this.state.select_hand[1]]) % 5;
				//Swap turns
				const new_turn = (this.state.turn + 1) % 2;

				this.setState({
					hands: hands,
					turn: new_turn,
					select_hand: null,
				});
			}
		}
	}

	reset_game_handler = () => {
		this.setState({
			hands: [
				[1, 1],
				[1, 1],
			],
			select_hand: null,
			turn: 0,
		});
	}

	componentDidUpdate() {
		const victor = this.game_over();
		if (victor === 1) {
			window.alert("Player 1 wins!");
			console.log("Player 1 wins!");
		} else if (victor === 2) {
			window.alert("Player 2 wins!");
			console.log("Player 2 wins!");
		}
	}

	//Return the player that has won or return 0 if the game is not over
	game_over = () => {
		if (this.state.hands[0][0] === 0 && this.state.hands[0][1] === 0) {
			//Player 2 wins
			return 2;
		} else if (this.state.hands[1][0] === 0 && this.state.hands[1][1] === 0) {
			//Player 1 wins
			return 1;
		} else {
			return 0;
		}
	}


	render() {
		var victory_message = "";
		const victor = this.game_over();

		if (victor !== 0) {
			victory_message = "Player " + victor.toString() + " wins!";
		}
		console.log(victor)

		return (
			<div className={classes}>
				<div className={classes.Player1}>
					<Hand 
						index={[0,0]} 
						value={this.state.hands[0][0]} 
						selected={this.state.select_hand}
						onClick={this.hand_clicked_handler}
					/>
					<Hand 
						index={[0,1]} 
						value={this.state.hands[0][1]} 
						selected={this.state.select_hand}
						onClick={this.hand_clicked_handler}
					/>
				</div>
				<button onClick={this.reset_game_handler}>Reset Game</button>
				<h1>{victory_message}</h1>
				<div className={classes.Player2}>
					<Hand 
						index={[1,0]} 
						value={this.state.hands[1][0]} 
						selected={this.state.select_hand}
						onClick={this.hand_clicked_handler}
					/>
					<Hand 
						index={[1,1]} 
						value={this.state.hands[1][1]} 
						selected={this.state.select_hand}
						onClick={this.hand_clicked_handler}
					/>
				</div>
			</div>
		)
	}


}


export default Chopsticks;