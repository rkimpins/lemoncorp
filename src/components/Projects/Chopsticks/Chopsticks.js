import React, {Component} from 'react';
import Hand from './Hand/Hand';
import classes from './Chopsticks.module.css';

class Chopsticks extends Component {

	render() {
		return (
			<div className={classes}>
				<Hand value={0} orientation={0}/>
				<Hand value={1} orientation={0}/>
				<Hand value={2} orientation={0}/>
				<Hand value={3} orientation={0}/>
				<Hand value={4} orientation={0}/>
				<Hand value={5} orientation={0}/>
			</div>
		)
	}



}


export default Chopsticks;