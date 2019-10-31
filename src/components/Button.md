General purpose button. When clicked it will run any function passed to it as a `onClick` prop. To use it to link to somewhere, pass it a `to` prop indicating the path it should link to.

```jsx
import { Button } from "mvp-webapp";


<>
<Button text="A button with a callback" onClick={() => {console.log('clicked')}}/>
<br/><br/>
<Button text="A link button" to='/link'/>
</>
```
