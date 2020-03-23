import React, {Component} from 'react'
import ImageSlide from './ImageSlide'
import {css} from '@emotion/core'


const styleArrow = (direction) => {  //returns approriate css based on arrow direction, 'left' or 'right'
    return(
        css`
            color: var(--color1);
            cursor: pointer;
            font-size: 2rem;
            top: 50%;
            
            :hover{
                transform: scale(1.1, 1.1);
                color: var(--color2);
                transition-duration: 30ms;
            }

            .arrow-left{
                left: 1rem;
            }
            .arrow-right{
                right: 1rem;
            }
        `
    )
}

const styleCarousel = css`
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

class ImageCarousel extends Component{

    constructor(props){  //takes list of images as prop
        super(props)
        this.state = {
            imageIndex : 0
        }
    }

    nextImage = () => {
        const lastIndex = this.props.images.length - 1;
        const shouldCycle = this.state.imageIndex === lastIndex;
        const newIndex = shouldCycle ? 0 : this.state.imageIndex + 1;

        this.setState({
            imageIndex : newIndex
        })
    }

    prevImage = () => {
        const lastIndex = this.props.images.length - 1;
        const shouldCycle = this.state.imageIndex === 0;
        const newIndex = shouldCycle ? lastIndex : this.state.imageIndex - 1;

        this.setState({
            imageIndex : newIndex
        })
    }

    render(){
        return(
            <div css={styleCarousel}>
                <div className="arrow-left" onClick={this.prevImage} css={styleArrow}>&#9664;</div>
                <ImageSlide src={this.props.images[this.state.imageIndex]}/>
                <div className="arrow-right" onClick={this.nextImage} css={styleArrow}>&#9654;</div>
            </div>
        )
    }
}

export default ImageCarousel