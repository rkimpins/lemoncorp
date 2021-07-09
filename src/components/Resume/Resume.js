import React from 'react';
import resume_file from '../../files/resume.pdf';

const resume = () => (
	<embed src={resume_file} type="application/pdf" width="98%" height="800px"  />
	//Leave a little bit of space around the edges to escape scroll depending on screen size
);

export default resume;