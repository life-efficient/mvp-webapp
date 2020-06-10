A grid of tile components

### **props**
#### **`tiles`**
- **type**: `array`
- **default**: `null`
- **required**: `false`
- **description**: A list of objects that specify the props of each listing which you want to render.

#### **`size`**
- **type**: `number`
- **default**: `null`
- **required**: `false`
- **description**: The size of the listing. Specifically, height in pixels.


``` jsx
import { TG } from "mvp-webapp";
import LinkIcon from '@material-ui/icons/Link';

<TG tiles = {[
    {
        title: "Listing title",
        icon: <LinkIcon/>
    },
    {
        title: "Listing teetle",
        icon: <LinkIcon/>
    }
]}/>

```