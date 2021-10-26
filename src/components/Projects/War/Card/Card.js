import React from 'react'
import classes from './Card.module.css'

function importAll(r) {
	let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
	return images
}

const images = importAll(require.context('../../../../images/CardFaces', false, /\.(png|jpg|jpeg|svg)$/));

const Card = (props) => {
	const combo = props.rank.toString() + props.suit.toString();
	console.log("CardCombo:", combo);
	console.log(`${combo}.jpg`);
	var image;
	if (combo.length === 0) {
		image = <img src={images["Back.jpg"].default} alt={"Back"}/>;
	} else {
		image = <img src={images[`${combo}.jpg`].default} alt={combo}/>;
	}
	return (
		<div className={classes.Card}>
			{image}
		</div>
	)
}

export default Card;
