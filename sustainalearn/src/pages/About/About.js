import React, { Component } from 'react';
import './About.css';

const About = () => {
    return (
        <div className="About-us">
            <div className="about-title">About Us</div>
            <div className="about-quote">
                <q>When you know better you can do better</q>
                <br />
            </div>
            <div className="about-body">
                Sustainalearn seeks to be a force for good in the world by aggregating resources for environmental
                and climate-related data. We strive to become the greatest collection of reliable and verified information
                regarding climate change and environmental news. A thriving open discussion on featured articles is 
                encouraged so that every person of any background can engage and learn more with each other.
            </div>
            <div className="about-title">Meet the Team</div>
            <div className="about-body">
                Patria Rivera - Computer Science | 5th year | Wants to save the planet for octopodes <br/>
                Alexa Cole - Computer Engineering | 4th year | Wants to improve Google Translate <br/>
                Ryan Brown - Computer Engineering | 5th year | Wants to make VR funner <br/>
                Namgyung Yoo - Computer Science | 3rd year
            </div>
        </div>
    )
}

export default About;