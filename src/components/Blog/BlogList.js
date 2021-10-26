import { render } from "@testing-library/react";
import React from "react";
import classes from "./BlogList.module.css";
import ProjectCard from "../Home/ProjectCard/ProjectCard";



class BlogList extends React.Component {
	render() {
		return (
			<div class="container">
			<div class="row">
				<div class="col-sm">
					<ProjectCard 
						title="Blog 1"
						description="Lorem ipsum dolor sit amet"
						image="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
						link="https://www.google.com"
					/>
				</div>
				<div class="col-sm">
					<div class="card" style={{width: "18rem"}}>
						<img class="card-img-top" src="..." alt="Card image cap"/>
							<div class="card-body">
								<h5 class="card-title">Card title</h5>
								<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="#" class="btn btn-primary">Go somewhere</a>
							</div>
					</div>
				</div>
				<div class="col-sm">
					Blog 3
				</div>
			</div>
			<div class="row">
				<div class="col-sm">
					Blog 3
				</div>
				<div class="col-sm">
					Blog 3
				</div>
				<div class="col-sm">
					Blog 3
				</div>

			</div>
			<div class="row">
				<div class="col-sm">
					Blog 3
				</div>
				<div class="col-sm">
					Blog 3
				</div>
				<div class="col-sm">
					Blog 3
				</div>

			</div>
			<div class="row">
				<div class="col-sm">
					Blog 3
				</div>
				<div class="col-sm">
					Blog 3
				</div>
				<div class="col-sm">
					Blog 3
				</div>
			</div>
			<div class="row">
				<div class="col-sm">
					Blog 3
				</div>
				<div class="col-sm">
					Blog 3
				</div>
				<div class="col-sm">
					Blog 3
				</div>
			</div>
			</div>
		)
	}
}

export default BlogList;