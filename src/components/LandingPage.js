import React from "react"
import Fold from "./Fold"
import LandingSection from "./LandingSection"
import Navbar from "./Navbar"
import { Background } from ".."

export default (props) => { return (
    <>
        <Navbar btn='Login' to={props.navLink}/>
        <Fold hero={props.hero} 
            heading={props.heading ? props.heading : 'Add a `heading` prop!'} 
            subtitle={props.subtitle ? props.subtitle : 'Add a `subtitle` prop!'} 
            text={props.btnText ? props.btnText : 'Pass a "btnText" prop to the LandingPage component!'} 
            action={props.action ? props.action : () => {alert('Pass an `action` prop to the fold component!')}}
            belowAction={props.fold.belowAction} 
        />
        {
            props.sections ?
            props.sections.map((inner, idx) => {return (
                <LandingSection inner={inner} idx={idx} />
            )})
            :
            null
        }
    </>
)}