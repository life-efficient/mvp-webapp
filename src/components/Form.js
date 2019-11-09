import { Form as FormStyle } from "../styles/forms"
import { panel } from "../styles/theme"
import React, { Component } from "react"
import Button from "./Button"
import eye from "../images/see-icon.png"

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = props.questions ?
            props.questions.reduce(
                (acc, curr) => {return {...acc, [curr.id]: curr.default ? curr.default : ''}},
                {}
            )
            :
            {}
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value},
            () =>{console.log(this.state)})
    }   
    
    handleOptionChange = () => {

    }

    validate = () => {
        return true
    }

    submit = () => {
        if (this.validate()) this.props.onSubmit(this.state)
    }

    render () {
        console.log('STATE:', this.state)
        var handleChange = this.handleChange
        var handleOptionChange = this.handleOptionChange
        return (
            <div css={panel} >
                <div css={FormStyle}>
                    <div style={{fontSize: '30px', marginBottom: '20px', fontWeight: '900'}}>
                        {this.props.title}
                        <div className='detail'>
                            {this.props.subtitle}
                        </div>
                    </div>
                    {
                        this.props.questions.map(
                            (q) => {
                                q = {...q, handleChange, handleOptionChange}
                                switch (q.type) {
                                    case "text":
                                        return <TextResponse {...q} />
                                    case "password":
                                        return <Password {...q} />
                                    case "dropdown":
                                        null
                                }
                            }
                        )
                    }
                    <div className='detail'>
                        {this.props.detail}
                    </div>
                </div>
                <Button text='Submit' onClick={this.submit} />
            </div>
        )
    }
}

export const TextResponse = (props) => {
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
