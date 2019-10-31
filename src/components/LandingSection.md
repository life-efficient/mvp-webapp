A section for the landing page that occupies most of the screen. By default its content is aligned centrally.

```jsx
import { LandingSection } from "react-sample-components-library";

<LandingSection 
    inner={
        <>
            <div style={{fontSize: '30px', fontWeight: '900'}}>
                Title
            </div>
            <div>
                Content
            </div>
        </> 
    }
/>
```