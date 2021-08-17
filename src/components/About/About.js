import React from 'react';

import image from '../../images/about/me.jpg';
import classes from './About.module.css';

const about = () => (
    <div className={classes.About}>
        <img src={image} alt="Randal" />
        <div className={classes.Paragraph}>
            <p>
            Hello friends! My name is Randal and I am a recent computer science graduate.
            </p>
            <p>
            I currently spend my free time searching for work, improving the side-projects
            that I have created, and trying to stay sane during this pandemic.
            </p>
            <p>
            My favorite areas of computer science are web-dev, database management,
            data visualization, and machine learning.
            </p>
            <p>
            Outside of compsci, I enjoy rock climbing, swing dancing, biking, and whatever
            the hobby of the month is. This month is ambigrams.
            </p>
            <p>
            I love exploring new things and learning everything I can along the way.
            </p>
        </div>
    </div>
)

export default about;