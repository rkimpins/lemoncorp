import React from 'react';


import ladybug from '../../../../images/Bugs/ladybug.png';
import centipede from '../../../../images/Bugs/centipede.png';
import butterfly from '../../../../images/Bugs/butterfly.png';
import hercules_beetle from '../../../../images/Bugs/hercules_beetle.png';
import stag_beetle from '../../../../images/Bugs/stag_beetle.png';
import american_carrion_beetle from '../../../../images/Bugs/american_carrion_beetle.png';

import classes from './DisplayBug.module.css';

const DisplayBug = (props) => {
	var img_src;
	switch (props.name) {
		case 'Ladybug':
			img_src = ladybug;
			break;
		case 'Centipede':
			img_src = centipede;
			break;
		case 'Butterfly':
			img_src = butterfly;
			break;
		case 'Hercules Beetle':
			img_src = hercules_beetle;
			break;
		case 'Stag Beetle':
			img_src = stag_beetle;
			break;
		case 'American Carrion Beetle':
			img_src = american_carrion_beetle;
			break;
		default:
			console.log("[DisplayBug.js] No img source matched");
	}

	return (
		<div className={classes.Bug}>
			<h4>{props.name}</h4>
			<img
				src={img_src}
				alt={props.name}
				onClick={() => props.onClick(props.bugIndex)}/>
			<p>{Math.round(props.currentElo)}</p>
		</div>
	)
};

export default DisplayBug;