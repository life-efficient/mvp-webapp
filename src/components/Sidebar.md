
A navbar, but on the side.

### Props
#### **`items`**
The `items` prop should be a list of objects with the following keys.

- `faIcon`: this prop should be a component from fontAwesome's react library. FontAwesome has a huge collection of icons which are all treated like font. This means that you can change their color dynamically, rather than being stuck with using an image that can't change.
- alternatively to `faIcon`, you can pass in the src for an image that you'd like to use as an icon. It should be imported by doing something along the lines of `import my_src from ./my_img_path/img.png`
- `title`: the title will be shown next to the icon when the page is large enough

``` jsx
import { Sidebar } from "mvp-webapp";
import { connect } from "react-redux";
import notification from "../images/icons/notification.png";
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