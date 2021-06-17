import React from 'react';
import ModalImage from 'react-modal-image';

import classes from './PortfolioItem.module.css';

//<img src={props.image_source} alt={props.alt_text}/>
const PortfolioItem = (props) => (
    <div className={classes.portfolio_item}>
        <div className={classes.container}>
            <ModalImage
                small={props.image_source}
                large={props.image_source}
                alt={props.alt_text}
            />
            <a href={props.gh_link}><img className={classes.gh_mark} src={props.gh_logo} alt=""/></a>
        </div>
        <p>{props.description}</p>
    </div>
)

export default PortfolioItem;