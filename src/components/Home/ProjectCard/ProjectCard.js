import React from 'react';
import classes from './ProjectCard.module.css';


const ProjectCard = (props) => (
	<div className={classes.ProjectCard}>
		<h3>{props.title}</h3>
		<p>{props.description}</p>
		<a href={props.link} target="_blank" rel="noopener noreferrer">
		<img src={props.image} alt="Screenshot of {props.title}" />
		</a>
	</div>
);

export default ProjectCard;
