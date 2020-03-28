General purpose button. 

### props
#### onClick
- **type**: `function`
- **default**: `null`
- **required**: `false`
- **description**: Function triggered on click

#### text 
- **type**: `string`
- **default**: `null`
- **required**: `false`
- **description**: Text shown on button

#### icon
- **type**: image
- **default**: `null`
- **required**: `false`
- **description**: Icon shown on button

```jsx
import { Button } from "mvp-webapp";
import logo from "../images/external/logo.png";

<>
Button without icon
<br/>
<Button 
    text="A button with a callback" 
    onClick={() => {console.log('clicked')}}
/>
<br/>
<br/>
Button with icon
<br/>
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
