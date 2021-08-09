import React from 'react'
import classes from './Card.module.css'

interface Props {
	id: number;
	color: string;
	number: string | number;
	selected: boolean;
	selectCardHandler: (id: number) => void;
}

const Card = (props:Props) => {
	var joinedClasses;
	if (props.selected) {
		joinedClasses = [classes.Card, classes.Selected].join(" ");
	} else {
		joinedClasses = classes.Card;
	}

	var color: string;
	switch (props.color) {
		case "red":
			color = "red";
			break;
		case "blue":
			color = "blue";
			break;
		case "green":
			color = "green";
			break;
		case "yellow":
			color = "yellow";
			break;
		default:
			color = "black";
			break;
	}

	var number: string | number;
	if (props.number === "wild") {
		number = "W"
	} else if (props.number === "skip") {
		number = "S"
	} else {
		number = props.number;
	}

	return (
		<div className={joinedClasses}
			onClick={() => props.selectCardHandler(props.id)}
			key={props.id}
			style={{color: color}} >
			{number}
		</div>
	)
}

export default Card;
