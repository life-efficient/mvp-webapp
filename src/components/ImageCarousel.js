import React, {Component} from 'react'
import {css} from '@emotion/core'


//carousel class

class ImageCarousel extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <div className="carousel-container">
                    {this.props.images.map(
                    (img) => {
                        return(
                            <ImageSlide src={img} caption="Default Caption" />
                        )
                    }
                )}
                </div>
            </div>
            
        )
    }
}

export default ImageCarousel

// Imageslide component

export const ImageSlide = ({src, caption}) => {
    return(
        <div className="imageslide fade">
            <img src={src} style={{width:'100%'}} />
            <div className="image-caption">{caption}</div>
        </div>
    )
}
