import React from 'react';
//import resume_file from '../../files/resume.pdf';
import classes from './Resume.module.css';

const resume = () => {
	return (
		<div>
			<h1>Randal Kimpinski</h1>

			<p>(###) ###-#### | rkimpins@ualberta.ca | LinkedIn: <a href="www.linkedin.com/in/randal-kimpinski/">randal-kimpinski</a> | Website: <a href="www.lemoncorp.xyz/resume">lemoncorp.xyz</a> </p>

			<hr/>
			<h2>Professional Experience</h2>
			<hr/>
			<br/>

			<b>VP-External and Dance Instructor</b> - Swing-Out Edmonton [September 2018 - March 2021]
			<ul>
				<li>Scheduled and coordinated social dance events, arranged flights and accommodationsfor international instructors, managed email correspondence with external organizations,recorded and prepared minutes of meetings, taught beginner dance classes.</li>
			</ul>
			<b>Box Office Representative</b> - Badlands Amphitheatre - [April 2018 - August 2018]
			<ul>
				<li>Answered telephone and electronic inquiries in a professional manner, maintained clientproﬁles with computerized information ﬁling system, regulated daily oﬃce operationsand organizational systems, provided excellent and friendly customer service to patrons.</li>
			</ul>

			<b>Concierge - Canalta Jurassic Hotel</b> - [June 2016 - August 2016]
			<ul>
				<li>Greeted and communicated effectively with guests to maintain a welcomingenvironment, booked reservations and provided local knowledge for guests, remainedﬂexible to meet a variety of guest needs.</li>
			</ul>

			<br/>
			<hr/>
			<h2>Education</h2>
			<hr/>
			<br/>

			<b>University of Alberta</b> - Edmonton, AB [Graduated July 2021]
			<ul>
				<li> Bachelor’s in Computer Science With Distinction</li>
				<li> Dean’s Honor Roll 2018-2019</li>
			</ul>
			<b>Additional Online Certificates</b>
			<ul>
				<li> Administrative Support - <b>Alison</b></li>
				<li> Ultimate Microsoft Office; Excel, Word, PowerPoint & Access - <b>Udemy</b></li>
				<li> Technical Writing One and Two - <b>Google</b></li>
			</ul>

			<br/>
			<hr/>
			<h2>Skills</h2>
			<hr/>
			<br/>

			<b>Programming Languages</b>
			<ul><li>
			Java, Typescript, HTML/CSS/Javascript, C / C++, Python, SQL, Matlab, Lisp, MIPS Architecture
			</li></ul>
			<b>Frameworks and Technologies</b>
			<ul><li>
			Git, React, Django and Rest API’s, FastAPI, Cypress, Numpy, Tensorflow, Agile Practices, Scrum, Object Oriented Design, Android Studio, MongoDB,  Linux
			</li></ul>

		</div>
	)

};

export default resume;