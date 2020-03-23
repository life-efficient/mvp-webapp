Infinitely scrolling image carousel. 

### props
#### images
- **type**: `list/array of image urls`
- **default**: `null`
- **required**: `true`
- **description**: The images to show on the carousel.

```jsx
import {ImageCarousel} from 'mvp-webapp'
import img1 from '../images/socials/linkedin.png';
import img2 from '../images/socials/twitter.png';
import img3 from '../images/socials/facebook.png';

const imgs = [img1, img2, img3];

<ImageCarousel images={imgs} />

```