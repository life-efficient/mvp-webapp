A grid of tile components

### **props**
#### **`tiles`**
- **type**: `array`
- **default**: `null`
- **required**: `false`
- **description**: A list of objects that specify the props of each tile which you want to render in a grid (see Tile component).


``` jsx
import logo from "../images/external/logo.png";
import { TileGrid } from "mvp-webapp";

<TileGrid tiles = {[
    {
        title: 'title 1',
        to: '/tile1',
        icon: logo
    },
    {
        title: 'title 1',
        to: '/tile1',
        icon: logo
    },
    {
        title: 'title 1',
        to: '/tile1',
        icon: logo
    },
    {
        title: 'title 1',
        to: '/tile1',
        icon: logo
    },
    {
        title: 'title 1',
        to: '/tile1',
        icon: logo
    },
    {
        title: 'title 1',
        to: '/tile1',
        icon: logo
    },
    {
        title: 'title 1',
        to: '/tile1',
        icon: logo
    },
]}/>

```