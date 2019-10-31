import React from "react"
import Fold from "./Fold"
import LandingSection from "./LandingSection"
import { Background } from ".."

export default (props) => { return (
    <>
        <Fold hero={props.hero} heading={props.heading ? props.heading : 'Add a `heading` prop!'} subtitle={props.subtitle ? props.subtitle : 'Add a `subtitle` prop!'} text={props.btnText ? props.btnText : 'Pass a "btnText" prop to the LandingPage component!'} action={props.action ? props.action : () => {alert('Pass an `action` prop to the fold component!')}} />
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