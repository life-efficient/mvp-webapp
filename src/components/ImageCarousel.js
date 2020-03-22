import {React, Component} from 'react'
import ImageSlide from './ImageSlide'
import {css} from '@emotion/core'

const styleArrow = (direction) => {  //returns approriate css based on arrow direction, 'left' or 'right'
    return(
        css`
            color: var(--color2);
            cursor: pointer;
            font-size: 2rem;
            position: fixed;
            top: 50;
            ${direction} : 1rem;
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

    //functions for changing slide 

    prevSlide() {
        const lastIndex = this.props.images.length - 1
        const {currentImageIndex} = this.state
        const shouldResetIndex = currentImageIndex === 0;
        const index = shouldResetIndex ? lastIndex : currentImageIndex - 1

        this.setState({
            currentImageIndex : index
        })
    }

    nextSlide() {
        const lastIndex = this.props.images.length - 1
        const {currentImageIndex} = this.state
        const shouldResetIndex = currentImageIndex === lastIndex
        const index = shouldResetIndex ? 0 : currentImageIndex + 1

        this.setState({
            currentImageIndex : index
        })
    }



    render(){
        return(
            <div>
                <div css={styleArrow('left')} className="arrow" onClick={this.prevSlide}>&#9654;</div>
                
                <img 
                src={
                    this.props.images[this.state.currentImageIndex] //gets url of next image based on current state and img prop
                } 
                />
                <div css={styleArrow('right')} className="arrow" onClick={this.nextSlide}>&#9664;</div>

            </div>
        )
    }
}

export default ImageCarousel