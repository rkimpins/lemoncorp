import React from 'react';

import li_logo from '../../images/Logos/linkedin_logo.png';
import gh_logo from '../../images/Logos/github_logo.png';
import i_logo from '../../images/Logos/instagram_logo.png';
import g_logo from '../../images/Logos/gmail_logo.png';
import f_logo from '../../images/Logos/facebook_logo.png';
import LogoAndText from './LogoAndText/LogoAndText';

import classes from './Contact.module.css';

const contact = () => {
    return (
        <div>
            <p>
                Hey friends. If you need to reach me for any reason you can find me on any of these platforms.
            </p>
            <div>
                <LogoAndText
                    logo={gh_logo}
                    alt="Github"
                    link="https://github.com/rkimpins/"
                    text="rkimpins"
                />
                <LogoAndText
                    logo={li_logo}
                    alt="LinkedIn"
                    link="https://www.linkedin.com/in/randal-kimpinski/"
                    text="randal-kimpinski"
                />
                <LogoAndText
                    logo={i_logo}
                    alt="Instagram"
                    link="https://www.instagram.com/"
                    text="coming soon"
                />
                <LogoAndText
                    logo={g_logo}
                    alt="Gmail"
                    link="https://www.gmail.com/"
                    text="rkimpins@ualberta.ca"
                />
                <LogoAndText
                    logo={f_logo}
                    alt="Facebook"
                    link="https://www.facebook.com/randal.kimpinski/"
                    text="randal.kimpinski"
                />
            </div>
        </div>
    );
}

export default contact;