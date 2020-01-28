Footer

The footer displays the company address, contact number and social links.
The company address and contact number are in the app section of redux's state tree.
The social icons will appear if a `socials` prop is passed to the footer (or the landing page) component. This prop should be an Object mapping the name of a social media to it's appropriate link. Clicking the social icon will open that link in a new tab.
Currently supported social medias (supported as keys in the prop) include `twitter`, `linkedin` and `facebook`.

```jsx
import { Footer } from "mvp-webapp";

<Footer socials={{'twitter': 'https://twitter.com/life_efficient', 'linkedin': 'https://www.linkedin.com/in/harry-b-502b88100/', 'facebook': 'https://www.facebook.com/THEAICORE'}}/>
```