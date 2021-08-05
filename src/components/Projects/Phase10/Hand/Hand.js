import React from 'react'
import classes from './Hand.module.css'
import Card from '../Card/Card';


const Hand = (props) => {
	//props.cards
	/*
		backgroundColor: "black",
		width:"20px",
		height:"20px",
	*/
	return (
		<div className={classes.Hand}>
			{props.cards.map((card) => {
				return (
					<Card
						{...card}
						selectCardHandler={props.selectCardHandler}
						key={card.id}
					/>
				)

			})
			}
		</div>
	)
}

export default Hand;
