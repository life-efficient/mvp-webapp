A tile

### props
#### title
- **type**: `string`
- **default**: `null`
- **required**: `false`
- **description**: The title shown on the tile

#### faIcon
- **type**: imported Font Awesome icon 
- **default**: `null`
- **required**: `false`
- **description**: The Font Awesome icon shown on the tile

#### icon
- **type**: imported image
- **default**: `null`
- **required**: `false`
- **description**: The icon shown on the tile, if no Font Awesome icon given as faIcon prop

``` jsx
import logo from '../images/external/logo.png';
import { Tile } from "mvp-webapp";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

[
    {
        title: 'tile 1',
        faIcon: faCoffee
    }
    ,
    {
        title: 'tile 2',
        icon: logo
    }
]
.map((t) => { return (<Tile {...t} />) })
```
