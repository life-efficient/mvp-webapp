A standard, responsive navbar. 

### Props
**back**=true|'url to go to'

**links** = [array of names of links which appear with the navbar]

**btn**='Text to display on the action button'

**roots**=[array of root pathnames that when the browser is on, put a back icon on the navbar to go to]

```jsx
import { Navbar } from "mvp-webapp";

// <Navbar links={['about', 'work', 'team']} btn='Call to action' roots={[]}/>;
<Navbar links={['about', 'work', 'team']} btn='Call to action' back={'back a page'}/>;
```