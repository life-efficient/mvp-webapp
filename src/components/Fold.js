import LandingSection from "./LandingSection";
// import hero from "../images/hero.jpg"
import React from "react"
import Button from "./Button";

export default (props) => {return(
    // <div>
        <LandingSection idx={-1} inner={(
            <>
                <div style={{fontSize: '50px', fontWeight: '900'}}>
                    {props.heading}
                </div>
                <div>
                    {props.subtitle}
                </div>
                <div className="hero-filter"></div>
                <img className="hero-img" src={props.hero} alt="Add a hero image in src/images to cover this background!"/>
                {
                    props.actionText ?
                    <Button text={props.actionText ? props.actionText : 'Add an "actionText" prop!'} onClick={props.action ? props.action : () => {alert('Add a "action" prop to the LandingSection component')}}/>
                    :
                    null
                }
                {props.belowAction}
            </>
        )}/>
    // </div>
)}