A standard, responsive navbar. When viewport becomes too small to fit in all links, they are pushed under. 

### props
#### root
- **type**: `string`
- **default**: `null`
- **required**: `false`
- **description**: When the path=root, the Navbar will show the name of your webapp in the left. Otherwise it will show 'back', and link back to this path when clicked.

#### links
- **type**: `array`
- **default**: `null`
- **required**: `false`
- **description**: array of strings that link to that string as a pathname

#### btn
- **type**: `string` 
- **default**: `null`
- **required**: `true`
- **description**: Text shown on action button

#### action 
- **type**: function
- **default**: `null`
- **required**: `false`
- **description**: function called when action button on right of Navbar is clicked

<!-- 
#### back
- **type**: `bool`
- **default**: `null`
- **required**: `false`
- **description**: url to go back to when not on root page -->

```jsx
import { Navbar } from "mvp-webapp";

// <Navbar links={['about', 'work', 'team']} btn='Call to action' roots={[]}/>;
<Navbar links={['about', 'work', 'team']} btn='Call to action' back={'back a page'} logo={'src/images/arrow.png'}/>;
```