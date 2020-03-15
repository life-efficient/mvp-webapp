A photo marquee 
### props

#### items
- **type**: `array` of html or img srcs (depending on type prop)
- **default**: `null`
- **required**: `false`
- **description**: a list of the items which are shown on the marquee

#### type
- **type**: `string`
- **default**: `html`
- **required**: `false`
- **description**: Specifies whether the items should be treated as images or html

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