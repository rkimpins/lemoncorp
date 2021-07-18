import React, {Component} from 'react';
import Hand from './Hand/Hand';
import classes from './Chopsticks.module.css';

class Chopsticks extends Component {

	state = {
		hands: [
			[1, 2],
			[3, 4],
		],
		select_hand: [0,0],
		turn: 1,
	}

	hand_clicked_handler = (hand_index) => {
		const hands = this.state.hands;
		if (this.state.select_hand === null) {
			window.alert("Please select a hand from player {this.state.turn} first");
		} else {
			console.log(hand_index, this.state.select_hand);
		}
		this.setState({
			select_hand: hand_index
		})
	}

	render() {
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