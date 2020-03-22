// Component Used By ImageCarousel to display images
//Takes the image source as prop `src`
import React from 'react'

const ImageSlide = ({ src }) => { //emotion/core didn't work for this styling??
	const styles = {
		backgroundImage: `url(${src})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	};
	
	return (
		<div className="image-slide" style={styles}></div>
	);
}

export default ImageSlide
