A photo marquee 

```jsx
import { Marquee } from "mvp-webapp";
import logo from '../images/external/logo.png';

const imgs = [logo, logo, logo, logo, logo, logo, logo, logo];
const html = <div>yo</div>;
const htmls = [html, html, html, html ,html, html ,html, html];

<>
<Marquee items={imgs} type='img'/>
<Marquee items={[htmls]} type='html'/>
</>
```