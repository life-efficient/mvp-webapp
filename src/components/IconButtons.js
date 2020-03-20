import React, { Component } from "react"
import { css, jsx } from "@emotion/core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom"


const style = css`
    display: flex;
    justify-content: center;
    border-radius: 30px;

    .item {
        position: relative;
        .item-link {
            font-family: var(--font1);
            font-weight: 900;
            color: var(--color2);
            display: flex;
            position: relative;
            width: 35px;
            overflow: hidden;
            flex-direction: row;
            align-items: center;
            justify-content: left;
            padding: 10px;
            margin: 5px;
            cursor: pointer;
            transition-duration: 1s;
            border-radius: 50px;
            z-index: 100;
            transition-duration: 0.5s;
            z-index: 0;
            backgroun-color: var(--color1);

            :hover {
                background-color: var(--color2);
                color: var(--color1) !important;
                .faicon {
                    color: var(--color1) !important;
                }
            }
            .faicon, img {
                padding-right: 10px;
                transition-duration: 1s;
                font-size: 35px;
                color: var(--color2);

                height: 35px;
                width: 35px;
            }
        }

        .alert {
            background-color: red;
            box-shadow: var(--shadow);
            position: absolute;
            top: -10px;
            left: -10px;
            border-radius: 30px;
            color: black;
            padding: 5px;
            min-width: 10px;
            text-align: center;
            margin: 10px;
            font-family: var(--font1);
            --textheight: 10px;
            height: var(--textheight);
            font-size: var(--textheight);
            font-weight: 900;
            
        }
    }
    }
`

export default class extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div css={style}>
                {this.props.items.map(i=>{return ( 
                    <div className="item">
                        <Link to={i.to} onClick={i.onClick} className="item-link"> 
                            {i.faIcon ? <FontAwesomeIcon icon={i.faIcon} className="faicon"/> : <img src={i.icon} />}
                            {window.innerWidth > 1100 ? i.title : null}
                        </Link>                        
                        {i.alert ? <div className="alert">{i.alert}</div> : null}
                    </div>
                )})}
            </div>
        )
    }
}