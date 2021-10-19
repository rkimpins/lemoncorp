import React from 'react';
import ProjectCard from './ProjectCard/ProjectCard';

import bugEloScreenshot from '../../images/ProjectScreenshot/bugElo.png';
import chopsticksScreenshot from '../../images/ProjectScreenshot/chopsticks.png';
import integerSequencesScreenshot from '../../images/ProjectScreenshot/integerSequences.png';
import Phase10Screenshot from '../../images/ProjectScreenshot/phase10.png';
import warScreenshot from '../../images/ProjectScreenshot/war.png';
import voronoi from '../../images/ProjectScreenshot/voronoi.png';

import classes from './Home.module.css';

const home = () => (
    <div className={classes.Home}>
        <h1 className={classes.Home}>Recent projects</h1>
        <div className={classes.Home}>
            <ProjectCard
                title="Voronoi"
                description="A simple implementation of the Voronoi diagram algorithm."
                image={voronoi}
                link="Voronoi"
            />
            <ProjectCard
                title="bugElo"
                description="A simple demonstration of the way elo works using fighting bugs as an example. Pick your bug and have them face off to see how their elo changes."
                image={bugEloScreenshot}
                link="/BugElo"
            />
            <ProjectCard
                title="Chopsticks"
                description="An implementation of the children's finger game 'Chopsticks'. Players take turns striking each other's hands to add their finger amount, and once both of the opponents hands reach 5 they are out."
                image={chopsticksScreenshot}
                link="/Chopsticks"
            />
            <ProjectCard
                title="Integer Sequences"
                description="Experimenting with generating different integer sequences in javascript."
                image={integerSequencesScreenshot}
                link="/IntegerSequences"
            />
            <ProjectCard
                title="Phase 10"
                description="An implementation of the game of Phase10."
                image={Phase10Screenshot}
                link="/Phase10"
            />
            <ProjectCard
                title="War"
                description="An implementation of the game of War. Useful for seeing the way that card distribution effects game outcome and the ways that wars complicate it."
                image={warScreenshot}
                link="/War"
            />
        </div>
    </div>
);


export default home;