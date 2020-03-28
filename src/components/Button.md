General purpose button. When clicked it will run any function passed to it as a `onClick` prop. To use it to link to somewhere, pass it a `to` prop indicating the path it should link to.

```jsx
import { Button } from "mvp-webapp";
import logo from "../images/external/logo.png";

<>
<Button 
    // text="A button with a callback" 
    icon={logo}
    text='Cart'
    onClick={() => {console.log('clicked')}}
/>
<br/><br/>
<Button 
    text="A link button" 
    to='/link'
/>
</>
```
