import React, {Component} from 'react'
import {css} from '@emotion/core'


//carousel class

// css styling
const style = css`
    box-sizing: border-box;

    > .carousel-container {
        max-width: 1000px;
        height: 300px;
        position: relative;
        margin: auto;
        
        > .prev, .next {
            cursor: pointer;
            position: absolute;
            top: 50%;
            width: auto;
            margin-top: -22px;
            padding: 16px;
            color: white;
            font-weight: bold;
            font-size: 18px;
            transition: 0.6s ease;
            border-radius: 0 3px 3px 0;
            user-select: none;
        }
        > .next{
            right: 0;
            border-radius: 3px 0 0 3px;
        }
        > .prev:hover, .next:hover {
            background-color: rgba(0,0,0,0.8);
        }

        > .fade {
            -webkit-animation-name: fade;
            -webkit-animation-duration: 1.5s;
            animation-name: fade;
            animation-duration: 1.5s;
          }
    }

    .dot-container{
        text-align: center;
    }
    .dot {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.4s ease;
    }
      
    .active, .dot:hover {
        background-color: var(--color2);
    }
`


class ImageCarousel extends Component{

    constructor(props){
        super(props)
        this.state = {
            imageIndex : 0
        }
    }

    // Logic for changing images

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

    jumpImage = (e) => {
        const index = parseInt(e.currentTarget.id)
        this.setState({
            imageIndex : index
        })
    }

    render(){
        return(
            <div css={style}>
                <div className="carousel-container">
                    <ImageSlide src={this.props.images[this.state.imageIndex]} />

                {/* Next and previous buttons */}
                <a className="prev" onClick={this.prevImage}>&#10094;</a>
                <a className="next" onClick={this.nextImage}>&#10095;</a>

                </div>
                <br />
                
                {/* Circles indicating slide */}
                <div className="dot-container">
                    {this.props.images.map(
                        (img, index) => {
                            if (index === this.state.imageIndex) {
                                return(
                                    <span className="dot active" id={index} onClick={this.jumpImage}></span>
                                )
                            } else {
                                return(
                                    <span className="dot" id={index} onClick={this.jumpImage}></span>
                                )
                            }
                        }
                    )}
                </div>
                
            </div>
            
        )
    }
}

export default ImageCarousel


// Imageslide component
// Need to fix animations - maybe use div background image?
const style_imageSlide = css` 
    height: 100%;

    @-webkit-keyframes fade {
        from {opacity: .4}
        to {opacity: 1}
      }
      
      @keyframes fade {
        from {opacity: .4}
        to {opacity: 1}
      }
    
    > .fade{
        -webkit-animation-name: fade;
        -webkit-animation-duration: 1.5s;
        animation-name: fade;
        animation-duration: 1.5s;
    }

    > img{
        width: 100%;
        height: 100%;
    }   
`


export const ImageSlide = ({src, caption}) => {
    return(
        <div className="imageslide fade" css={style_imageSlide}>
            <img src={src} />
        </div>
    )
}

// Dot component
