import { render } from "@testing-library/react";
import React from "react";



class BlogList extends React.Component {
	render() {
		return (
			<div>
				<div>Blog 1</div>
				<div>Blog 2</div>
				<div>Blog 3</div>
				<div>Blog 4</div>
				<div>Blog 5</div>
				<div>Blog 6</div>
				<div>Blog 7</div>
			</div>
		)
	}
}

export default BlogList;