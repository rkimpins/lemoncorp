import React from 'react'


const Hand = (props) => {
	//props.cards
	/*
	const hand = props.cards.map((card) => {
			return (
				<p>{card.name}-{card.color}</p>
			)
		});
	*/
	return (
		<React.Fragment>
			{props.cards.map((card) => {
				return (
					<div key={card.id.toString() + card.color.toString() + card.number.toString()}>
					{card.color}-{card.number}
					</div>
				)
			})
			}
		</React.Fragment>
	)
}

export default Hand;
