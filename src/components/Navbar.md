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

#### btn_icon
- **type**: image 
- **default**: `null`
- **required**: `false`
- **description**: Icon shown on button on top right

#### logo 
- **type**: image
- **default**: `null`
- **required**: `false`
- **description**: Logo shown in the top left instead of app name

#### show_root_link
- **type**: bool
- **default**: `null`
- **required**: `false`
- **description**: Toggles whether the top left should link back to the root

<!-- 
#### back
- **type**: `bool`
- **default**: `null`
- **required**: `false`
- **description**: url to go back to when not on root page -->

```jsx
import { Navbar } from "mvp-webapp";
import logo from "../images/external/logo.png";

// <Navbar links={['about', 'work', 'team']} btn='Call to action' roots={[]}/>;
<Navbar 
    links={['about', 'work', 'team']} 
    btn='Call to action' 
    back={'back a page'} 
    // logo={logo}
    btn_icon={logo}
    show_root_link={false}
/>;
```