import React from 'react';
import PropTypes from 'prop-types';

import hand_0 from '../../../../images/counting_hands/0.png';
import hand_1 from '../../../../images/counting_hands/1.png';
import hand_2 from '../../../../images/counting_hands/2.png';
import hand_3 from '../../../../images/counting_hands/3.png';
import hand_4 from '../../../../images/counting_hands/4.png';
import hand_5 from '../../../../images/counting_hands/5.png';

import classes from './Hand.module.css';

const hand = (props) => {
	const hands = [
		hand_0,
		hand_1,
		hand_2,
		hand_3,
		hand_4,
		hand_5
	]

	//transform: scaleY(-1)
	//if (props.orientation === "vertical") {}

	var img_selected;
	if (props.selected === null) {
		img_selected = "";
	} else if (props.selected[0] === props.index[0] && props.selected[1] === props.index[1]) {
		console.log("[Hand.js] props selected: ", props.selected);
		console.log("[Hand.js] props index: ", props.index);
		img_selected = classes.Selected_Hand;
	} else {
		img_selected = "";
	}

	const alt_message = "Hand with " + props.value.toString() + " fingers";

    return (
		<div className={classes.Hand}>
			<img 
				className={img_selected} 
				src={hands[props.value]} 
				onClick={() => props.onClick(props.index)}
				alt={alt_message}/>
		</div>
    )
}

hand.propTypes = {
	value: PropTypes.number.isRequired,
}

export default hand;