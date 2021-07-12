import React from 'react';
import PortfolioItem from './PortfolioItem/PortfolioItem';

import event_connect from '../../images/portfolio/event_connect.png';
import ishelf from '../../images/portfolio/ishelf.png';
import teamwork_dashboard from '../../images/portfolio/teamwork_dashboard.png';
import gh_logo_dark from '../../images/Logos/GitHub-Mark-32px.png';
import gh_logo_light from '../../images/Logos/GitHub-Mark-Light-32px.png';

const event_connect_description="Calgary Hacks was a 24-hour hackathon challenging students to develop innovative solutions to a variety of problems. Of the three problem categories, our team of 4 decided to develop a solution for students of the University of Calgary. Our web app was an event aggregator that crowd-sourced it’s event submissions, simplifying the task of finding events on the fly. We didn’t end up winning any prizes, but we created a complete product that we were all proud of (and then promptly went to sleep). Technologies include React, Django, and Docker.";
const ishelf_description="iShelf was developed as the capstone project for CMPUT301. Students were tasked with building an android application to build virtual bookshelves and lend books between different users. There were a wide range of requirements, such as QR scanning, maps integration, editing one’s library, and rating book conditions.";
const teamwork_dashboard_description="TeamWork-Dashboard was built as the capstone project for CMPUT401. Teams were paired with clients from around Edmonton and left to interface with the clients to develop their requirements and deliver a product that they could use. I worked in a team of six peers using git best practices, continuous integration and deployment, unit testing, and agile practices with scrum meetings. We were paired with a professor looking to monitor students’ contributions to a github repository. The project went through a few iterations as the client’s requirements changed and our team ran into the limitations of the libraries we were using, but the image above is the homepage of the final deliverable. Technologies include React, Django, MongoDB, and a few others.";

const Portfolio = (props) => {

    return (
        <React.Fragment>
            <PortfolioItem
                image_source={event_connect}
                alt_text="Event Connect"
                description={event_connect_description}
                gh_link="www.github.com/jeffkirker/CalgaryHacks2020-Project"
                gh_logo={gh_logo_dark}
            />
            <PortfolioItem
                image_source={ishelf}
                alt_text="ishelf"
                description={ishelf_description}
                gh_link="www.github.com/CMPUT301W19T03/iShelf"
                gh_logo={gh_logo_light}
            />
            <PortfolioItem
                image_source={teamwork_dashboard}
                alt_text="Teamwork Dashboard"
                description={teamwork_dashboard_description}
                gh_link="www.github.com/UAlberta-CMPUT401/TeamWork-Dashboard"
                gh_logo={gh_logo_dark}
            />
        </React.Fragment>
    )
}

export default Portfolio;
