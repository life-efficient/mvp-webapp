import React, {Component} from "react"
import { css } from "@emotion/core"
/** @jsx jsx */ import { jsx } from '@emotion/core'
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

const style = css`

    //background-color: var(--color2);
    //border: 2px solid var(--color1);
    //border-radius: 50vw;
    // width: 200px;
    margin: 30px auto;
    overflow: hidden;
    //height: 50vw;
    width: 100%;
    //max-height: 200px;

    p{
        margin:3px;
        text-align: center;
        padding-right: 6px;
    }

    .colours_grid_container{
        width:100%
        max-width:200px;
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items:flex-start;
        justify-content: flex-start;

        .colour_square{
            flex:1;
            min-width: 26px;
            min-height: 26px;
            max-width: 26px;
            max-height: 26px;
            margin: 4px;
            border-radius: 3px;
            cursor: pointer;
            border: 2px solid black;
            position: relative;
        }
        .selected_div{
            width:100%;
            height:100%;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
    
            .selected_div_bg{
                max-width: 20px;
                max-height: 20px;
                min-width: 20px;
                min-height: 20px;
                border-radius: 24px;
                flex:1;
                opacity: 0.7;
                background: #595959;
            }
    
        }
    
        .selected_icon_div{
            width:100%;
            height:100%;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index:3;
            .MuiSvgIcon-root{
                font-size: 16px;
                font-weight: bold;
                color: white !important;
            }
        }
    }
`
const default_colours = ["#D54230", "#C91C5E", "#8520AC", "#5C36B4", "#444EB3", 
                         "#71AD52", "#549587", "#69B9D3", "#5DA4F3", "#5592F2",
                         "#9BC24D", "#D0DC3C", "#F9EB3C", "#EFBF2C", "#E79722",
                         "#000000", "#687B89", "#9C9C9C", "#705649", "#FFFFFF"
                        ]

class ColourPicker extends Component {

    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            selected_col: null
        }
    }

    componentDidUpdate = (prevProps, prevState)=>{
        //console.log('updating')
        //console.log(this.state.selected_col)
        if(prevState.selected_col != this.state.selected_col){
            if(this.props.id){
                this.props.handleChange({id:this.props.id, value:this.state.selected_col})
            }else{
                this.props.handleChange(this.state.selected_col)
            }
        }
    }

    render() {
        let colours = this.props.colours ? this.props.colours:default_colours
        return (
            <>
                <div css={[style, this.props.style]}>
                    <div>{this.props.title ?<p>{this.props.title}</p>:null }</div>
                    <div className="colours_grid_container">
                        {colours.map((col)=>{
                            return <div css={css`background:${col}`}className="colour_square" onClick={()=>{this.setState({selected_col:col})}}>
                            {col==this.state.selected_col?<>
                                <div className="selected_div">
                                    <div className="selected_div_bg"></div>
                                </div>
                                <div className="selected_icon_div">
                                    <CheckIcon classname="selected_icon"/>
                                </div>
                            </>:""}
                            </div>
                        })}
                    </div>
                </div>
            </>
        )
    }   
}


export default ColourPicker