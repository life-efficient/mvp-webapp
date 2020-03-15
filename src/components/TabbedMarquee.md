A section with tabs that scroll automatically until you click a specific one.

### props
#### tabs
- **type**: `array`
- **default**: `null`
- **required**: `false`
- **description**: An array of jsx items that will be rendered on each tab

#### autoChange
- **type**: `bool`
- **default**: `null`
- **required**: `false`
- **description**: Toggle whether the tabs will automatically change every second until one heading is clicked

#### period
- **type**: `float/int`
- **default**: `1`
- **required**: `false`
- **description**: The time delay between auto changing tabs.

``` jsx
import { TabbedMarquee } from "mvp-webapp";

<TabbedMarquee 
    autoChange={true}
    tabs={[
        {
            name: 'tab 1',
            html: 'yo'
        }
        ,
        {
            name: 'tab 2',
            html: 'yo there'
        }
    ]}
    period={3000}
/>
```
