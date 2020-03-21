
Like a navbar, but on the side.

### props
#### **`items`**
- **type**: `array` 
- **default**: `null`
- **required**: `true`
- **description**: List of objects specifying each icon button shown on the Sidebar. Each should have the following keys:

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

    * **`icon`**

        - **type**: imported image
        - **default**: `null`
        - **required**: `false`
        - **description**: If you want to use a custom image as an icon then you can import it and use it here

``` jsx
import { Sidebar } from "mvp-webapp";
import { connect } from "react-redux";
// import notification from "../images/icons/notification.png";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

<div style={{position: 'relative', height: '300px'}}>
<Sidebar items={[
    {
        'title': 'Notifications',
        icon: notification,
        // faIcon: <FontAwesomeIcon icon={faCoffee} color={'#ff822e'} size='50px'/>
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