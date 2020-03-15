A login panel. Wraps the MVP form component. Hooks up with AWS Amplify Cognito Auth

### props
#### `can_sign_up`
- **type**: `bool`
- **default**: `null`
- **required**: `false`
- **description**: Removes the link to the sign up page if true

```jsx
import { Login } from "mvp-webapp";

<Login can_sign_up={true}/>
```