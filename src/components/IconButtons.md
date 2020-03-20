
A series of buttons with icons on

### props
#### **`items`**
- **type**: `array` 
- **default**: `null`
- **required**: `true`
- **description**: List of objects specifying each icon button shown. Each should have the following keys:

    * **`faIcon`**

        - **type**: imported Font Awesome icon 
        - **default**: `null`
        - **required**: `true` unless `src` prop given
        - **description**: icon shown

    * **`src`** 
        
        * type: imported image 
        - **default**: `null`
        - **required**: `false`
        - **description**: image that you'd like to use as an icon.

    * **`alert`** 
        
        - **type**: `string` 
        - **default**: `null`
        - **required**: `false`
        - **description**: string that you'd like to appear in a red alert bubble to the corner of the item 

``` jsx
import { IconButtons } from "mvp-webapp";
import { connect } from "react-redux";
import notification from "../images/icons/notification.png";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

<div style={{position: 'relative', height: '300px'}}>
<IconButtons items={[
    {
        'title': 'Notifications',
        icon: notification,
        faIcon: faCoffee,
        to: '/to_item',
        alert: '*'
    },
    {
        'title': 'Notifications',
        icon: notification,
    },
    {
        'title': 'Notifications',
        faIcon: faCoffee,
        alert: 15
    },
]}/>
</div>
```