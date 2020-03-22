// Component Used By ImageCarousel to display images
//Takes the image source as prop `src`
import React from 'react'
import {css} from '@emotion/core'

const ImageSlide = (props) => {
    const style = css`
        background-image: url(${props.src});
        background-size: cover;
        background-Position: center;
    `

    return(
        <div className="image-slide" css={style}></div>
    )
} 

export default ImageSlide
