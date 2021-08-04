import React from 'react'


const Hand = (props) => {
	//props.cards
	/*
		backgroundColor: "black",
		width:"20px",
		height:"20px",
	*/
	return (
		<React.Fragment>
			{props.cards.map((card) => {
				return (
					<div 
						key={card.id.toString() + card.color.toString() + card.number.toString()}
						style={{color: card.color, 
							}}
						>
						{card.number}
					</div>
				)
			})
			}
		</React.Fragment>
	)
}

export default Hand;
