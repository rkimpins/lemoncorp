import React from 'react';


const ProjectCard = (props) => (
	<div>
		<div className="project-card-title">
			<h3>{props.title}</h3>
		</div>
		<div className="project-card-description">
			<p>{props.description}</p>
		</div>
		<img src={props.image} />
	</div>
);

export default ProjectCard;

