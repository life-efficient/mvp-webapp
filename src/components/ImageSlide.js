// Component Used By ImageCarousel to display images
//Takes the image source as prop `src`
import React from 'react'

const ImageSlide = ({ src }) => { //emotion/core didn't work for this styling??
	const styles = {
		backgroundImage: `url(${src})`,
		backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: '100%',
		width: '100%',
		transition: 'background-image .3s linear',
		margin: '1px'
	};
	
	return (
		<div className="image-slide" style={styles} />
	);
}

export default ImageSlide
