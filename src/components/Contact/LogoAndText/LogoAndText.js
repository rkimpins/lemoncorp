import React from 'react';

import classes from './LogoAndText.module.css';

const logoAndText = (props) => {
	return (
		<div className={classes.LAT}>
			<a href={props.link} target="_blank">
				<img src={props.logo} alt={props.alt}/>
			</a>
			<p>{props.text}</p>
		</div>
	);
}

export default logoAndText;