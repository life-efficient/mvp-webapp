import {React, Component} from 'react'
import ImageSlide from './ImageSlide'
import {css} from '@emotion/core'

const styleArrow = (direction) => {  //returns approriate css based on arrow direction, 'left' or 'right'
    return(
        css`
            ...
        `
    )
}

class ImageCarousel extends Component{

    constructor(props){
        super(props)
        this.state = {
            currentImageIndex : 0,
        }
    }

    render(){
        return(
            <div>
                <div css={styleArrow('left')} className="arrow" onClick={console.log("Clicked Left")}></div>
                <ImageSlide src={this.props.images[this.state.currentImageIndex]} />
                <div css={styleArrow('right')} className="arrow" onClick={console.log("Clicked Right")}></div>

            </div>
        )
    }
}