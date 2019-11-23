import { Form as FormStyle } from "../styles/forms"
import { panel } from "../styles/theme"
import React, { Component } from "react"
import Button from "./Button"
import eye from "../images/see-icon.png"
import { Redirect } from "react-router-dom"

export default class Form extends Component {
    constructor(props) {
        super(props)

        // need to assert that the questions prop contains either ONLY lists or objects
        // need to assert that the list of onSubmits is the same as the number of slides

        var question_ids = {}
        for (var s of this.props.slides) {
            console.log('S:', s)
            s.questions.map((q) => {
                question_ids[q.id] = q.default ? q.default : ''
            })
        }
        this.state = {...question_ids, slide_idx: 0}
        // var question_slides = this.props.questions
        // if (!question_slides.every((q) => {return q instanceof Array})) {      // if all elements are arrays then each of them represent a slide. if list of objects then convert to list of list of objects
        //     question_slides = [question_slides]                           // if not, then we need to put that list of dicts into a list to make it a list of lists of dicts
        // }
        // this.question_slides = question_slides

        // this.state = props.questions ?
        //     props.questions.reduce(
        //         (acc, curr) => {return {...acc, ...curr.reduce(
        //             (qs, q) => {return {...qs, [q.id]: q.default ? q.default : ''}},
        //             {...acc}
        //         )}},
        //         {slide_idx: 0}
        //     )
        //     :
        //     {}
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value},
            () =>{console.log(this.state)})
    }
    
    handleOptionChange = () => {

    }

    validate = () => {
        var s = this.state
        var errors = []
        for (var q of this.props.slides[this.state.slide_idx].questions) {
            console.log('verifying:', q)
            if (q.type === 'text') {
                if (s[q.id] == '') {errors.push(`Fill in the ${q.title.toLowerCase()} field`)}
            }
            if (q.type === 'confirm-password') {
                console.log('confirm', s[q.id])
                if (s[q.id].length < 8) {errors.push('Password should be longer')}
                if (s[q.id] != s[`confirm-${q.id}`]) {errors.push(`Passwords need to match`)}
            }
            if (q.type === 'email') {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(String(s[q.id]).toLowerCase())) {errors.push('Email is not valid')}
            }

        }
        console.log('FORM ERRORS:', errors)
        this.setState({error: errors[0]})       // either null or some error
        return errors.length > 0 ? false : true
    }

    submit = async () => {
        if (this.validate()) {      // do basic validation based on field type
            console.log('slide idx', this.state.slide_idx)
            var onSubmit = this.props.slides[this.state.slide_idx].onSubmit 
            var error = onSubmit ? await onSubmit(this.state) : null                 // validate + do extra stuff
            if (!error) {
                console.log('both internal and external validation successful')
                this.setState({slide_idx: this.state.slide_idx + 1})    // if onSubmit doesn't return null
            }
            else {
                this.setState({error})
            }
        }
        else {
            console.log('internal validation failed')
        }
    }

    render () {
        console.log('STATE:', this.state)
        if (this.state.slide_idx > this.props.slides.length - 1) {
            return <Redirect to={this.props.redirect}/>
        }
        var handleChange = this.handleChange
        var handleOptionChange = this.handleOptionChange

        var question_slides = this.question_slides
        console.log('All question slides:', question_slides)
        return (
            <>
            <div css={panel} style={{display: 'flex', flexDirection: 'row', overflow: 'hidden', justifyContent: 'left', padding: '20px'}}>
                {
                    this.props.slides.map((s) => {              // map question slides to that form slide
                        console.log('question slide:', s)
                        return <>  
                        <div style={{minWidth: '100%', padding: '0px', transform: `translateX(-${100 * this.state.slide_idx}%)`, transitionDuration: '0.5s', paddingRight: '20px'}}>
                            <div css={FormStyle} >
                                <div style={{fontSize: '30px', marginBottom: '20px', fontWeight: '900'}}>
                                    {s.title}
                                    <div className='detail'>
                                        {s.subtitle}
                                    </div>
                                </div>
                                {
                                    s.questions.map((q) => {                         // map question slide (list of objects) to the questions
                                        q = {...q, value: this.state[q.id], handleChange, handleOptionChange}
                                        switch (q.type) {
                                            case "text":
                                                return <TextResponse {...q} />
                                            case "email":
                                                return <EmailField {...q} />
                                            case "password":
                                                return <Password {...q} />
                                            case "confirm-password":
                                                return <ConfirmPassword {...q} />
                                            case "dropdown":
                                                null
                                        }
                                    })
                                }
                                <div className="error">
                                    {this.state.error}
                                </div>
                                <div className='detail'>
                                    {s.detail}
                                </div>
                                <Button text='Submit' onClick={this.submit} />
                            </div>
                        </div>
                        </>
                    })
                }
            </div>
            </>
        )
    }
}

export const TextResponse = (props) => {
    console.log('VALUE:', props.value)
    return (
        <div className="field-container">
            <div className="field-title ">
                <strong>{props.title}</strong>
            </div>
            <br/>
            <div className="field-title detail">
                {props.detail}
            </div>
            <br/>
            <input type="text" id={props.id} value={props.value} className="text-response" placeholder="" onChange={props.handleChange}/>
        </div>
    )
}

export const EmailField = (props) => {
    return <TextResponse {...props} />
}

export class Password extends Component {
    constructor (props) {
        super(props)
        this.state = {
            hidden: true
        }
    }

    toggleHidden = () => {
        this.setState({hidden: !this.state.hidden})
    }

    render(){
        return (
            <div className="field-container ">
                <div className="field-title">
                    <strong>Password</strong>
                </div>
                <br/>
                <div className="password">
                    <input type={ this.state.hidden ? 'password' : 'input' } id="password" value={this.props.value} className="text-response" placeholder=""  onChange={ this.props.handleChange }/>
                    <img src={ eye } onClick={ this.toggleHidden } alt="" />
                </div>
            </div>
        )
    }
}

export class ConfirmPassword extends Component {
    constructor (props) {
        super(props)
        this.state = {
            hidden: true
        }
    }

    toggleHidden = () => {
        this.setState({hidden: !this.state.hidden})
    }

    render(){
        return (
            <>
            <div className="field-container ">
                <div className="field-title">
                    <strong>Password</strong>
                </div>
                <br/>
                <div className="password">
                    <input type={ this.state.hidden ? 'password' : 'input' } id="password" value={this.props.value} className="text-response" placeholder=""  onChange={ this.props.handleChange }/>
                    <img src={ eye } onClick={ this.toggleHidden } alt="" />
                </div>
            </div>
            <div className="field-container ">
                <div className="field-title">
                    <strong>Confirm Password</strong>
                </div>
                <br/>
                <div className="password">
                    <input type={ this.state.hidden ? 'password' : 'input' } id="confirm-password" value={this.props.value} className="text-response" placeholder=""  onChange={ this.props.handleChange }/>
                </div>
            </div>
            </>
        )
    }
}