import React from 'react';
import { Chart } from 'react-charts'

const BarChart = (props) => {

	let axes = [
		{ primary: true, type: 'ordinal', position: 'left' },
		{ type: 'linear', position: 'bottom', stacked: true }
	];
	return(
		<div style={{ width: '400px', height: '300px' }} >
			<Chart data={props.data} series={{type:'bar'}} axes={axes} />
		</div>
	)
};

export default BarChart;

