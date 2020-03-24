import React, {Component} from 'react'
import {css} from '@emotion/core'

// Imageslide component

export const ImageSlide = ({src, caption}) => {
    return(
        <div className="imageslide fade">
            <img src={src} style={{width:'100%'}} />
            <div className="image-caption">{caption}</div>
        </div>
    )
}

//carousel class
