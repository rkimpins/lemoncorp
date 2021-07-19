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
			console.log("[Chopsticks]", "Player 1 wins!");
		} else if (victor === 2) {
			window.alert("Player 2 wins!");
			console.log("[Chopsticks]", "Player 2 wins!");
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

	//Handle swapping finger amounts
	swap_fingers_handler = (hand, amount) => {
		//Can't swap fingers in a symmetrical way
		//Can swap to revive a hand
		//Can swap to kill a hand
		console.log("[Chopsticks.js] Swap_fingers_handler arguments", hand, amount);

		const hands = this.state.hands;
		hands[hand][0] = (hands[hand][0] - amount) % 5;
		hands[hand][1] = (hands[hand][1] + amount) % 5;
		const new_turn = (this.state.turn + 1) % 2;

		//Set state and Switch turns
		this.setState({
			hands: hands,
			select_hand: null,
			turn: new_turn,
		});

	}


	render() {
		var victory_message = "";
		const victor = this.game_over();

		if (victor !== 0) {
			victory_message = "Player " + victor.toString() + " wins!";
		}
		console.log("[Chopsticks.js] game_over output: ", victor);

		if (this.state.turn === 0) {
			//Swap Buttons Player 1
			var swap_button_p1_h1 = [];
			for (let i = 1; i <= this.state.hands[0][0]; i++) {
				if ((this.state.hands[0][0] - i) === this.state.hands[0][1]) {
					continue;
				}
				console.log("[Chopsticks] swap_button_p1h1 creation loop index: ", i);
				swap_button_p1_h1.push(
					<button 
						key={"p1h1-" + i.toString()}
						className={classes.swap_button}
						onClick={() => this.swap_fingers_handler(0, i)}>
						{">>" + i.toString() + ">>"}
					</button>
				);
			}
			var swap_button_p1_h2 = [];
			for (let i = 1; i <= this.state.hands[0][1]; i++) {
				if ((this.state.hands[0][1] - i) === this.state.hands[0][0]) {
					continue;
				}
				swap_button_p1_h2.push(
					<button 
						key={"p1h2-" + i.toString()}
						className={classes.swap_button} onClick={this.swap_fingers_handler.bind(this, 0, -i)}>
						{"<<" + i.toString() + "<<"}
					</button>
				);
			}
		} else if (this.state.turn === 1) {

			//Swap Buttons Player 2
			var swap_button_p2_h1 = [];
			for (let i = 1; i <= this.state.hands[1][0]; i++) {
				if ((this.state.hands[1][0] - i) === this.state.hands[1][1]) {
					continue;
				}
				swap_button_p2_h1.push(
					<button 
						key={"p2h1-" + i.toString()}
						className={classes.swap_button} onClick={this.swap_fingers_handler.bind(this, 1, i)}>
						{">>" + i.toString() + ">>"}
					</button>
				);
			}
			var swap_button_p2_h2 = [];
			for (let i = 1; i <= this.state.hands[1][1]; i++) {
				if ((this.state.hands[1][1] - i) === this.state.hands[1][0]) {
					continue;
				}
				swap_button_p2_h2.push(
					<button 
						key={"p2h2-" + i.toString()}
						className={classes.swap_button} onClick={this.swap_fingers_handler.bind(this, 1, -i)}>
						{"<<" + i.toString() + "<<"}
					</button>
				);
			}
		}



		console.log("[Chopsticks.js] Swap button array p1h1", swap_button_p1_h1);


		return (
			<div className={classes}>
				<div className={classes.Player1}>
					<Hand 
						index={[0,0]} 
						value={this.state.hands[0][0]} 
						selected={this.state.select_hand}
						onClick={this.hand_clicked_handler}
					/>
					<div>
						{swap_button_p1_h1}
						{swap_button_p1_h2}
					</div>
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
					<div>
						{swap_button_p2_h1}
						{swap_button_p2_h2}
					</div>
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