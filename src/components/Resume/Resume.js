import React from 'react';
import resume_file from '../../files/resume.pdf';
import classes from './Resume.module.css';

const resume = () => (
	//Leave a little bit of space around the edges to escape scroll depending on screen size
	<div className={classes}>
		<a href={resume_file} download="Randal Kimpinski Resume"><button type="button">Download</button></a>
		<embed src={resume_file} type="application/pdf" width="98%" height="800px"  />
	</div>
);

export default resume;